import { useState } from 'react';
import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { biasData } from '../data/caseData';

const BASE_MALZBIER = 15000;
const CUSTO_RODO_HL = 135.33;

const Wrapper = styled.section`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${theme.spacing.lg};
  align-items: start;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const SliderBlock = styled.div`
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%);
  border: 1.5px solid ${theme.colors.azulClaro}44;
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
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
  color: ${theme.colors.azulEscuro};
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
    background: ${theme.colors.ambar};
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
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
  opacity: 0.7;
  margin-top: 2px;
`;

const GapCard = styled.div<{ $from: string; $to: string }>`
  background: linear-gradient(135deg, ${(p) => p.$from} 0%, ${(p) => p.$to} 100%);
  color: white;
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  min-width: 210px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;
`;

const GapTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.85;
`;

const GapValue = styled.span`
  font-size: 40px;
  font-weight: 900;
  line-height: 1;
  transition: all 0.3s ease;
  font-variant-numeric: tabular-nums;
`;

const GapSub = styled.span`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.5;
`;

const BiasChip = styled.div`
  background: rgba(245, 166, 35, 0.15);
  border: 1px solid ${theme.colors.ambar};
  border-radius: ${theme.radius.sm};
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #a06b00;
`;

const CostImpact = styled.div`
  background: rgba(65, 117, 5, 0.08);
  border: 1px solid ${theme.colors.verde};
  border-radius: ${theme.radius.sm};
  padding: 8px 12px;
  font-size: 12px;
  color: ${theme.colors.verde};
  font-weight: 600;
  transition: all 0.3s ease;
`;

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #eee', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13 }}>
        <strong style={{ color: theme.colors.azulEscuro }}>{label}</strong>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.color || String(p.fill), marginTop: 4 }}>
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

  const gapColor = gap > 6000
    ? { from: '#8B0000', to: '#D0021B' }
    : gap > 0
    ? { from: '#D0021B', to: '#E8334A' }
    : { from: '#417505', to: '#5A9E0A' };

  const chartData = [
    { sku: 'Malzbier', base: BASE_MALZBIER, nova: novaDemanda, gap },
    { sku: 'Patagonia', base: 50400, nova: 50400, gap: 0 },
    { sku: 'Goose Island', base: 22800, nova: 22800, gap: 0 },
    { sku: 'Colorado', base: 39200, nova: 39200, gap: 0 },
  ];

  const sliderPct = ((growth - 0) / (60 - 0)) * 100;

  return (
    <Wrapper id="demanda">
      <SectionTitle
        number="01"
        title="Análise de Demanda"
        sub="Simule diferentes cenários de crescimento e veja o impacto no gap e no custo"
      />
      <Row>
        <div>
          <SliderBlock>
            <SliderLabel>
              <SliderTitle>Crescimento da Demanda Malzbier</SliderTitle>
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

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="sku" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis tickFormatter={v => `${(Number(v)/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Bar dataKey="base" name="Demanda Base" fill={theme.colors.azulMedio} radius={[4,4,0,0]} />
              <Bar dataKey="nova" name="Nova Demanda" radius={[4,4,0,0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.gap > 0 ? theme.colors.vermelho : theme.colors.ambar} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <GapCard $from={gapColor.from} $to={gapColor.to}>
            <GapTitle>Gap a Cobrir</GapTitle>
            <GapValue>{gap > 0 ? gap.toLocaleString('pt-BR') : '0'} HL</GapValue>
            <GapSub>
              Malzbier: {BASE_MALZBIER.toLocaleString('pt-BR')} → {novaDemanda.toLocaleString('pt-BR')} HL<br />
              +{growth}% em Fevereiro/2026
            </GapSub>
          </GapCard>

          {gap > 0 && (
            <CostImpact>
              Custo estimado (rodo):<br />
              <strong>R$ {custoImpacto.toLocaleString('pt-BR')}</strong>
            </CostImpact>
          )}

          <BiasChip>
            ⚠ Bias de Forecast: +{biasData.forecastBias}%
          </BiasChip>

          <div style={{ fontSize: 12, color: theme.colors.cinzaEscuro, lineHeight: 1.7 }}>
            <strong>Demanda real estimada:</strong><br />
            {Math.round(novaDemanda * 0.91).toLocaleString('pt-BR')} HL<br />
            <strong>Sobrestoque potencial:</strong><br />
            {Math.max(0, Math.round(novaDemanda - novaDemanda * 0.91)).toLocaleString('pt-BR')} HL
          </div>
        </div>
      </Row>
    </Wrapper>
  );
}
