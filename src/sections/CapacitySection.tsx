import styled from 'styled-components';
import { theme } from '../styles/theme';
import { SectionTitle } from '../components/SectionTitle';
import { plantData } from '../data/caseData';

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlantCard = styled.div<{ $border: string }>`
  border: 2px solid ${(p) => p.$border};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
`;

const PlantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const PlantName = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.azulEscuro};
  margin: 0;
`;

const UtilBadge = styled.span<{ $color: string }>`
  background: ${(p) => p.$color};
  color: white;
  font-size: 14px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
`;

const ProgressBar = styled.div<{ $fill: string; $pct: number }>`
  background: ${theme.colors.cinzaMedio};
  border-radius: 6px;
  height: 12px;
  overflow: hidden;
  margin: 8px 0 14px;

  div {
    height: 100%;
    border-radius: 6px;
    background: ${(p) => p.$fill};
    width: ${(p) => p.$pct}%;
    transition: width 0.8s ease;
  }
`;

const SkuRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child { border-bottom: none; }
`;

const SkuDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  display: inline-block;
  margin-right: 6px;
`;

const skuColors: Record<string, string> = {
  Patagonia: theme.colors.azulEscuro,
  Malzbier: theme.colors.ambar,
  'Goose Island': theme.colors.verde,
  Colorado: theme.colors.vermelho,
};

const plantColors = [theme.colors.azulEscuro, theme.colors.ambar];

export function CapacitySection() {
  return (
    <Wrapper id="capacidade">
      <SectionTitle
        number="02"
        title="Capacidade das Plantas"
        sub="AQ541 (Aquiraz/CE) e PE541 (Nassau/PE) — utilização atual e disponibilidade"
      />
      <Grid>
        {plantData.map((plant, i) => (
          <PlantCard key={plant.planta} $border={plantColors[i]}>
            <PlantHeader>
              <PlantName>{plant.planta}</PlantName>
              <UtilBadge $color={plantColors[i]}>{plant.utilizacao}%</UtilBadge>
            </PlantHeader>

            <div style={{ fontSize: 12, color: theme.colors.cinzaEscuro, marginBottom: 4 }}>
              {plant.totalProduzido.toLocaleString('pt-BR')} HL produzidos
              de {plant.capacidade.toLocaleString('pt-BR')} HL/mês
            </div>

            <ProgressBar $pct={plant.utilizacao} $fill={plantColors[i]}>
              <div />
            </ProgressBar>

            <div style={{ fontSize: 11, color: theme.colors.cinzaEscuro, marginBottom: 10, fontWeight: 600 }}>
              DISPONÍVEL: {(plant.capacidade - plant.totalProduzido).toLocaleString('pt-BR')} HL
            </div>

            {plant.skus.map(sku => (
              <SkuRow key={sku.nome}>
                <span>
                  <SkuDot $color={skuColors[sku.nome] || '#999'} />
                  {sku.nome}
                </span>
                <strong>{sku.volume.toLocaleString('pt-BR')} HL</strong>
              </SkuRow>
            ))}
          </PlantCard>
        ))}
      </Grid>
    </Wrapper>
  );
}
