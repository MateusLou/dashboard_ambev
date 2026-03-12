import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis,
  ReferenceLine, Cell,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { scenariosData, scatterData } from '../data/caseData';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.section`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
`;

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const ScenarioCard = styled.div<{ $active: boolean; $rec: boolean; $accentColor: string }>`
  border-radius: ${theme.radius.md};
  border: 2.5px solid ${(p) =>
    p.$active ? p.$accentColor :
    p.$rec ? theme.colors.verde :
    theme.colors.cinzaMedio};
  padding: ${theme.spacing.md};
  position: relative;
  background: ${(p) =>
    p.$active ? `${p.$accentColor}12` :
    p.$rec ? 'linear-gradient(135deg, #f0fff4 0%, #e8f5e9 100%)' :
    theme.colors.branco};
  transition: all 0.22s ease;
  cursor: pointer;
  transform: ${(p) => p.$active ? 'translateY(-4px)' : 'none'};
  box-shadow: ${(p) => p.$active ? `0 8px 28px ${p.$accentColor}30` : 'none'};

  &:hover {
    border-color: ${(p) => p.$active ? p.$accentColor : p.$accentColor + '88'};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
`;

const RecTag = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.colors.verde};
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 14px;
  border-radius: 10px;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActiveTag = styled.div<{ $color: string }>`
  position: absolute;
  top: -12px;
  right: 12px;
  background: ${(p) => p.$color};
  color: white;
  font-size: 9px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ScenarioId = styled.div<{ $color: string }>`
  font-size: 36px;
  font-weight: 900;
  color: ${(p) => p.$color};
  line-height: 1;
  margin-bottom: 4px;
`;

const ScenarioName = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.azulEscuro};
  margin: 0 0 8px;
`;

const ScenarioDesc = styled.p`
  font-size: 11px;
  color: ${theme.colors.cinzaEscuro};
  margin: 0 0 12px;
  line-height: 1.5;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const Metric = styled.div<{ $color?: string }>`
  background: rgba(30, 39, 97, 0.04);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .lbl { font-size: 10px; color: ${theme.colors.cinzaEscuro}; text-transform: uppercase; letter-spacing: 0.5px; }
  .val { font-size: 16px; font-weight: 800; color: ${(p) => p.$color || theme.colors.azulEscuro}; }
`;

const DetailList = styled.ul`
  margin: 10px 0 0;
  padding: 0 0 0 14px;
  font-size: 11px;
  color: ${theme.colors.cinzaEscuro};
  line-height: 1.6;
`;

const DetailPanel = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%);
  border: 1.5px solid ${(p) => p.$color}44;
  border-left: 4px solid ${(p) => p.$color};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const DetailStat = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .lbl { font-size: 11px; color: ${theme.colors.cinzaEscuro}; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
  .val { font-size: 22px; font-weight: 900; color: ${(p) => p.$color}; }
  .sub { font-size: 11px; color: ${theme.colors.cinzaEscuro}; }
`;

const CompBar = styled.div<{ $fill: string; $pct: number }>`
  margin-top: 6px;
  background: ${theme.colors.cinzaMedio};
  border-radius: 4px;
  height: 6px;
  overflow: hidden;

  div {
    height: 100%;
    border-radius: 4px;
    background: ${(p) => p.$fill};
    width: ${(p) => p.$pct}%;
    transition: width 0.6s ease;
  }
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const ChartTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.cinzaEscuro};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const Hint = styled.div`
  font-size: 11px;
  color: ${theme.colors.cinzaEscuro};
  opacity: 0.6;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  font-style: italic;
`;

const scenarioColors: Record<string, string> = { A: theme.colors.ambar, B: theme.colors.vermelho, C: theme.colors.verde };
const maxCusto = Math.max(...scenariosData.map(s => s.custoTotal));

const ScatterTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload as { cenario: string; custo: number; leadTime: number; risco: string } | undefined;
    return (
      <div style={{ background: 'white', border: '1px solid #eee', borderRadius: 8, padding: '10px 14px', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <strong style={{ color: theme.colors.azulEscuro }}>Cenário {d?.cenario}</strong>
        <div>Custo: <strong>R$ {d?.custo?.toLocaleString('pt-BR')}</strong></div>
        <div>Lead Time: <strong>{d?.leadTime} dias</strong></div>
        <div>Risco DOI: <strong>{d?.risco}</strong></div>
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #eee', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
        <strong style={{ color: theme.colors.azulEscuro }}>{label}</strong>
        {payload.map(p => (
          <div key={p.name} style={{ color: String(p.fill), marginTop: 2 }}>
            {p.name}: <strong>R$ {p.value?.toLocaleString('pt-BR')}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ScenariosSection() {
  const [activeId, setActiveId] = useState('C');
  const active = scenariosData.find(s => s.id === activeId);

  const barData = scenariosData.map(s => ({
    cenario: `Cen. ${s.id}`,
    custo: s.custoTotal,
    id: s.id,
  }));

  return (
    <Wrapper id="cenarios">
      <SectionTitle
        number="04"
        title="Simulação de Cenários"
        sub="Clique em um cenário para explorar os detalhes"
      />

      <Hint>👆 Selecione um cenário para comparar</Hint>

      <ScenarioGrid>
        {scenariosData.map(s => (
          <ScenarioCard
            key={s.id}
            $rec={s.recomendado}
            $active={activeId === s.id}
            $accentColor={scenarioColors[s.id]}
            onClick={() => setActiveId(s.id)}
          >
            {s.recomendado && <RecTag>★ Recomendado</RecTag>}
            {activeId === s.id && <ActiveTag $color={scenarioColors[s.id]}>Selecionado</ActiveTag>}
            <ScenarioId $color={scenarioColors[s.id]}>{s.id}</ScenarioId>
            <ScenarioName>{s.nome.replace(`${s.id} — `, '')}</ScenarioName>
            <ScenarioDesc>{s.descricao}</ScenarioDesc>
            <MetricGrid>
              <Metric $color={scenarioColors[s.id]}>
                <span className="lbl">Custo Total</span>
                <span className="val">R$ {(s.custoTotal / 1000).toFixed(0)}K</span>
              </Metric>
              <Metric $color={scenarioColors[s.id]}>
                <span className="lbl">R$/HL</span>
                <span className="val">R$ {s.custoHL.toFixed(0)}</span>
              </Metric>
              <Metric>
                <span className="lbl">Lead Time</span>
                <span className="val" style={{ color: s.leadTime > 12 ? theme.colors.vermelho : theme.colors.verde }}>
                  {s.leadTime} dias {s.leadTime > 12 ? '✗' : '✓'}
                </span>
              </Metric>
              <Metric>
                <span className="lbl">Risco DOI</span>
                <span className="val" style={{ color: s.riscoCor }}>{s.riscoLabel}</span>
              </Metric>
            </MetricGrid>
          </ScenarioCard>
        ))}
      </ScenarioGrid>

      {active && (
        <DetailPanel $color={scenarioColors[active.id]}>
          <DetailStat $color={scenarioColors[active.id]}>
            <span className="lbl">Custo Total</span>
            <span className="val">R$ {(active.custoTotal / 1000).toFixed(0)}K</span>
            <span className="sub">R$ {active.custoHL.toFixed(2)}/HL</span>
            <CompBar $fill={scenarioColors[active.id]} $pct={(active.custoTotal / maxCusto) * 100}>
              <div />
            </CompBar>
          </DetailStat>
          <DetailStat $color={active.leadTime > 12 ? theme.colors.vermelho : theme.colors.verde}>
            <span className="lbl">Lead Time</span>
            <span className="val">{active.leadTime} dias</span>
            <span className="sub">{active.leadTime > 12 ? '⚠ Viola DOI mínimo' : '✓ Dentro do DOI (12d)'}</span>
            <CompBar $fill={active.leadTime > 12 ? theme.colors.vermelho : theme.colors.verde} $pct={(active.leadTime / 30) * 100}>
              <div />
            </CompBar>
          </DetailStat>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: theme.colors.cinzaEscuro }}>
              Detalhes Operacionais
            </span>
            <DetailList style={{ marginTop: 8 }}>
              {active.detalhes.map((d, i) => <li key={i}>{d}</li>)}
            </DetailList>
          </div>
        </DetailPanel>
      )}

      <ChartsRow>
        <div>
          <ChartTitle>Custo Total por Cenário (R$)</ChartTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="cenario" tick={{ fontSize: 12, fontWeight: 700 }} />
              <YAxis tickFormatter={v => `R$${(Number(v)/1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="custo" name="Custo Total" radius={[6,6,0,0]} onClick={(d: { id: string }) => setActiveId(d.id)} cursor="pointer">
                {barData.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={scenarioColors[entry.id]}
                    opacity={activeId === entry.id ? 1 : 0.4}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <ChartTitle>Custo vs Lead Time</ChartTitle>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="leadTime"
                type="number"
                domain={[0, 30]}
                label={{ value: 'Lead Time (dias)', position: 'insideBottomRight', offset: -10, fontSize: 11 }}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                dataKey="custo"
                tickFormatter={v => `R$${(Number(v)/1000).toFixed(0)}K`}
                tick={{ fontSize: 10 }}
              />
              <ZAxis range={[300, 300]} />
              <ReferenceLine x={12} stroke={theme.colors.vermelho} strokeDasharray="4 2"
                label={{ value: 'DOI 12d', position: 'top', fill: theme.colors.vermelho, fontSize: 10 }} />
              <Tooltip content={<ScatterTooltip />} />
              <Scatter data={scatterData} shape="circle" onClick={(d: { cenario: string }) => setActiveId(d.cenario)} cursor="pointer">
                {scatterData.map((entry) => (
                  <Cell
                    key={entry.cenario}
                    fill={entry.cor}
                    opacity={activeId === entry.cenario ? 1 : 0.35}
                    strokeWidth={activeId === entry.cenario ? 3 : 0}
                    stroke={entry.cor}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 12, marginTop: 4, justifyContent: 'center' }}>
            {scatterData.map(d => (
              <span
                key={d.cenario}
                onClick={() => setActiveId(d.cenario)}
                style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                  opacity: activeId === d.cenario ? 1 : 0.5, fontWeight: activeId === d.cenario ? 700 : 400 }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.cor, display: 'inline-block' }} />
                Cen. {d.cenario}
              </span>
            ))}
          </div>
        </div>
      </ChartsRow>
    </Wrapper>
  );
}
