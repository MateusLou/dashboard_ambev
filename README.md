# Dashboard Ambev — Malzbier Longneck NENO

> **Projeto:** Processo Seletivo Insper Junior — Engenharia de Dados
> **Cliente:** Ambev
> **Período analisado:** Fevereiro–Maio de 2026
> **Autor:** Mateus Loureiro

🔗 **Repositório de análise:** [AnalisedeDados_Ambev](https://github.com/MateusLou/AnalisedeDados_Ambev)

---

## Sobre o Projeto

Dashboard interativo desenvolvido para apresentação do case de supply chain **Malzbier Brahma Longneck** à banca avaliadora da Insper Junior. Traduz toda a análise de dados em uma interface visual navegável, permitindo que o cliente explore cenários, entenda o gap de abastecimento e acompanhe a recomendação final de forma clara e interativa.

### O Problema

Em fevereiro de 2026, a demanda por Malzbier Longneck na região **NENO** cresceu **+30%**, gerando um gap de **11.680 HL** a ser coberto. O dashboard apresenta a análise completa de capacidade, modais, cenários e risco para suportar a decisão de abastecimento.

---

## Demo

```
npm install && npm run dev
```
Acesse `http://localhost:5173`

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 18 | Interface de usuário (componentes funcionais + hooks) |
| **TypeScript** | 5 | Tipagem estática end-to-end (dados, props, estado) |
| **Vite** | 5.4 | Build tool — HMR em desenvolvimento, bundle otimizado |
| **Styled Components** | 6 | CSS-in-JS com tema centralizado e tokens visuais |
| **Recharts** | 2 | Gráficos de barra, scatter, radar e linha |

---

## Estrutura do Projeto

```
dashboard-ambev/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # KPIs principais animados no topo
│   │   ├── KPICard.tsx             # Card reutilizável com contagem animada
│   │   ├── SectionTitle.tsx        # Título de seção padronizado
│   │   └── StickyNav.tsx           # Navegação flutuante entre seções
│   ├── sections/
│   │   ├── DemandSection.tsx       # Slider interativo de demanda (0–60%)
│   │   ├── CapacitySection.tsx     # Utilização das plantas AQ541 e PE541
│   │   ├── ModalsSection.tsx       # Cabotagem vs. Rodoviário (custo × DOI)
│   │   ├── ScenariosSection.tsx    # Cenários A, B e C com gráficos clicáveis
│   │   ├── RecommendationSection.tsx  # Plano de ação do Cenário C
│   │   └── RiskSection.tsx         # DOI por sub-região e análise de risco
│   ├── data/
│   │   └── caseData.ts             # Fonte única de dados do case (TypeScript)
│   ├── hooks/
│   │   └── useCountUp.ts           # Hook de animação numérica
│   ├── styles/
│   │   └── theme.ts                # Paleta de cores e design tokens
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Seções do Dashboard

### 1 — Demanda
Slider interativo que permite simular crescimento da demanda Malzbier de **0% a 60%**. A cada ajuste, o gap e o custo incremental estimado são recalculados em tempo real, tornando a escala do problema intuitiva para a banca.

### 2 — Capacidade das Plantas
Visualização das duas plantas produtivas do Nordeste:

| Planta | Localização | Capacidade/sem | Utilização W1 | Ociosidade W2 |
|---|---|---|---|---|
| **AQ541** | Aquiraz — CE | 12.600 HL | 97,1% | 1.800 HL |
| **PE541** | Nassau — PE | 27.000 HL | 73,3% | 7.200 HL |

A ociosidade combinada de **9.000 HL** na Semana 2 cobre 77% do gap sem custo de transporte adicional.

### 3 — Modais de Transporte
Comparativo visual entre os dois modais disponíveis:

| Modal | Custo/HL | Lead Time | Avaria | DOI | Viabilidade |
|---|---|---|---|---|---|
| **Cabotagem** | R$ 84,58 | D+25 | 0% | ⚠️ Viola mínimo | ❌ Inviável em urgência |
| **Rodoviário** | R$ 135,33 | D+6 | 5% | ✅ Atende | ✅ Viável |

Gráfico de linha com DOI projetado ao longo de 28 dias — mostra o ponto exato em que cada modal cruza o limiar de 12 dias.

### 4 — Cenários

| Cenário | Estratégia | Custo Total | Lead Time | Risco |
|---|---|---|---|---|
| **A** | Produção local apenas | R$ 0 incremental | — | 🔴 Alto — deixa 2.320 HL descobertos |
| **B** | Rodoviário 100% | R$ 1.664.353 | D+6 | 🟢 Baixo — custo elevado |
| **C ✅** | Híbrido: local + rodo residual | **R$ 381.876** | **D+6** | 🟢 Baixo |

O Cenário C representa uma **economia de R$ 1.282.477** em relação ao Cenário B ao priorizar a ociosidade das plantas antes de acionar o frete. Cards clicáveis com gráficos de custo e scatter custo × margem por cenário.

### 5 — Recomendação (Cenário C)
Plano de ação detalhado por área funcional:

| Área | Ação |
|---|---|
| **PCP** | Alocar ociosidade PE541 W2: +7.200 HL Malzbier |
| **PCP** | Alocar ociosidade AQ541 W2: +1.800 HL Malzbier |
| **Logística** | Contratar 2.821 HL bruto rodoviário → 2.680 HL líquido (D+6) |
| **Comercial** | Confirmar aumento de demanda NENO e alinhamento de forecast |
| **Finance** | Provisionar R$ 381.876 de custo incremental para fevereiro |

### 6 — Risco
- **Bias de demanda:** comparação forecast × demanda real estimada com contingências
- **DOI por sub-região NENO:** cobertura de estoque em dias para cada sub-região
- **Análise de sensibilidade:** impacto de variações de avaria, lead time e preço de frete

---

## Dados do Case (`caseData.ts`)

Todos os dados são tipados e centralizados em `src/data/caseData.ts`. Não há chamadas de API — os valores refletem a análise extraída da planilha Excel do case.

| Indicador | Valor |
|---|---|
| Gap total Malzbier NENO | 11.680 HL (+30% vs. plano) |
| Coberto por produção local | 9.000 HL (PE541 + AQ541, Semana 2) |
| Volume via modal pago | 2.680 HL líquidos / 2.821 HL brutos |
| Custo Cabotagem | R$ 84,58/HL — D+25 |
| Custo Rodoviário | R$ 135,33/HL — D+6 |
| MACO Malzbier Longneck | R$ 285/HL |
| DOI mínimo (política NENO) | 12 dias |
| **Custo Cenário C (recomendado)** | **R$ 381.876** |
| Economia Cenário C vs. B | R$ 1.282.477 |

---

## Como Executar

### Pré-requisitos
- Node.js v20+
- npm

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento (HMR ativo)
npm run dev
```

Acesse `http://localhost:5173`

### Produção

```bash
# Gerar build otimizado
npm run build

# Pré-visualizar o build
npm run preview
```

O build de produção é gerado em `dist/` — pronto para deploy em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages).

---

## Design

O tema visual (`src/styles/theme.ts`) usa tokens de cor alinhados à identidade Ambev:

| Token | Cor | Uso |
|---|---|---|
| `vermelho` | `#DC2626` | Alertas, ruptura, custo alto |
| `ambar` | `#D97706` | Avisos, risco médio |
| `verde` | `#059669` | Sucesso, viável, recomendado |
| `azul` | `#1D4ED8` | Destaques, ações principais |

---

*Repositório: [case-Ambev-insper-JR](https://github.com/MateusLou/case-Ambev-insper-JR) — Insper Junior · Março de 2026*
