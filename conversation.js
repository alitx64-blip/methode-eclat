// Initialisation des propriétés conversationnelles
state.question = Number.isInteger(state.question) ? state.question : 0;
state.feedback = Boolean(state.feedback);

function response(q) {
  let v = state.answers[q.id];
  let t = Array.isArray(v) ? v.join(", ") : String(v || "");

  if (!t) {
    return "Vous pouvez laisser cette question de côté. Gardez seulement ce qui vous aide.";
  }
  if (q.id === "emotions") {
    return "Vous venez de nommer « " + escapeHtml(t) + " ». Accueillez ce ressenti sans le juger.";
  }
  if (q.id === "body") {
    return "Votre corps attire votre attention vers " + escapeHtml(t) + ". Respirez doucement et observez cette zone.";
  }
  if (["immediateNeed", "pastNeed", "need"].includes(q.id)) {
    return "Le besoin que vous nommez — <strong>" + escapeHtml(t) + "</strong> — est un repère essentiel.";
  }
  if (q.id === "protection") {
    return "Cette réaction a probablement essayé de vous protéger. Nous allons voir si elle vous convient encore.";
  }
  if (q.id === "belief") {
    return "Cette phrase intérieure n’est pas une vérité sur vous, mais peut-être une ancienne conclusion.";
  }
  if (q.id === "themes") {
    return resourceSuggestion() || "Gardez ces thèmes comme de simples pistes à valider.";
  }
  if (["quality", "sensitivity", "offering"].includes(q.id)) {
    return "Vous reconnaissez maintenant ce que cette expérience a aussi développé en vous.";
  }
  if (q.id === "action") {
    return "Ce petit mouvement concret peut devenir votre premier ancrage.";
  }

  return "Merci. Vos mots donnent une direction à la suite du parcours.";
}

renderNav = function() {
  const nav = $("#stepNav");
  if (!nav) return;
  
  nav.innerHTML = STEPS.map((s, i) => `
    <button type="button" class="${i === state.step ? 'active ' : ''}${i < state.step ? 'done' : ''}" data-step="${i}">
      <span>${i < state.step ? '✓' : i + 1}</span>${escapeHtml(s.title)}
    </button>
  `).join("");

  nav.querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      collect();
      state.step = +b.dataset.step;
      state.question = 0;
      state.feedback = false;
      save();
      renderStep();
    };
  });
};

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
      if (range.nextElementSibling) {
        range.nextElementSibling.value = range.value;
      }
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

renderStep = function() {
  state.question = Number.isInteger(state.question) ? state.question : 0;
  state.feedback = Boolean(state.feedback);
  
  renderNav();

  let s = STEPS[state.step];
  let q = s.questions[state.question];
  let total = STEPS.reduce((n, x) => n + x.questions.length, 0);
  let done = STEPS.slice(0, state.step).reduce((n, x) => n + x.questions.length, 0) + state.question + 1;

  $("#stepNumber").textContent = `${s.title} · question ${state.question + 1}/${s.questions.length}`;
  $("#progressBar").style.width = (done / total * 100) + "%";

  let intro = state.question === 0 ? `
    <p class="eyebrow">0${state.step + 1}</p>
    <h2>${s.title}</h2>
    <p class="step-intro">${s.intro}</p>
    <div class="guidance">${GUIDANCE[state.step]}</div>
  ` : "";

  stepContent.innerHTML = `
    <div class="conversation">
      ${intro}
      <div class="guide-bubble ${state.feedback ? 'feedback' : ''}">
        <span class="guide-name">Votre guide ÉCLAT</span>
        <p>${state.feedback ? response(q) : "Prenez votre temps. Une seule question vous est proposée."}</p>
      </div>
      ${state.feedback ? '' : `
        <div class="single-question">
          ${question(q)}
          <p class="skip-note">Vous pouvez continuer sans répondre.</p>
        </div>
      `}
    </div>
  `;

  if (!state.feedback) bind(q);

  $("#previousBtn").style.visibility = (!state.step && !state.question) ? "hidden" : "visible";
  $("#nextBtn").innerHTML = state.feedback ? "Continuer →" : "Confier ma réponse →";
};

$("#previousBtn").onclick = () => {
  if (state.feedback) {
    state.feedback = false;
  } else if (state.question > 0) {
    state.question--;
  } else if (state.step > 0) {
    state.step--;
    state.question = STEPS[state.step].questions.length - 1;
  }
  save();
  renderStep();
};

$("#nextBtn").onclick = () => {
  if (!state.feedback) {
    state.feedback = true;
    save();
    renderStep();
    return;
  }

  state.feedback = false;
  if (state.question < STEPS[state.step].questions.length - 1) {
    state.question++;
  } else if (state.step < STEPS.length - 1) {
    state.step++;
    state.question = 0;
  } else {
    return renderSummary();
  }
  save();
  renderStep();
};
