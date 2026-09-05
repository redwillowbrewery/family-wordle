(() => {
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;
  const START_DATE = new Date('2026-09-05T00:00:00');
  const words = [...new Set((window.FAMILY_WORDS || []).map(w => w.toUpperCase()))];
  const valid = new Set([...words, ...(window.EXTRA_GUESSES || []).map(w => w.toUpperCase())]);

  function dateKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
  const localDay = new Date();
  localDay.setHours(0,0,0,0);
  const start = new Date(START_DATE); start.setHours(0,0,0,0);
  const dayIndex = Math.max(0, Math.floor((Date.UTC(localDay.getFullYear(), localDay.getMonth(), localDay.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000));
  const solution = words[dayIndex % words.length];
  const gameKey = `family-word:${dateKey(localDay)}`;

  const board = document.getElementById('board');
  const keyboard = document.getElementById('keyboard');
  const message = document.getElementById('message');
  const shareBtn = document.getElementById('shareBtn');
  const helpDialog = document.getElementById('helpDialog');
  const statsDialog = document.getElementById('statsDialog');
  document.getElementById('dayLabel').textContent = localDay.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long'});

  let state = loadGame() || { guesses: [], current: '', status: 'playing' };

  function loadGame(){ try { return JSON.parse(localStorage.getItem(gameKey)); } catch { return null; } }
  function saveGame(){ localStorage.setItem(gameKey, JSON.stringify(state)); }
  function loadStats(){ try{return JSON.parse(localStorage.getItem('family-word:stats')) || {played:0,wins:0,streak:0,maxStreak:0,lastCompleted:null};}catch{return {played:0,wins:0,streak:0,maxStreak:0,lastCompleted:null};} }
  function saveStats(s){ localStorage.setItem('family-word:stats',JSON.stringify(s)); }

  function buildBoard(){
    board.innerHTML='';
    for(let r=0;r<MAX_GUESSES;r++){
      const row=document.createElement('div'); row.className='row';
      for(let c=0;c<WORD_LENGTH;c++){ const tile=document.createElement('div'); tile.className='tile'; tile.dataset.r=r; tile.dataset.c=c; row.appendChild(tile); }
      board.appendChild(row);
    }
  }

  const keyRows = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['enter','z','x','c','v','b','n','m','⌫']];
  function buildKeyboard(){
    keyboard.innerHTML='';
    keyRows.forEach(row=>{ const el=document.createElement('div'); el.className='key-row'; row.forEach(k=>{ const b=document.createElement('button'); b.className='key'+((k==='enter'||k==='⌫')?' wide':''); b.textContent=k; b.dataset.key=k; b.addEventListener('click',()=>handleKey(k)); el.appendChild(b); }); keyboard.appendChild(el); });
  }

  function scoreGuess(guess){
    const out=Array(WORD_LENGTH).fill('absent');
    const remaining={};
    for(let i=0;i<WORD_LENGTH;i++){
      if(guess[i]===solution[i]) out[i]='correct'; else remaining[solution[i]]=(remaining[solution[i]]||0)+1;
    }
    for(let i=0;i<WORD_LENGTH;i++){
      if(out[i]==='correct') continue;
      if(remaining[guess[i]]>0){ out[i]='present'; remaining[guess[i]]--; }
    }
    return out;
  }

  function paint(){
    [...document.querySelectorAll('.tile')].forEach(t=>{t.textContent='';t.className='tile';});
    const keyRank={absent:1,present:2,correct:3}; const keyState={};
    state.guesses.forEach((g,r)=>{ const score=scoreGuess(g); score.forEach((s,c)=>{ const tile=tileAt(r,c); tile.textContent=g[c]; tile.classList.add('filled',s); if(!keyState[g[c]]||keyRank[s]>keyRank[keyState[g[c]]]) keyState[g[c]]=s; }); });
    if(state.status==='playing') [...state.current].forEach((ch,c)=>{ const tile=tileAt(state.guesses.length,c); tile.textContent=ch; tile.classList.add('filled'); });
    document.querySelectorAll('.key').forEach(k=>{k.classList.remove('absent','present','correct'); const ch=k.dataset.key.toUpperCase(); if(keyState[ch]) k.classList.add(keyState[ch]);});
    if(state.status!=='playing') shareBtn.classList.remove('hidden');
  }

  function tileAt(r,c){return document.querySelector(`.tile[data-r="${r}"][data-c="${c}"]`)}
  function say(text){message.textContent=text; clearTimeout(say.t); say.t=setTimeout(()=>message.textContent='',1800);}

  function handleKey(raw){
    if(state.status!=='playing') return;
    const k=raw.toLowerCase();
    if(k==='enter'){ submit(); return; }
    if(k==='⌫'||k==='backspace'){ state.current=state.current.slice(0,-1); saveGame(); paint(); return; }
    if(/^[a-z]$/.test(k)&&state.current.length<WORD_LENGTH){ state.current+=k.toUpperCase(); saveGame(); paint(); }
  }

  function submit(){
    if(state.current.length!==WORD_LENGTH){say('Not enough letters');return;}
    if(!valid.has(state.current)){say('Not in our word list');return;}
    const guess=state.current; state.guesses.push(guess); state.current='';
    if(guess===solution){ state.status='won'; finish(true); say(state.guesses.length===1?'Genius!':'Nice one!'); }
    else if(state.guesses.length>=MAX_GUESSES){ state.status='lost'; finish(false); say(solution); }
    saveGame(); paint();
  }

  function finish(won){
    const stats=loadStats(); const today=dateKey(localDay);
    if(stats.lastCompleted===today) return;
    stats.played++; if(won) stats.wins++;
    const yesterday=new Date(localDay); yesterday.setDate(yesterday.getDate()-1); const y=dateKey(yesterday);
    if(won) stats.streak=(stats.lastCompleted===y ? stats.streak+1 : 1); else stats.streak=0;
    stats.maxStreak=Math.max(stats.maxStreak,stats.streak); stats.lastCompleted=today; saveStats(stats);
  }

  function updateStatsDialog(){ const s=loadStats(); document.getElementById('played').textContent=s.played; document.getElementById('winPct').textContent=s.played?Math.round(s.wins/s.played*100):0; document.getElementById('streak').textContent=s.streak; document.getElementById('maxStreak').textContent=s.maxStreak; }

  async function share(){
    const squares={correct:'🟩',present:'🟨',absent:'⬛'};
    const grid=state.guesses.map(g=>scoreGuess(g).map(s=>squares[s]).join('')).join('\n');
    const result=state.status==='won'?`${state.guesses.length}/${MAX_GUESSES}`:`X/${MAX_GUESSES}`;
    const text=`Family Word #${dayIndex+1} ${result}\n\n${grid}`;
    try{ if(navigator.share) await navigator.share({text}); else {await navigator.clipboard.writeText(text); say('Copied');} }catch{}
  }

  window.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Backspace'||/^[a-zA-Z]$/.test(e.key)) handleKey(e.key);});
  document.getElementById('helpBtn').onclick=()=>helpDialog.showModal();
  document.getElementById('statsBtn').onclick=()=>{updateStatsDialog();statsDialog.showModal();};
  shareBtn.onclick=share;

  buildBoard(); buildKeyboard(); paint();
  if(state.status==='lost') message.textContent=solution;
})();
