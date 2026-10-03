const inputEl = document.getElementById("dice-input");
const submitBtn = document.getElementById("submit-btn");
const numOfDice = document.getElementById("num-of-dice");
const diceImages = document.getElementById("dice-images");

function rollDice() {
  const count = Number(inputEl.value) || 1;
  const values = [];
  const images = [];

  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    values.push(value);
    images.push(`<img src="Images/${value}.png" alt="Dice ${value}" />`);
  }

  numOfDice.textContent = `Dice: ${values.join(", ")}`;
  diceImages.innerHTML = images.join("");
}

submitBtn.addEventListener("click", rollDice);
