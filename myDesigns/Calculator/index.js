// Grab the elements we need once, up front.
const num1El = document.getElementById("num1-el");
const num2El = document.getElementById("num2-el");
const operatorEl = document.getElementById("operator-el");
const sumEl = document.getElementById("sum-el");

const addBtn = document.getElementById("add-btn");
const subtractBtn = document.getElementById("subtract-btn");
const multiplyBtn = document.getElementById("multiply-btn");
const divideBtn = document.getElementById("divide-btn");
const clearBtn = document.getElementById("clear-btn");

// Reads the two number inputs and returns them as actual numbers.
// parseFloat handles decimals; if a field is empty or invalid, we fall back to 0.
function getOperands() {
  const num1 = parseFloat(num1El.value);
  const num2 = parseFloat(num2El.value);

  return {
    num1: Number.isNaN(num1) ? 0 : num1,
    num2: Number.isNaN(num2) ? 0 : num2,
  };
}

// Updates the operator symbol shown between the two inputs, and the result.
function showResult(symbol, result) {
  operatorEl.textContent = symbol;
  sumEl.textContent = result;
  console.log(`${symbol} pressed -> result: ${result}`);
}

function add() {
  const { num1, num2 } = getOperands();
  showResult("+", num1 + num2);
}

function subtract() {
  const { num1, num2 } = getOperands();
  showResult("−", num1 - num2);
}

function multiply() {
  const { num1, num2 } = getOperands();
  showResult("×", num1 * num2);
}

function divide() {
  const { num1, num2 } = getOperands();

  if (num2 === 0) {
    // Division by zero: show a clear error instead of "Infinity" or "NaN".
    operatorEl.textContent = "÷";
    sumEl.textContent = "Error";
    console.log("÷ pressed -> division by zero");
    return;
  }

  showResult("÷", num1 / num2);
}

// Resets both inputs and the display back to a clean state.
function clearAll() {
  num1El.value = "";
  num2El.value = "";
  operatorEl.textContent = "+";
  sumEl.textContent = "0";
  console.log("cleared");
}

// Wire up the buttons.
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
clearBtn.addEventListener("click", clearAll);