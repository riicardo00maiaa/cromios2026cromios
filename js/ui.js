// ============================================================
// ui.js — Interface: construção da tabela e interações
// Funções que criam os elementos HTML e respondem a cliques.
// ============================================================

// Atualiza o visual de um botão de cromo (✓ verde ou ✕ vermelho)
function setButtonState(btn, have) {
  btn.textContent = have ? "✓" : "✕";
  btn.className   = "sticker-btn " + (have ? "have" : "missing");
}

// Adiciona os números 1 a 20 no cabeçalho da tabela
function buildTableHeader() {
  const headerRow = document.getElementById("header-row");
  for (let i = 1; i <= STICKERS_PER_COUNTRY; i++) {
    const th = document.createElement("th");
    th.textContent = i;
    headerRow.appendChild(th);
  }
}

// Constrói todas as linhas da tabela (uma por país)
function buildTable() {
  const tbody = document.getElementById("tbody");

  COUNTRIES.forEach(country => {
    const tr = document.createElement("tr");
    tr.dataset.country = country;

    // Coluna: nome do país
    const tdName = document.createElement("td");
    tdName.textContent = country;
    tr.appendChild(tdName);

    // Coluna: quantos tenho
    const tdHave = document.createElement("td");
    tdHave.className = "td-have";
    tdHave.id = `have-${country}`;
    tr.appendChild(tdHave);

    // Coluna: quantos faltam
    const tdMiss = document.createElement("td");
    tdMiss.className = "td-miss";
    tdMiss.id = `miss-${country}`;
    tr.appendChild(tdMiss);

    // Colunas: um botão por cada cromo (1 a 20)
    for (let i = 1; i <= STICKERS_PER_COUNTRY; i++) {
      const td  = document.createElement("td");
      const btn = document.createElement("button");
      btn.className         = "sticker-btn";
      btn.dataset.country   = country;
      btn.dataset.num       = i;
      btn.onclick           = () => toggleSticker(country, i, btn);
      setButtonState(btn, state.countries[country][i]);
      td.appendChild(btn);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
    updateRowStats(country);
  });
}

// Constrói a grelha de cromos FWC especiais
function buildFWC() {
  const grid = document.getElementById("fwc-grid");

  for (let num = FWC_START; num <= FWC_END; num++) {
    const wrap = document.createElement("div");
    wrap.className = "fwc-item";

    // Etiqueta com o número real (9, 10, ... 19)
    const lbl = document.createElement("div");
    lbl.className   = "fwc-lbl";
    lbl.textContent = num;

    const btn = document.createElement("button");
    btn.className = "sticker-btn";
    btn.dataset.fwc = num;
    btn.onclick = () => toggleFWC(num, btn);
    setButtonState(btn, state.fwc[num]);

    wrap.appendChild(lbl);
    wrap.appendChild(btn);
    grid.appendChild(wrap);
  }
}

// ============================================================
// TOGGLE — alterna o estado de um cromo de país
// ============================================================
function toggleSticker(country, num, btn) {
  state.countries[country][num] = !state.countries[country][num];
  setButtonState(btn, state.countries[country][num]);
  updateRowStats(country);
  updateGlobalStats();
  saveState();
}

// Alterna o estado de um cromo FWC
function toggleFWC(i, btn) {
  state.fwc[i] = !state.fwc[i];
  setButtonState(btn, state.fwc[i]);
  updateGlobalStats();
  saveState();
}

// ============================================================
// CONTADORES
// ============================================================

// Atualiza os contadores "Têm" e "Faltam" de uma linha
function updateRowStats(country) {
  const vals = Object.values(state.countries[country]);
  const have = vals.filter(Boolean).length;
  document.getElementById(`have-${country}`).textContent = have;
  document.getElementById(`miss-${country}`).textContent = STICKERS_PER_COUNTRY - have;
}

// Atualiza os contadores globais no cabeçalho
function updateGlobalStats() {
  let totalHave = 0;
  let totalMiss = 0;

  COUNTRIES.forEach(c => {
    const vals = Object.values(state.countries[c]);
    totalHave += vals.filter(Boolean).length;
    totalMiss += vals.filter(v => !v).length;
  });

  // Adiciona cromos FWC ao total
  const fwcHave = Object.values(state.fwc).filter(Boolean).length;
  totalHave += fwcHave;
  totalMiss += FWC_COUNT - fwcHave;

  const total = totalHave + totalMiss;
  const pct   = total ? Math.round(totalHave / total * 100) : 0;

  document.getElementById("s-have").textContent        = totalHave;
  document.getElementById("s-miss").textContent        = totalMiss;
  document.getElementById("s-total").textContent       = total;
  document.getElementById("s-pct").textContent         = pct + "%";
  document.getElementById("progress-fill").style.width = pct + "%";
}

// ============================================================
// FILTROS E PESQUISA
// ============================================================
let currentFilter = "all";

function setFilter(filter, el) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  filterTable();
}

function filterTable() {
  const query = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll("#tbody tr").forEach(tr => {
    const country = tr.dataset.country;
    const have    = Object.values(state.countries[country]).filter(Boolean).length;

    const matchSearch = country.toLowerCase().includes(query);
    const matchFilter =
      currentFilter === "all"      ? true :
      currentFilter === "missing"  ? have < STICKERS_PER_COUNTRY :
      currentFilter === "complete" ? have === STICKERS_PER_COUNTRY : true;

    tr.classList.toggle("hidden", !matchSearch || !matchFilter);
  });
}
