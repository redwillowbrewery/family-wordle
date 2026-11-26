(() => {
  const get = id => document.getElementById(id);
  const calendarDay = d => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000;
  const today = new Date();
  const day = calendarDay(today);
  const index = Math.max(0, day - Date.UTC(2026, 10, 26) / 86400000);
  const [topic, title, question, hint, answer, solution, extension] = challengeForDay(index);
  const storageKey = 'family-maths:v1:' + day;
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }
  function refreshDay() {
    if (calendarDay(new Date()) !== day) {
      location.reload();
      return true;
    }
    return false;
  }
  for (const [id, value] of Object.entries({topic, title, question, hint, solution, extension})) {
    get(id).textContent = value;
  }
  get('date').textContent = today.toLocaleDateString('en-GB', {weekday:'long', day:'numeric', month:'long'});
  const field = get('answer');
  const form = get('answer-form');
  const working = get('working');
  function render() {
    field.value = state.input || '';
    form.hidden = Boolean(state.solved || state.revealed);
    get('feedback').textContent = state.solved ? 'Correct. Nicely done!' :
      state.revealed ? 'Solution revealed.' : state.retry ? 'Have another go. The hint is there if you need it.' : '';
    get('stretch').hidden = !form.hidden;
  }
  render();
  working.open = Boolean(state.solved || state.revealed);
  field.addEventListener('input', () => {
    state.input = field.value;
    state.retry = false;
    get('feedback').textContent = '';
    save();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (refreshDay()) return;
    const value = field.value.trim();
    if (!/^[+-]?\d+$/.test(value)) {
      get('feedback').textContent = 'Enter a whole number.';
      return;
    }
    state.solved = Number(value) === answer;
    state.retry = !state.solved;
    save();
    render();
    if (state.solved) working.open = true;
  });
  working.addEventListener('toggle', () => {
    if (working.open && !state.solved && !state.revealed) {
      state.revealed = true;
      save();
      render();
    }
  });
  window.addEventListener('pageshow', refreshDay);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshDay(); });
  const midnight = new Date(today);
  midnight.setHours(24, 0, 0, 0);
  setTimeout(refreshDay, midnight - today + 100);
})();
