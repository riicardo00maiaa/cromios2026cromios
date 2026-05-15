// ============================================================
// data.js — Dados da coleção
// Aqui defines quantos cromos tem cada país,
// quais os países, e os cromos especiais FWC.
// ============================================================

// Número de cromos por seleção (igual para todos)
const STICKERS_PER_COUNTRY = 20;

// Cromos especiais FWC: do número 9 ao 19
const FWC_START = 0;
const FWC_END   = 19; // inclusivo
const FWC_COUNT = FWC_END - FWC_START + 1; // = 11

// Lista de todos os países na coleção
const COUNTRIES = [
  "ALG", "ARG", "AUS", "AUT", "BEL", "BIH", "BRA", "CAN", "CIV", "COD",
  "COL", "CPV", "CRO", "CUW", "CZE", "ECU", "EGY", "ENG", "ESP", "FRA",
  "GER", "GHA", "HAI", "IRN", "IRQ", "JOR", "JPN", "KOR", "KSA", "MAR",
  "MEX", "NED", "NOR", "NZL", "PAN", "PAR", "POR", "QAT", "RSA", "SCO",
  "SEN", "SUI", "SWE", "TUN", "TUR", "URU", "USA", "UZB"
];

// Chave usada para guardar o progresso no browser (localStorage)
const STORAGE_KEY = "panini2026";
