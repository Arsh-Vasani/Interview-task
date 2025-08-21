// Tabs
const tabButtons = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));

function setActiveTab(id) {
  tabButtons.forEach(b => b.classList.toggle('is-active', b.dataset.tab === id));
  panels.forEach(p => p.classList.toggle('is-active', p.id === id));
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
});

// Simple Timer
const timerBtn = document.getElementById('timerBtn');
const timerDisplay = document.getElementById('timerDisplay');

let timerInterval = null;
let elapsedMs = 0;
let lastStartedAt = null;

function format(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
  const now = Date.now();
  const current = elapsedMs + (lastStartedAt ? now - lastStartedAt : 0);
  if (timerDisplay) timerDisplay.textContent = format(current);
}

function startTimer() {
  if (timerInterval) return;
  lastStartedAt = Date.now();
  timerInterval = setInterval(updateTimer, 200);
  timerBtn.textContent = 'Stop Timer';
  timerBtn.classList.add('btn-primary');
}

function stopTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedMs += Date.now() - lastStartedAt;
  lastStartedAt = null;
  updateTimer();
  timerBtn.textContent = 'Start Timer';
  timerBtn.classList.remove('btn-primary');
}

if (timerBtn) {
  timerBtn.addEventListener('click', () => {
    if (timerInterval) stopTimer(); else startTimer();
  });
}

// Initialize
updateTimer();


