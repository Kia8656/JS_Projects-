function generateSecurePassword(
  length,
  includeLower,
  includeUpper,
  includeNumbers,
  includeSymbols,
) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allowedChars = "";
  if (includeLower) allowedChars += lower;
  if (includeUpper) allowedChars += upper;
  if (includeNumbers) allowedChars += numbers;
  if (includeSymbols) allowedChars += symbols;

  if (allowedChars === "") return "Please select a character";

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += allowedChars[array[i] % allowedChars.length];
  }
  return password;
}

const passwordDisplay = document.getElementById("passwordDisplay");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const lengthInput = document.getElementById("lengthInput");
const chkLower = document.getElementById("chkLower");
const chkUpper = document.getElementById("chkUpper");
const chkNumbers = document.getElementById("chkNumbers");
const chkSymbols = document.getElementById("chkSymbols");

function updatePassword() {
  const length = parseInt(lengthInput.value) || 16;
  const password = generateSecurePassword(
    length,
    chkLower.checked,
    chkUpper.checked,
    chkNumbers.checked,
    chkSymbols.checked,
  );
  passwordDisplay.value = password;
}

generateBtn.addEventListener("click", updatePassword);

copyBtn.addEventListener("click", () => {
  if (!passwordDisplay.value || passwordDisplay.value.startsWith("Please"))
    return;

  navigator.clipboard.writeText(passwordDisplay.value).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.backgroundColor = "#6c757d";
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.backgroundColor = "#28a745";
    }, 1500);
  });
});

// updatePassword();
