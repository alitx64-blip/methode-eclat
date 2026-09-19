/* Application ÉCLAT — Version Autonome & Somatique */

const STEPS = [
  {
    title: "É — Épreuve actuelle",
    intro: "Partir du présent et laisser apparaître précisément ce qui pèse aujourd’hui.",
    questions: [
      { id: "reason", label: "Qu’est-ce qui vous amène aujourd’hui ?", type: "text", hint: "Écrivez ce qui vient, sans chercher tout de suite à l’expliquer." },
      { id: "difficulty", label: "Qu’est-ce qui est le plus difficile pour vous dans cette situation ?", type: "text" },
      { id: "intention", label: "À la place de cette difficulté, quelle situation aimeriez-vous vivre ?", type: "text", hint: "Formulez si possible ce que vous souhaitez voir apparaître, plutôt que seulement ce que vous ne voulez plus." },
      { id: "startIntensity", label: "Quelle place cette difficulté prend-elle aujourd’hui ?", type: "scale" }
    ]
  },
  {
    title: "C — Corps & émotions",
    intro: "Accueillir les signaux du corps et les émotions, sans chercher à les expliquer trop vite.",
    questions: [
      { id: "emotions", label: "Lorsque vous pensez à cette situation, qu’est-ce qui apparaît ?", type: "chips", options: ["Colère / agacement", "Tristesse", "Peur", "Anxiété / angoisse", "Culpabilité", "Honte", "Jalousie", "Impuissance", "Confusion", "Autre"] },
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
      { id: "irritation", label: "Chez une personne impliquée, quel comportement ou trait vous touche, vous agace ou vous déstabilise particulièrement ?", type: "text", hint: "Il ne s’agit pas de nier ce que l’autre fait, seulement d’observer ce que cela vient réveiller en vous." },
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
      { id: "beliefAxis", label: "Cette phrase semble surtout limiter…", type: "chips", options: ["Ce que je peux faire", "Ce dont je me crois capable", "Ce que je m’autorise", "Je ne sais pas encore"] },
      { id: "need", label: "Quel besoin important n’est pas suffisamment entendu ?", type: "text" },
      { id: "value", label: "Quelle valeur importante cherchez-vous à préserver dans cette situation ?", type: "text", hint: "Par exemple : respect, liberté, sécurité, famille, justice, authenticité…" }
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
      { id: "currentRhythm", label: "À ce moment de votre évolution, de quoi avez-vous surtout besoin ?", type: "chips", options: ["Agir et construire", "Trier et réajuster", "Faire une pause et me retrouver", "Explorer une nouvelle direction"] },
      { id: "successEvidence", label: "Quel signe concret vous montrera qu’un premier changement est réellement en cours ?", type: "text", hint: "Quelque chose que vous pourrez observer, entendre, ressentir ou faire." },
      { id: "action", label: "Quelle petite action pourrait soutenir ce changement ?", type: "text" },
      { id: "commitment", label: "À quel point vous sentez-vous prêt à réaliser cette action ?", type: "scale" },
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
    { id: "protectionCost", after: "protectionPurpose", label: "Et aujourd’hui, qu’est-ce que cette protection vous coûte ou vous empêche de vivre ?", when: a => hasText(a.protectionPurpose) },
    { id: "shadowResource", after: "irritation", label: "Sans excuser ce qui vous dérange, quelle qualité utile pourrait se cacher derrière ce trait s’il était exprimé avec mesure ?", when: a => hasText(a.irritation) }
  ],
  3: [
    { id: "ruleFear", after: "belief", label: "Que craignez-vous qu’il arrive si vous ne respectez plus cette règle intérieure ?", when: a => containsRule(a.belief) },
    { id: "exception", after: "belief", label: "Pouvez-vous retrouver une exception, même petite, où cela ne s’est pas passé ainsi ?", when: a => containsAbsolute(a.belief) },
    { id: "beliefOrigin", after: "belief", label: "Cette phrase vous appartient-elle vraiment, ou semble-t-elle venir de quelque part ?", when: a => hasText(a.belief) },
    { id: "beliefUsefulness", after: "beliefAxis", label: "Aujourd’hui, cette croyance vous protège-t-elle encore ou vous éloigne-t-elle surtout de ce que vous souhaitez ?", when: a => hasAny(a.beliefAxis) },
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
    { id: "actionAdjustment", after: "commitment", label: "Qu’est-ce qui rendrait cette action plus simple ou plus juste pour vous ?", when: a => a.commitment !== undefined && Number.isFinite(+a.commitment) && +a.commitment < 7 },
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
function containsMindReading(v) { return /\b(il|elle|ils|elles|on) (pense|pensent|croit|croient|veut|veulent|sait|savent|juge|jugent)\b/.test(normalized(v)); }
function containsCauseEffect(v) { return /\b(il|elle|ils|elles|ca|cela) me (rend|fait|force|oblige|empeche)\b/.test(normalized(v)); }
function isNegativeGoal(v) { return /\b(ne plus|plus jamais|arreter de|eviter de|ne pas|moins de)\b/.test(normalized(v)); }

const EMOTION_DEEPENERS = {
  "Colère": {
    id: "angerMessage",
    label: "Quelle limite, règle ou valeur importante vous semble franchie dans cette situation ?"
  },
  "Colère / agacement": {
    id: "angerMessage",
    label: "Quelle limite, règle ou valeur importante vous semble franchie dans cette situation ?"
  },
  "Tristesse": {
    id: "sadnessLoss",
    label: "Qu’est-ce qui semble perdu, terminé ou profondément regretté dans cette situation ?"
  },
  "Peur": {
    id: "fearScenario",
    label: "Quel est le scénario précis que vous redoutez, et quelle part vous paraît réellement probable aujourd’hui ?"
  },
  "Anxiété / angoisse": {
    id: "anxietyConflict",
    label: "Derrière cette anxiété, percevez-vous un danger précis ou deux besoins qui tirent dans des directions opposées ?"
  },
  "Culpabilité": {
    id: "guiltShare",
    label: "Quelle part vous appartient réellement, et quelle part ne dépend pas de vous ?"
  },
  "Honte": {
    id: "shameLook",
    label: "Sous quel regard vous sentez-vous diminué, et qu’aimeriez-vous pouvoir reconnaître de votre valeur malgré ce regard ?"
  },
  "Jalousie": {
    id: "jealousyNeed",
    label: "Sous la jalousie, qu’avez-vous peur de perdre ou de ne pas recevoir : une place, un lien, de la sécurité, de la reconnaissance ?"
  },
  "Impuissance": {
    id: "agencyShare",
    label: "Dans cette situation, qu’est-ce qui dépend de vous, même très peu, et qu’est-ce qui ne dépend pas de vous ?"
  },
  "Confusion": {
    id: "factsAndStory",
    label: "Quels sont les faits certains, puis quelles sont les interprétations ou suppositions qui s’y ajoutent ?"
  }
};

const SIGNALS = [
  {
    id: "confidence", name: "le doute et la légitimité",
    words: ["doute", "confiance", "legitime", "legitimite", "capable", "incapable", "valeur", "niveau", "assez bien", "imposteur", "imposture"],
    question: "Quand le doute apparaît, qu’est-ce qu’il vous fait croire sur votre valeur ou votre capacité ?",
    resource: "vous appuyer sur ce que vous savez déjà faire et avancer sans attendre de vous sentir parfaitement légitime"
  },
  {
    id: "judgment", name: "le regard des autres",
    words: ["jugement", "juge", "regard", "avis", "criti", "moquer", "decevoir", "plaire", "rejet"],
    question: "Qu’est-ce que vous redoutez le plus dans le regard ou la réaction des autres ?",
    resource: "différencier ce qui vous appartient de ce qui appartient au regard extérieur"
  },
  {
    id: "action", name: "le passage à l’action",
    words: ["bloque", "blocage", "lancer", "projet", "commencer", "agir", "avance", "decision", "choisir", "ose", "passer a l action", "procrast"],
    question: "Au moment précis de passer à l’action, quelle pensée, peur ou sensation vous arrête ?",
    resource: "transformer le blocage en un premier mouvement assez petit pour rester possible"
  },
  {
    id: "fear", name: "la peur et l’insécurité",
    words: ["peur", "angoiss", "anxie", "inquiet", "insecur", "danger", "panique", "crainte"],
    question: "De quoi cette peur essaie-t-elle de vous protéger, ici et maintenant ?",
    resource: "retrouver de la sécurité sans laisser la peur décider de toute la suite"
  },
  {
    id: "overload", name: "la fatigue et la surcharge",
    words: ["fatigue", "epuise", "deborde", "charge", "trop", "pression", "stress", "souffle", "reposer"],
    question: "Parmi tout ce que vous portez, qu’est-ce qui ne devrait plus reposer uniquement sur vous ?",
    resource: "alléger, prioriser et reconnaître vos limites avant l’épuisement"
  },
  {
    id: "relationship", name: "la relation et la place de chacun",
    words: ["couple", "relation", "famille", "mere", "pere", "enfant", "ami", "collegue", "conflit", "dispute", "seul", "solitude"],
    question: "Dans cette relation, qu’auriez-vous besoin de pouvoir dire, demander ou poser plus clairement ?",
    resource: "rester en lien sans vous éloigner de ce qui est juste pour vous"
  },
  {
    id: "boundaries", name: "les limites et la place",
    words: ["limite", "place", "envahi", "non", "respect", "sacrif", "adapte", "tais", "silence", "priorite"],
    question: "Quelle limite ou quelle place aurait besoin d’être reconnue dans cette situation ?",
    resource: "prendre votre place avec justesse, sans devoir vous effacer ni vous durcir"
  },
  {
    id: "loss", name: "la perte et la séparation",
    words: ["deuil", "mort", "decede", "perdu", "perte", "separation", "rupture", "manque", "absence", "quitte"],
    question: "Qu’est-ce qui vous manque le plus aujourd’hui dans ce lien, cette présence ou cette période de votre vie ?",
    resource: "honorer ce qui compte encore tout en laissant une nouvelle forme de lien ou d’élan devenir possible"
  }
];

function signalText(a = state.answers) {
  return normalized([a.reason, a.difficulty, a.intention, a.emotionWords, a.immediateNeed, a.triggers, a.belief, a.need].filter(Boolean).join(" "));
}

function detectedSignals(a = state.answers) {
  const haystack = signalText(a);
  return SIGNALS.map((signal, order) => ({
    ...signal,
    order,
    score: signal.words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0)
  })).filter(signal => signal.score > 0).sort((a, b) => b.score - a.score || a.order - b.order);
}

function leadingSignal(a = state.answers) {
  return detectedSignals(a)[0] || null;
}

function allAnswerText(a = state.answers) {
  return normalized(Object.values(a || {}).flatMap(value => Array.isArray(value) ? value : [value]).filter(value => typeof value === "string").join(" "));
}

function severeDistressDetected(a = state.answers) {
  const text = allAnswerText(a);
  return [
    /\bje (?:veux|vais) (?:me )?(?:suicider|tuer)\b/,
    /\b(?:envie|intention) d en finir\b/,
    /\bje ne veux plus vivre\b/,
    /\bje veux mourir\b/,
    /\bje suis en danger immediat\b/
  ].some(pattern => pattern.test(text));
}

function partsConflict(a = state.answers) {
  const text = allAnswerText(a);
  const pairs = [
    { first: "la liberté ou le changement", second: "la sécurité ou la stabilité", left: ["liberte", "etre libre", "quitter", "changer de metier", "reconversion", "me lancer", "nouveau projet", "autonomie", "independance"], right: ["securite", "stabilite", "revenu stable", "revenu regulier", "salaire", "peur de perdre", "credit", "emprunt", "charges", "trois enfants", "mes enfants", "risque financier"] },
    { first: "le repos ou le ralentissement", second: "l’obligation, la responsabilité ou le devoir d’avancer", left: ["repos", "me reposer", "souffler", "faire une pause", "ralentir", "lever le pied"], right: ["culpabil", "je dois", "obligation", "responsabilite", "productif", "travailler", "laisser tomber", "comptent sur moi", "tout le monde", "m occuper de"] },
    { first: "le besoin d’être entendu ou de vous exprimer", second: "la protection du lien ou l’évitement du conflit", left: ["etre entendu", "m exprimer", "dire ce que je pense", "prendre la parole", "faire entendre", "oser dire"], right: ["me tais", "silence", "eviter le conflit", "eviter une dispute", "dispute", "peur du conflit", "ne pas blesser", "preserver le lien", "se facher"] }
  ];
  return pairs.find(pair => pair.left.some(word => text.includes(word)) && pair.right.some(word => text.includes(word))) || null;
}

function canDeepenFear(value, level) {
  const text = normalized(textValue(value));
  if (!text || ["je ne sais pas", "aucune idee", "rien", "stop", "je prefere arreter"].some(answer => text === answer)) return false;
  const words = text.split(/\s+/).filter(Boolean);
  const minimumWords = level <= 1 ? 4 : level === 2 ? 6 : 8;
  return words.length >= minimumWords;
}

function personalizedDeepeners(stepIndex) {
  const signal = leadingSignal();
  const questions = [];

  if (stepIndex === 0 && signal && hasText(state.answers.reason)) {
    questions.push({
      id: `signal_${signal.id}`,
      after: "reason",
      label: signal.question,
      type: "text",
      adaptive: true,
      personalized: true,
      signal: signal.id
    });
  }

  if (stepIndex === 0) {
    const firstWords = [state.answers.reason, state.answers.difficulty].filter(Boolean).join(" ");
    if (containsAbsolute(firstWords)) {
      questions.push({ id: "languageException", after: hasText(state.answers.difficulty) ? "difficulty" : "reason", label: "Vous employez un mot très général comme « toujours », « jamais » ou « personne ». Existe-t-il une exception, même petite ?", type: "text", adaptive: true, personalized: true, languageProbe: true });
    } else if (containsMindReading(firstWords)) {
      questions.push({ id: "languageEvidence", after: hasText(state.answers.difficulty) ? "difficulty" : "reason", label: "Quels faits observables vous font penser que l’autre pense, veut ou juge cela ?", type: "text", adaptive: true, personalized: true, languageProbe: true });
    } else if (containsCauseEffect(firstWords)) {
      questions.push({ id: "languageAgency", after: hasText(state.answers.difficulty) ? "difficulty" : "reason", label: "Entre ce que l’autre fait et ce que vous ressentez, quelle interprétation ou pensée apparaît en vous ?", type: "text", adaptive: true, personalized: true, languageProbe: true });
    }

    if (isNegativeGoal(state.answers.intention)) {
      questions.push({ id: "positiveOutcome", after: "intention", label: "Si vous ne viviez plus cela, que voudriez-vous vivre, ressentir ou faire précisément à la place ?", type: "text", adaptive: true, personalized: true, languageProbe: true });
    } else if (hasText(state.answers.intention)) {
      questions.push({ id: "resultMeaning", after: "intention", label: "Si cette situation souhaitée devenait réelle, qu’est-ce que cela vous apporterait d’important ?", type: "text", adaptive: true, personalized: true, languageProbe: true });
    }
  }

  if (stepIndex === 3 && signal && hasText(state.answers.coreWord)) {
    questions.push({
      id: `signalNeed_${signal.id}`,
      after: "coreWord",
      label: `En lien avec ${signal.name}, qu’est-ce que vous cherchez surtout à préserver ou à retrouver ?`,
      type: "text",
      adaptive: true,
      personalized: true,
      signal: signal.id
    });
  }

  if (stepIndex === 0 && hasText(state.answers.intention)) {
    const outcomeQuestion = questions.find(q => q.id === "positiveOutcome" || q.id === "resultMeaning");
    return [questions.find(q => q.id.startsWith("signal_")), outcomeQuestion].filter(Boolean);
  }

  if (stepIndex === 1) {
    const selectedEmotion = (state.answers.emotions || []).find(item => EMOTION_DEEPENERS[item]);
    if (selectedEmotion) {
      const deepener = EMOTION_DEEPENERS[selectedEmotion];
      questions.push({
        ...deepener,
        after: "emotions",
        type: "text",
        adaptive: true,
        personalized: true,
        emotionProbe: true
      });
    }
    if (hasAny(state.answers.body)) {
      questions.push({
        id: "bodySignal",
        after: "body",
        label: "Quand vous restez quelques instants avec cette sensation, qu’est-ce qui l’intensifie, l’apaise ou cherche à se mettre en mouvement ?",
        type: "text",
        adaptive: true,
        personalized: true,
        bodyProbe: true
      });
    }

    const fearIsCentral = includesAny(state.answers.emotions, ["Peur", "Anxiété / angoisse"]) || leadingSignal()?.id === "fear";
    if (fearIsCentral && hasText(state.answers.fearScenario)) {
      const fearQuestions = [];
      fearQuestions.push({
        id: "fearImplication1",
        after: "fearScenario",
        label: "Si cela arrivait, qu’est-ce que cela impliquerait pour vous ?",
        hint: "Vous pouvez laisser cette question sans réponse pour arrêter l’approfondissement.",
        type: "text", adaptive: true, personalized: true, fearProbe: true
      });
      let lastId = "fearImplication1";
      for (let level = 1; level < 4; level++) {
        const currentId = `fearImplication${level}`;
        if (!hasText(state.answers[currentId]) || !canDeepenFear(state.answers[currentId], level)) break;
        const nextId = `fearImplication${level + 1}`;
        fearQuestions.push({
          id: nextId,
          after: currentId,
          label: level === 1 ? "Et si cette conséquence se produisait, qu’est-ce que cela impliquerait pour vous ?" : "Si vous suivez encore cette conséquence, qu’est-ce qu’elle impliquerait pour vous ?",
          hint: "Continuez seulement si cette question vous paraît utile ; vous pouvez vous arrêter.",
          type: "text", adaptive: true, personalized: true, fearProbe: true
        });
        lastId = nextId;
      }
      if (hasText(state.answers[lastId])) fearQuestions.push({
        id: "fearCore",
        after: lastId,
        label: "En regardant ce chemin, quel semble être l’enjeu le plus profond pour vous ?",
        type: "text", adaptive: true, personalized: true, fearProbe: true
      });
      questions.push(...fearQuestions);
    }
  }

  if (stepIndex === 3) {
    const conflict = partsConflict();
    if (conflict && hasText(state.answers.need)) {
      questions.push({
        id: "partsDialogue",
        after: "need",
        label: `Deux élans semblent présents : ${conflict.first}, et ${conflict.second}. Que veut la première partie, que cherche à protéger l’autre, et de quoi chacune aurait-elle besoin ?`,
        type: "text", adaptive: true, personalized: true, partsProbe: true
      });
      if (hasText(state.answers.partsDialogue)) questions.push({
        id: "partsMovement",
        after: "partsDialogue",
        label: "Quel petit mouvement pourrait respecter ces deux parties, sans forcer l’une à faire taire l’autre ?",
        type: "text", adaptive: true, personalized: true, partsProbe: true
      });
    }
  }

  if (stepIndex === 2 && hasText(state.answers.irritation)) {
    questions.push({
      id: "otherShould",
      after: "irritation",
      label: "Dans cette situation, que pensez-vous que cette personne devrait faire ou ne plus faire ?",
      type: "text",
      adaptive: true,
      personalized: true,
      projectionProbe: true
    });
    if (hasText(state.answers.otherShould)) {
      questions.push({
        id: "selfReturn",
        after: "otherShould",
        label: "Sans excuser l’autre ni nier vos limites, quelle part de cette demande pourriez-vous vous offrir à vous-même, exprimer clairement ou remettre à sa juste place ?",
        type: "text",
        adaptive: true,
        personalized: true,
        projectionProbe: true
      });
    }
  }

  if (stepIndex === 1 && questions.some(q => q.fearProbe)) return questions.filter(q => q.emotionProbe || q.fearProbe || q.bodyProbe);
  if (stepIndex === 3 && questions.some(q => q.partsProbe)) return questions.filter(q => q.partsProbe || q.id.startsWith("signalNeed_"));
  return questions.slice(0, 2);
}

function activeQuestions(stepIndex) {
  const base = STEPS[stepIndex].questions;
  const tailored = personalizedDeepeners(stepIndex);
  const genericLimit = Math.max(0, 2 - tailored.length);
  const generic = (DEEPENERS[stepIndex] || []).filter(q => q.when(state.answers)).slice(0, genericLimit).map(q => ({ ...q, type: "text", adaptive: true }));
  const eligible = [...tailored, ...generic];
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
const HISTORY_KEY = "dads-eclat-history-v1";
let state = freshState();
let history = [];

function freshState() {
  return {
    id: `eclat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    step: 0,
    question: 0,
    feedback: false,
    name: "",
    answers: {},
    startedAt: new Date().toISOString(),
    updatedAt: null,
    completedAt: null
  };
}

const $ = s => document.querySelector(s);
const welcome = $("#welcome"), session = $("#session"), summary = $("#summary"), stepContent = $("#stepContent");

function load() {
  try {
    history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    if (!Array.isArray(history)) history = [];
    const saved = localStorage.getItem(KEY);
    if (saved) {
      state = { ...state, ...JSON.parse(saved) };
      $("#resumeSession").hidden = false;
    }
    renderJourneyPanel();
  } catch (e) {
    console.warn(e);
  }
}

function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn(e);
  }
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function sessionTheme(item) {
  const signal = detectedSignals(item.answers || {})[0];
  return signal ? signal.name : (item.answers?.coreWord || "un thème à préciser");
}

function evolutionLabel(start, end) {
  if (!Number.isFinite(+start) || !Number.isFinite(+end)) return "Évolution non mesurée";
  const delta = +start - +end;
  if (delta >= 3) return `Apaisement marqué · −${delta} points`;
  if (delta > 0) return `Apaisement amorcé · −${delta} point${delta > 1 ? "s" : ""}`;
  if (delta === 0) return "Intensité stable · observation à poursuivre";
  return `Intensité encore présente · +${Math.abs(delta)} point${Math.abs(delta) > 1 ? "s" : ""}`;
}

function renderJourneyPanel(forceOpen = false) {
  const panel = $("#journeyPanel");
  if (!panel) return;
  if (!history.length) {
    panel.hidden = !forceOpen;
    panel.innerHTML = `<p class="journey-empty"><strong>Votre évolution commencera ici.</strong><br>Après votre premier parcours terminé, vous retrouverez vos prises de conscience, vos actions et les changements observés.</p>`;
    return;
  }

  panel.hidden = false;
  const ordered = [...history].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const latest = ordered[0];
  const completedActions = ordered.filter(item => item.actionCompletedAt).length;
  const intensities = ordered.filter(item => Number.isFinite(+item.answers?.startIntensity) && Number.isFinite(+item.answers?.endIntensity));
  const totalRelief = intensities.reduce((sum, item) => sum + Math.max(0, +item.answers.startIntensity - +item.answers.endIntensity), 0);

  panel.innerHTML = `
    <div class="journey-heading">
      <div><p class="eyebrow">Votre chemin dans le temps</p><h2>Mon évolution</h2></div>
      <span class="journey-count">${history.length} parcours terminé${history.length > 1 ? "s" : ""}</span>
    </div>
    <div class="journey-stats">
      <div><strong>${history.length}</strong><span>bilans conservés</span></div>
      <div><strong>${completedActions}</strong><span>actions réalisées</span></div>
      <div><strong>${totalRelief}</strong><span>points d’apaisement cumulés</span></div>
    </div>
    ${latest.answers?.action ? `<div class="next-step-card">
      <small>Votre petit pas actuel</small>
      <p>${escapeHtml(latest.answers.action)}</p>
      ${latest.actionCompletedAt
        ? `<span class="action-done">✓ Réalisé le ${formatDate(latest.actionCompletedAt)}</span>`
        : `<button type="button" class="secondary compact" data-complete-action="${escapeHtml(latest.id)}">Marquer comme réalisé</button>`}
    </div>` : ""}
    <div class="journey-timeline">
      ${ordered.slice(0, 6).map((item, index) => `
        <article class="timeline-item">
          <span class="timeline-dot">${ordered.length - index}</span>
          <div><small>${formatDate(item.completedAt)}</small><h3>${escapeHtml(sessionTheme(item))}</h3>
          <p>${escapeHtml(evolutionLabel(item.answers?.startIntensity, item.answers?.endIntensity))}</p>
          ${item.conclusion?.point
            ? `<blockquote>Point ÉCLAT : « ${escapeHtml(shortAnswer(item.conclusion.point, 150))} »</blockquote>`
            : item.answers?.takeaway ? `<blockquote>« ${escapeHtml(shortAnswer(item.answers.takeaway, 120))} »</blockquote>` : ""}</div>
        </article>`).join("")}
    </div>`;

  panel.querySelectorAll("[data-complete-action]").forEach(button => {
    button.onclick = () => {
      const item = history.find(entry => entry.id === button.dataset.completeAction);
      if (!item) return;
      item.actionCompletedAt = new Date().toISOString();
      saveHistory();
      renderJourneyPanel(true);
    };
  });
}

function archiveCompletedSession() {
  state.completedAt = state.completedAt || new Date().toISOString();
  const snapshot = JSON.parse(JSON.stringify(state));
  const existing = history.findIndex(item => item.id === snapshot.id);
  if (existing >= 0) history[existing] = { ...history[existing], ...snapshot };
  else history.push(snapshot);
  saveHistory();
  save();
  renderJourneyPanel();
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

function shortAnswer(value, max = 150) {
  const clean = textValue(value).replace(/\s+/g, " ").trim().replace(/[.!?…]+$/u, "");
  if (!clean) return "";
  return clean.length > max ? `${clean.slice(0, max - 1).trim()}…` : clean;
}

function isVagueAnswer(value) {
  const clean = normalized(value).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  return !clean || /^(je ne sais pas|je sais pas|jsp|aucune idee|pas d idee|rien|aucun|aucune|neant|bof|oui|non|peut etre|autre)$/.test(clean);
}

function firstMeaningful(...values) {
  return values
    .map(value => textValue(value).replace(/\s+/g, " ").trim())
    .find(value => value.length >= 3 && !isVagueAnswer(value)) || "";
}

function embeddedAnswer(value, max = 150) {
  const clean = shortAnswer(value, max);
  return clean ? clean.charAt(0).toLocaleLowerCase("fr") + clean.slice(1) : "";
}

function conclusionTheme(a) {
  const themes = Array.isArray(a.themes) ? a.themes : [];
  const priorities = [
    [["Manque de place", "Silence", "Non-choix", "Injustice"], "les limites et la place"],
    [["Insécurité"], "la peur et l’insécurité"],
    [["Dévalorisation"], "le doute et la légitimité"],
    [["Abandon", "Séparation", "Rejet"], "la perte, le lien et la séparation"],
    [["Impuissance"], "le pouvoir d’agir"]
  ];
  const selected = priorities.find(([labels]) => labels.some(label => themes.includes(label)));
  return selected?.[1] || leadingSignal(a)?.name || firstMeaningful(a.coreWord) || "votre situation actuelle";
}

function protectionMeaning(value) {
  const map = {
    "Je fuis": "éviter d’être à nouveau atteint ou débordé",
    "Je contrôle": "réduire l’incertitude et retrouver une sensation de sécurité",
    "Je me tais": "préserver le lien ou éviter le conflit",
    "Je m’adapte": "rester accepté et ne pas risquer de décevoir",
    "Je me défends": "protéger votre valeur, votre place ou vos limites",
    "Je me coupe de mes émotions": "continuer à avancer sans être submergé",
    "Autre": "vous protéger d’une conséquence qui vous paraît difficile"
  };
  const selected = Array.isArray(value) ? value[0] : value;
  return map[selected] || "vous protéger avec les moyens disponibles à ce moment-là";
}

function beliefReframe(a) {
  const belief = firstMeaningful(a.belief);
  const need = firstMeaningful(a.need, a.immediateNeed, a.pastNeed);
  const choice = firstMeaningful(a.newChoice, a.opposite, a.positiveOutcome, a.intention);
  if (!belief) return "";
  if (containsRule(belief)) {
    const direction = choice ? `vous donner progressivement la permission de choisir ceci : « ${shortAnswer(choice, 110)} »` : need ? `respecter davantage votre besoin de ${shortAnswer(need, 90)}` : "vérifier si elle correspond encore à la situation présente";
    return `La règle « ${shortAnswer(belief, 95)} » a peut-être eu une fonction protectrice. Elle peut aujourd’hui devenir un guide plus souple : ${direction}, selon la situation.`;
  }
  if (containsAbsolute(belief)) return `La phrase « ${shortAnswer(belief, 95)} » ressemble à une conclusion devenue générale. Les exceptions et les petits changements peuvent vous aider à construire une lecture plus souple et plus juste.`;
  return `La pensée « ${shortAnswer(belief, 95)} » n’est pas nécessairement une vérité sur vous. Elle peut être une ancienne interprétation, à confronter désormais à ce que vous vivez et choisissez aujourd’hui.`;
}

function emotionReading(a) {
  const emotions = Array.isArray(a.emotions) ? a.emotions.filter(item => item !== "Autre") : [];
  const meanings = {
    "Colère": "une limite, une valeur ou une place qui demande à être regardée",
    "Colère / agacement": "une limite, une valeur ou une place qui demande à être regardée",
    "Tristesse": "une perte, une fin ou une transition qui demande à être reconnue",
    "Peur": "un danger possible, un manque de préparation ou un besoin de sécurité",
    "Anxiété / angoisse": "une incertitude, une anticipation ou un conflit intérieur qui demande davantage de sécurité et de clarté",
    "Culpabilité": "un conflit possible entre vos actes, vos règles intérieures et ce qui compte pour vous",
    "Honte": "une peur d’être diminué ou rejeté dans le regard de l’autre",
    "Jalousie": "une peur possible de perdre une place, un lien, une sécurité ou une reconnaissance",
    "Impuissance": "un besoin de distinguer ce qui dépend de vous de ce qui ne dépend pas de vous",
    "Confusion": "un besoin de ralentir, de séparer les faits des interprétations et de retrouver un premier repère"
  };
  const signals = emotions.map(item => meanings[item]).filter(Boolean);
  if (!signals.length) return "";
  return `L’émotion nommée peut être considérée comme un signal plutôt que comme un problème à supprimer. Elle pourrait indiquer ${signals.slice(0, 2).join(" ; ou encore ")}. Cette piste reste à vérifier dans votre situation concrète.`;
}

function bodyReading(a) {
  const zones = Array.isArray(a.body) ? a.body.filter(item => item !== "Je ne sais pas") : [];
  const detail = firstMeaningful(a.bodySignal, a.nowBody);
  if (!zones.length && !detail) return "";
  const zoneNames = {
    "Tête": "la tête", "Gorge": "la gorge", "Poitrine": "la poitrine", "Ventre": "le ventre",
    "Dos": "le dos", "Épaules": "les épaules", "Bras / mains": "les bras ou les mains",
    "Jambes": "les jambes", "Partout": "l’ensemble du corps"
  };
  const namedZones = zones.slice(0, 2).map(zone => zoneNames[zone] || zone.toLocaleLowerCase("fr"));
  const location = namedZones.length ? `Vous avez réellement perçu quelque chose dans ${namedZones.join(" et ")}. ` : "";
  const evolution = detail ? `Vous précisez : « ${shortAnswer(detail, 145)} ». ` : "";
  return `${location}${evolution}La sensation corporelle est une information réelle de votre expérience présente ; le sens qu’on lui donne reste toutefois une hypothèse à vérifier, pas une vérité automatique sur sa cause.`;
}

function projectionReading(a) {
  const irritation = firstMeaningful(a.irritation);
  const demand = firstMeaningful(a.otherShould);
  const returnToSelf = firstMeaningful(a.selfReturn, a.shadowResource);
  if (!irritation) return "";
  let text = `Le trait qui vous atteint chez l’autre — « ${shortAnswer(irritation, 105)} » — peut signaler une limite réellement franchie, mais aussi toucher une qualité, une permission ou une blessure qui vous concerne personnellement.`;
  if (demand) text += ` Votre attente — « ${shortAnswer(demand, 115)} » — aide à distinguer ce que vous pouvez demander à l’autre de ce que vous pouvez commencer à poser pour vous-même.`;
  if (returnToSelf) text += ` Vous avez déjà formulé ce retour vers vous : « ${shortAnswer(returnToSelf, 125)} ».`;
  return text;
}

function rhythmReading(value) {
  const choices = Array.isArray(value) ? value : [value];
  const map = {
    "Agir et construire": "Votre rythme actuel semble orienté vers l’action : clarifiez une priorité et protégez aussi des temps de récupération.",
    "Trier et réajuster": "Votre rythme actuel semble demander du tri : distinguez ce qui fonctionne encore, ce qui doit être ajusté et ce que vous ne voulez plus porter.",
    "Faire une pause et me retrouver": "Votre rythme actuel semble demander une pause utile : retrouver vos besoins et vos valeurs peut être plus juste que vous forcer à produire immédiatement une nouvelle réponse.",
    "Explorer une nouvelle direction": "Votre rythme actuel semble ouvert à l’exploration : testez une possibilité à petite échelle avant d’en faire une décision définitive."
  };
  return choices.map(choice => map[choice]).filter(Boolean).join(" ");
}

function tensionReading(a) {
  const conflict = partsConflict(a);
  if (!conflict) return "";
  const exploration = firstMeaningful(a.partsDialogue);
  const movement = firstMeaningful(a.partsMovement);
  let text = `Il semble qu’une tension soit présente entre ${conflict.first} et ${conflict.second}. Ce n’est pas forcément une contradiction à résoudre en choisissant un camp : une piste pourrait être d’écouter ce que chaque élan veut rendre possible ou protéger.`;
  if (exploration) text += ` Vous la formulez ainsi : « ${shortAnswer(exploration, 150)} ».`;
  if (movement) text += ` Le mouvement qui pourrait respecter les deux serait : « ${shortAnswer(movement, 140)} ».`;
  return text;
}

function buildConclusion(a) {
  const theme = conclusionTheme(a);
  const protection = firstMeaningful(a.protection);
  const protectionGoal = firstMeaningful(a.protectionPurpose) || (protection ? protectionMeaning(a.protection) : "");
  const cost = firstMeaningful(a.protectionCost, a.heldBack);
  const need = firstMeaningful(a.need, a.deepNeed, a.immediateNeed, a.pastNeed);
  const value = firstMeaningful(a.value);
  const resource = firstMeaningful(a.quality, a.choiceResource, a.sensitivity, a.offering);
  const choice = firstMeaningful(a.newChoice, a.opposite, a.positiveOutcome, a.intention);
  const action = firstMeaningful(a.actionSmall, a.action);
  const opening = firstMeaningful(a.reason, a.difficulty);
  const evidence = [opening, protection || protectionGoal, cost, firstMeaningful(a.belief), need || value, resource, choice || action].filter(Boolean);
  const insufficient = evidence.length < 4;

  if (insufficient) {
    return {
      theme,
      insufficient: true,
      evidenceCount: evidence.length,
      observation: opening
        ? `Vous avez nommé ce point de départ : « ${shortAnswer(opening, 160)} ». Il n’y a pas encore assez d’éléments précis pour en déduire un mécanisme fiable.`
        : "Vos réponses ne contiennent pas encore assez d’éléments précis pour proposer une lecture fidèle de votre situation.",
      mechanism: "",
      implication: "",
      emotion: "",
      body: "",
      belief: "",
      shadow: "",
      projection: "",
      rhythm: "",
      awareness: "Ne pas forcer une interprétation est déjà une forme de justesse : la prochaine étape consiste à observer un exemple concret.",
      point: "Je peux prendre le temps de préciser ce que je vis, sans accepter une conclusion qui ne me ressemble pas.",
      action: "",
      followUps: [
        "Que faites-vous habituellement quand cette situation se présente ?",
        "Qu’essayez-vous d’éviter ou de protéger à ce moment-là ?",
        "Qu’est-ce que cette réaction vous coûte aujourd’hui ?"
      ],
      createdAt: new Date().toISOString()
    };
  }

  const observation = opening
    ? `Vous êtes arrivé avec une situation formulée ainsi : « ${shortAnswer(opening, 160)} ». Dans l’ensemble de vos réponses, le fil qui ressort le plus concerne ${theme}.`
    : `Dans l’ensemble de vos réponses, le fil qui ressort le plus concerne ${theme}.`;

  const mechanism = protection
    ? `Face à ce qui vous touche, vous dites réagir ainsi : « ${shortAnswer(protection, 90)} ». ${protectionGoal ? `Ce fonctionnement semble chercher à ${embeddedAnswer(protectionGoal, 130)}. ` : ""}Il ne dit pas qui vous êtes : il décrit une stratégie devenue familière.`
    : protectionGoal ? `Vous indiquez que votre réaction cherche à ${embeddedAnswer(protectionGoal, 130)}. Cette fonction protectrice mérite d’être vérifiée à partir de situations concrètes.` : "";

  const implication = cost
    ? `Aujourd’hui, cette protection semble aussi avoir un coût : « ${shortAnswer(cost, 155)} ». La prise de conscience centrale est que ce qui vous a aidé à un moment peut maintenant limiter ce que vous souhaitez vivre.`
    : "";

  const shadow = resource
    ? `Derrière la difficulté apparaît aussi une ressource : ${embeddedAnswer(resource)}. Ce n’est pas le problème qui crée cette qualité ; votre parcours montre plutôt qu’elle était déjà là et qu’elle demande maintenant à être utilisée aussi pour vous.`
    : need
      ? `Ce qui semble chercher à reprendre sa place n’est pas seulement la disparition du problème, mais votre besoin de ${embeddedAnswer(need)}. L’entendre peut vous aider à choisir autrement sans rejeter la partie de vous qui a voulu vous protéger.`
      : "";

  const awareness = need
    ? `Votre point de conscience : vous n’avez peut-être pas seulement besoin de changer la situation ; vous avez besoin de reconnaître et d’honorer ${embeddedAnswer(need)}${value ? `, en restant fidèle à votre valeur de ${embeddedAnswer(value)}` : ""}.`
    : value
      ? `Votre point de conscience : votre prochain choix peut être évalué à partir de cette valeur que vous avez nommée — ${shortAnswer(value)}.`
    : `Votre point de conscience : le changement ne consiste pas à supprimer une partie de vous, mais à comprendre ce qu’elle protège afin de retrouver davantage de choix.`;

  const point = choice
    ? `Je peux reconnaître ce qui m’a protégé, sans le laisser décider à ma place, et commencer à ${embeddedAnswer(choice)}.`
    : resource
      ? `Je peux reconnaître ce qui m’a protégé et m’appuyer maintenant sur ${embeddedAnswer(resource)}.`
      : `Je peux accueillir ce que je comprends aujourd’hui et choisir un premier mouvement plus juste pour moi.`;

  const emotions = Array.isArray(a.emotions) ? a.emotions.filter(item => item !== "Autre").slice(0, 2).join(" et ") : "";
  const felt = firstMeaningful(a.emotionWords) || emotions;
  const body = Array.isArray(a.body) ? a.body.filter(item => item !== "Je ne sais pas").slice(0, 2).join(" et ") : firstMeaningful(a.body);
  const trigger = firstMeaningful(a.triggers);
  const belief = firstMeaningful(a.belief);
  const fearCore = firstMeaningful(a.fearCore, a.fearImplication4, a.fearImplication3, a.fearImplication2, a.fearImplication1);
  const narrative = [
    `${opening ? `Vous partez de « ${shortAnswer(opening, 155)} »` : "Vous avez décrit une situation qui compte pour vous"}${trigger ? `, qui semble notamment se réactiver lorsque « ${shortAnswer(trigger, 115)} »` : ""}. ${felt ? `Vous y associez « ${shortAnswer(felt, 105)} »` : "Vous avez pris le temps d’observer ce qui se présente"}${body ? `, avec un écho dans ${body.toLocaleLowerCase("fr")}` : ""}. Ces éléments rapprochent la situation, l’émotion et le corps sans prétendre expliquer automatiquement leur cause.`,
    `${protection ? `Quand cela arrive, vous dites : « ${shortAnswer(protection, 90)} »` : "Une manière de vous protéger apparaît dans vos réponses"}. ${protectionGoal ? `Il semble que cette réaction cherche à ${embeddedAnswer(protectionGoal, 125)}.` : ""}${cost ? ` En même temps, vous constatez ce coût : « ${shortAnswer(cost, 145)} ».` : ""}${belief ? ` La phrase intérieure « ${shortAnswer(belief, 105)} » pourrait contribuer à maintenir ce mouvement ; elle reste une hypothèse à vérifier, et non une vérité sur vous.` : ""}${fearCore ? ` En suivant le chemin de la peur, l’enjeu que vos mots font apparaître est « ${shortAnswer(fearCore, 130)} ».` : ""} ${tensionReading(a)}`.trim(),
    `${need ? `Sous cette protection, vous nommez un besoin de ${embeddedAnswer(need, 110)}` : "Votre exploration ouvre un besoin à préciser"}${value ? ` et une valeur importante : ${embeddedAnswer(value, 90)}` : ""}. ${resource ? `Vous disposez déjà de cette ressource : ${embeddedAnswer(resource, 115)}.` : ""}${choice ? ` Une piste pourrait être de vous en servir pour « ${shortAnswer(choice, 125)} »` : ""}${action ? `, en commençant par « ${shortAnswer(action, 125)} »` : ""}. Si cela résonne pour vous, le nouveau choix n’aurait donc pas à nier ce qui vous protège, mais à lui offrir une réponse plus ajustée à ce dont vous avez besoin aujourd’hui.`
  ];

  return {
    theme,
    insufficient: false,
    evidenceCount: evidence.length,
    observation,
    mechanism,
    implication,
    emotion: emotionReading(a),
    body: bodyReading(a),
    belief: beliefReframe(a),
    shadow,
    projection: projectionReading(a),
    rhythm: rhythmReading(a.currentRhythm),
    narrative,
    awareness,
    point,
    action: action || firstMeaningful(a.successEvidence),
    createdAt: new Date().toISOString()
  };
}

function guideReaction(q) {
  const v = answerText(q);
  if (!v) return "Vous avez choisi de ne pas répondre. C’est possible : gardez seulement ce qui vous paraît utile.";

  if (q.id === "resultMeaning") return "Vous venez de préciser ce que le changement représente réellement pour vous, au-delà du premier objectif formulé.";
  if (q.id === "positiveOutcome") return "Votre souhait est maintenant formulé comme une direction à construire, et pas uniquement comme une difficulté à faire disparaître.";

  if (q.personalized) {
    if (q.fearProbe) return "Vous approfondissez la peur à votre rythme. Vous pouvez arrêter ce chemin à tout moment et garder seulement ce qui vous paraît juste.";
    if (q.partsProbe) return "Vous donnez une place aux deux élans sans décider que l’un a raison contre l’autre.";
    if (q.emotionProbe) return "Vous explorez le message possible de l’émotion sans en faire une vérité automatique. Gardez seulement ce qui correspond réellement à votre situation.";
    if (q.bodyProbe) return "Ce que votre corps ressent est réel dans l’instant. Son origine et sa signification restent à explorer avec prudence, à partir de votre contexte.";
    if (q.projectionProbe) return "Cette question ne retire rien à la responsabilité de l’autre. Elle vous aide à séparer la limite à poser de ce que la situation vient réveiller en vous.";
    if (q.languageProbe) return "Cette précision aide à distinguer les faits, les interprétations et les règles intérieures. Vous pouvez ainsi retrouver davantage de choix.";
    const signal = SIGNALS.find(item => item.id === q.signal);
    return signal
      ? `Votre réponse précise une piste autour de <strong>${escapeHtml(signal.name)}</strong>. Ce n’est pas une conclusion sur vous : c’est un fil que vous pourrez confirmer, nuancer ou laisser de côté.`
      : "Votre réponse vient préciser le fil qui se dessine, tout en vous laissant libre de l’ajuster.";
  }
  
  if (q.id === "startIntensity" && +v >= 8) return "Cette situation semble prendre beaucoup de place. Avancez doucement, sans chercher à tout résoudre aujourd’hui.";
  if (q.id === "emotions") return `Vous reconnaissez ${escapeHtml(v.toLowerCase())}. Nommer ce qui est là permet déjà de sortir un peu de la confusion.`;
  if (q.id === "body") return `Votre corps attire votre attention vers ${escapeHtml(v.toLowerCase())}. Respirez tranquillement et observez cette zone sans la forcer à changer.`;
  if (["immediateNeed", "pastNeed", "need"].includes(q.id)) return `Le besoin que vous nommez — <strong>${escapeHtml(v)}</strong> — devient un repère important pour la suite.`;
  if (q.id === "recurrence" && v !== "Situation isolée") return "Le fait que cela revienne peut signaler un fonctionnement de protection devenu familier. Observons-le sans chercher de coupable.";
  if (q.id === "protection") return `Cette réaction — <strong>${escapeHtml(v)}</strong> — a probablement essayé de vous protéger. Voyons maintenant si elle vous convient encore.`;
  if (q.id === "belief") return "Cette phrase intérieure n’est pas une vérité sur vous. Elle peut être une ancienne conclusion que vous pouvez regarder avec plus de recul.";
  if (q.id === "shadowResource") return "Vous explorez ici une polarité, sans nier les faits ni vous attribuer ce qui appartient à l’autre. Gardez seulement la qualité qui vous paraît juste et utile.";
  if (q.id === "beliefAxis") return "Vous repérez si cette croyance agit surtout sur votre pouvoir d’agir, votre sentiment de capacité ou votre permission intérieure.";
  if (q.id === "beliefUsefulness") return "Une croyance peut avoir été protectrice et devenir limitante. Observer son effet actuel permet de choisir avec plus de conscience.";
  if (q.id === "successEvidence") return "Ce signe concret vous permettra de reconnaître le changement dans la réalité, et pas seulement dans l’intention.";
  if (q.id === "commitment") return +v >= 7 ? "Votre niveau d’engagement semble suffisant pour tester ce premier pas." : "Votre engagement mérite peut-être un ajustement : une action plus petite ou plus personnelle sera souvent plus durable.";
  if (q.id === "actionAdjustment") return "Vous adaptez l’action à votre réalité. Un pas simple et réalisable vaut mieux qu’un engagement idéal impossible à tenir.";
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

  $("#nextBtn").style.display = "";
  if (severeDistressDetected()) {
    $("#stepNumber").textContent = "Pause — priorité à votre sécurité";
    $("#progressBar").style.width = "100%";
    stepContent.innerHTML = `
      <div class="conversation">
        <div class="pause-box">
          <span>♡</span>
          <div><b>ÉCLAT s’arrête ici pour ne pas pousser l’introspection.</b><br>Ce que vous avez écrit appelle un soutien humain immédiat. Ne restez pas seul·e : contactez maintenant une personne de confiance, un professionnel, ou les urgences (15 ou 112 en France ; le numéro d’urgence local si vous êtes ailleurs). Si vous êtes en danger, éloignez-vous de tout moyen de vous faire du mal et allez vers une personne ou un lieu sûr.</div>
        </div>
      </div>`;
    $("#previousBtn").style.visibility = "visible";
    $("#nextBtn").style.display = "none";
    return;
  }

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
    ${state.step === 4 ? resourceSuggestion() : ""}
  ` : "";

  stepContent.innerHTML = `
    <div class="conversation">
      ${intro}
      <div class="guide-bubble ${state.feedback ? 'feedback' : ''}">
        <button type="button" class="audio-btn" id="speakGuideBtn" title="Écouter la question">🔊</button>
        <span class="guide-name">Votre guide ÉCLAT</span>
        <p id="guideMessage">${state.feedback ? guideReaction(q) : "Prenez votre temps. Une seule question vous est proposée."}</p>
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

  $("#previousBtn").style.visibility = (!state.step && !state.question && !state.feedback) ? "hidden" : "visible";
  $("#nextBtn").innerHTML = state.feedback ? "Continuer →" : "Confier ma réponse →";
}

function collect() {
  const nameInput = $("#sessionName");
  if (nameInput) state.name = nameInput.value;
  save();
}

function start(fresh = false) {
  if (fresh) {
    state = freshState();
    save();
  }
  const nameInput = $("#sessionName");
  if (nameInput) nameInput.value = state.name || "";
  show(session);
  renderStep();
}

function renderSummary(complete = false) {
  collect();
  const a = state.answers;
  const conclusion = buildConclusion(a);
  if (complete) {
    state.conclusion = conclusion;
    archiveCompletedSession();
  }
  const themes = Array.isArray(a.themes) ? a.themes.join(" · ") : a.themes;
  const source = a.coreWord || themes || "À préciser";
  const passage = a.opposite || a.need || "À faire émerger";
  const treasure = a.quality || a.sensitivity || "À reconnaître";
  
  const hasIntensity = a.startIntensity !== undefined && a.endIntensity !== undefined;
  const intensityBadge = hasIntensity ? `<div class="intensity-badge">Intensité ressentie : ${a.startIntensity}/10 → ${a.endIntensity}/10</div>` : "";

  const userNeed = a.need || a.immediateNeed || "mon besoin profond";
  const userQuality = a.quality || a.sensitivity || "mes ressources";
  const mantraText = `« Aujourd'hui, je choisis d'honorer mon besoin de <strong>${escapeHtml(userNeed)}</strong> en m'appuyant sur ma capacité de <strong>${escapeHtml(userQuality)}</strong>. »`;

  const signals = detectedSignals(a).slice(0, 3);
  const signal = signals[0] || null;
  const previous = [...history]
    .filter(item => item.id !== state.id)
    .sort((left, right) => new Date(right.completedAt) - new Date(left.completedAt))[0];
  const openingWords = shortAnswer(a.reason || a.difficulty);
  const changeWords = shortAnswer(a.change || a.takeaway);
  const personalReading = signal ? `
    <div class="insight personal-reading">
      <small>Le fil repéré dans vos propres mots</small>
      <p>Votre parcours semble surtout traversé par <strong>${escapeHtml(signal.name)}</strong>. Cette lecture reste une proposition à ressentir, pas une étiquette.</p>
      ${openingWords ? `<p><b>Au départ :</b> « ${escapeHtml(openingWords)} »</p>` : ""}
      ${changeWords ? `<p><b>Ce qui se dégage maintenant :</b> « ${escapeHtml(changeWords)} »</p>` : ""}
      <p><b>La direction possible :</b> ${escapeHtml(signal.resource)}.</p>
    </div>` : "";

  const detectedThemes = signals.length ? `
    <div class="detected-themes" aria-label="Thèmes repérés">
      ${signals.map(item => `<span>${escapeHtml(item.name)}</span>`).join("")}
    </div>` : "";

  const comparison = previous ? `
    <div class="evolution-comparison">
      <small>Depuis votre parcours du ${formatDate(previous.completedAt)}</small>
      <div class="comparison-grid">
        <div><span>Thème précédent</span><strong>${escapeHtml(sessionTheme(previous))}</strong></div>
        <div><span>Thème actuel</span><strong>${escapeHtml(signal ? signal.name : (a.coreWord || "À préciser"))}</strong></div>
      </div>
      ${previous.conclusion?.point ? `<p><b>Votre précédent point ÉCLAT :</b> « ${escapeHtml(shortAnswer(previous.conclusion.point, 170))} »</p>` : ""}
      <p>${previous.actionCompletedAt ? "Vous aviez réalisé le petit pas choisi." : "Votre ancien petit pas peut encore être repris, ajusté ou laissé de côté si votre besoin a changé."}</p>
    </div>` : `
    <div class="evolution-comparison first">
      <small>Votre point de départ</small>
      <p>Ce bilan devient votre premier repère. Lors d’un prochain parcours, ÉCLAT pourra mettre en lumière ce qui a changé.</p>
    </div>`;

  const currentTheme = signal ? signal.name : (a.coreWord || "un thème à préciser");
  const recurrenceCount = history.filter(item => item.id !== state.id && sessionTheme(item) === currentTheme).length;
  const recurringTheme = recurrenceCount > 0 ? `
    <div class="recurring-theme">
      <small>Un fil qui revient dans votre histoire</small>
      <p>Le thème <strong>${escapeHtml(currentTheme)}</strong> apparaît dans ${recurrenceCount + 1} parcours. Cela ne prouve pas une cause unique, mais peut indiquer un point utile à observer dans des situations différentes.</p>
    </div>` : "";

  $("#transformationCard").innerHTML = `
    <h2>Le fil essentiel de la séance</h2>
    ${intensityBadge}
    ${detectedThemes}
    <div class="transformation-flow">
      <div class="transformation-node"><small>Ce qui pèse</small><strong>${escapeHtml(source)}</strong></div>
      <div class="flow-arrow">→</div>
      <div class="transformation-node"><small>Ce qui est recherché</small><strong>${escapeHtml(passage)}</strong></div>
      <div class="flow-arrow">→</div>
      <div class="transformation-node"><small>La ressource</small><strong>${escapeHtml(treasure)}</strong></div>
    </div>
    <div class="insight">
      <p style="margin: 0 0 10px 0; font-size: 1.05rem;"><strong>Votre phrase d'ancrage :</strong><br>${mantraText}</p>
      ${a.action ? `<p><b>Premier mouvement choisi :</b> ${escapeHtml(a.action)}</p>` : ""}
      ${a.successEvidence ? `<p><b>Le signe qui permettra de reconnaître le changement :</b> ${escapeHtml(a.successEvidence)}</p>` : ""}
      ${a.commitment !== undefined ? `<p><b>Engagement ressenti :</b> ${escapeHtml(a.commitment)} / 10${+a.commitment < 7 ? " — l’action mérite d’être simplifiée ou ajustée." : ""}</p>` : ""}
    </div>
    ${personalReading}
    ${recurringTheme}
    ${comparison}
    ${complete ? `<div class="return-invitation"><strong>Votre prochain rendez-vous avec vous-même</strong><p>Revenez dans environ 7 jours, ou lorsqu’un changement concret apparaît. Votre nouveau bilan sera comparé à celui-ci.</p></div>` : ""}`;

  $(".eclat-conclusion")?.remove();
  const conclusionCard = document.createElement("section");
  conclusionCard.className = "eclat-conclusion";
  conclusionCard.innerHTML = `
    <div class="conclusion-title">
      <div><p class="eyebrow">La lecture de votre parcours</p><h2>Votre conclusion ÉCLAT</h2></div>
      <span>${conclusion.insufficient ? "Lecture en attente de précisions" : `Lecture fondée sur ${conclusion.evidenceCount || "plusieurs"} repères`}</span>
    </div>
    <div class="conclusion-reading">
      ${(conclusion.narrative?.length ? conclusion.narrative : [conclusion.observation, conclusion.mechanism, conclusion.implication, conclusion.emotion, conclusion.body, conclusion.belief, conclusion.projection, conclusion.shadow, conclusion.rhythm]).filter(Boolean).map(text => `<p>${escapeHtml(text)}</p>`).join("")}
    </div>
    ${conclusion.followUps?.length ? `<div class="conclusion-followups"><h3>Pour construire une conclusion plus juste</h3><ol>${conclusion.followUps.map(question => `<li>${escapeHtml(question)}</li>`).join("")}</ol></div>` : ""}
    <div class="awareness-point"><small>La prise de conscience proposée</small><strong>${escapeHtml(conclusion.awareness)}</strong></div>
    <div class="eclat-point"><small>Votre point ÉCLAT</small><blockquote>« ${escapeHtml(conclusion.point)} »</blockquote></div>
    ${conclusion.action ? `<div class="conclusion-action"><small>Pour l’incarner dans la réalité</small><p>${escapeHtml(conclusion.action)}</p></div>` : ""}
    <p class="conclusion-source">${conclusion.insufficient ? "ÉCLAT préfère suspendre sa lecture plutôt que compléter vos réponses à votre place." : "Cette lecture croise uniquement les éléments formulés dans vos réponses."} Elle ne constitue ni un diagnostic ni une vérité définitive sur vous.</p>`;
  $("#transformationCard").after(conclusionCard);

  $("#summaryContent").innerHTML = STEPS.map((s, i) => `
    <article class="summary-card">
      <h3>${s.title}</h3>
      ${activeQuestions(i).map(q => {
        let v = a[q.id];
        if (Array.isArray(v)) v = v.join(" · ");
        const empty = v === undefined || v === "";
        return `
          <div class="summary-item ${q.adaptive ? 'summary-adaptive' : ''}">
            <b>${q.label}</b>
            <p class="${empty ? 'empty-answer' : ''}">${empty ? 'Non renseigné' : escapeHtml(v) + (q.type === 'scale' ? ' / 10' : '')}</p>
          </div>`;
      }).join("")}
    </article>
  `).join("");

  show(summary);
}

// Synthèse Vocale (Text-to-Speech)
function speakGuideText() {
  const msgEl = $("#guideMessage");
  if (!msgEl || !('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel();
  const text = msgEl.textContent || msgEl.innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.92;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "speakGuideBtn") {
    speakGuideText();
  }
});

// Respiration / Cohérence Cardiaque
const breathDlg = $("#breathDialog");
const breathBtn = $("#breathBtn");
const closeBreath = $("#closeBreath");
const breathText = $("#breathText");
let breathInterval = null;

if (breathDlg && breathBtn) {
  breathBtn.onclick = () => {
    breathDlg.showModal();
    let isInspire = true;
    breathText.textContent = "Inspirer doucement...";
    
    breathInterval = setInterval(() => {
      isInspire = !isInspire;
      breathText.textContent = isInspire ? "Inspirer doucement..." : "Expirer profondément...";
    }, 5000);
  };

  const stopBreath = () => {
    if (breathInterval) clearInterval(breathInterval);
    breathDlg.close();
  };

  if (closeBreath) closeBreath.onclick = stopBreath;
  breathDlg.onclick = (e) => { if (e.target === breathDlg) stopBreath(); };
}

// Export JSON
const exportBtn = $("#exportBtn");
if (exportBtn) {
  exportBtn.onclick = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `parcours-eclat-${state.name || 'session'}-${new Date().toISOString().slice(0, 10)}.json`;
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };
}

// Événements
$("#newSession").onclick = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && Object.keys(state.answers).length && !confirm("Commencer un nouveau parcours effacera vos réponses actuelles. Continuer ?")) return;
  } catch (e) {}
  start(true);
};

$("#resumeSession").onclick = () => start(false);

$("#previousBtn").onclick = () => {
  if (state.feedback) {
    state.feedback = false;
  } else if (state.question > 0) {
    state.question--;
  } else if (state.step > 0) {
    state.step--;
    state.question = activeQuestions(state.step).length - 1;
  }
  save();
  renderStep();
};

$("#nextBtn").onclick = () => {
  const currentQuestions = activeQuestions(state.step);

  if (!state.feedback) {
    state.feedback = true;
    save();
    renderStep();
    return;
  }

  state.feedback = false;
  if (state.question < currentQuestions.length - 1) {
    state.question++;
  } else if (state.step < STEPS.length - 1) {
    state.step++;
    state.question = 0;
  } else {
    return renderSummary(true);
  }
  save();
  renderStep();
};

$("#summaryBtn").onclick = () => renderSummary(false);
$("#backToSession").onclick = () => { show(session); renderStep(); };
$("#printBtn").onclick = () => window.print();
$("#homeBtn").onclick = () => show(welcome);

const nameInput = $("#sessionName");
if (nameInput) nameInput.oninput = e => { state.name = e.target.value; save(); };

$("#resetBtn").onclick = () => {
  if (confirm("Effacer définitivement toutes les réponses de ce parcours ?")) {
    try { localStorage.removeItem(KEY); } catch (e) {}
    state = freshState();
    $("#resumeSession").hidden = true;
    show(welcome);
  }
};

const dlg = $("#privacyDialog");
if (dlg) {
  $("#privacyBtn").onclick = () => dlg.showModal();
  const closeBtn = dlg.querySelector(".dialog-close");
  if (closeBtn) closeBtn.onclick = () => dlg.close();
  dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
}

const journeyBtn = $("#journeyBtn");
if (journeyBtn) journeyBtn.onclick = () => {
  show(welcome);
  renderJourneyPanel(true);
  $("#journeyPanel")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

load();
