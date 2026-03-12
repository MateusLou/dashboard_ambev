import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useCountUp } from '../hooks/useCountUp';
import type { KPI } from '../data/caseData';

const colorMap: Record<string, string> = {
  vermelho: theme.colors.vermelho,
  ambar: theme.colors.ambar,
  verde: theme.colors.verde,
  azul: theme.colors.azulEscuro,
};

const Card = styled.div<{ $color: string }>`
  background: ${theme.colors.branco};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
  border-left: 5px solid ${(p) => colorMap[p.$color] || theme.colors.azulEscuro};
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-3px);
  }
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${theme.colors.cinzaEscuro};
`;

const Value = styled.span<{ $color: string }>`
  font-size: 28px;
  font-weight: 800;
  color: ${(p) => colorMap[p.$color] || theme.colors.azulEscuro};
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

const Sub = styled.span`
  font-size: 12px;
  color: ${theme.colors.cinzaEscuro};
  opacity: 0.8;
`;

function parseValue(val: string): { prefix: string; num: number | null; suffix: string; raw: string } {
  const str = String(val);
  const match = str.match(/^(R\$\s*)?(\d[\d.]*)(.*)?$/);
  if (!match) return { prefix: '', num: null, suffix: '', raw: str };
  return {
    prefix: match[1] || '',
    num: parseInt(match[2].replace(/\./g, ''), 10),
    suffix: match[3] || '',
    raw: str,
  };
}

interface KPICardProps extends KPI {
  delay?: number;
}

export function KPICard({ label, value, sub, color, delay = 0 }: KPICardProps) {
  const parsed = parseValue(value);
  const animated = useCountUp(parsed.num ?? 0, 1600, delay);

  const displayValue =
    parsed.num !== null
      ? `${parsed.prefix}${animated.toLocaleString('pt-BR')}${parsed.suffix}`
      : value;

  return (
    <Card $color={color}>
      <Label>{label}</Label>
      <Value $color={color}>{displayValue}</Value>
      <Sub>{sub}</Sub>
    </Card>
  );
}
