// ============================================
// Actividad 7: Password Generator - JavaScript
// ============================================

// --- Character Sets ---
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// --- DOM References ---
const passwordText = document.getElementById('password-text');
const btnCopy = document.getElementById('btn-copy');
const copyLabel = document.getElementById('copy-label');
const charLengthSlider = document.getElementById('char-length');
const lengthValue = document.getElementById('length-value');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const strengthText = document.getElementById('strength-text');
const strengthBars = document.getElementById('strength-bars');
const btnGenerate = document.getElementById('btn-generate');

// --- Slider Update ---
function updateSlider() {
  const value = charLengthSlider.value;
  const max = charLengthSlider.max;
  const percentage = (value / max) * 100;

  lengthValue.textContent = value;

  // Actualizar el color del slider (fill effect)
  charLengthSlider.style.background = `linear-gradient(to right, #a4ffaf ${percentage}%, #18171f ${percentage}%)`;
}

charLengthSlider.addEventListener('input', () => {
  updateSlider();
  updateStrength();
});

// Inicializar slider
updateSlider();

// --- Generate Password ---
function generatePassword() {
  const length = parseInt(charLengthSlider.value);
  const useUppercase = includeUppercase.checked;
  const useLowercase = includeLowercase.checked;
  const useNumbers = includeNumbers.checked;
  const useSymbols = includeSymbols.checked;

  // Verificar que al menos una opción esté seleccionada
  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
    passwordText.textContent = 'Select an option';
    passwordText.classList.add('placeholder');
    return;
  }

  // Construir el pool de caracteres
  let charPool = '';
  let guaranteedChars = [];

  if (useUppercase) {
    charPool += UPPERCASE;
    guaranteedChars.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (useLowercase) {
    charPool += LOWERCASE;
    guaranteedChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }
  if (useNumbers) {
    charPool += NUMBERS;
    guaranteedChars.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  }
  if (useSymbols) {
    charPool += SYMBOLS;
    guaranteedChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  // Generar la contraseña
  let password = '';

  // Asegurar que tenga al menos un carácter de cada tipo seleccionado
  for (let i = 0; i < guaranteedChars.length && i < length; i++) {
    password += guaranteedChars[i];
  }

  // Rellenar el resto con caracteres aleatorios del pool
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  // Mezclar la contraseña (Fisher-Yates shuffle)
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  password = passwordArray.join('');

  // Mostrar la contraseña
  passwordText.textContent = password;
  passwordText.classList.remove('placeholder');

  // Actualizar la fortaleza
  updateStrength();

  // Animación sutil
  passwordText.style.animation = 'none';
  passwordText.offsetHeight; // Force reflow
  passwordText.style.animation = 'fadeIn 0.3s ease';
}

// --- Update Strength ---
function updateStrength() {
  const length = parseInt(charLengthSlider.value);
  const optionsCount = [
    includeUppercase.checked,
    includeLowercase.checked,
    includeNumbers.checked,
    includeSymbols.checked
  ].filter(Boolean).length;

  // Calcular la fortaleza
  let strength = 0;

  if (length >= 8) strength++;
  if (length >= 12) strength++;
  if (length >= 16) strength++;
  if (optionsCount >= 2) strength++;
  if (optionsCount >= 3) strength++;
  if (optionsCount >= 4) strength++;
  if (includeSymbols.checked) strength++;

  // Determinar el nivel
  let level;
  if (strength <= 2) {
    level = { text: 'TOO WEAK!', class: 'too-weak', bars: 1 };
  } else if (strength <= 3) {
    level = { text: 'WEAK', class: 'weak', bars: 2 };
  } else if (strength <= 5) {
    level = { text: 'MEDIUM', class: 'medium', bars: 3 };
  } else {
    level = { text: 'STRONG', class: 'strong', bars: 4 };
  }

  // Actualizar UI
  strengthText.textContent = level.text;

  const bars = strengthBars.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    bar.className = 'bar';
    if (i < level.bars) {
      bar.classList.add(level.class);
    }
  });
}

// --- Copy Password ---
async function copyPassword() {
  const password = passwordText.textContent;

  if (!password || password === 'Select an option') return;

  try {
    await navigator.clipboard.writeText(password);
    copyLabel.classList.add('visible');

    setTimeout(() => {
      copyLabel.classList.remove('visible');
    }, 2000);
  } catch (err) {
    // Fallback para navegadores que no soportan clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    copyLabel.classList.add('visible');
    setTimeout(() => {
      copyLabel.classList.remove('visible');
    }, 2000);
  }
}

// --- Event Listeners ---
btnGenerate.addEventListener('click', generatePassword);
btnCopy.addEventListener('click', copyPassword);

// Update strength when checkboxes change
[includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(checkbox => {
  checkbox.addEventListener('change', updateStrength);
});

// Generate initial password
generatePassword();

// --- CSS Animation ---
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
