# Dashboard Ambev Long Neck NENO

Dashboard interativo desenvolvido para apresentação do case de supply chain **Malzbier Brahma Long Neck** à banca avaliadora da Insper Junior.

---

## Sobre o Projeto

O case analisa um gap de **4.500 HL** de Malzbier Brahma na região NENO (Nordeste) em fevereiro de 2026, causado por um aumento de 30% na demanda. O dashboard apresenta os dados, análises e a recomendação final de forma visual e interativa.

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Interface |
| Vite | 5.4 | Build tool |
| TypeScript | 5 | Tipagem estática |
| Styled Components | 6 | Estilização |
| Recharts | 2 | Gráficos |

---

## Estrutura do Projeto

```
dashboard-ambev/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Cabeçalho com KPIs principais
│   │   ├── KPICard.tsx             # Card animado de indicador
│   │   ├── SectionTitle.tsx        # Título de seção reutilizável
│   │   └── StickyNav.tsx           # Navegação flutuante entre seções
│   ├── sections/
│   │   ├── DemandSection.tsx       # Slider interativo de demanda
│   │   ├── CapacitySection.tsx     # Capacidade das plantas
│   │   ├── ModalsSection.tsx       # Comparação Cabotagem vs Rodoviário
│   │   ├── ScenariosSection.tsx    # Cenários A, B e C clicáveis
│   │   ├── RecommendationSection.tsx  # Recomendação final (Cenário C)
│   │   └── RiskSection.tsx         # Análise de risco e DOI
│   ├── data/
│   │   └── caseData.ts             # Todos os dados do case
│   ├── hooks/
│   │   └── useCountUp.ts           # Animação de contagem numérica
│   ├── styles/
│   │   └── theme.ts                # Paleta de cores e tokens visuais
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

1. **Demanda** — Slider interativo para simular crescimento de 0% a 60%, com atualização em tempo real do gap e custo incremental
2. **Capacidade** — Plantas AQ541 (Aquiraz/CE) e PE541 (Nassau/PE) com barras de utilização e breakdown de SKUs
3. **Modais** — Comparação entre Cabotagem (R$ 84,58/HL, 25 dias) e Rodoviário (R$ 135,33/HL, 6 dias) com linha de referência DOI
4. **Cenários** — Cards clicáveis com detalhe dos cenários A, B e C, gráficos de custo e scatter de custo × margem
5. **Recomendação** — Cenário C recomendado com plano de ações por área (PCP, Logística, Comercial, Finance)
6. **Risco** — Análise de bias de demanda, DOI por sub-região e contingências

---

## Como Executar

### Pré-requisitos
- Node.js v20+
- npm

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

Acesse `http://localhost:5173` no navegador.

---

## Dados do Case

| Indicador | Valor |
|---|---|
| Gap de demanda | 4.500 HL |
| Aumento da demanda Malzbier | +30% |
| Planta AQ541 (Aquiraz/CE) — capacidade | 50 kHL/mês |
| Planta PE541 (Nassau/PE) — capacidade | 108 kHL/mês |
| Custo Cabotagem | R$ 84,58/HL — 25 dias |
| Custo Rodoviário | R$ 135,33/HL — 6 dias |
| **Cenário C recomendado — custo total** | **R$ 458.858** |
| **Cenário C recomendado — custo unitário** | **R$ 102,01/HL** |

---

## Contexto Acadêmico

**Projeto:** Case Ambev Long Neck — Processo Seletivo Insper Junior
**Data:** Março de 2026
**Repositório de análise:** [AnalisedeDados_Ambev](https://github.com/MateusLou/AnalisedeDados_Ambev)
