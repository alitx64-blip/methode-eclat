// Modèle Gemini disponible dans l’offre gratuite, modifiable avec GEMINI_MODEL.
const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const MAX_BODY_LENGTH = 18000;

const SYSTEM_PROMPT = `Vous rédigez la synthèse approfondie d'un parcours ÉCLAT en français.

Utilisez UNIQUEMENT les réponses fournies. Ne résumez pas successivement toutes les réponses. Identifiez d'abord une à trois connexions fortes entre des réponses parfois éloignées du parcours, puis montrez ces rapprochements avec les formulations de la personne. La valeur de la synthèse vient de ces connexions, pas d'une reformulation exhaustive.

Reliez seulement lorsque les éléments le soutiennent : situation et déclencheur ; émotion et déclencheur ; corps et émotion ; peur et situation ; protection et peur, fonction ou coût ; besoin et protection ; valeur et besoin ; tension entre deux besoins ; choix et valeur ; action et choix ; répétition et déclencheur. Préférez trois éléments fortement reliés à dix éléments vaguement associés.

Rédigez 3 à 5 paragraphes courts, sans titre, sans liste et sans markdown. Réutilisez autant que possible les mots de la personne. Une tension peut être proposée uniquement si les deux côtés apparaissent dans les réponses.

Séparez clairement les faits exprimés, les rapprochements et les hypothèses. Restez prudent : « vos réponses semblent faire apparaître… », « une piste pourrait être… », « il semble y avoir une tension entre… », « si cela résonne pour vous… », « vos propres mots suggèrent… ». N'inventez aucune cause. Si aucune connexion forte n'est soutenue, produisez une synthèse simple et factuelle plutôt qu'une prise de conscience artificielle.

Interdictions absolues : diagnostic psychologique ou psychiatrique ; cause psychologique inventée ; « votre problème vient de » ; « votre inconscient » ; « vous faites cela parce que » ; traumatisme ou souvenir non exprimé ; signification universelle d'une émotion ; culpabilisation ; hypothèse présentée comme une vérité. Si un lien n'est pas suffisamment soutenu, omettez-le. Terminez par le mouvement concret choisi, s'il est renseigné.`;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export function onRequestGet({ env }) {
  return json({ enabled: Boolean(env.GEMINI_API_KEY) && env.ECLAT_AI_ENABLED !== "false" });
}

export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY || env.ECLAT_AI_ENABLED === "false") return json({ message: "Synthèse indisponible." }, 503);
  if ((Number(request.headers.get("content-length")) || 0) > MAX_BODY_LENGTH) return json({ message: "Données trop volumineuses." }, 413);

  const body = await request.json().catch(() => null);
  if (!body || typeof body.responses !== "object" || Array.isArray(body.responses)) return json({ message: "Réponses invalides." }, 400);

  const responses = Object.fromEntries(Object.entries(body.responses)
    .filter(([key, value]) => key.length <= 60 && (typeof value === "string" || typeof value === "number" || Array.isArray(value)))
    .map(([key, value]) => [key, Array.isArray(value) ? value.slice(0, 6).map(String).join(" · ").slice(0, 900) : String(value).slice(0, 900)])
    .filter(([, value]) => value.trim()));
  const serialized = JSON.stringify(responses);
  if (serialized.length < 40 || serialized.length > MAX_BODY_LENGTH) return json({ message: "Réponses insuffisantes ou trop volumineuses." }, 400);

  try {
    const requestedModel = String(env.GEMINI_MODEL || "").trim();
    const model = /^gemini-[a-z0-9.-]+$/i.test(requestedModel) ? requestedModel : DEFAULT_MODEL;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: {
        "x-goog-api-key": env.GEMINI_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{
          role: "user",
          parts: [{ text: `Réponses du parcours ÉCLAT :\n${serialized}` }]
        }],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 900
        }
      })
    });
    if (!response.ok) {
      const reason = response.status === 400 ? "configuration"
        : response.status === 401 || response.status === 403 ? "key"
        : response.status === 404 ? "model"
        : response.status === 429 ? "quota"
        : "provider";
      return json({ message: "Synthèse indisponible.", reason }, 502);
    }
    const data = await response.json();
    const summary = data?.candidates?.[0]?.content?.parts
      ?.map((part) => typeof part?.text === "string" ? part.text : "")
      .join("")
      .trim();
    if (!summary) return json({ message: "Synthèse indisponible." }, 502);
    return json({ summary, model });
  } catch {
    return json({ message: "Synthèse indisponible." }, 502);
  }
}
