export interface KPI {
  label: string;
  value: string;
  sub: string;
  color: 'vermelho' | 'ambar' | 'verde' | 'azul';
}

export interface SKU {
  nome: string;
  volume: number;
}

export interface Plant {
  planta: string;
  capacidade: number;
  utilizacao: number;
  skus: SKU[];
  totalProduzido: number;
}

export interface Modal {
  nome: string;
  custo: number;
  leadTime: number;
  avaria: number;
  origem: string;
  destino: string;
  custoTotal: number;
  descricao: string;
  viavel: boolean;
}

export interface Scenario {
  id: string;
  nome: string;
  descricao: string;
  custoTotal: number;
  custoHL: number;
  leadTime: number;
  riscoLabel: string;
  riscoCor: string;
  complexidade: string;
  recomendado: boolean;
  detalhes: string[];
}

export interface ScatterPoint {
  cenario: string;
  custo: number;
  leadTime: number;
  risco: string;
  cor: string;
}

export interface Acao {
  area: string;
  acao: string;
}

export interface RiskItem {
  cenario: string;
  riscoScore: number;
  descricao: string;
  contingencia: string;
}

export interface BiasData {
  forecastBias: number;
  demandaForecast: number;
  demandaRealEstimada: number;
  sobreestoque: number;
  contingencias: string[];
}

export interface DOISubregiao {
  subregiao: string;
  doi: number;
  seguro: boolean;
}

export const kpis: KPI[] = [
  { label: 'Gap de Demanda', value: '11.680 HL', sub: '+30% Malzbier NENO', color: 'vermelho' },
  { label: 'Custo Incremental', value: 'R$ 381.876', sub: 'Gap residual 2.680 HL rodoviário', color: 'ambar' },
  { label: 'Lead Time Solução', value: '6 dias', sub: '< 12 dias DOI ✓', color: 'verde' },
  { label: 'Margem Local', value: 'R$ 136/HL', sub: 'MACO R$285 — custo R$149', color: 'azul' },
];

export const demandData = [
  { sku: 'Malzbier', base: 38934, nova: 50614, gap: 11680 },
  { sku: 'Patagonia', base: 50400, nova: 50400, gap: 0 },
  { sku: 'Goose Island', base: 22800, nova: 22800, gap: 0 },
  { sku: 'Colorado', base: 39200, nova: 39200, gap: 0 },
];

export const plantData: Plant[] = [
  {
    planta: 'AQ541 — Aquiraz/CE',
    capacidade: 50400,
    utilizacao: 95.7,
    skus: [
      { nome: 'Malzbier', volume: 16560 },
      { nome: 'Patagonia', volume: 25200 },
      { nome: 'Colorado', volume: 6473 },
    ],
    totalProduzido: 48233,
  },
  {
    planta: 'PE541 — Nassau/PE',
    capacidade: 108000,
    utilizacao: 93.3,
    skus: [
      { nome: 'Malzbier', volume: 29160 },
      { nome: 'Goose Island', volume: 35400 },
      { nome: 'Colorado', volume: 36204 },
    ],
    totalProduzido: 100764,
  },
];

export const plantWeeklyData = [
  { semana: 'W0', 'AQ541 Produzido': 11800, 'AQ541 Capacidade': 12600, 'PE541 Produzido': 24500, 'PE541 Capacidade': 27000 },
  { semana: 'W1', 'AQ541 Produzido': 12200, 'AQ541 Capacidade': 12600, 'PE541 Produzido': 25800, 'PE541 Capacidade': 27000 },
  { semana: 'W2', 'AQ541 Produzido': 12100, 'AQ541 Capacidade': 12600, 'PE541 Produzido': 25400, 'PE541 Capacidade': 27000 },
  { semana: 'W3', 'AQ541 Produzido': 12133, 'AQ541 Capacidade': 12600, 'PE541 Produzido': 25064, 'PE541 Capacidade': 27000 },
];

export const modalData: Modal[] = [
  {
    nome: 'Cabotagem',
    custo: 84.58,
    leadTime: 25,
    avaria: 0,
    origem: 'Jaguariúna/SP',
    destino: 'Camaçari/BA',
    custoTotal: 987887,
    descricao: 'Modal marítimo. Menor custo unitário mas lead time de 25 dias viola o DOI mínimo de 12 dias. INVIÁVEL.',
    viavel: false,
  },
  {
    nome: 'Rodoviário',
    custo: 135.33,
    leadTime: 6,
    avaria: 5,
    origem: 'Jaguariúna/SP',
    destino: 'Camaçari/BA',
    custoTotal: 1664353,
    descricao: 'Modal terrestre. Lead time D+6 atende DOI mínimo. 5% avaria exige volume bruto de 12.295 HL. VIÁVEL.',
    viavel: true,
  },
];

export const scenariosData: Scenario[] = [
  {
    id: 'A',
    nome: 'A — Produção Local Apenas',
    descricao: 'Utiliza apenas a ociosidade das plantas NE. Cobre 9.360 HL mas deixa déficit de 2.320 HL descoberto.',
    custoTotal: 0,
    custoHL: 0,
    leadTime: 0,
    riscoLabel: 'Alto',
    riscoCor: '#D97706',
    complexidade: 'Baixa',
    recomendado: false,
    detalhes: [
      '9.360 HL de ociosidade total NE aproveitada',
      'Déficit de 2.320 HL sem cobertura — ruptura certa',
      'Custo de frete: R$ 0',
      'Risco operacional ALTO: estoque insuficiente',
    ],
  },
  {
    id: 'B',
    nome: 'B — Rodoviário Total',
    descricao: 'Transferência rodoviária integral de SP. Cobre todo o gap mas com alto custo.',
    custoTotal: 1664353,
    custoHL: 142.5,
    leadTime: 6,
    riscoLabel: 'Baixo',
    riscoCor: '#059669',
    complexidade: 'Baixa',
    recomendado: false,
    detalhes: [
      '12.295 HL bruto rodoviário (5% avaria → 11.680 HL líquido)',
      'Custo total: R$ 1.664.353',
      'Lead time: D+6 — dentro do DOI mínimo',
      'Alto impacto no EBITDA do período',
    ],
  },
  {
    id: 'C',
    nome: 'C — Local + Rodoviário',
    descricao: 'Estratégia híbrida: aproveita ociosidade local e complementa com rodoviário apenas o gap residual.',
    custoTotal: 381876,
    custoHL: 142,
    leadTime: 6,
    riscoLabel: 'Baixo',
    riscoCor: '#059669',
    complexidade: 'Média',
    recomendado: true,
    detalhes: [
      '9.000 HL produção local adicional em PE541',
      '2.821 HL bruto rodoviário → 2.680 HL líquido (5% avaria)',
      'Custo total: R$ 381.876 — economia de R$ 1.282.477 vs Cenário B',
      'Lead time: D+6 — dentro do DOI mínimo',
    ],
  },
];

export const scatterData: ScatterPoint[] = [
  { cenario: 'A', custo: 0, leadTime: 0, risco: 'Alto', cor: '#D97706' },
  { cenario: 'B', custo: 1664353, leadTime: 6, risco: 'Baixo', cor: '#DC2626' },
  { cenario: 'C', custo: 381876, leadTime: 6, risco: 'Baixo', cor: '#059669' },
];

export const acoesCenarioC: Acao[] = [
  { area: 'PCP', acao: 'Alocar ociosidade PE541 para Malzbier: +9.000 HL/mês' },
  { area: 'PCP', acao: 'Manter AQ541 em 95.7% — sem realocação necessária' },
  { area: 'Logística', acao: 'Contratar 2.821 HL rodoviário Jaguariúna/SP → Camaçari/BA (D+6)' },
  { area: 'Comercial', acao: 'Confirmar aumento de demanda ao time NENO e ajustar pedidos' },
  { area: 'Finance', acao: 'Budget incremental R$ 381.876 para Fevereiro/2026' },
];

export const riskData: RiskItem[] = [
  {
    cenario: 'A',
    riscoScore: 75,
    descricao: 'Ruptura certa de 2.320 HL — capacidade ociosa insuficiente para cobrir o gap total',
    contingencia: 'Não recomendado sem complemento rodoviário',
  },
  {
    cenario: 'B',
    riscoScore: 30,
    descricao: 'Custo R$1,66M impacta EBITDA. Alta dependência de fornecedor rodoviário.',
    contingencia: 'Reduzir volume se demanda real < forecast',
  },
  {
    cenario: 'C',
    riscoScore: 20,
    descricao: 'Bias de forecast +9%: demanda real pode ser 46.059 HL. 5% avaria no rodoviário.',
    contingencia: 'Reduzir componente rodoviário se demanda < forecast; aumentar volume se avaria > 5%',
  },
];

export const biasData: BiasData = {
  forecastBias: 9,
  demandaForecast: 50614,
  demandaRealEstimada: 46059,
  sobreestoque: 4555,
  contingencias: [
    'Se demanda real > 50.614 HL → escalar para Cenário B (rodoviário total)',
    'Se demanda real < 46.059 HL → reduzir componente rodoviário, manter produção local',
    'Se avaria rodo > 5% → aumentar volume transferido (de 2.821 para ajuste necessário)',
  ],
};

export const doiSubregioes: DOISubregiao[] = [
  { subregiao: 'Mapapi', doi: 8, seguro: false },
  { subregiao: 'NE Norte', doi: 6, seguro: false },
  { subregiao: 'NE Sul', doi: 10, seguro: false },
  { subregiao: 'NO Araguaia', doi: 14, seguro: true },
  { subregiao: 'NO Centro', doi: 7, seguro: false },
];

export const doiSubregioesCenarioC: DOISubregiao[] = [
  { subregiao: 'Mapapi', doi: 15, seguro: true },
  { subregiao: 'NE Norte', doi: 13, seguro: true },
  { subregiao: 'NE Sul', doi: 16, seguro: true },
  { subregiao: 'NO Araguaia', doi: 20, seguro: true },
  { subregiao: 'NO Centro', doi: 14, seguro: true },
];
