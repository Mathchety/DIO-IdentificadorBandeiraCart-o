/**
 * Identificador de Bandeira de Cartão de Crédito
 * Desenvolvido como parte do desafio DIO
 *
 * Identifica as seguintes bandeiras:
 * Visa, MasterCard, American Express, Discover,
 * Diners Club, JCB, Elo e Hipercard
 */

// ---------------------------------------------------------------------------
// Definição das bandeiras e seus padrões de prefixo / comprimento
// ---------------------------------------------------------------------------

const CARD_BRANDS = [
  {
    id: 'amex',
    name: 'American Express',
    icon: '🟦',
    patterns: [/^3[47]/],
    lengths: [15],
    description: 'Prefixo 34 ou 37 · 15 dígitos',
  },
  {
    id: 'diners',
    name: 'Diners Club',
    icon: '🔵',
    patterns: [/^3(?:0[0-5]|[68])/],
    lengths: [14],
    description: 'Prefixo 300–305, 36 ou 38 · 14 dígitos',
  },
  {
    id: 'jcb',
    name: 'JCB',
    icon: '🟩',
    patterns: [/^(?:2131|1800|35\d{3})/],
    lengths: [15, 16],
    description: 'Prefixo 2131, 1800 ou 35xx · 15–16 dígitos',
  },
  {
    id: 'hipercard',
    name: 'Hipercard',
    icon: '🟥',
    patterns: [/^(?:606282|3841)/],
    lengths: [13, 16, 19],
    description: 'Prefixo 606282 ou 3841 · 13, 16 ou 19 dígitos',
  },
  {
    id: 'elo',
    name: 'Elo',
    icon: '🟡',
    patterns: [
      /^4011(78|79)/,
      /^43(1274|8935)/,
      /^45(1416|7393|763[12])/,
      /^50(4175|6699|67[0-7][0-9]|9000)/,
      /^627780/,
      /^63(6297|6368)/,
      /^65(0031|0035|0036|0037|003[8-9]|004[0-4]|00[4-5][0-9]|0[1-9][0-9]|[1-9][0-9]{2})/,
    ],
    lengths: [16],
    description: 'Emitida no Brasil · 16 dígitos',
  },
  {
    id: 'discover',
    name: 'Discover',
    icon: '🟠',
    patterns: [/^6(?:011|5[0-9]{2})/],
    lengths: [16],
    description: 'Prefixo 6011 ou 65 · 16 dígitos',
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    icon: '🔴',
    patterns: [/^5[1-5]/, /^2(?:2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/],
    lengths: [16],
    description: 'Prefixo 51–55 ou 2221–2720 · 16 dígitos',
  },
  {
    id: 'visa',
    name: 'Visa',
    icon: '💳',
    patterns: [/^4/],
    lengths: [13, 16, 19],
    description: 'Prefixo 4 · 13, 16 ou 19 dígitos',
  },
];

// ---------------------------------------------------------------------------
// Funções de detecção
// ---------------------------------------------------------------------------

/**
 * Remove todos os espaços e caracteres não-numéricos do número do cartão.
 * @param {string} value
 * @returns {string}
 */
function sanitize(value) {
  return value.replace(/\D/g, '');
}

/**
 * Formata os dígitos em grupos de 4 (ex.: "4111 1111 1111 1111").
 * @param {string} digits
 * @returns {string}
 */
function formatCardNumber(digits) {
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

/**
 * Identifica a bandeira do cartão com base nos dígitos fornecidos.
 * Retorna o objeto de bandeira ou null se não reconhecido.
 * @param {string} digits - Apenas dígitos, sem espaços
 * @returns {{ brand: object|null, lengthOk: boolean }}
 */
function identifyBrand(digits) {
  if (!digits || digits.length === 0) {
    return { brand: null, lengthOk: false };
  }

  for (const brand of CARD_BRANDS) {
    const matches = brand.patterns.some((pattern) => pattern.test(digits));
    if (matches) {
      const lengthOk = brand.lengths.includes(digits.length);
      return { brand, lengthOk };
    }
  }

  return { brand: null, lengthOk: false };
}

/**
 * Verifica se o número do cartão passa na validação de Luhn.
 * @param {string} digits
 * @returns {boolean}
 */
function luhnCheck(digits) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// ---------------------------------------------------------------------------
// Inicialização da UI
// ---------------------------------------------------------------------------

const cardInput = document.getElementById('cardNumber');
const clearBtn = document.getElementById('clearBtn');
const brandIcon = document.getElementById('brandIcon');
const cardNumberDisplay = document.getElementById('cardNumberDisplay');
const cardPreview = document.getElementById('cardPreview');
const brandName = document.getElementById('brandName');
const brandInfo = document.getElementById('brandInfo');
const result = document.getElementById('result');
const brandsGrid = document.getElementById('brandsGrid');

/** Renderiza as bandeiras suportadas na grade. */
function renderBrandsGrid() {
  brandsGrid.innerHTML = '';
  CARD_BRANDS.forEach((brand) => {
    const card = document.createElement('div');
    card.className = 'brand-card';
    card.id = `brand-card-${brand.id}`;
    card.innerHTML = `
      <span class="brand-card-icon">${brand.icon}</span>
      <span class="brand-card-name">${brand.name}</span>
    `;
    brandsGrid.appendChild(card);
  });
}

/** Atualiza o destaque na grade de bandeiras. */
function highlightBrandCard(brandId) {
  document.querySelectorAll('.brand-card').forEach((el) => el.classList.remove('active'));
  if (brandId) {
    const el = document.getElementById(`brand-card-${brandId}`);
    if (el) el.classList.add('active');
  }
}

/** Atualiza toda a UI com base nos dígitos do cartão. */
function updateUI(digits) {
  const formatted = formatCardNumber(digits);
  const isEmpty = digits.length === 0;

  // Botão limpar
  clearBtn.classList.toggle('visible', !isEmpty);

  // Exibição do número no preview do cartão
  if (isEmpty) {
    cardNumberDisplay.textContent = '•••• •••• •••• ••••';
    cardNumberDisplay.classList.remove('active');
  } else {
    const maxLen = digits.length <= 16 ? 16 : 19;
    const padded = digits.padEnd(maxLen, '•');
    cardNumberDisplay.textContent = formatCardNumber(padded.slice(0, maxLen));
    cardNumberDisplay.classList.add('active');
  }

  if (isEmpty) {
    // Estado vazio
    brandIcon.textContent = '?';
    brandName.textContent = 'Aguardando número...';
    brandName.className = 'brand-name';
    brandInfo.textContent = '';
    result.className = 'result';
    cardPreview.classList.remove('identified');
    highlightBrandCard(null);
    return;
  }

  const { brand, lengthOk } = identifyBrand(digits);

  if (!brand) {
    brandIcon.textContent = '❓';
    brandName.textContent = 'Bandeira não reconhecida';
    brandName.className = 'brand-name invalid';
    brandInfo.textContent = 'Verifique se o número está correto.';
    result.className = 'result error';
    cardPreview.classList.remove('identified');
    highlightBrandCard(null);
    return;
  }

  // Bandeira identificada — verifica comprimento e Luhn
  brandIcon.textContent = brand.icon;
  cardPreview.classList.add('identified');
  highlightBrandCard(brand.id);

  if (lengthOk) {
    const valid = luhnCheck(digits);
    brandName.textContent = `${brand.name} ${valid ? '✔' : '(número inválido)'}`;
    brandName.className = `brand-name ${valid ? 'identified' : 'invalid'}`;
    brandInfo.textContent = valid
      ? `${brand.description} · Número válido (Luhn OK)`
      : `${brand.description} · Falha na validação Luhn`;
    result.className = `result ${valid ? 'success' : 'error'}`;
  } else {
    brandName.textContent = `${brand.name} (digitando…)`;
    brandName.className = 'brand-name identified';
    brandInfo.textContent = brand.description;
    result.className = 'result';
  }
}

// ---------------------------------------------------------------------------
// Event listeners
// ---------------------------------------------------------------------------

cardInput.addEventListener('input', (e) => {
  const raw = e.target.value;
  const digits = sanitize(raw);

  // Re-formata o input enquanto o usuário digita
  const formatted = formatCardNumber(digits.slice(0, 19));
  if (e.target.value !== formatted) {
    e.target.value = formatted;
  }

  updateUI(digits.slice(0, 19));
});

clearBtn.addEventListener('click', () => {
  cardInput.value = '';
  updateUI('');
  cardInput.focus();
});

// Permite apenas dígitos, Backspace, Delete, setas e Tab
cardInput.addEventListener('keydown', (e) => {
  const allowed = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
    'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End',
  ];
  if (!allowed.includes(e.key) && !/^\d$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
  }
});

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

renderBrandsGrid();
updateUI('');
