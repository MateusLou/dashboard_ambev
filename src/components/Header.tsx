import styled from 'styled-components';
import { theme } from '../styles/theme';

const HeaderWrapper = styled.header`
  background: ${theme.gradients.header};
  color: ${theme.colors.preto};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  box-shadow: ${theme.shadows.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${theme.spacing.md};
    text-align: center;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Brand = styled.span`
  font-family: ${theme.fonts.title};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.ambar};
  opacity: 0.9;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.title};
  font-size: 26px;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  margin: 0;
  opacity: 0.75;
`;

const BadgeGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const Badge = styled.div`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: ${theme.radius.md};
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 100px;

  span.val {
    font-size: 18px;
    font-weight: 800;
    color: ${theme.colors.ambar};
  }
  span.lbl {
    opacity: 0.7;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export function Header() {
  return (
    <HeaderWrapper>
      <TitleBlock>
        <Brand>Ambev · Insper Junior · Fevereiro 2026</Brand>
        <Title>Long Neck NENO — Supply Chain</Title>
        <Subtitle>Análise de Cenários · Malzbier Brahma +30% · Região Nordeste</Subtitle>
      </TitleBlock>
      <BadgeGroup>
        <Badge>
          <span className="val">11.680 HL</span>
          <span className="lbl">Gap Demanda</span>
        </Badge>
        <Badge>
          <span className="val">R$ 382K</span>
          <span className="lbl">Budget (C)</span>
        </Badge>
        <Badge>
          <span className="val">6 dias</span>
          <span className="lbl">Lead Time</span>
        </Badge>
        <Badge>
          <span className="val">8.6/10</span>
          <span className="lbl">Score Cen. C</span>
        </Badge>
      </BadgeGroup>
    </HeaderWrapper>
  );
}
