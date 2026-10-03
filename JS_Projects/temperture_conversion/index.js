const inputEl = document.getElementById("input-el");
const celsiusToFahrenheit = document.getElementById("celsius");
const fahrenheitToCelsius = document.getElementById("fahrenheit");
const submitBtn = document.getElementById("submit-btn");
const resultDisplay = document.getElementById("result-display");
let temp;

function conversion() {
  const value = Number(inputEl.value);

  if (inputEl.value === "") {
    resultDisplay.textContent =
      "Please type a number and select a conversion unit";
    return;
  }

  if (!celsiusToFahrenheit.checked && !fahrenheitToCelsius.checked) {
    resultDisplay.textContent = "Please select a conversion unit!";
    return;
  }

  if (celsiusToFahrenheit.checked) {
    temp = (value * 9) / 5 + 32;
    resultDisplay.textContent = temp.toFixed(1) + "°F";
  } else if (fahrenheitToCelsius.checked) {
    temp = ((value - 32) * 5) / 9;
    resultDisplay.textContent = temp.toFixed(1) + "°C";
  }
}

celsiusToFahrenheit.addEventListener("dblclick", () => {
  if (celsiusToFahrenheit.checked) {
    celsiusToFahrenheit.checked = false;
    resultDisplay.textContent = "";
    inputEl.value = "";
  }
});

fahrenheitToCelsius.addEventListener("dblclick", () => {
  if (fahrenheitToCelsius.checked) {
    fahrenheitToCelsius.checked = false;
    resultDisplay.textContent = "";
    inputEl.value = "";
  }
});

submitBtn.addEventListener("click", conversion);
