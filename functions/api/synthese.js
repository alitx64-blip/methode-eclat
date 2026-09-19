// Modèle open-weight actuellement gratuit ; surcharge possible avec OPENROUTER_MODEL.
const DEFAULT_MODEL = "qwen/qwen3.8-flash";
const MAX_BODY_LENGTH = 18000;

const SYSTEM_PROMPT = `Vous rédigez la synthèse approfondie d'un parcours ÉCLAT en français.

Utilisez UNIQUEMENT les réponses fournies. Reliez, seulement lorsque les éléments le soutiennent : situation, émotion, corps, déclencheur, protection, croyance, besoin ou valeur, tension interne éventuelle, ressource, nouveau choix et action.

Rédigez 3 à 5 paragraphes courts, sans titre, sans liste et sans markdown. Réutilisez autant que possible les mots de la personne. Une tension peut être proposée uniquement si les deux côtés apparaissent dans les réponses.

Restez prudent : « vos réponses semblent faire apparaître… », « une piste pourrait être… », « il semble y avoir une tension entre… », « si cela résonne pour vous… », « vos propres mots suggèrent… ».

Interdictions absolues : diagnostic psychologique ou psychiatrique ; cause psychologique inventée ; « votre problème vient de » ; « votre inconscient » ; « vous faites cela parce que » ; traumatisme ou souvenir non exprimé ; signification universelle d'une émotion ; culpabilisation ; hypothèse présentée comme une vérité. Si un lien n'est pas suffisamment soutenu, omettez-le. Terminez par le mouvement concret choisi, s'il est renseigné.`;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export function onRequestGet({ env }) {
  return json({ enabled: Boolean(env.OPENROUTER_API_KEY) && env.ECLAT_AI_ENABLED !== "false" });
}

export async function onRequestPost({ request, env }) {
  if (!env.OPENROUTER_API_KEY || env.ECLAT_AI_ENABLED === "false") return json({ message: "Synthèse indisponible." }, 503);
  if ((Number(request.headers.get("content-length")) || 0) > MAX_BODY_LENGTH) return json({ message: "Données trop volumineuses." }, 413);

  const body = await request.json().catch(() => null);
  if (!body || typeof body.responses !== "object" || Array.isArray(body.responses)) return json({ message: "Réponses invalides." }, 400);

  const responses = Object.fromEntries(Object.entries(body.responses)
    .filter(([key, value]) => key.length <= 60 && (typeof value === "string" || Array.isArray(value)))
    .map(([key, value]) => [key, Array.isArray(value) ? value.slice(0, 6).map(String).join(" · ").slice(0, 900) : String(value).slice(0, 900)])
    .filter(([, value]) => value.trim()));
  const serialized = JSON.stringify(responses);
  if (serialized.length < 40 || serialized.length > MAX_BODY_LENGTH) return json({ message: "Réponses insuffisantes ou trop volumineuses." }, 400);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "content-type": "application/json",
        "http-referer": new URL(request.url).origin,
        "x-title": "ÉCLAT"
      },
      body: JSON.stringify({
        model: env.OPENROUTER_MODEL || DEFAULT_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Réponses du parcours ÉCLAT :\n${serialized}` }
        ],
        temperature: 0.35,
        max_tokens: 750
      })
    });
    if (!response.ok) return json({ message: "Synthèse indisponible." }, 502);
    const data = await response.json();
    const summary = data?.choices?.[0]?.message?.content?.trim();
    if (!summary) return json({ message: "Synthèse indisponible." }, 502);
    return json({ summary, model: data.model || env.OPENROUTER_MODEL || DEFAULT_MODEL });
  } catch {
    return json({ message: "Synthèse indisponible." }, 502);
  }
}
