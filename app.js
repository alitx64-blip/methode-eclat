/* Application ÉCLAT — Version Autonome, Épurée & Maïeutique */

const STEPS = [
  {
    id: "E",
    title: "É — Épreuve actuelle",
    intro: "Partir du présent et laisser apparaître précisément ce qui pèse aujourd’hui.",
    questions: [
      { id: "reason", label: "Qu’est-ce qui vous amène aujourd’hui ?", type: "text", hint: "Écrivez ce qui vient, sans chercher tout de suite à l’expliquer." },
      { id: "difficulty", label: "Qu’est-ce qui est le plus difficile pour vous dans cette situation ?", type: "text" },
      { id: "intention", label: "À la place de cette difficulté, quelle situation aimeriez-vous vivre ?", type: "text" }
    ]
  },
  {
    id: "C",
    title: "C — Corps & émotions",
    intro: "Accueillir les signaux du corps et les émotions.",
    questions: [
      { id: "emotions", label: "Lorsque vous pensez à cette situation, qu’est-ce qui apparaît ?", type: "chips", options: ["Colère / agacement", "Tristesse", "Peur", "Anxiété / angoisse", "Culpabilité", "Honte", "Jalousie", "Impuissance", "Confusion", "Autre"] },
      { id: "emotionWords", label: "Avec vos propres mots, comment décririez-vous ce ressenti ?", type: "text" },
      { id: "body", label: "Où le ressentez-vous dans votre corps ?", type: "chips", options: ["Tête", "Gorge", "Poitrine", "Ventre", "Dos", "Épaules", "Bras / mains", "Jambes", "Partout", "Je ne sais pas"] },
      { id: "immediateNeed", label: "De quoi auriez-vous besoin à cet instant ?", type: "text" }
    ]
  },
  {
    id: "L",
    title: "L — Liens & répétitions",
    intro: "Observer le fil rouge sans forcer l'analyse.",
    questions: [
      { id: "recurrence", label: "Est-ce quelque chose qui semble se répéter ?", type: "chips", options: ["Situation isolée", "Cela revient parfois", "Cela revient souvent", "Je ne sais pas"] },
      { id: "triggers", label: "Qu’est-ce qui déclenche généralement cette réaction ?", type: "text" },
      { id: "protection", label: "Que faites-vous habituellement pour vous protéger ?", type: "chips", options: ["Je fuis", "Je contrôle", "Je me tais", "Je m’adapte", "Je me défends", "Je me coupe de mes émotions", "Autre"] }
    ]
  },
  {
    id: "A",
    title: "A — Axe essentiel",
    intro: "Nommer le besoin fondamental et la croyance sous-jacente.",
    questions: [
      { id: "coreWord", label: "Si cette difficulté portait un seul mot, lequel serait-il ?", type: "text" },
      { id: "belief", label: "Quelle phrase intérieure semble se cacher derrière ?", type: "text", hint: "Ex : « Je ne suis pas assez… », « Je n’ai pas le droit de… »" },
      { id: "need", label: "Quel besoin important n’est pas suffisamment entendu ?", type: "text" }
    ]
  },
  {
    id: "T",
    title: "T — Trésor & Ancrage",
    intro: "Révéler la ressource et choisir un premier pas.",
    questions: [
      { id: "quality", label: "Quelle force ou qualité avez-vous développée à travers cette expérience ?", type: "text" },
      { id: "newChoice", label: "Qu’aimeriez-vous choisir à la place de l’ancien fonctionnement ?", type: "text" },
      { id: "action", label: "Quelle petite action simple pourrait soutenir ce changement aujourd'hui ?", type: "text" }
    ]
  }
];

// État de l'application locale
const state = {
  currentStepIndex: 0,
  answers: {}
};

/* --- Gestion de l'Appel API Maïeutique --- */

async function soumettreEtAnalyser() {
  afficherChargement(true);

  try {
    const response = await fetch('/api/maieutique', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        typeExercice: "Parcours ÉCLAT",
        reponses: state.answers
      })
    });

    const data = await response.json();

    if (data.synthese) {
      sauvegarderEnLocal(data.synthese);
      afficherSyntheseFinale(data.synthese);
    } else {
      throw new Error("Erreur de génération");
    }
  } catch (error) {
    console.error("Erreur API :", error);
    afficherErreur("Impossible de générer la synthèse. Vos réponses sont sauvegardées sur votre téléphone.");
  } finally {
    afficherChargement(false);
  }
}

/* --- Stockage 100% Local --- */

function sauvegarderEnLocal(syntheseTexte) {
  const historique = JSON.parse(localStorage.getItem('eclat_historique') || '[]');
  
  historique.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    reponsesBrutes: state.answers,
    synthese: syntheseTexte
  });

  localStorage.setItem('eclat_historique', JSON.stringify(historique));
}
