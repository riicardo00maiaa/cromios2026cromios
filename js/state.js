// ============================================================
// state.js — Gestão do estado (o que tenho / não tenho)
// Responsável por guardar e carregar o progresso.
// Usa o localStorage do browser para persistir os dados.
// ============================================================

// Cria um estado completamente vazio (todos os cromos em falta)
function defaultState() {
  const s = { countries: {}, fwc: {} };

  COUNTRIES.forEach(country => {
    s.countries[country] = {};
    for (let i = 1; i <= STICKERS_PER_COUNTRY; i++) {
      s.countries[country][i] = false; // false = não tenho
    }
  });

  for (let i = FWC_START; i <= FWC_END; i++) {
    s.fwc[i] = false;
  }

  return s;
}

// Carrega o estado guardado, ou cria um novo se não existir
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Erro ao carregar progresso:", e);
  }
  return defaultState();
}

// Guarda o estado atual no browser
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // Mostra o badge "Guardado" por 1.5 segundos
  const badge = document.getElementById("save-badge");
  badge.classList.add("show");
  setTimeout(() => badge.classList.remove("show"), 1500);
}

// Reinicia tudo para zero (confirma antes)
function resetAll() {
  if (!confirm("Tens a certeza? Isto apaga TODO o progresso!")) return;

  // Repõe o estado
  state = defaultState();

  // Atualiza todos os botões na tabela
  document.querySelectorAll(".sticker-btn[data-country]").forEach(btn => {
    setButtonState(btn, false);
  });

  // Atualiza botões FWC
  document.querySelectorAll(".sticker-btn[data-fwc]").forEach(btn => {
    setButtonState(btn, false);
  });

  // Atualiza contadores
  COUNTRIES.forEach(c => updateRowStats(c));
  updateGlobalStats();
  saveState();
}

// Estado global — carregado ao iniciar a página
let state = loadState();
