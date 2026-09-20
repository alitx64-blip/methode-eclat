export async function onRequestPost(context) {
  try {
    // Récupération du corps de la requête envoyée depuis le client
    const { reponses, typeExercice } = await context.request.json();

    // Récupération de la clé API OpenAI dans les variables d'environnement Cloudflare
    const apiKey = context.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "La clé API n'est pas configurée dans Cloudflare." }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prompt système de maïeutique et d'ancrage
    const systemPrompt = `Tu es un miroir maïeutique et un facilitateur d'introspection pour le parcours "${typeExercice || 'ÉCLAT'}".

MISSION :
À partir des réponses brutes saisies par l'utilisateur, rédige un paragraphe d'ancrage continu, fluide et structuré, rédigé à la première personne du singulier ("Je").

CONSIGNES DE RÉDACTION STRICTES :
1. N'ajoute AUCUN conseil, AUCUNE analyse extérieure, AUCUN jugement ("Vous devriez...", "Il semble que...").
2. Utilise uniquement la matière transmise par l'utilisateur, mais réordonne-la logiquement selon le fil :
   - L'épreuve / ce qui pèse aujourd'hui
   - La sensation corporelle et l'émotion associée
   - Le besoin ou la croyance identifiée
   - La ressource, la qualité ou le nouveau choix de positionnement
3. Le ton doit être sobre, clair, bienveillant et structurant.
4. Longueur : entre 120 et 180 mots.
5. Ne mets pas de titre ni de formule d'introduction ("Voici votre synthèse :"). Attaque directement le texte par "Je...".`;

    // Appel vers l'API d'OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(reponses) }
        ],
        temperature: 0.6,
        max_tokens: 400
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("Erreur réponse OpenAI :", data);
      return new Response(
        JSON.stringify({ error: "Erreur lors du traitement du texte par l'IA." }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const synthese = data.choices[0]?.message?.content?.trim();

    // Renvoi du résultat éphémère au téléphone
    return new Response(
      JSON.stringify({ synthese }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Erreur serveur :", err);
    return new Response(
      JSON.stringify({ error: "Erreur interne lors de la génération." }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
