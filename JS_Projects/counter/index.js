const displayEl = document.getElementById("display-el");
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const resetBtn = document.getElementById("resetbtn");
let count = 0;

increaseBtn.addEventListener("click", () => {
  count++;
  displayEl.textContent = count;
});

decreaseBtn.addEventListener("click", () => {
  count--;
  displayEl.textContent = count;
});

resetBtn.addEventListener("click", () => {
  count = 0;
  displayEl.textContent = count;
});
