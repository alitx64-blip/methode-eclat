// Modèle Gemini disponible dans l’offre gratuite, modifiable avec GEMINI_MODEL.
const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const MAX_BODY_LENGTH = 18000;

const SYSTEM_PROMPT = `Vous accompagnez la lecture d'un parcours ÉCLAT en français.

La personne dispose déjà d'une synthèse factuelle. Votre rôle est uniquement d'éclairer UN lien utile qui n'est pas évident au premier regard, ou DEUX au maximum s'ils sont directement liés.

Utilisez UNIQUEMENT les réponses fournies. Le champ « liensValides », lorsqu'il existe, contient les rapprochements explicitement confirmés par la personne : donnez-leur la priorité. N'inventez jamais une cause, une intention, un besoin, un traumatisme, une croyance ou une signification émotionnelle absente des réponses. Ne recréez jamais une hypothèse que la personne a pu refuser.

Écrivez au maximum 2 paragraphes courts, 110 mots au total. Ne résumez pas le parcours et ne répétez pas toutes les réponses. Commencez directement par le rapprochement utile. Utilisez quelques mots exacts de la personne pour qu'elle puisse reconnaître le lien. Faites clairement la différence entre ce qu'elle a dit et ce que vous proposez comme rapprochement.

Si aucun lien solide n'est soutenu, dites simplement qu'aucun rapprochement supplémentaire n'est nécessaire et rappelez le mouvement concret choisi s'il existe.

Interdictions absolues : diagnostic ; cause psychologique inventée ; « votre problème vient de » ; « votre inconscient » ; « vous faites cela parce que » ; traumatisme non exprimé ; signification universelle d'une émotion ; culpabilisation ; vérité présentée comme certaine.

Terminez par une seule question : « Est-ce que ce lien vous parle ? »`;

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
          maxOutputTokens: 300
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
