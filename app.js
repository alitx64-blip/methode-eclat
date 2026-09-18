const STEPS=[
 {title:"É — Épreuve actuelle",intro:"Partir du présent et laisser apparaître précisément ce qui pèse aujourd’hui.",questions:[
  {id:"reason",label:"Qu’est-ce qui vous amène aujourd’hui ?",type:"text",hint:"Écrivez ce qui vient, sans chercher tout de suite à l’expliquer."},
  {id:"difficulty",label:"Qu’est-ce qui est le plus difficile pour vous dans cette situation ?",type:"text"},
  {id:"intention",label:"Qu’aimeriez-vous comprendre, apaiser ou faire évoluer ?",type:"text"},
  {id:"startIntensity",label:"Quelle place cette difficulté prend-elle aujourd’hui ?",type:"scale"}
 ]},
 {title:"C — Corps & émotions",intro:"Accueillir les signaux du corps et les émotions, sans chercher à les expliquer trop vite.",questions:[
  {id:"emotions",label:"Lorsque vous pensez à cette situation, qu’est-ce qui apparaît ?",type:"chips",options:["Colère","Tristesse","Peur","Culpabilité","Honte","Impuissance","Confusion","Autre"]},
  {id:"emotionWords",label:"Avec vos propres mots, comment décririez-vous ce ressenti ?",type:"text"},
  {id:"body",label:"Où le ressentez-vous dans votre corps ?",type:"chips",options:["Tête","Gorge","Poitrine","Ventre","Dos","Épaules","Bras / mains","Jambes","Partout","Je ne sais pas"]},
  {id:"immediateNeed",label:"De quoi auriez-vous besoin à cet instant ?",type:"text"}
 ]},
 {title:"L — Liens & répétitions",intro:"Observer le fil rouge entre les situations actuelles et les échos possibles, sans suggérer de souvenir.",questions:[
  {id:"recurrence",label:"Est-ce une situation isolée ou quelque chose qui semble se répéter ?",type:"chips",options:["Situation isolée","Cela revient parfois","Cela revient souvent","Je ne sais pas"]},
  {id:"triggers",label:"Qu’est-ce qui déclenche généralement cette réaction ?",type:"text"},
  {id:"protection",label:"Que faites-vous habituellement pour vous protéger ?",type:"chips",options:["Je fuis","Je contrôle","Je me tais","Je m’adapte","Je me défends","Je me coupe de mes émotions","Autre"]},
  {id:"familiar",label:"Cette sensation vous paraît-elle familière ?",type:"text",hint:"Un souvenir peut venir, mais il n’est pas nécessaire d’en trouver un."},
  {id:"pastNeed",label:"De quoi auriez-vous eu besoin à ce moment-là ?",type:"text"}
 ]},
 {title:"A — Axe essentiel",intro:"Nommer l’énergie centrale et le besoin qui se cache derrière, en laissant toujours la personne valider ou refuser.",questions:[
  {id:"coreWord",label:"Si cette difficulté portait un seul mot, lequel serait-il ?",type:"text"},
  {id:"themes",label:"Quels thèmes semblent résonner ?",type:"chips",options:["Rejet","Abandon","Injustice","Dévalorisation","Impuissance","Manque de place","Silence","Insécurité","Non-choix","Séparation","Autre"]},
  {id:"belief",label:"Quelle phrase intérieure semble se cacher derrière ?",type:"text",hint:"Par exemple : « Je ne suis pas… », « Je n’ai pas le droit de… », « Je dois toujours… »"},
  {id:"need",label:"Quel besoin important n’est pas suffisamment entendu ?",type:"text"}
 ]},
 {title:"T — Trésor révélé",intro:"Explorer les deux polarités : ce qui a blessé, mais aussi la sensibilité, l’expertise et l’élan que cela a pu faire naître.",questions:[
  {id:"opposite",label:"Quel serait l’opposé juste et bénéfique de ce blocage ?",type:"text"},
  {id:"sensitivity",label:"Qu’avez-vous appris à repérer très rapidement grâce à ce vécu ?",type:"text"},
  {id:"quality",label:"Quelle qualité ou capacité avez-vous développée à travers cette expérience ?",type:"text"},
  {id:"offering",label:"Qu’apportez-vous facilement aux autres grâce à ce que vous avez traversé ?",type:"text"},
  {id:"selfGift",label:"Comment pourriez-vous commencer à vous offrir cette même chose ?",type:"text"},
  {id:"newChoice",label:"Qu’aimeriez-vous choisir à la place de l’ancien fonctionnement ?",type:"text"}
 ]},
 {title:"✦ Ancrage",intro:"Faire descendre la compréhension dans le corps et dans la vie par un choix simple, réaliste et libre.",questions:[
  {id:"change",label:"Qu’est-ce qui a changé depuis le début de la séance ?",type:"text"},
  {id:"nowBody",label:"Comment votre corps se sent-il maintenant ?",type:"text"},
  {id:"takeaway",label:"Quelle compréhension souhaitez-vous retenir ?",type:"text"},
  {id:"action",label:"Quelle petite action pourrait soutenir ce changement ?",type:"text"},
  {id:"afterNeed",label:"De quoi avez-vous besoin après cette séance ?",type:"text"},
  {id:"endIntensity",label:"Quelle intensité reste-t-il maintenant ?",type:"scale"}
 ]}
];

const GUIDANCE=[
 "Prenez un instant pour choisir une situation précise. Il n’est pas nécessaire de tout raconter : quelques mots sincères suffisent.",
 "Il n’y a pas de bonne réponse. Remarquez simplement ce qui est présent, même si c’est flou ou si vous ne ressentez rien de particulier.",
 "Une ressemblance n’est pas une preuve. Accueillez seulement les souvenirs ou rapprochements qui viennent spontanément, sans en chercher à tout prix.",
 "Le mot central n’est pas une étiquette sur vous. C’est une façon provisoire de nommer ce qui semble demander de l’attention aujourd’hui.",
 "Une difficulté peut aussi avoir affiné une sensibilité ou une capacité. Gardez uniquement les pistes qui vous ressemblent réellement.",
 "Vous n’avez pas besoin de tout résoudre maintenant. Une compréhension simple et un petit mouvement concret peuvent suffire pour aujourd’hui."
];

const RESOURCE_PATHS={
 "Rejet":"accueillir, choisir ce qui mérite une place et créer des espaces d’inclusion",
 "Abandon":"cultiver la continuité, la présence, la fidélité à soi et la persévérance",
 "Injustice":"développer le discernement, l’équilibre et le sens de ce qui est juste",
 "Dévalorisation":"reconnaître la valeur, encourager et rendre visible ce qui compte",
 "Impuissance":"retrouver une marge de choix, agir à son échelle et demander du soutien",
 "Manque de place":"prendre sa place avec justesse et aider chacun à trouver la sienne",
 "Silence":"écouter profondément, choisir ses mots et restaurer une parole libre",
 "Insécurité":"créer des repères, de la fiabilité et des espaces où l’on se sent protégé",
 "Non-choix":"clarifier ses envies, décider progressivement et respecter son propre rythme",
 "Séparation":"relier sans se perdre, différencier et construire des liens plus conscients"
};

const KEY="dads-chemin-interieur-v1";
let state={step:0,name:"",answers:{},updatedAt:null};
const $=s=>document.querySelector(s);
const welcome=$("#welcome"),session=$("#session"),summary=$("#summary"),stepContent=$("#stepContent");

function load(){try{const saved=localStorage.getItem(KEY);if(saved){state={...state,...JSON.parse(saved)};$("#resumeSession").hidden=false}}catch(e){console.warn(e)}}
function save(){state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));$("#saveState").textContent="Enregistré sur cet appareil"}
function show(view){[welcome,session,summary].forEach(x=>x.hidden=true);view.hidden=false;window.scrollTo({top:0,behavior:"smooth"})}
function escapeHtml(v=""){return String(v).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}

function renderNav(){const nav=$("#stepNav");nav.innerHTML=STEPS.map((s,i)=>`<button type="button" data-step="${i}" class="${i===state.step?'active':''} ${i<state.step?'done':''}"><span>${i<state.step?'✓':i+1}</span>${escapeHtml(s.title)}</button>`).join("");nav.querySelectorAll("button").forEach(b=>b.onclick=()=>{collect();state.step=+b.dataset.step;renderStep()})}
function question(q){const val=state.answers[q.id]??(q.type==="scale"?5:q.type==="chips"?[]:"");if(q.type==="chips")return `<article class="question-card"><div class="question-title">${q.label}</div>${q.hint?`<p class="question-hint">${q.hint}</p>`:""}<div class="chips" data-id="${q.id}">${q.options.map(o=>`<button type="button" class="chip ${val.includes(o)?'selected':''}" data-value="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join("")}</div></article>`;
 if(q.type==="scale")return `<article class="question-card"><label for="${q.id}">${q.label}</label><div class="scale-wrap"><input id="${q.id}" data-id="${q.id}" type="range" min="0" max="10" value="${val}"><output class="scale-value" for="${q.id}">${val}</output></div><p class="question-hint">0 — très faible &nbsp;&nbsp; 10 — très forte</p></article>`;
 return `<article class="question-card"><label for="${q.id}">${q.label}</label>${q.hint?`<p class="question-hint">${q.hint}</p>`:""}<textarea id="${q.id}" data-id="${q.id}" placeholder="Noter les mots qui viennent…">${escapeHtml(val)}</textarea></article>`}
function resourceSuggestion(){const themes=state.answers.themes||[];const paths=themes.filter(x=>RESOURCE_PATHS[x]).map(x=>`<strong>${escapeHtml(x)}</strong> : ${RESOURCE_PATHS[x]}`);if(!paths.length)return "";return `<div class="suggestion-box"><small>Pistes à ressentir, pas conclusions</small><p>${paths.join("<br><br>")}</p></div>`}
function renderStep(){renderNav();const s=STEPS[state.step];$("#stepNumber").textContent=`Étape ${state.step+1} sur ${STEPS.length}`;$("#progressBar").style.width=`${((state.step+1)/STEPS.length)*100}%`;const pause=state.step===2?`<div class="pause-box"><span>♡</span><div><b>Vous restez libre.</b><br>Si un souvenir ou une émotion devient trop intense, faites une pause et revenez à ce qui vous entoure ici et maintenant.</div></div>`:"";stepContent.innerHTML=`<p class="eyebrow">${String(state.step+1).padStart(2,"0")}</p><h2>${s.title}</h2><p class="step-intro">${s.intro}</p><div class="guidance">${GUIDANCE[state.step]}</div>${pause}${state.step===4?resourceSuggestion():""}${s.questions.map(question).join("")}`;
 stepContent.querySelectorAll("textarea").forEach(el=>el.addEventListener("input",()=>{state.answers[el.dataset.id]=el.value;save()}));
 stepContent.querySelectorAll('input[type="range"]').forEach(el=>el.addEventListener("input",()=>{state.answers[el.dataset.id]=+el.value;el.nextElementSibling.value=el.value;save()}));
 stepContent.querySelectorAll(".chips").forEach(group=>group.querySelectorAll(".chip").forEach(chip=>chip.onclick=()=>{const id=group.dataset.id;const arr=state.answers[id]||[];const v=chip.dataset.value;state.answers[id]=arr.includes(v)?arr.filter(x=>x!==v):[...arr,v];chip.classList.toggle("selected");save()}));
 $("#previousBtn").style.visibility=state.step===0?"hidden":"visible";$("#nextBtn").innerHTML=state.step===STEPS.length-1?'Voir la synthèse <span>→</span>':'Continuer <span>→</span>'}
function collect(){state.name=$("#sessionName").value;save()}
function start(fresh=false){if(fresh){state={step:0,name:"",answers:{},updatedAt:null};save()}$("#sessionName").value=state.name||"";show(session);renderStep()}
function renderSummary(){collect();const a=state.answers;const themes=Array.isArray(a.themes)?a.themes.join(" · "):a.themes;const source=a.coreWord||themes||"À préciser";const passage=a.opposite||a.need||"À faire émerger";const treasure=a.quality||a.sensitivity||"À reconnaître";$("#transformationCard").innerHTML=`<h2>Le fil essentiel de la séance</h2><div class="transformation-flow"><div class="transformation-node"><small>Ce qui pèse</small><strong>${escapeHtml(source)}</strong></div><div class="flow-arrow">→</div><div class="transformation-node"><small>Ce qui est recherché</small><strong>${escapeHtml(passage)}</strong></div><div class="flow-arrow">→</div><div class="transformation-node"><small>La ressource</small><strong>${escapeHtml(treasure)}</strong></div></div><div class="insight">Cette carte est une piste formulée à partir des mots notés pendant la séance. Elle n’est juste que si elle résonne pour la personne. ${a.action?`Premier mouvement choisi : <strong>${escapeHtml(a.action)}</strong>`:""}</div>`;$("#summaryContent").innerHTML=STEPS.map(s=>`<article class="summary-card"><h3>${s.title}</h3>${s.questions.map(q=>{let v=a[q.id];if(Array.isArray(v))v=v.join(" · ");const empty=v===undefined||v==="";return `<div class="summary-item"><b>${q.label}</b><p class="${empty?'empty-answer':''}">${empty?'Non renseigné':escapeHtml(v)+(q.type==='scale'?' / 10':'')}</p></div>`}).join("")}</article>`).join("");show(summary)}

$("#newSession").onclick=()=>{if(localStorage.getItem(KEY)&&Object.keys(state.answers).length&&!confirm("Commencer un nouveau parcours effacera vos réponses actuelles. Continuer ?"))return;start(true)};
$("#resumeSession").onclick=()=>start(false);$("#previousBtn").onclick=()=>{collect();if(state.step>0){state.step--;renderStep()}};$("#nextBtn").onclick=()=>{collect();if(state.step<STEPS.length-1){state.step++;renderStep();window.scrollTo({top:0,behavior:"smooth"})}else renderSummary()};
$("#summaryBtn").onclick=renderSummary;$("#backToSession").onclick=()=>{show(session);renderStep()};$("#printBtn").onclick=()=>window.print();$("#homeBtn").onclick=()=>show(welcome);$("#sessionName").oninput=e=>{state.name=e.target.value;save()};
$("#resetBtn").onclick=()=>{if(confirm("Effacer définitivement toutes les réponses de ce parcours ?")){localStorage.removeItem(KEY);state={step:0,name:"",answers:{},updatedAt:null};$("#resumeSession").hidden=true;show(welcome)}};
const dlg=$("#privacyDialog");$("#privacyBtn").onclick=()=>dlg.showModal();dlg.querySelector(".dialog-close").onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()};
load();
