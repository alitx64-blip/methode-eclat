/* Application ÉCLAT — Module Intégral (ÉCLAT, Peurs, Anxiété, Schémas) */

const MODULES = {
  eclat: {
    title: "Parcours ÉCLAT Global",
    steps: [
      {
        id: "E",
        title: "É — Épreuve actuelle",
        intro: "Clarifier ce qui pèse aujourd’hui.",
        questions: [
          { id: "reason", label: "Qu’est-ce qui vous amène aujourd’hui ?", type: "text", hint: "Écrivez la situation telle qu'elle vient." },
          { id: "difficulty", label: "Qu’est-ce qui est le plus difficile pour vous dans cette situation ?", type: "text" },
          { id: "intention", label: "Si cette situation était résolue, que ressentiriez-vous de différent ?", type: "text" }
        ]
      },
      {
        id: "C",
        title: "C — Corps & Émotions",
        intro: "Accueillir les signaux du corps et nommer l'émotion.",
        questions: [
          { id: "emotions", label: "Quelle émotion prédomine ?", type: "chips", options: ["Colère / Agacement", "Tristesse", "Peur", "Anxiété / Angoisse", "Culpabilité", "Honte", "Jalousie", "Impuissance", "Confusion"] },
          { id: "emotionWords", label: "Comment décririez-vous ce ressenti avec vos mots ?", type: "text" },
          { id: "body", label: "Où le ressentez-vous dans votre corps ?", type: "chips", options: ["Tête", "Gorge", "Poitrine", "Ventre", "Dos / Épaules", "Partout", "Je ne sais pas"] },
          { id: "immediateNeed", label: "Quel besoin demande à être entendu ?", type: "chips", options: ["Sécurité", "Reconnaissance / Écoute", "Autonomie / Liberté", "Apaisement / Repos", "Espace / Place"] }
        ]
      },
      {
        id: "L",
        title: "L — Liens & Automatismes",
        intro: "Observer les répétitions et mécanismes de défense.",
        questions: [
          { id: "recurrence", label: "Est-ce une situation familière ?", type: "chips", options: ["Situation isolée", "Cela revient parfois", "C'est un schéma récurrent"] },
          { id: "triggers", label: "Quel a été l'élément déclencheur précis ?", type: "text" },
          { id: "protection", label: "Que faites-vous habituellement pour vous protéger ?", type: "chips", options: ["Je fuis / Je m'isole", "Je contrôle", "Je me tais", "Je m'adapte", "Je me défends", "Je me coupe du ressenti"] }
        ]
      },
      {
        id: "A",
        title: "A — Axe & Croyances",
        intro: "Nommer la règle intérieure et la peur fondamentale.",
        questions: [
          { id: "belief", label: "Quelle phrase intérieure semble dicter cette réaction ?", type: "text", hint: "Ex : « Je dois toujours… », « Je n’ai pas le droit de… »" },
          { id: "worstFear", label: "Au pire, qu'est-ce que cela impliquerait pour vous ?", type: "text", hint: "La peur fondamentale (ex: me retrouver seul, perdre le contrôle)." },
          { id: "deepNeed", label: "Quel besoin essentiel n'est pas satisfait ?", type: "text" }
        ]
      },
      {
        id: "T",
        title: "T — Trésor & Ancrage",
        intro: "Découvrir la ressource et choisir un premier pas.",
        questions: [
          { id: "resource", label: "Quelle qualité développez-vous à travers cette épreuve ?", type: "text" },
          { id: "newChoice", label: "Qu'aimeriez-vous choisir à la place aujourd'hui ?", type: "text" },
          { id: "action", label: "Quelle petite action concrète pouvez-vous poser ?", type: "text" }
        ]
      }
    ]
  },
  peurs: {
    title: "La Quintessence de la Peur",
    steps: [
      {
        id: "P1",
        title: "Déconstruction de la Peur",
        intro: "Remonter le fil de la peur jusqu'à sa racine.",
        questions: [
          { id: "initialFear", label: "Nommez la peur principale qui vous occupe :", type: "text" },
          { id: "step1", label: "Si cette peur se réalisait, qu'est-ce que cela impliquerait ?", type: "text" },
          { id: "step2", label: "Et si cela arrivait, qu'est-ce que cela impliquerait ensuite ?", type: "text" },
          { id: "step3", label: "En allant au bout du scénario, quelle est la peur ultime ?", type: "text" },
          { id: "realityCheck", label: "Quelle est la part objectivement probable de cette peur ultime ?", type: "text" }
        ]
      }
    ]
  },
  schemas: {
    title: "Schémas Inconscients & Inversion",
    intro: "Mettre à jour et retourner une pensée bloquante.",
    steps: [
      {
        id: "S1",
        title: "Investigation du Jugement",
        intro: "Observer la pensée envers soi ou envers l'autre.",
        questions: [
          { id: "thought", label: "Remplissez : « Quand... j'ai le sentiment que... »", type: "text" },
          { id: "rule", label: "Remplissez : « Il / Elle / La vie devrait... »", type: "text" },
          { id: "inversionSelf", label: "Inversion vers soi : « Je devrais... (vis-à-vis de moi) »", type: "text" },
          { id: "inversionOther", label: "Inversion vers l'autre : « Je devrais... (vis-à-vis de l'autre) »", type: "text" },
          { id: "opposite", label: "Inversion à l'opposé : Quelle serait l'affirmation contraire ?", type: "text" }
        ]
      }
    ]
  }
};

// État local
const state = {
  currentModuleKey: "eclat",
  currentStepIndex: 0,
  answers: {}
};

function renderModuleSelector() {
  const container = document.getElementById("app-container");
  if (!container) return;

  let html = `
    <div class="step-card">
      <div class="step-header">
        <h2>Espace d'Introspection & de Coaching</h2>
        <p class="step-intro">Choisissez l'outil qui répond à votre besoin du moment :</p>
      </div>
      <div class="module-selector">
        <button class="btn-primary" onclick="selectModule('eclat')">✦ Parcours ÉCLAT Complet</button>
        <button class="btn-secondary" onclick="selectModule('peurs')">✦ Déconstruire une Peur (Quintessence)</button>
        <button class="btn-secondary" onclick="selectModule('schemas')">✦ Inversion des Schémas Inconscients</button>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function selectModule(key) {
  state.currentModuleKey = key;
  state.currentStepIndex = 0;
  state.answers = {};
  renderStep();
}

function renderStep() {
  const container = document.getElementById("app-container");
  if (!container) return;

  const currentModule = MODULES[state.currentModuleKey];
  const step = currentModule.steps[state.currentStepIndex];
  const isLastStep = state.currentStepIndex === currentModule.steps.length - 1;

  let html = `
    <div class="step-card">
      <div class="step-header">
        <button type="button" class="btn-link" onclick="renderModuleSelector()">← Changer d'outil</button>
        <span class="step-progress">Étape ${state.currentStepIndex + 1} sur ${currentModule.steps.length}</span>
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

async function soumettreEtAnalyser() {
  afficherChargement(true);

  try {
    const response = await fetch("/api/synthese", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        typeExercice: MODULES[state.currentModuleKey].title,
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
    module: MODULES[state.currentModuleKey].title,
    reponsesBrutes: state.answers,
    synthese: syntheseTexte
  });

  localStorage.setItem("eclat_historique", JSON.stringify(historique));
}

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
        <button class="btn-primary" onclick="renderModuleSelector()">Réaliser un autre exercice</button>
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
      <button class="btn-secondary" onclick="renderStep()">Retourner à l'exercice</button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderModuleSelector);
