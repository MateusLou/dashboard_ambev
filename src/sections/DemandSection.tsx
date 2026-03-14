import { useState } from 'react';
import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { biasData, demandData } from '../data/caseData';

const BASE_MALZBIER = 38934;
const CUSTO_RODO_HL = 135.33;

const skuColors = ['#DC2626', '#0369A1', '#059669', '#D97706'];

const Wrapper = styled.section`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
  border: 1px solid ${theme.colors.border};
`;

const TwoColLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  align-items: start;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SliderBlock = styled.div`
  background: #F8FAFC;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SliderTitle = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.cinzaEscuro};
`;

const SliderValue = styled.span<{ $color: string }>`
  font-size: 20px;
  font-weight: 900;
  color: ${(p) => p.$color};
`;

const StyledRange = styled.input<{ $pct: number }>`
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 4px;
  background: linear-gradient(to right,
    ${theme.colors.azulEscuro} 0%,
    ${theme.colors.azulEscuro} ${(p) => p.$pct}%,
    ${theme.colors.cinzaMedio} ${(p) => p.$pct}%,
    ${theme.colors.cinzaMedio} 100%);
  outline: none;
  cursor: pointer;
  margin: 8px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${theme.colors.azulEscuro};
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    cursor: pointer;
    transition: transform 0.1s;

    &:hover { transform: scale(1.15); }
  }
`;

const SliderMarks = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: ${theme.colors.cinzaEscuro};
  margin-top: 2px;
`;

const GapCard = styled.div<{ $urgent: boolean }>`
  background: ${(p) => p.$urgent ? theme.colors.dangerLight : theme.colors.successLight};
  border: 2px solid ${(p) => p.$urgent ? theme.colors.danger : theme.colors.success};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const GapTitle = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.cinzaEscuro};
`;

const GapValue = styled.span<{ $urgent: boolean }>`
  font-size: 38px;
  font-weight: 900;
  line-height: 1;
  color: ${(p) => p.$urgent ? theme.colors.danger : theme.colors.success};
  font-variant-numeric: tabular-nums;
`;

const GapSub = styled.span`
  font-size: 12px;
  color: ${theme.colors.cinzaEscuro};
  line-height: 1.5;
`;

const InfoChip = styled.div<{ $variant: 'warning' | 'info' | 'success' }>`
  background: ${(p) =>
    p.$variant === 'warning' ? theme.colors.warningLight :
    p.$variant === 'info' ? theme.colors.infoLight :
    theme.colors.successLight};
  border: 1px solid ${(p) =>
    p.$variant === 'warning' ? theme.colors.warning :
    p.$variant === 'info' ? theme.colors.info :
    theme.colors.success};
  border-radius: ${theme.radius.sm};
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${(p) =>
    p.$variant === 'warning' ? theme.colors.warning :
    p.$variant === 'info' ? theme.colors.info :
    theme.colors.success};
`;

const ChartTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.cinzaEscuro};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
`;

interface TooltipEntry {
  name?: string;
  value?: number;
  color?: string;
  fill?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const BarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}>
        <strong style={{ color: theme.colors.preto }}>{label}</strong>
        {payload.map((p, i) => (
          <div key={p.name ?? i} style={{ color: p.color || String(p.fill), marginTop: 4 }}>
            {p.name}: <strong>{Number(p.value).toLocaleString('pt-BR')} HL</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function DemandSection() {
  const [growth, setGrowth] = useState(30);

  const novaDemanda = Math.round(BASE_MALZBIER * (1 + growth / 100));
  const gap = novaDemanda - BASE_MALZBIER;
  const custoImpacto = Math.round(gap * CUSTO_RODO_HL);

  const chartData = [
    { sku: 'Malzbier', base: BASE_MALZBIER, nova: novaDemanda, gap },
    { sku: 'Patagonia', base: 50400, nova: 50400, gap: 0 },
    { sku: 'Goose Island', base: 22800, nova: 22800, gap: 0 },
    { sku: 'Colorado', base: 39200, nova: 39200, gap: 0 },
  ];

  const sliderPct = (growth / 60) * 100;

  return (
    <Wrapper id="demanda">
      <SectionTitle
        number="01"
        title="Análise de Demanda"
        sub="Simule crescimento da Malzbier e veja o impacto no gap e na deterioração do DOI por sub-região"
      />
      <TwoColLayout>
        <LeftPanel>
          <SliderBlock>
            <SliderLabel>
              <SliderTitle>Crescimento Malzbier NENO</SliderTitle>
              <SliderValue $color={growth > 40 ? theme.colors.vermelho : growth > 20 ? theme.colors.ambar : theme.colors.verde}>
                +{growth}%
              </SliderValue>
            </SliderLabel>
            <StyledRange
              type="range"
              min={0}
              max={60}
              step={5}
              value={growth}
              $pct={sliderPct}
              onChange={e => setGrowth(Number(e.target.value))}
            />
            <SliderMarks>
              <span>0%</span><span>15%</span><span>30%</span><span>45%</span><span>60%</span>
            </SliderMarks>
          </SliderBlock>

          <ChartTitle>Demanda Base vs Nova por SKU (HL/mês)</ChartTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="sku" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickFormatter={v => `${(Number(v)/1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: '#64748B' }} />
              <Tooltip content={<BarTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#64748B' }} />
              <Bar dataKey="base" name="Demanda Base" fill="#94A3B8" radius={[4,4,0,0]} />
              <Bar dataKey="nova" name="Nova Demanda" radius={[4,4,0,0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.gap > 0 ? theme.colors.vermelho : theme.colors.azulMedio} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <GapCard $urgent={gap > 0}>
            <GapTitle>Gap a Cobrir — Malzbier</GapTitle>
            <GapValue $urgent={gap > 0}>{gap > 0 ? gap.toLocaleString('pt-BR') : '0'} HL</GapValue>
            <GapSub>
              {BASE_MALZBIER.toLocaleString('pt-BR')} HL base → {novaDemanda.toLocaleString('pt-BR')} HL nova (+{growth}%)
            </GapSub>
            {gap > 0 && (
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.colors.danger }}>
                Custo rodoviário estimado: R$ {custoImpacto.toLocaleString('pt-BR')}
              </div>
            )}
          </GapCard>

          <InfoChip $variant="warning">
            Bias de Forecast: +{biasData.forecastBias}% — demanda real estimada: {biasData.demandaRealEstimada.toLocaleString('pt-BR')} HL
          </InfoChip>
        </LeftPanel>

        <RightPanel>
          <ChartTitle>Distribuição de Demanda por SKU — Base (HL/mês)</ChartTitle>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={demandData}
                dataKey="base"
                nameKey="sku"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={55}
                paddingAngle={4}
                label={({ name, percent }: { name?: string; percent?: number }) =>
                  `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={true}
              >
                {demandData.map((entry, i) => (
                  <Cell key={entry.sku} fill={skuColors[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${Number(value).toLocaleString('pt-BR')} HL`, 'Demanda Base']} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#64748B' }} />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: theme.radius.md, padding: theme.spacing.md }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.colors.preto, marginBottom: 8 }}>
              Demanda por SKU — Cenário Recomendado:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {demandData.map((d, i) => (
                <div key={d.sku} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '4px 0', borderBottom: `1px solid ${theme.colors.border}` }}>
                  <span style={{ color: skuColors[i], fontWeight: 600 }}>{d.sku}</span>
                  <span style={{ fontWeight: 700, color: d.gap > 0 ? theme.colors.danger : theme.colors.success }}>
                    {d.nova.toLocaleString('pt-BR')} HL {d.gap > 0 ? '▲' : '✓'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <InfoChip $variant="info">
            Sobrestoque potencial (bias -9%): {biasData.sobreestoque.toLocaleString('pt-BR')} HL
          </InfoChip>
        </RightPanel>
      </TwoColLayout>
    </Wrapper>
  );
}
