const display = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTimer, 10);
    isRunning = true;
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    updateTimer();
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(
    2,
    "0",
  );
  const minutes = String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(
    2,
    "0",
  );
  const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(
    2,
    "0",
  );
  const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(
    2,
    "0",
  );

  display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
