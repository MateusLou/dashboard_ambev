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
  { label: 'Gap de Demanda', value: '4.500 HL', sub: '+30% Malzbier NENO', color: 'vermelho' },
  { label: 'Custo Incremental', value: 'R$ 458.858', sub: 'Cenário C recomendado', color: 'ambar' },
  { label: 'Lead Time', value: '6 dias', sub: '< 12 dias DOI ✓', color: 'verde' },
  { label: 'Margem Malzbier', value: 'R$ 183/HL', sub: '+R$47 vs base (R$136)', color: 'azul' },
];

export const demandData = [
  { sku: 'Malzbier', base: 15000, nova: 19500, gap: 4500 },
  { sku: 'Patagonia', base: 50400, nova: 50400, gap: 0 },
  { sku: 'Goose Island', base: 22800, nova: 22800, gap: 0 },
  { sku: 'Colorado', base: 39200, nova: 39200, gap: 0 },
];

export const plantData: Plant[] = [
  {
    planta: 'AQ541 — Aquiraz/CE',
    capacidade: 50000,
    utilizacao: 63.6,
    skus: [
      { nome: 'Patagonia', volume: 12600 },
      { nome: 'Goose Island', volume: 3300 },
      { nome: 'Colorado', volume: 5600 },
    ],
    totalProduzido: 21500,
  },
  {
    planta: 'PE541 — Nassau/PE',
    capacidade: 108000,
    utilizacao: 41.2,
    skus: [
      { nome: 'Malzbier', volume: 12240 },
      { nome: 'Goose Island', volume: 9600 },
      { nome: 'Colorado', volume: 16800 },
    ],
    totalProduzido: 38640,
  },
];

export const modalData: Modal[] = [
  {
    nome: 'Cabotagem',
    custo: 84.58,
    leadTime: 25,
    avaria: 0,
    origem: 'Jaguariúna/SP',
    destino: 'Camaçari/BA',
    custoTotal: 321336,
    descricao: 'Modal marítimo. Barato mas lento (25 dias > DOI mínimo).',
    viavel: false,
  },
  {
    nome: 'Rodoviário',
    custo: 135.33,
    leadTime: 6,
    avaria: 5,
    origem: 'Jaguariúna/SP',
    destino: 'Camaçari/BA',
    custoTotal: 596760,
    descricao: 'Modal terrestre. Caro (+60%) mas seguro para DOI (6 dias).',
    viavel: true,
  },
];

export const scenariosData: Scenario[] = [
  {
    id: 'A',
    nome: 'A — Realocação Total',
    descricao: 'Realoca toda produção Malzbier em PE541, compensa Patagonia via cabotagem.',
    custoTotal: 321336,
    custoHL: 71.41,
    leadTime: 25,
    riscoLabel: 'Médio',
    riscoCor: '#F5A623',
    complexidade: 'Alta',
    recomendado: false,
    detalhes: [
      '+4.500 HL Malzbier em PE541',
      '-4.500 HL Patagonia em AQ541',
      'Compensação Patagonia via Cabotagem (25 dias)',
    ],
  },
  {
    id: 'B',
    nome: 'B — Rodoviário Emergencial',
    descricao: 'Transferência rodoviária total de SP, sem alterar produção local.',
    custoTotal: 596760,
    custoHL: 132.61,
    leadTime: 6,
    riscoLabel: 'Baixo',
    riscoCor: '#417505',
    complexidade: 'Baixa',
    recomendado: false,
    detalhes: [
      '+4.737 HL rodoviário SP→BA (5% avaria → 4.500 HL líquido)',
      'Produção local inalterada',
      'Custo 85% maior que Cenário A',
    ],
  },
  {
    id: 'C',
    nome: 'C — Combinação 50/50',
    descricao: 'Híbrido: 50% realocação local + 50% rodoviário. Otimiza custo e lead time.',
    custoTotal: 458858,
    custoHL: 102.01,
    leadTime: 6,
    riscoLabel: 'Baixo',
    riscoCor: '#417505',
    complexidade: 'Média',
    recomendado: true,
    detalhes: [
      '+2.250 HL Malzbier PE541 (local)',
      '-2.250 HL Patagonia AQ541',
      '+2.368 HL rodoviário → 2.250 HL líquido (5% avaria)',
    ],
  },
];

export const scatterData: ScatterPoint[] = [
  { cenario: 'A', custo: 321336, leadTime: 25, risco: 'Médio', cor: '#F5A623' },
  { cenario: 'B', custo: 596760, leadTime: 6, risco: 'Baixo', cor: '#D0021B' },
  { cenario: 'C', custo: 458858, leadTime: 6, risco: 'Baixo', cor: '#417505' },
];

export const acoesCenarioC: Acao[] = [
  { area: 'PCP', acao: 'Reduzir Patagonia AQ541: 12.600 → 11.475 HL/semana' },
  { area: 'PCP', acao: 'Aumentar Malzbier PE541: 3.060 → 3.615 HL/semana' },
  { area: 'Logística', acao: 'Contratar 590 HL/semana rodoviário por 4 semanas' },
  { area: 'Comercial', acao: 'Comunicar aumento confirmado ao time NENO' },
  { area: 'Finance', acao: 'Budget incremental R$ 458.858 para Fevereiro/2026' },
];

export const riskData: RiskItem[] = [
  {
    cenario: 'A',
    riscoScore: 60,
    descricao: 'Patagonia fica em nível crítico de DOI durante transição (25 dias)',
    contingencia: 'Acelerar cabotagem ou usar estoque intermediário',
  },
  {
    cenario: 'B',
    riscoScore: 25,
    descricao: 'Custo elevado impacta EBITDA do mês. Sem risco logístico.',
    contingencia: 'Reduzir volume se demanda real < forecast',
  },
  {
    cenario: 'C',
    riscoScore: 25,
    descricao: 'Bias de forecast de +9%: demanda real pode ser 17.745 HL',
    contingencia: 'Reduzir componente rodoviário mantendo produção local',
  },
];

export const biasData: BiasData = {
  forecastBias: 9,
  demandaForecast: 19500,
  demandaRealEstimada: 17745,
  sobreestoque: 1755,
  contingencias: [
    'Se demanda real > 19.500 HL → escalar para Cenário B (rodoviário total)',
    'Se demanda real < 17.745 HL → reduzir componente rodoviário',
    'Se avaria rodo > 5% → aumentar volume transferido para compensar',
  ],
};

export const doiSubregioes: DOISubregiao[] = [
  { subregiao: 'MAPAPI', doi: 16, seguro: true },
  { subregiao: 'NE Norte', doi: 14, seguro: true },
  { subregiao: 'NE Sul', doi: 18, seguro: true },
  { subregiao: 'NO Araguaia', doi: 20, seguro: true },
  { subregiao: 'NO Centro', doi: 15, seguro: true },
];
