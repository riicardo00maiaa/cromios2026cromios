// ============================================================
// main.js — Ponto de entrada
// Este ficheiro arranca a aplicação.
// É o último a ser carregado (ver index.html).
// ============================================================

// Constrói a página quando o HTML estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  buildTableHeader(); // adiciona colunas 1-20 no cabeçalho
  buildTable();       // cria as linhas por país
  buildFWC();         // cria os cromos especiais FWC
  updateGlobalStats(); // atualiza os contadores iniciais
});
