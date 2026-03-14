import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
type TooltipProps<_T, _N> = { active?: boolean; payload?: Array<{ value?: number; payload?: unknown }>; label?: string };
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { biasData, doiSubregioes, riskData } from '../data/caseData';

const Wrapper = styled.section`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BiasCard = styled.div`
  background: rgba(45, 212, 191, 0.06);
  border: 2px solid ${theme.colors.ambar};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const BiasTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.ambar};
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BiasRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;
  color: ${theme.colors.cinzaEscuro};

  strong { color: ${theme.colors.preto}; }
`;

const ContingenciaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContingenciaItem = styled.div`
  background: rgba(30, 41, 59, 0.6);
  border-left: 3px solid ${theme.colors.ambar};
  border-radius: 0 8px 8px 0;
  padding: 10px 14px;
  font-size: 12px;
  color: ${theme.colors.cinzaEscuro};
  line-height: 1.5;
`;

const RiskCardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RiskCard = styled.div`
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.cinzaMedio};
`;

const RiskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const RiskLabel = styled.span<{ $color: string }>`
  font-size: 14px;
  font-weight: 800;
  color: ${(p) => p.$color};
`;

const RiskScore = styled.div`
  font-size: 11px;
  color: ${theme.colors.cinzaEscuro};
  margin-bottom: 8px;
`;

const RiskBar = styled.div<{ $fill: string; $pct: number }>`
  background: ${theme.colors.cinzaMedio};
  border-radius: 4px;
  height: 8px;
  margin-bottom: 8px;
  overflow: hidden;

  div {
    height: 100%;
    border-radius: 4px;
    background: ${(p) => p.$fill};
    width: ${(p) => p.$pct}%;
  }
`;

const RiskDesc = styled.p`
  font-size: 11px;
  color: ${theme.colors.cinzaEscuro};
  margin: 0 0 4px;
  line-height: 1.5;
`;

const scenarioColors: Record<string, string> = { A: theme.colors.ambar, B: theme.colors.vermelho, C: theme.colors.verde };

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const entry = payload[0]?.payload as { subregiao: string } | undefined;
    return (
      <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
        <strong style={{ color: theme.colors.azulEscuro }}>{entry?.subregiao}</strong>
        <div>DOI: <strong>{payload[0]?.value} dias</strong></div>
      </div>
    );
  }
  return null;
};

export function RiskSection() {
  return (
    <Wrapper id="risco">
      <SectionTitle
        number="06"
        title="Análise de Risco e Contingência"
        sub="Riscos da solução final (Cenário C), bias de forecast e planos de contingência"
      />

      <Grid>
        <div>
          <BiasCard>
            <BiasTitle>⚠ Bias de Forecast (+{biasData.forecastBias}%)</BiasTitle>
            <BiasRow>
              <span>Demanda Forecast</span>
              <strong>{biasData.demandaForecast.toLocaleString('pt-BR')} HL</strong>
            </BiasRow>
            <BiasRow>
              <span>Demanda Real Estimada</span>
              <strong>{biasData.demandaRealEstimada.toLocaleString('pt-BR')} HL</strong>
            </BiasRow>
            <BiasRow>
              <span>Sobrestoque Potencial</span>
              <strong style={{ color: theme.colors.vermelho }}>
                {biasData.sobreestoque.toLocaleString('pt-BR')} HL
              </strong>
            </BiasRow>
          </BiasCard>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.colors.cinzaEscuro, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              DOI por Sub-Região NENO
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={doiSubregioes} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" domain={[0, 25]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="subregiao" type="category" tick={{ fontSize: 11, fontWeight: 600 }} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="doi" name="DOI (dias)" radius={[0,4,4,0]}>
                  {doiSubregioes.map((entry, i) => (
                    <Cell key={i} fill={entry.doi >= 12 ? theme.colors.verde : theme.colors.vermelho} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ fontSize: 11, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span style={{ color: theme.colors.verde, fontWeight: 700 }}>● ≥ 12 dias (Seguro)</span>
            <span style={{ color: theme.colors.vermelho, fontWeight: 700 }}>● &lt; 12 dias (Crítico)</span>
          </div>
        </div>

        <div>
          <RiskCardGrid>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.colors.cinzaEscuro, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              Risco — Solução Final (Cenário C)
            </div>
            {riskData.filter(r => r.cenario === 'C').map(r => (
              <RiskCard key={r.cenario}>
                <RiskHeader>
                  <RiskLabel $color={scenarioColors[r.cenario]}>Cenário {r.cenario}</RiskLabel>
                  <span style={{ fontSize: 11, fontWeight: 700, color: r.riscoScore > 40 ? theme.colors.ambar : theme.colors.verde }}>
                    {r.riscoScore > 40 ? 'Risco Médio' : 'Risco Baixo'}
                  </span>
                </RiskHeader>
                <RiskBar $pct={r.riscoScore} $fill={r.riscoScore > 40 ? theme.colors.ambar : theme.colors.verde}>
                  <div />
                </RiskBar>
                <RiskDesc>{r.descricao}</RiskDesc>
                <div style={{ fontSize: 11, color: theme.colors.azulMedio, fontWeight: 600 }}>
                  Contingência: {r.contingencia}
                </div>
              </RiskCard>
            ))}
          </RiskCardGrid>

          <div style={{ marginTop: theme.spacing.md }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.colors.cinzaEscuro, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              Planos de Contingência
            </div>
            <ContingenciaList>
              {biasData.contingencias.map((c, i) => (
                <ContingenciaItem key={i}>{c}</ContingenciaItem>
              ))}
            </ContingenciaList>
          </div>
        </div>
      </Grid>
    </Wrapper>
  );
}
