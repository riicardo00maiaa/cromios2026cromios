# Cromos Mundial 2026 — Quiosque Bracalândia

## Como abrir
Abre o ficheiro `index.html` diretamente no browser. Não precisas de servidor nem de instalar nada.

---

## Estrutura do projeto

```
cromos-site/
│
├── index.html          → Estrutura da página (HTML)
│
├── css/
│   └── style.css       → Todo o design e cores
│
├── js/
│   ├── data.js         → Lista de países e configurações
│   ├── state.js        → Guarda/carrega o progresso
│   ├── ui.js           → Constrói a tabela e gere cliques
│   └── main.js         → Arranca a aplicação
│
└── README.md           → Este ficheiro
```

---

## O que modificar em cada ficheiro

### `css/style.css`
- Cores do site → secção `:root` no topo
- Tamanho dos botões de cromo → `.sticker-btn`
- Aspeto do cabeçalho → `header`
- Aspeto em telemóvel → `@media (max-width: 768px)`

### `js/data.js`
- Adicionar ou remover países → array `COUNTRIES`
- Mudar número de cromos por país → `STICKERS_PER_COUNTRY`
- Mudar número de cromos FWC → `FWC_COUNT`

### `js/state.js`
- Lógica de guardar/carregar progresso (localStorage)
- Função `resetAll()` — reinicia tudo

### `js/ui.js`
- Como os botões são construídos e como respondem ao clique
- Lógica de filtros (Todos / Só em falta / Completos)
- Contadores por linha e globais

### `js/main.js`
- Ordem de arranque da aplicação

---

## Como o progresso é guardado
O progresso é guardado automaticamente no **localStorage** do browser.
Isso significa que fica guardado mesmo que feches o browser, mas:
- Fica só naquele browser/computador
- Se limpares os dados do browser, perde-se

Se quiseres guardar noutro sítio, tens de exportar o JSON do `localStorage`.
