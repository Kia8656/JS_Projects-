const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const attmDisplay = document.getElementById("attm-display");
const displayResult = document.getElementById("display");
const min = 1;
const max = 100;
const answer = Math.floor(Math.random() * (max - min + 1)) + min;
let attempt = 1;
let guess;
let running = true;

function checkGuess() {
  guess = Number(inputEl.value);
  attmDisplay.textContent = `${attempt}`;

  if (guess === answer) {
    displayResult.textContent = `Congratulations! You got it right! the number was ${answer}`;
    setGameOver();
  } else if (guess === 10) {
    displayResult.textContent = "!!!GAME OVER!!! better luck next time";
    setGameOver();
  } else {
    displayResult.textContent = "Wrong!";
    if (guess < answer) {
      displayResult.textContent = "too low!";
    } else if (guess > answer) {
      displayResult.textContent = "too high!";
    }
  }

  attempt++;
  inputEl.value = "";
  inputEl.focus();
}

inputBtn.addEventListener("click", checkGuess);

inputEl.addEventListener("input", () => {
  if (inputEl.value !== "" && Number(inputEl.value) < min) {
    inputEl.value = "";
  }
});

// inputEl.addEventListener(
//   "wheel",
//   (event) => {
//     event.preventDefault();
//   },
//   { passive: false },
// );

function setGameOver() {
  inputEl.disabled = true;
  inputBtn.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guess = 1;
  displayResult.textContent = "";
  resetButton.parentNode.removeChild(resetButton);
  inputEl.disabled = false;
  inputBtn.disabled = false;
  inputEl.value = "";
  inputEl.focus();

  displayResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
