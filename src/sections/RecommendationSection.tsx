import styled from 'styled-components';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { acoesCenarioC, scenariosData } from '../data/caseData';

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

const RecBanner = styled.div`
  background: ${theme.gradients.recommended};
  color: white;
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
`;

const RecTag = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: 6px;
`;

const RecTitle = styled.h2`
  font-size: 24px;
  font-weight: 900;
  margin: 0 0 8px;
`;

const RecSub = styled.p`
  font-size: 13px;
  opacity: 0.85;
  margin: 0 0 ${theme.spacing.md};
  line-height: 1.6;
`;

const RecMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const RecMetric = styled.div`
  background: rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .lbl { font-size: 10px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; }
  .val { font-size: 20px; font-weight: 900; }
`;

const SavingsChip = styled.div`
  margin-top: ${theme.spacing.md};
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

const AcoesTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.azulEscuro};
  margin: 0 0 ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AcaoCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;

  &:last-child { border-bottom: none; }
`;

const AcaoArea = styled.span<{ $bg: string }>`
  background: ${(p) => p.$bg};
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 70px;
  text-align: center;
`;

const AcaoText = styled.span`
  font-size: 12px;
  color: ${theme.colors.cinzaEscuro};
  line-height: 1.5;
`;

const areaColors: Record<string, string> = {
  PCP: theme.colors.azulEscuro,
  Logística: theme.colors.ambar,
  Comercial: theme.colors.verde,
  Finance: theme.colors.vermelho,
};

const cenC = scenariosData.find(s => s.id === 'C')!;
const cenB = scenariosData.find(s => s.id === 'B')!;
const saving = ((cenB.custoTotal - cenC.custoTotal) / cenB.custoTotal * 100).toFixed(0);

export function RecommendationSection() {
  return (
    <Wrapper id="recomendacao">
      <SectionTitle
        number="05"
        title="Recomendação Final"
        sub="Cenário C — Combinação 50/50 como estratégia ótima de supply chain"
      />
      <Grid>
        <RecBanner>
          <RecTag>★ Recomendação</RecTag>
          <RecTitle>Cenário C — Combinação</RecTitle>
          <RecSub>
            Estratégia híbrida: 50% realocação local em PE541 + 50% transferência rodoviária de SP.
            Otimiza custo preservando lead time seguro e flexibilidade operacional.
          </RecSub>

          <RecMetrics>
            <RecMetric>
              <span className="lbl">Custo Total</span>
              <span className="val">R$ 459K</span>
            </RecMetric>
            <RecMetric>
              <span className="lbl">Custo por HL</span>
              <span className="val">R$ 102</span>
            </RecMetric>
            <RecMetric>
              <span className="lbl">Lead Time</span>
              <span className="val">6 dias ✓</span>
            </RecMetric>
            <RecMetric>
              <span className="lbl">Risco DOI</span>
              <span className="val">Baixo ✓</span>
            </RecMetric>
          </RecMetrics>

          <SavingsChip>
            {saving}% mais barato que Cenário B (Rodoviário Total)<br />
            Economia de R$ {(cenB.custoTotal - cenC.custoTotal).toLocaleString('pt-BR')}
          </SavingsChip>
        </RecBanner>

        <div>
          <AcoesTitle>Ações Imediatas</AcoesTitle>
          {acoesCenarioC.map((a, i) => (
            <AcaoCard key={i}>
              <AcaoArea $bg={areaColors[a.area] || theme.colors.cinzaEscuro}>
                {a.area}
              </AcaoArea>
              <AcaoText>{a.acao}</AcaoText>
            </AcaoCard>
          ))}
        </div>
      </Grid>
    </Wrapper>
  );
}
