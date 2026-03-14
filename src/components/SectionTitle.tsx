import styled from 'styled-components';
import { theme } from '../styles/theme';

interface SectionTitleProps {
  number?: string;
  title: string;
  sub?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: ${theme.spacing.md};
`;

const Num = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.azulEscuro};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.preto};
  margin: 0;
`;

const Sub = styled.p`
  font-size: 13px;
  color: ${theme.colors.cinzaEscuro};
  margin: 0;
`;

const Divider = styled.div`
  width: 40px;
  height: 3px;
  background: ${theme.colors.azulEscuro};
  border-radius: 2px;
  margin-top: 4px;
`;

export function SectionTitle({ number, title, sub }: SectionTitleProps) {
  return (
    <Wrapper>
      {number && <Num>{number}</Num>}
      <Title>{title}</Title>
      {sub && <Sub>{sub}</Sub>}
      <Divider />
    </Wrapper>
  );
}
