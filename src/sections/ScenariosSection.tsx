import styled from 'styled-components';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { scenariosData } from '../data/caseData';

const Wrapper = styled.section`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
`;

const RecTag = styled.div`
  display: inline-block;
  background: ${theme.colors.verde};
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 16px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: ${theme.spacing.md};
`;

const CenarioCard = styled.div`
  border: 2.5px solid ${theme.colors.verde};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  background: rgba(5, 150, 105, 0.05);
`;

const CenarioHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: ${theme.spacing.md};
`;

const CenarioId = styled.div`
  font-size: 48px;
  font-weight: 900;
  color: ${theme.colors.verde};
  line-height: 1;
`;

const CenarioInfo = styled.div``;

const CenarioName = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.azulEscuro};
  margin: 0 0 6px;
`;

const CenarioDesc = styled.p`
  font-size: 13px;
  color: ${theme.colors.cinzaEscuro};
  margin: 0;
  line-height: 1.6;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;

  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
`;

const Metric = styled.div<{ $color?: string }>`
  background: white;
  border-radius: 10px;
  padding: 14px 16px;
  border: 1px solid ${theme.colors.cinzaMedio};
  display: flex;
  flex-direction: column;
  gap: 4px;

  .lbl { font-size: 10px; color: ${theme.colors.cinzaEscuro}; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
  .val { font-size: 22px; font-weight: 900; color: ${(p) => p.$color || theme.colors.azulEscuro}; }
`;

const DetalhesList = styled.ul`
  margin: 0;
  padding: 0 0 0 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 24px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }

  li {
    font-size: 12px;
    color: ${theme.colors.cinzaEscuro};
    line-height: 1.5;
  }
`;

const cenC = scenariosData.find(s => s.id === 'C')!;

export function ScenariosSection() {
  return (
    <Wrapper id="cenarios">
      <SectionTitle
        number="04"
        title="Solução Final — Cenário C"
        sub="Estratégia híbrida: produção local + transferência rodoviária do gap residual"
      />

      <RecTag>★ Solução Recomendada</RecTag>

      <CenarioCard>
        <CenarioHeader>
          <CenarioId>C</CenarioId>
          <CenarioInfo>
            <CenarioName>{cenC.nome.replace('C — ', '')}</CenarioName>
            <CenarioDesc>{cenC.descricao}</CenarioDesc>
          </CenarioInfo>
        </CenarioHeader>

        <MetricGrid>
          <Metric $color={theme.colors.verde}>
            <span className="lbl">Custo Total</span>
            <span className="val">R$ {(cenC.custoTotal / 1000).toFixed(0)}K</span>
          </Metric>
          <Metric $color={theme.colors.verde}>
            <span className="lbl">Custo por HL</span>
            <span className="val">R$ {cenC.custoHL.toFixed(0)}</span>
          </Metric>
          <Metric $color={theme.colors.verde}>
            <span className="lbl">Lead Time</span>
            <span className="val">{cenC.leadTime} dias ✓</span>
          </Metric>
          <Metric $color={theme.colors.verde}>
            <span className="lbl">Risco DOI</span>
            <span className="val">{cenC.riscoLabel} ✓</span>
          </Metric>
        </MetricGrid>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: theme.colors.cinzaEscuro, marginBottom: 8 }}>
            Detalhes Operacionais
          </div>
          <DetalhesList>
            {cenC.detalhes.map((d, i) => <li key={i}>{d}</li>)}
          </DetalhesList>
        </div>
      </CenarioCard>
    </Wrapper>
  );
}
