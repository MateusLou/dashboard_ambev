import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ComposedChart, Line, YAxis as YAxisRight,
} from 'recharts';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { plantWeeklyData, modalData } from '../data/caseData';

const Wrapper = styled.section`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ChartTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.cinzaEscuro};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
`;

const SolutionCard = styled.div`
  background: rgba(5, 150, 105, 0.06);
  border: 2px solid ${theme.colors.verde};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const SolutionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.verde};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const SolutionRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;
  color: ${theme.colors.cinzaEscuro};
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child { border-bottom: none; }

  strong { color: ${theme.colors.preto}; }
`;

const ViabilityBadge = styled.span<{ $viavel: boolean }>`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${(p) => p.$viavel ? theme.colors.successLight : theme.colors.dangerLight};
  color: ${(p) => p.$viavel ? theme.colors.success : theme.colors.danger};
`;

interface ModalTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}

const ModalTooltip = ({ active, payload, label }: ModalTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}>
        <strong style={{ color: theme.colors.preto }}>{label}</strong>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, marginTop: 4 }}>
            {p.name}: <strong>{p.name === 'Lead Time' ? `${p.value} dias` : `R$ ${Number(p.value).toFixed(2)}/HL`}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const modalChartData = modalData.map(m => ({
  nome: m.nome,
  'Custo/HL (R$)': m.custo,
  'Lead Time (dias)': m.leadTime,
  viavel: m.viavel,
}));

export function CapacitySection() {
  return (
    <Wrapper id="capacidade">
      <SectionTitle
        number="02"
        title="Capacidade das Plantas e Modais"
        sub="Utilização semanal AQ541/PE541 e comparativo de modais — solução rodoviária recomendada (Cenário C)"
      />

      <TwoCol>
        <div>
          <ChartTitle>Capacidade das Plantas por Semana (HL)</ChartTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={plantWeeklyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="semana" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickFormatter={v => `${(Number(v) / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: '#64748B' }} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString('pt-BR')} HL`]} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#64748B' }} />
              <Bar dataKey="AQ541 Produzido" fill={theme.colors.azulEscuro} radius={[4, 4, 0, 0]} />
              <Bar dataKey="AQ541 Capacidade" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              <Bar dataKey="PE541 Produzido" fill={theme.colors.ambar} radius={[4, 4, 0, 0]} />
              <Bar dataKey="PE541 Capacidade" fill="#FCD34D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <SolutionCard>
            <SolutionTitle>Solução — Ociosidade NE aproveitada</SolutionTitle>
            <SolutionRow>
              <span>AQ541 — Disponível</span>
              <strong>2.167 HL/mês</strong>
            </SolutionRow>
            <SolutionRow>
              <span>PE541 — Disponível</span>
              <strong>7.236 HL/mês</strong>
            </SolutionRow>
            <SolutionRow>
              <span>Total ociosidade NE</span>
              <strong style={{ color: theme.colors.verde }}>9.403 HL cobertos</strong>
            </SolutionRow>
            <SolutionRow>
              <span>Gap residual (rodoviário)</span>
              <strong style={{ color: theme.colors.vermelho }}>2.277 HL via Jaguariúna</strong>
            </SolutionRow>
          </SolutionCard>
        </div>

        <div>
          <ChartTitle>Comparativo de Modais — Custo/HL vs Lead Time</ChartTitle>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={modalChartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="nome" tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} />
              <YAxis
                yAxisId="custo"
                orientation="left"
                tick={{ fontSize: 10, fill: '#64748B' }}
                label={{ value: 'Custo/HL (R$)', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 10, fill: '#64748B' } }}
              />
              <YAxisRight
                yAxisId="lead"
                orientation="right"
                domain={[0, 30]}
                tick={{ fontSize: 10, fill: '#64748B' }}
                label={{ value: 'Lead Time (dias)', angle: 90, position: 'insideRight', offset: 10, style: { fontSize: 10, fill: '#64748B' } }}
              />
              <Tooltip content={<ModalTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#64748B' }} />
              <Bar yAxisId="custo" dataKey="Custo/HL (R$)" fill={theme.colors.azulEscuro} radius={[4, 4, 0, 0]} />
              <Line yAxisId="lead" type="monotone" dataKey="Lead Time (dias)" stroke={theme.colors.vermelho} strokeWidth={2} dot={{ r: 6, fill: theme.colors.vermelho }} name="Lead Time" />
            </ComposedChart>
          </ResponsiveContainer>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: theme.spacing.md }}>
            {modalData.map(m => (
              <div key={m.nome} style={{ background: '#F8FAFC', border: `1px solid ${m.viavel ? theme.colors.border : theme.colors.danger}`, borderRadius: theme.radius.md, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.preto, marginBottom: 4 }}>{m.nome}</div>
                  <div style={{ fontSize: 11, color: theme.colors.cinzaEscuro, lineHeight: 1.5 }}>{m.descricao}</div>
                </div>
                <ViabilityBadge $viavel={m.viavel}>{m.viavel ? 'VIÁVEL' : 'INVIÁVEL'}</ViabilityBadge>
              </div>
            ))}
          </div>
        </div>
      </TwoCol>
    </Wrapper>
  );
}
