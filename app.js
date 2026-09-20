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

/* --- Rendu dynamique de l'interface --- */

function renderStep() {
  const container = document.getElementById("app-container");
  if (!container) return;

  const step = STEPS[state.currentStepIndex];
  const isLastStep = state.currentStepIndex === STEPS.length - 1;

  let html = `
    <div class="step-card">
      <div class="step-header">
        <span class="step-progress">Étape ${state.currentStepIndex + 1} sur ${STEPS.length}</span>
        <h2>${step.title}</h2>
        <p class="step-intro">${step.intro}</p>
      </div>
      <form id="step-form">
  `;

  step.questions.forEach((q) => {
    const val = state.answers[q.id] || "";

    html += `<div class="question-group"><label>${q.label}</label>`;
    if (q.hint) html += `<span class="hint">${q.hint}</span>`;

    if (q.type === "text") {
      html += `<textarea name="${q.id}" rows="3">${val}</textarea>`;
    } else if (q.type === "chips") {
      const selected = Array.isArray(val) ? val : [];
      html += `<div class="chips-group">`;
      q.options.forEach((opt) => {
        const active = selected.includes(opt) ? "active" : "";
        html += `<button type="button" class="chip-btn ${active}" onclick="toggleChip('${q.id}', '${opt}', this)">${opt}</button>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
  });

  html += `
      </form>
      <div class="step-actions">
        ${state.currentStepIndex > 0 ? `<button type="button" class="btn-secondary" onclick="prevStep()">Précédent</button>` : ""}
        ${isLastStep 
          ? `<button type="button" class="btn-primary" onclick="sauvegarderEtEtapeSuivante(true)">Obtenir ma synthèse</button>` 
          : `<button type="button" class="btn-primary" onclick="sauvegarderEtEtapeSuivante(false)">Suivant</button>`}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/* --- Interaction avec les champs --- */

function toggleChip(questionId, value, btnEl) {
  let current = state.answers[questionId] || [];
  if (!Array.isArray(current)) current = [];

  if (current.includes(value)) {
    current = current.filter((item) => item !== value);
    btnEl.classList.remove("active");
  } else {
    current.push(value);
    btnEl.classList.add("active");
  }

  state.answers[questionId] = current;
}

function enregistrerSaisiesText() {
  const form = document.getElementById("step-form");
  if (!form) return;

  const formData = new FormData(form);
  for (let [key, val] of formData.entries()) {
    if (val.trim() !== "") {
      state.answers[key] = val.trim();
    }
  }
}

function sauvegarderEtEtapeSuivante(estDerniere) {
  enregistrerSaisiesText();

  if (estDerniere) {
    soumettreEtAnalyser();
  } else {
    state.currentStepIndex++;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function prevStep() {
  enregistrerSaisiesText();
  if (state.currentStepIndex > 0) {
    state.currentStepIndex--;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* --- Gestion de l'Appel API Maïeutique --- */

async function soumettreEtAnalyser() {
  afficherChargement(true);

  try {
    const response = await fetch("/api/maieutique", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    afficherErreur("Impossible de générer l'analyse. Vos réponses restent conservées sur votre téléphone.");
  } finally {
    afficherChargement(false);
  }
}

/* --- Stockage 100% Local --- */

function sauvegarderEnLocal(syntheseTexte) {
  const historique = JSON.parse(localStorage.getItem("eclat_historique") || "[]");

  historique.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    reponsesBrutes: state.answers,
    synthese: syntheseTexte
  });

  localStorage.setItem("eclat_historique", JSON.stringify(historique));
}

/* --- Écrans d'état (Chargement, Erreur, Synthèse) --- */

function afficherChargement(encours) {
  const container = document.getElementById("app-container");
  if (!container || !encours) return;

  container.innerHTML = `
    <div class="loading-card">
      <div class="spinner"></div>
      <p>Mise en lumière de vos réponses...</p>
      <small>Un instant, nous structurons vos réflexions.</small>
    </div>
  `;
}

function afficherSyntheseFinale(synthese) {
  const container = document.getElementById("app-container");
  if (!container) return;

  container.innerHTML = `
    <div class="synthesis-card">
      <h3>✦ Votre Prise de Conscience</h3>
      <div class="synthesis-content">
        <p>${synthese.replace(/\n/g, "<br>")}</p>
      </div>
      <div class="synthesis-actions">
        <button class="btn-primary" onclick="location.reload()">Terminer</button>
      </div>
    </div>
  `;
}

function afficherErreur(message) {
  const container = document.getElementById("app-container");
  if (!container) return;

  container.innerHTML = `
    <div class="error-card">
      <p>${message}</p>
      <button class="btn-secondary" onclick="renderStep()">Retourner à la dernière étape</button>
    </div>
  `;
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", renderStep);
