const numInput1 = document.getElementById("num-input1");
const numInput2 = document.getElementById("num-input2");
const numInput3 = document.getElementById("num-input3");
const numBtn = document.getElementById("num-btn");
const min = 1;
const max = 6;

// function randomNumber() {
//   return Math.floor(Math.random() * max) + min;
// }

// numBtn.addEventListener("click", () => {
//   const count = randomNumber();
//   numInput1.value = count;
// });

numBtn.addEventListener("click", () => {
  const randomNumber1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomNumber2 = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomNumber3 = Math.floor(Math.random() * (max - min + 1)) + min;

  numInput1.value = randomNumber1;
  numInput2.value = randomNumber2;
  numInput3.value = randomNumber3;
});
