// Get elements from the DOM
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const resultEl = document.getElementById('result');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

// Character sets
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function generatePassword() {
  const length = +lengthEl.value;
  const includeUpper = uppercaseEl.checked;
  const includeLower = lowercaseEl.checked;
  const includeNumber = numbersEl.checked;
  const includeSymbol = symbolsEl.checked;

  let allowedChars = "";
  let password = "";

  if (includeUpper) allowedChars += UPPERCASE;
  if (includeLower) allowedChars += LOWERCASE;
  if (includeNumber) allowedChars += NUMBERS;
  if (includeSymbol) allowedChars += SYMBOLS;

  if (allowedChars === "") {
    alert("Please select at least one character type!");
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  resultEl.value = password;
  getStrength(password); // ✅ Show strength
}

function getStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const strengthEl = document.getElementById("strength");

  if (strength <= 1) {
    strengthEl.textContent = "Weak Password 🔴";
    strengthEl.className = "text-red-500 text-center text-sm mt-2 font-semibold";
  } else if (strength === 2 || strength === 3) {
    strengthEl.textContent = "Medium Password 🟡";
    strengthEl.className = "text-yellow-400 text-center text-sm mt-2 font-semibold";
  } else {
    strengthEl.textContent = "Strong Password 🟢";
    strengthEl.className = "text-green-400 text-center text-sm mt-2 font-semibold";
  }
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  const password = resultEl.value;

  if (!password) {
    alert("No password to copy!");
    return;
  }

  navigator.clipboard.writeText(password)
    .then(() => {
      alert("Password copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy password.");
    });
});
