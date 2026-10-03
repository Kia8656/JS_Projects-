// const display = document.getElementById("display");

// function appendToDisplay(input) {
//   display.value += input;
// }
// function clearDisplay() {
//   display.value = "";
// }

// function calculate() {
//   try {
//     display.value = eval(display.value);
//   } catch (error) {
//     display.value = "Error";
//   }
// }

// Get the input box where the calculator result is shown
const display = document.getElementById("display");

// This function adds numbers, operators, and dots to the display
function appendToDisplay(input) {
  // If the display is not found, stop the function
  if (!display) return;

  // Get the last character currently shown
  const lastChar = display.value.slice(-1);

  // Store the four math operators we allow
  const operators = ["+", "-", "*", "/"];

  // Check if the user tries to add a decimal point
  if (input === ".") {
    const currentValue = display.value;

    // Find the last operator in the current expression
    const lastOperatorIndex = Math.max(
      currentValue.lastIndexOf("+"),
      currentValue.lastIndexOf("-"),
      currentValue.lastIndexOf("*"),
      currentValue.lastIndexOf("/"),
    );

    // Get the number currently being typed
    const currentNumber = currentValue.slice(lastOperatorIndex + 1);

    // Do not allow two dots in the same number
    if (currentNumber.includes(".")) {
      return;
    }
  }

  // Prevent invalid operator use like "++", "--", "*+", etc.
  if (
    operators.includes(input) &&
    (display.value === "" || operators.includes(lastChar))
  ) {
    // Allow a minus sign only at the beginning or after another operator
    if (
      input === "-" &&
      (display.value === "" || operators.includes(lastChar))
    ) {
      display.value += input;
      return;
    }
    return;
  }

  // Add the new character to the display
  display.value += input;
}

// Clear the calculator screen
function clearDisplay() {
  if (!display) return;
  display.value = "";
}

// Evaluate the expression typed by the user
function calculate() {
  // If no expression exists, do nothing
  if (!display || !display.value) return;

  try {
    // Save the full expression like "12+5"
    const expression = display.value;

    // Use JavaScript's Function to evaluate safely
    const result = Function(`"use strict"; return (${expression});`)();

    // If the result is a whole number, show it without decimals
    display.value = Number.isInteger(result)
      ? String(result)
      : Number(result.toFixed(10)).toString();
  } catch (error) {
    // If the expression is invalid, show an error
    display.value = "Error";
  }
}
