import styled from 'styled-components';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { modalData } from '../data/caseData';

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

const ModalCard = styled.div<{ $viavel: boolean }>`
  border-radius: ${theme.radius.md};
  border: 2px solid ${(p) => (p.$viavel ? theme.colors.verde : theme.colors.cinzaMedio)};
  padding: ${theme.spacing.md};
  position: relative;
  opacity: ${(p) => (p.$viavel ? 1 : 0.7)};
`;

const ModalTag = styled.span<{ $viavel: boolean }>`
  position: absolute;
  top: -12px;
  right: 16px;
  background: ${(p) => (p.$viavel ? theme.colors.verde : theme.colors.cinzaEscuro)};
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ModalName = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: ${theme.colors.azulEscuro};
  margin: 0 0 12px;
`;

const MetricRow = styled.div<{ $alert?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid ${theme.colors.cinzaMedio};
  font-size: 13px;

  &:last-child { border-bottom: none; }

  strong {
    color: ${(p) => p.$alert ? theme.colors.vermelho : theme.colors.azulEscuro};
    font-size: 14px;
  }
`;

const DOIBanner = styled.div`
  background: linear-gradient(135deg, ${theme.colors.azulEscuro} 0%, ${theme.colors.azulMedio} 100%);
  color: white;
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${theme.spacing.md};
`;

const DOIIcon = styled.span`
  font-size: 28px;
`;

const DOIText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .title { font-size: 12px; font-weight: 600; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; }
  .value { font-size: 22px; font-weight: 900; color: ${theme.colors.ambar}; }
  .sub { font-size: 11px; opacity: 0.75; }
`;

export function ModalsSection() {
  return (
    <Wrapper id="modais">
      <SectionTitle
        number="03"
        title="Comparação de Modais"
        sub="Cabotagem vs Rodoviário — trade-off entre custo e lead time"
      />

      <DOIBanner>
        <DOIIcon>⏱</DOIIcon>
        <DOIText>
          <span className="title">Restrição Crítica</span>
          <span className="value">DOI Mínimo: 12 dias</span>
          <span className="sub">Qualquer modal com lead time &gt; 12 dias viola o DOI mínimo da NENO</span>
        </DOIText>
      </DOIBanner>

      <Grid>
        {modalData.map(modal => (
          <ModalCard key={modal.nome} $viavel={modal.viavel}>
            <ModalTag $viavel={modal.viavel}>
              {modal.viavel ? '✓ Viável' : '✗ Viola DOI'}
            </ModalTag>
            <ModalName>{modal.nome}</ModalName>
            <MetricRow>
              <span>Taxa de Avaria</span>
              <strong>{modal.avaria}%</strong>
            </MetricRow>
            <MetricRow>
              <span>Rota</span>
              <strong style={{ fontSize: 12 }}>{modal.origem} → {modal.destino}</strong>
            </MetricRow>
            <div style={{ marginTop: 8, fontSize: 12, color: theme.colors.cinzaEscuro, lineHeight: 1.5 }}>
              {modal.descricao}
            </div>
          </ModalCard>
        ))}
      </Grid>
    </Wrapper>
  );
}
