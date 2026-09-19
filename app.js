/* Application ÉCLAT — Version Autonome & Somatique */

const STEPS = [
  {
    title: "É — Épreuve actuelle",
    intro: "Partir du présent et laisser apparaître précisément ce qui pèse aujourd’hui.",
    questions: [
      { id: "reason", label: "Qu’est-ce qui vous amène aujourd’hui ?", type: "text", hint: "Écrivez ce qui vient, sans chercher tout de suite à l’expliquer." },
      { id: "difficulty", label: "Qu’est-ce qui est le plus difficile pour vous dans cette situation ?", type: "text" },
      { id: "intention", label: "Qu’aimeriez-vous comprendre, apaiser ou faire évoluer ?", type: "text" },
      { id: "startIntensity", label: "Quelle place cette difficulté prend-elle aujourd’hui ?", type: "scale" }
    ]
  },
  {
    title: "C — Corps & émotions",
    intro: "Accueillir les signaux du corps et les émotions, sans chercher à les expliquer trop vite.",
    questions: [
      { id: "emotions", label: "Lorsque vous pensez à cette situation, qu’est-ce qui apparaît ?", type: "chips", options: ["Colère", "Tristesse", "Peur", "Culpabilité", "Honte", "Impuissance", "Confusion", "Autre"] },
      { id: "emotionWords", label: "Avec vos propres mots, comment décririez-vous ce ressenti ?", type: "text" },
      { id: "body", label: "Où le ressentez-vous dans votre corps ?", type: "chips", options: ["Tête", "Gorge", "Poitrine", "Ventre", "Dos", "Épaules", "Bras / mains", "Jambes", "Partout", "Je ne sais pas"] },
      { id: "immediateNeed", label: "De quoi auriez-vous besoin à cet instant ?", type: "text" }
    ]
  },
  {
    title: "L — Liens & répétitions",
    intro: "Observer le fil rouge entre les situations actuelles et les échos possibles, sans forcer l'analyse.",
    questions: [
      { id: "recurrence", label: "Est-ce une situation isolée ou quelque chose qui semble se répéter ?", type: "chips", options: ["Situation isolée", "Cela revient parfois", "Cela revient souvent", "Je ne sais pas"] },
      { id: "triggers", label: "Qu’est-ce qui déclenche généralement cette réaction ?", type: "text" },
      { id: "protection", label: "Que faites-vous habituellement pour vous protéger ?", type: "chips", options: ["Je fuis", "Je contrôle", "Je me tais", "Je m’adapte", "Je me défends", "Je me coupe de mes émotions", "Autre"] },
      { id: "familiar", label: "Cette sensation vous paraît-elle familière ?", type: "text", hint: "Un souvenir peut venir spontanément, mais il n’est pas nécessaire d’en trouver un." },
      { id: "pastNeed", label: "De quoi auriez-vous eu besoin à ce moment-là ?", type: "text" }
    ]
  },
  {
    title: "A — Axe essentiel",
    intro: "Nommer l’énergie centrale et le besoin qui se cache derrière, en laissant toujours la personne valider ou ajuster.",
    questions: [
      { id: "coreWord", label: "Si cette difficulté portait un seul mot, lequel serait-il ?", type: "text" },
      { id: "themes", label: "Quels thèmes semblent résonner ?", type: "chips", options: ["Rejet", "Abandon", "Injustice", "Dévalorisation", "Impuissance", "Manque de place", "Silence", "Insécurité", "Non-choix", "Séparation", "Autre"] },
      { id: "belief", label: "Quelle phrase intérieure semble se cacher derrière ?", type: "text", hint: "Par exemple : « Je ne suis pas… », « Je n’ai pas le droit de… », « Je dois toujours… »" },
      { id: "need", label: "Quel besoin important n’est pas suffisamment entendu ?", type: "text" }
    ]
  },
  {
    title: "T — Trésor révélé",
    intro: "Explorer les deux polarités : ce qui a blessé, mais aussi la sensibilité, la ressource et l’élan qui en émergent.",
    questions: [
      { id: "opposite", label: "Quel serait l’opposé juste et bénéfique de ce blocage ?", type: "text" },
      { id: "sensitivity", label: "Qu’avez-vous appris à repérer très rapidement grâce à ce vécu ?", type: "text" },
      { id: "quality", label: "Quelle qualité ou capacité avez-vous développée à travers cette expérience ?", type: "text" },
      { id: "offering", label: "Qu’apportez-vous facilement aux autres grâce à ce que vous avez traversé ?", type: "text" },
      { id: "selfGift", label: "Comment pourriez-vous commencer à vous offrir cette même chose ?", type: "text" },
      { id: "newChoice", label: "Qu’aimeriez-vous choisir à la place de l’ancien fonctionnement ?", type: "text" }
    ]
  },
  {
    title: "✦ Ancrage",
    intro: "Faire descendre la compréhension dans le corps et dans la vie par un choix simple, réaliste et libre.",
    questions: [
      { id: "change", label: "Qu’est-ce qui a changé depuis le début de la séance ?", type: "text" },
      { id: "nowBody", label: "Comment votre corps se sent-il maintenant ?", type: "text" },
      { id: "takeaway", label: "Quelle compréhension souhaitez-vous retenir ?", type: "text" },
      { id: "action", label: "Quelle petite action pourrait soutenir ce changement ?", type: "text" },
      { id: "afterNeed", label: "De quoi avez-vous besoin après cette séance ?", type: "text" },
      { id: "endIntensity", label: "Quelle intensité reste-t-il maintenant ?", type: "scale" }
    ]
  }
];

const DEEPENERS = {
  0: [
    { id: "personalImpact", after: "difficulty", label: "Qu’est-ce que cette difficulté vient toucher chez vous, au-delà de la situation elle-même ?", when: a => hasText(a.difficulty) },
    { id: "implication", after: "personalImpact", label: "Si rien ne change, qu’est-ce que vous craignez que cela entraîne pour vous ?", when: a => hasText(a.personalImpact) }
  ],
  1: [
    { id: "emotionMessage", after: "emotionWords", label: "Si ce ressenti pouvait parler, qu’essaierait-il de vous faire entendre ?", when: a => hasText(a.emotionWords) || hasAny(a.emotions) },
    { id: "heldBack", after: "emotionMessage", label: "Dans cette situation, qu’est-ce que vous retenez, n’osez pas dire ou ne vous autorisez pas à faire ?", when: a => hasText(a.emotionMessage) },
    { id: "needObstacle", after: "immediateNeed", label: "Qu’est-ce qui vous empêche aujourd’hui d’accueillir pleinement ce besoin ?", when: a => hasText(a.immediateNeed) }
  ],
  2: [
    { id: "commonThread", after: "recurrence", label: "Qu’est-ce qui semble commun aux différentes fois où cela se produit ?", when: a => includesAny(a.recurrence, ["Cela revient parfois", "Cela revient souvent"]) },
    { id: "protectionPurpose", after: "protection", label: "À quoi ce fonctionnement essaie-t-il de vous protéger ?", when: a => hasAny(a.protection) },
    { id: "protectionCost", after: "protectionPurpose", label: "Et aujourd’hui, qu’est-ce que cette protection vous coûte ou vous empêche de vivre ?", when: a => hasText(a.protectionPurpose) }
  ],
  3: [
    { id: "ruleFear", after: "belief", label: "Que craignez-vous qu’il arrive si vous ne respectez plus cette règle intérieure ?", when: a => containsRule(a.belief) },
    { id: "exception", after: "belief", label: "Pouvez-vous retrouver une exception, même petite, où cela ne s’est pas passé ainsi ?", when: a => containsAbsolute(a.belief) },
    { id: "beliefOrigin", after: "belief", label: "Cette phrase vous appartient-elle vraiment, ou semble-t-elle venir de quelque part ?", when: a => hasText(a.belief) },
    { id: "deepNeed", after: "need", label: "Si ce besoin était vraiment entendu, qu’est-ce que cela changerait dans votre manière d’être ou d’agir ?", when: a => hasText(a.need) }
  ],
  4: [
    { id: "hiddenStrength", after: "quality", label: "Dans quelle situation cette qualité vous a-t-elle déjà réellement aidé ?", when: a => hasText(a.quality) },
    { id: "choiceBarrier", after: "newChoice", label: "Qu’est-ce qui pourrait vous ramener vers l’ancien fonctionnement ?", when: a => hasText(a.newChoice) },
    { id: "choiceResource", after: "choiceBarrier", label: "Sur quelle ressource en vous pourrez-vous alors vous appuyer ?", when: a => hasText(a.choiceBarrier) }
  ],
  5: [
    { id: "actionSmall", after: "action", label: "Comment rendre cette action assez petite et simple pour qu’elle soit réellement faisable ?", when: a => hasText(a.action) },
    { id: "actionWhen", after: "actionSmall", label: "Quand précisément souhaitez-vous faire ce premier pas ?", when: a => hasText(a.actionSmall) },
    { id: "support", after: "afterNeed", label: "De quel soutien ou de quelle ressource disposez-vous déjà pour la suite ?", when: a => hasText(a.afterNeed) }
  ]
};

function textValue(v) { return Array.isArray(v) ? v.join(" ") : String(v ?? ""); }
function hasText(v) { return textValue(v).trim().length >= 3; }
function hasAny(v) { return Array.isArray(v) ? v.length > 0 : hasText(v); }
function includesAny(v, values) { return (Array.isArray(v) ? v : [v]).some(x => values.includes(x)); }
function normalized(v) { return textValue(v).toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function containsRule(v) { return /\b(il faut|je dois|je ne dois|oblige|obligation|pas le droit)\b/.test(normalized(v)); }
function containsAbsolute(v) { return /\b(toujours|jamais|tout le monde|personne|aucun|rien|impossible)\b/.test(normalized(v)); }

function activeQuestions(stepIndex) {
  const base = STEPS[stepIndex].questions;
  const eligible = (DEEPENERS[stepIndex] || []).filter(q => q.when(state.answers)).slice(0, 2).map(q => ({ ...q, type: "text", adaptive: true }));
  const result = [];
  const addAfter = id => eligible.filter(x => x.after === id && !result.some(r => r.id === x.id)).forEach(x => { result.push(x); addAfter(x.id); });
  base.forEach(q => { result.push(q); addAfter(q.id); });
  return result;
}

const GUIDANCE = [
  "Prenez un instant pour choisir une situation précise. Il n’est pas nécessaire de tout raconter : quelques mots sincères suffisent.",
  "Il n’y a pas de bonne réponse. Remarquez simplement ce qui est présent, même si c’est flou ou si vous ne ressentez rien de particulier.",
  "Une ressemblance n’est pas une preuve. Accueillez seulement les souvenirs ou rapprochements qui viennent spontanément, sans en chercher à tout prix.",
  "Le mot central n’est pas une étiquette sur vous. C’est une façon provisoire de nommer ce qui semble demander de l’attention aujourd’hui.",
  "Une difficulté peut aussi avoir affiné une sensibilité ou une capacité. Gardez uniquement les pistes qui vous ressemblent réellement.",
  "Vous n’avez pas besoin de tout résoudre maintenant. Une compréhension simple et un petit mouvement concret peuvent suffire pour aujourd’hui."
];

const RESOURCE_PATHS = {
  "Rejet": "accueillir, choisir ce qui mérite une place et créer des espaces d’inclusion",
  "Abandon": "cultiver la continuité, la présence, la fidélité à soi et la persévérance",
  "Injustice": "développer le discernement, l’équilibre et le sens de ce qui est juste",
  "Dévalorisation": "reconnaître la valeur, encourager et rendre visible ce qui compte",
  "Impuissance": "retrouver une marge de choix, agir à son échelle et demander du soutien",
  "Manque de place": "prendre sa place avec justesse et aider chacun à trouver la sienne",
  "Silence": "écouter profondément, choisir ses mots et restaurer une parole libre",
  "Insécurité": "créer des repères, de la fiabilité et des espaces où l’on se sent protégé",
  "Non-choix": "clarifier ses envies, décider progressivement et respecter son propre rythme",
  "Séparation": "relier sans se perdre, différencier et construire des liens plus conscients"
};

const KEY = "dads-chemin-interieur-v1";
let state = { step: 0, question: 0, feedback: false, name: "", answers: {}, updatedAt: null };

const $ = s => document.querySelector(s);
const welcome = $("#welcome"), session = $("#session"), summary = $("#summary"), stepContent = $("#stepContent");

function load() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      state = { ...state, ...JSON.parse(saved) };
      $("#resumeSession").hidden = false;
    }
  } catch (e) {
    console.warn(e);
  }
}

function save() {
  try {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(state));
    const saveEl = $("#saveState");
    if (saveEl) saveEl.textContent = "Enregistré sur cet appareil";
  } catch (e) {
    console.warn(e);
  }
}

function show(view) {
  [welcome, session, summary].forEach(x => x.hidden = true);
  view.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(v = "") {
  return String(v).replace(/[&<>'"]/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[c]));
}

function renderNav() {
  const nav = $("#stepNav");
  nav.innerHTML = STEPS.map((s, i) => `
    <button type="button" data-step="${i}" class="${i === state.step ? 'active' : ''} ${i < state.step ? 'done' : ''}">
      <span>${i < state.step ? '✓' : i + 1}</span>${escapeHtml(s.title)}
    </button>
  `).join("");

  nav.querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      collect();
      state.step = +b.dataset.step;
      state.question = 0;
      state.feedback = false;
      renderStep();
    };
  });
}

function question(q) {
  const val = state.answers[q.id] ?? (q.type === "scale" ? 5 : q.type === "chips" ? [] : "");
  const cls = q.adaptive ? ' adaptive-question' : '';
  const badge = q.adaptive ? '<p class="adaptive-label">Une relance pour approfondir</p>' : '';
  
  if (q.type === "chips") {
    return `
      <article class="question-card${cls}">
        ${badge}
        <div class="question-title">${q.label}</div>
        ${q.hint ? `<p class="question-hint">${q.hint}</p>` : ""}
        <div class="chips" data-id="${q.id}">
          ${q.options.map(o => `
            <button type="button" class="chip ${val.includes(o) ? 'selected' : ''}" aria-pressed="${val.includes(o)}" data-value="${escapeHtml(o)}">${escapeHtml(o)}</button>
          `).join("")}
        </div>
      </article>`;
  }

  if (q.type === "scale") {
    return `
      <article class="question-card${cls}">
        ${badge}
        <label for="${q.id}">${q.label}</label>
        <div class="scale-wrap">
          <input id="${q.id}" data-id="${q.id}" type="range" min="0" max="10" value="${val}">
          <output class="scale-value" for="${q.id}">${val}</output>
        </div>
        <p class="question-hint">0 — très faible &nbsp;&nbsp; 10 — très forte</p>
      </article>`;
  }

  return `
    <article class="question-card${cls}">
      ${badge}
      <label for="${q.id}">${q.label}</label>
      ${q.hint ? `<p class="question-hint">${q.hint}</p>` : ""}
      <textarea id="${q.id}" data-id="${q.id}" placeholder="Noter les mots qui viennent…">${escapeHtml(val)}</textarea>
    </article>`;
}

function resourceSuggestion() {
  const themes = state.answers.themes || [];
  const paths = themes.filter(x => RESOURCE_PATHS[x]).map(x => `<strong>${escapeHtml(x)}</strong> : ${RESOURCE_PATHS[x]}`);
  if (!paths.length) return "";
  return `<div class="suggestion-box"><small>Pistes à ressentir, pas conclusions</small><p>${paths.join("<br><br>")}</p></div>`;
}

function answerText(q) {
  const v = state.answers[q.id];
  return Array.isArray(v) ? v.join(", ") : String(v ?? "").trim();
}

function guideReaction(q) {
  const v = answerText(q);
  if (!v) return "Vous avez choisi de ne pas répondre. C’est possible : gardez seulement ce qui vous paraît utile.";
  
  if (q.id === "startIntensity" && +v >= 8) return "Cette situation semble prendre beaucoup de place. Avancez doucement, sans chercher à tout résoudre aujourd’hui.";
  if (q.id === "emotions") return `Vous reconnaissez ${escapeHtml(v.toLowerCase())}. Nommer ce qui est là permet déjà de sortir un peu de la confusion.`;
  if (q.id === "body") return `Votre corps attire votre attention vers ${escapeHtml(v.toLowerCase())}. Respirez tranquillement et observez cette zone sans la forcer à changer.`;
  if (["immediateNeed", "pastNeed", "need"].includes(q.id)) return `Le besoin que vous nommez — <strong>${escapeHtml(v)}</strong> — devient un repère important pour la suite.`;
  if (q.id === "recurrence" && v !== "Situation isolée") return "Le fait que cela revienne peut signaler un fonctionnement de protection devenu familier. Observons-le sans chercher de coupable.";
  if (q.id === "protection") return `Cette réaction — <strong>${escapeHtml(v)}</strong> — a probablement essayé de vous protéger. Voyons maintenant si elle vous convient encore.`;
  if (q.id === "belief") return "Cette phrase intérieure n’est pas une vérité sur vous. Elle peut être une ancienne conclusion que vous pouvez regarder avec plus de recul.";
  if (q.id === "personalImpact") return "Vous distinguez maintenant la situation extérieure de ce qu’elle vient toucher plus profondément en vous.";
  if (q.id === "implication") return "Cette crainte montre pourquoi la situation prend autant de place. La nommer permet de ne plus la laisser agir entièrement dans l’ombre.";
  if (q.id === "emotionMessage") return "Vous venez d’écouter le message possible de ce ressenti, sans lui demander de disparaître.";
  if (q.id === "heldBack") return "Ce que vous retenez peut indiquer une limite, une parole ou un choix qui cherche à retrouver sa place.";
  if (q.id === "needObstacle") return "Identifier l'obstacle est le premier pas pour autoriser progressivement ce besoin.";
  if (q.id === "ruleFear") return "La peur de ne pas respecter cette règle montre son emprise, mais nommer cette crainte vous redonne une marge de choix.";
  if (q.id === "exception") return "Cette exception montre que la règle n'est pas absolue et que d'autres issues sont toujours possibles.";
  if (q.id === "hiddenStrength") return "Cette ressource a déjà fait ses preuves par le passé : elle est bel et bien disponible aujourd'hui.";
  if (q.id === "action") return "Ce petit mouvement concret peut devenir votre premier ancrage.";
  
  return "Merci. Vos mots donnent une direction à la suite du parcours.";
}

function bind(q) {
  const textarea = stepContent.querySelector("textarea");
  if (textarea) {
    textarea.oninput = () => {
      state.answers[q.id] = textarea.value;
      save();
    };
  }

  const range = stepContent.querySelector("input[type=range]");
  if (range) {
    range.oninput = () => {
      state.answers[q.id] = +range.value;
      if (range.nextElementSibling) range.nextElementSibling.value = range.value;
      save();
    };
  }

  const group = stepContent.querySelector(".chips");
  if (group) {
    group.querySelectorAll(".chip").forEach(c => {
      c.onclick = () => {
        let a = state.answers[q.id] || [];
        let v = c.dataset.value;
        let nextArr = a.includes(v) ? a.filter(z => z !== v) : [...a, v];
        state.answers[q.id] = nextArr;
        c.classList.toggle("selected");
        c.setAttribute("aria-pressed", nextArr.includes(v));
        save();
      };
    });
  }
}

function renderStep() {
  state.question = Number.isInteger(state.question) ? state.question : 0;
  state.feedback = Boolean(state.feedback);
  
  renderNav();

  const s = STEPS[state.step];
  const currentQuestions = activeQuestions(state.step);

  if (state.question >= currentQuestions.length) {
    state.question = currentQuestions.length - 1;
  }

  const q = currentQuestions[state.question];
  
  let total = STEPS.reduce((n, x, idx) => n + activeQuestions(idx).length, 0);
  let done = STEPS.slice(0, state.step).reduce((n, x, idx) => n + activeQuestions(idx).length, 0) + state.question + 1;

  $("#stepNumber").textContent = `${s.title} · question ${state.question + 1}/${currentQuestions.length}`;
  $("#progressBar").style.width = `${(done / total) * 100}%`;

  const pause = (state.step === 2 && state.question === 0) ? `
    <div class="pause-box">
      <span>♡</span>
      <div><b>Vous restez libre.</b><br>Si un souvenir ou une émotion devient trop intense, faites une pause et revenez à ce qui vous entoure ici et maintenant.</div>
    </div>` : "";

  let intro = state.question === 0 ? `
    <p class="eyebrow">0${state.step + 1}</p>
    <h2>${s.title}</h2>
    <p class="step-intro">${s.intro}</p>
    <div class="guidance">${GUIDANCE[state.step]}</div>
    ${pause}
    ${st