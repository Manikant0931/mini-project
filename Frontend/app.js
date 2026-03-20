// ── DATA ──
const PAGES  = ['home','bmi','workout','meals','ai','progress'];
const LABELS = ['Home','BMI','Workout','Meals','AI Coach','Progress'];

const WO = {
  beginner: {
    info: '<b>Beginner</b> — Build your base. Train 3–4 days/week.',
    list: [
      ['🏋️','Push-ups','3×10','Chest'],
      ['🦵','Bodyweight Squats','3×15','Legs'],
      ['💪','Plank Hold','3×30s','Core'],
      ['🔥','Jumping Jacks','2×20','Cardio'],
      ['🍑','Glute Bridges','3×12','Glutes']
    ]
  },
  intermediate: {
    info: '<b>Intermediate</b> — Build strength & cardio. Train 4–5 days/week.',
    list: [
      ['💥','Diamond Push-ups','4×12','Triceps'],
      ['⚡','Jump Squats','3×15','Legs'],
      ['🏃','Mountain Climbers','3×30s','Core'],
      ['🔥','Burpees','3×10','Full Body'],
      ['💪','Dumbbell Rows','3×12','Back']
    ]
  },
  advanced: {
    info: '<b>Advanced</b> — High intensity. Train 5–6 days/week.',
    list: [
      ['🎯','Archer Push-ups','4×10','Chest'],
      ['🦅','Pistol Squats','3×8','Legs'],
      ['🧘','L-sit Hold','3×20s','Core'],
      ['🏋️','Muscle-up Attempts','3×5','Upper'],
      ['🏃','Sprint Intervals','5×60s','Cardio']
    ]
  }
};

const MEALS = {
  lose: [
    { t:'Breakfast · 7:00 AM',  h:'Light Start',    i:['Oats with banana','Low-fat milk (200ml)','Green tea'],             k:320 },
    { t:'Snack · 10:30 AM',     h:'Mid-Morning',    i:['1 Apple','Almonds (15g)','Cucumber slices'],                       k:150 },
    { t:'Lunch · 1:00 PM',      h:'Power Meal',     i:['2 Wheat rotis','Dal (1 cup)','Mixed veg sabji','Salad'],            k:480 },
    { t:'Dinner · 7:30 PM',     h:'Light Dinner',   i:['Vegetable soup','1 Multigrain roti','Paneer bhurji (100g)'],        k:350 }
  ],
  maintain: [
    { t:'Breakfast · 7:00 AM',  h:'Balanced Start', i:['Poha with veggies','2 Boiled eggs','Orange juice'],                k:420 },
    { t:'Snack · 10:30 AM',     h:'Mid-Morning',    i:['Greek yogurt','Mixed berries','Walnuts (20g)'],                    k:220 },
    { t:'Lunch · 1:00 PM',      h:'Full Meal',      i:['Rice (1 cup)','Rajma curry','Raita','Green sabji'],                k:580 },
    { t:'Dinner · 7:30 PM',     h:'Dinner',         i:['3 Wheat rotis','Paneer curry','Dal makhani','Salad'],              k:520 }
  ],
  gain: [
    { t:'Breakfast · 7:00 AM',  h:'Power Breakfast',i:['4 Egg whites omelette','3 bread slices + peanut butter','Banana'],k:680 },
    { t:'Snack · 10:30 AM',     h:'Bulk Snack',     i:['Chana chaat (1 cup)','Cottage cheese (150g)','4 Dates'],           k:400 },
    { t:'Lunch · 1:00 PM',      h:'Mass Meal',      i:['Rice (2 cups)','Chole (large)','Paneer (150g)','Dal'],             k:820 },
    { t:'Dinner · 7:30 PM',     h:'Recovery Dinner',i:['4 Rotis','Palak paneer','Soya chunks curry','Milk (300ml)'],       k:720 }
  ]
};

// ── BUILD NAV & PAGE CONTAINERS ──
const navEl   = document.getElementById('nav');
const pagesEl = document.getElementById('pages');

PAGES.forEach((id, i) => {
  const btn = document.createElement('button');
  btn.className = 'nb' + (i === 0 ? ' on' : '');
  btn.textContent = LABELS[i];
  btn.onclick = () => show(id);
  navEl.appendChild(btn);

  const div = document.createElement('div');
  div.className = 'pg' + (i === 0 ? ' on' : '');
  div.id = 'pg-' + id;
  pagesEl.appendChild(div);
});

// ── RENDER PAGE HTML ──
document.getElementById('pg-home').innerHTML = `
  <div class="hero">
    <h1>Your Fitness, Simplified.</h1>
    <p>Personalized workouts + vegetarian meal plans — picked for your level, focused on results.</p>
    <div class="hbtns">
      <button class="btn bg" onclick="show('bmi')">Calculate BMI</button>
      <button class="btn bo" onclick="show('workout')">See Workouts</button>
    </div>
  </div>
  <div class="stats">
    ${[['3','Fitness Levels'],['12+','Exercises'],['4','Meals/Day'],['100%','Vegetarian']]
      .map(([n,l]) => `<div class="sc"><div class="sn">${n}</div><div class="sl">${l}</div></div>`).join('')}
  </div>
  <div class="card">
    <h2 style="font-size:15px;margin-bottom:14px">Today's Sample Workout — Beginner</h2>
    ${[['🏋️','Push-ups','3×10','Chest'],['🦵','Bodyweight Squats','3×15','Legs'],
       ['💪','Plank Hold','3×30s','Core'],['🔥','Jumping Jacks','2×20','Cardio']]
      .map(([ic,n,s,b]) => `
      <div class="erow">
        <div class="eico">${ic}</div>
        <div><div class="en">${n}</div><div class="es">${s}</div></div>
        <div class="badge">${b}</div>
      </div>`).join('')}
  </div>`;

document.getElementById('pg-bmi').innerHTML = `
  <h1>BMI Calculator</h1>
  <p class="sub">Find your Body Mass Index and recommended fitness level.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
    <div class="card">
      <div class="fg"><label>Your Name</label><input id="un" placeholder="e.g. Manvendra"/></div>
      <div class="fg"><label>Age</label><input type="number" id="ag" placeholder="e.g. 21"/></div>
      <div class="fr">
        <div class="fg"><label>Height (cm)</label><input type="number" id="ht" placeholder="175"/></div>
        <div class="fg"><label>Weight (kg)</label><input type="number" id="wt" placeholder="70"/></div>
      </div>
      <div class="fg">
        <label>Goal</label>
        <select id="gl">
          <option value="">Select goal</option>
          <option>Lose Weight</option>
          <option>Maintain Weight</option>
          <option>Gain Muscle</option>
        </select>
      </div>
      <button class="btn bk" style="width:100%;margin-top:4px" onclick="calcBMI()">Calculate →</button>
    </div>
    <div class="card bmires" id="bmires">
      <p style="color:#bbb;font-size:14px">Fill in your details<br>to see your BMI.</p>
    </div>
  </div>`;

document.getElementById('pg-workout').innerHTML = `
  <h1>Workout Plans</h1>
  <p class="sub">Simple, focused routines — no confusion, just results.</p>
  <div class="tabs" id="wtabs">
    ${['beginner','intermediate','advanced'].map((k,i) =>
      `<button class="tab${i===0?' on':''}" onclick="switchWO('${k}',this)">${k[0].toUpperCase()+k.slice(1)}</button>`
    ).join('')}
  </div>
  <div class="ibox" id="winfo"></div>
  <div class="wlist" id="wlist"></div>`;

document.getElementById('pg-meals').innerHTML = `
  <h1>Vegetarian Meal Plans</h1>
  <p class="sub">Know what to eat and when — clean, structured, 100% vegetarian.</p>
  <div class="tabs" id="mtabs">
    ${[['lose','Weight Loss'],['maintain','Maintenance'],['gain','Muscle Gain']].map(([k,l],i) =>
      `<button class="tab${i===0?' gon':''}" onclick="switchMeal('${k}',this)">${l}</button>`
    ).join('')}
  </div>
  <div class="mgrid" id="mgrid"></div>`;

document.getElementById('pg-ai').innerHTML = `
  <h1>AI Fitness Coach</h1>
  <p class="sub">Ask anything about workouts, diet, or your fitness goals.</p>
  <div class="cwin">
    <div class="ctop"><div class="cdot"></div><b>ALL FIT Coach</b><span>Online</span></div>
    <div class="cmsgs" id="cmsgs">
      <div class="msg b">
        <div class="bub">Hi! 👋 I'm your ALL FIT coach. Ask me anything about workouts, vegetarian nutrition, or your fitness goals!</div>
        <div class="mt2">Just now</div>
      </div>
    </div>
    <div class="cbot">
      <textarea class="cin" id="cin" rows="1" placeholder="Ask about workouts, diet, BMI…"
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
      <button class="csend" id="csend" onclick="sendMsg()">↑</button>
    </div>
  </div>
  <div class="chips">
    ${['Best beginner exercises?','High-protein veg breakfast?','How to lower BMI?','Intermediate weekly plan?','Calories for weight loss?']
      .map(q => `<button class="chip" onclick="useQ('${q}')">${q}</button>`).join('')}
  </div>`;

document.getElementById('pg-progress').innerHTML = `
  <h1>Progress Tracker</h1>
  <p class="sub">Log your daily stats and track improvement over time.</p>
  <div class="pgrid">
    <div class="card">
      <h2 style="font-size:16px;margin-bottom:16px">Log Today</h2>
      <div class="fr">
        <div class="fg"><label>Weight (kg)</label><input type="number" id="lw" placeholder="72"/></div>
        <div class="fg"><label>Height (cm)</label><input type="number" id="lh" placeholder="175"/></div>
      </div>
      <div class="fg">
        <label>Workout</label>
        <select id="lwo">
          <option value="">Select</option>
          <option>Beginner Plan</option><option>Intermediate Plan</option>
          <option>Advanced Plan</option><option>Rest Day</option>
        </select>
      </div>
      <div class="fg">
        <label>Mood</label>
        <select id="lmo">
          <option value="">Select</option>
          <option>💪 Energetic</option><option>😊 Good</option>
          <option>😐 Neutral</option><option>😴 Tired</option>
        </select>
      </div>
      <button class="btn bg" style="width:100%" onclick="logP()">Save Entry →</button>
    </div>
    <div class="card">
      <h2 style="font-size:15px;margin-bottom:14px">Recent Logs</h2>
      <div class="elist" id="elist"></div>
    </div>
  </div>`;

// ── NAVIGATION ──
function show(id) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
  document.getElementById('pg-' + id).classList.add('on');
  [...navEl.children].find(b => b.textContent === LABELS[PAGES.indexOf(id)]).classList.add('on');
  window.scrollTo({ top: 0 });
}

// ── TOAST ──
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 2400);
}

// ── BMI CALCULATOR ──
function calcBMI() {
  const h = +document.getElementById('ht').value;
  const w = +document.getElementById('wt').value;
  const age = +document.getElementById('ag').value;
  const name = document.getElementById('un').value || 'User';
  if (!h || !w || !age) { toast('Please fill all fields'); return; }

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);
  const [cat, col, tip, pct] =
    bmi < 18.5 ? ['Underweight','#60a5fa','Focus on strength training and calorie-dense foods like nuts, paneer, and lentils.',18] :
    bmi < 25   ? ['Normal',     '#4ade80','Great shape! Maintain with balanced meals and regular exercise.',50] :
    bmi < 30   ? ['Overweight', '#fb923c','Add cardio and reduce refined sugars. Increase vegetable intake.',75] :
                 ['Obese',      '#f87171','Start with low-impact exercise like walking. Consider consulting a physician.',92];

  document.getElementById('bmires').innerHTML = `
    <div class="bminum" style="color:${col}">${bmi}</div>
    <div class="bmicat" style="color:${col}">${cat}</div>
    <div style="font-size:12px;color:#888">Hello, ${name} · Age ${age}</div>
    <div class="bmibar"><div style="width:${pct}%;background:${col}"></div></div>
    <div class="bmitip">${tip}</div>
    <button class="btn bk" style="margin-top:18px" onclick="show('workout')">See My Workout Plan →</button>`;
  toast('BMI: ' + bmi + ' — ' + cat);
}

// ── WORKOUT ──
function switchWO(key, btn) {
  document.querySelectorAll('#wtabs .tab').forEach(t => t.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('winfo').innerHTML = WO[key].info;
  document.getElementById('wlist').innerHTML = WO[key].list.map(([ic,n,s,tg], i) => `
    <div class="wi">
      <div class="wn">${i + 1}</div>
      <div class="eico">${ic}</div>
      <div><div class="wname">${n}</div><div class="wdet">${s}</div></div>
      <div class="badge" style="margin-left:auto">${tg}</div>
    </div>`).join('');
}

// ── MEALS ──
function switchMeal(key, btn) {
  document.querySelectorAll('#mtabs .tab').forEach(t => t.classList.remove('on','gon'));
  btn.classList.add('gon');
  document.getElementById('mgrid').innerHTML = MEALS[key].map(m => `
    <div class="mc">
      <div class="mt">${m.t}</div>
      <h4>${m.h}</h4>
      <ul class="mi">${m.i.map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="mkcal">~<span>${m.k} kcal</span></div>
    </div>`).join('');
}

// ── AI CHAT ──
const SYS = `You are ALL FIT Coach, a friendly AI fitness assistant for the ALL FIT app at GLA University. Help with workouts, vegetarian nutrition, BMI, and fitness goals. Be concise, warm, practical.`;
let hist = [];

async function sendMsg() {
  const inp = document.getElementById('cin');
  const msg = inp.value.trim();
  if (!msg) return;
  addMsg('u', msg);
  inp.value = '';
  document.getElementById('csend').disabled = true;
  const tid = addTyping();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          { role:'user', content:SYS },
          { role:'assistant', content:'Ready to help!' },
          ...hist.slice(-10),
          { role:'user', content:msg }
        ]
      })
    });
    const data = await res.json();
    removeTyping(tid);
    const reply = data.content?.[0]?.text || 'Sorry, try again.';
    hist.push({ role:'user', content:msg }, { role:'assistant', content:reply });
    addMsg('b', reply);
  } catch {
    removeTyping(tid);
    addMsg('b', 'Network error. Please try again.');
  }
  document.getElementById('csend').disabled = false;
}

function addMsg(role, text) {
  const c = document.getElementById('cmsgs');
  const t = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  d.innerHTML = `<div class="bub">${text.replace(/\n/g,'<br>')}</div><div class="mt2">${t}</div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function addTyping() {
  const c = document.getElementById('cmsgs');
  const id = 'ty' + Date.now();
  const d = document.createElement('div');
  d.className = 'msg b';
  d.id = id;
  d.innerHTML = '<div class="bub"><div class="typ"><span></span><span></span><span></span></div></div>';
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
  return id;
}

function removeTyping(id) { document.getElementById(id)?.remove(); }
function useQ(q) { document.getElementById('cin').value = q; document.getElementById('cin').focus(); }

// ── PROGRESS ──
let log = [];
try { log = JSON.parse(localStorage.getItem('af_log') || '[]'); } catch {}

function logP() {
  const w  = +document.getElementById('lw').value;
  const h  = +document.getElementById('lh').value;
  const wo = document.getElementById('lwo').value;
  const mo = document.getElementById('lmo').value;
  if (!w || !h || !wo || !mo) { toast('Please fill all fields'); return; }

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);
  const cat = bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':'Obese';
  log.push({ date: new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'}), bmi, cat, wo, mo });
  try { localStorage.setItem('af_log', JSON.stringify(log)); } catch {}
  renderLog();
  toast('Logged! BMI: ' + bmi + ' — ' + cat);
  ['lw','lh'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('lwo').value = '';
  document.getElementById('lmo').value = '';
}

function renderLog() {
  const el = document.getElementById('elist');
  if (!el) return;
  el.innerHTML = log.length
    ? log.slice().reverse().slice(0, 7).map(e => `
      <div class="ent">
        <div><div class="ed">${e.date}</div><div class="ew">${e.wo} · ${e.mo}</div></div>
        <div><div class="ebmi">${e.bmi}</div><div class="ecat">${e.cat}</div></div>
      </div>`).join('')
    : '<div class="empty">No entries yet.<br>Start logging today!</div>';
}

// ── INIT ──
switchWO('beginner', document.querySelector('#wtabs .tab'));
switchMeal('lose', document.querySelector('#mtabs .tab'));
renderLog();
