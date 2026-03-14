export const theme = {
  colors: {
    // Backgrounds
    pageBg: '#F0F2F5',
    cardBg: '#FFFFFF',
    cardBg2: '#F8FAFC',
    // Text
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    // Borders
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    // Semantic
    danger: '#DC2626',
    dangerLight: '#FEE2E2',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    success: '#059669',
    successLight: '#D1FAE5',
    info: '#0369A1',
    infoLight: '#E0F2FE',
    // Chart accent colors
    accent1: '#0369A1',
    accent2: '#0EA5E9',
    accent3: '#059669',
    accent4: '#D97706',
    accent5: '#DC2626',
    accent6: '#7C3AED',
    // Legacy aliases (used in some components)
    azulEscuro: '#0369A1',
    azulMedio: '#0EA5E9',
    azulClaro: '#38BDF8',
    ambar: '#D97706',
    ambarClaro: '#F59E0B',
    vermelho: '#DC2626',
    vermelhoClaro: '#EF4444',
    verde: '#059669',
    verdeClaro: '#10B981',
    cinzaClaro: '#F0F2F5',
    cinzaMedio: '#E2E8F0',
    cinzaEscuro: '#64748B',
    branco: '#FFFFFF',
    preto: '#0F172A',
  },
  gradients: {
    header: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0C4A6E 100%)',
    card: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
    recommended: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
    danger: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
  },
  shadows: {
    card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
    cardHover: '0 4px 12px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)',
    header: '0 2px 12px rgba(0,0,0,0.15)',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
  },
  fonts: {
    title: "'Inter', 'Roboto', sans-serif",
    body: "'Inter', 'Roboto', sans-serif",
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '48px',
  },
};

export const chartColors = {
  Malzbier: '#0369A1',
  Patagonia: '#7C3AED',
  'Goose Island': '#059669',
  Colorado: '#D97706',
  Cabotagem: '#94A3B8',
  Rodoviário: '#DC2626',
  'AQ541 — Aquiraz/CE': '#7C3AED',
  'PE541 — Nassau/PE': '#0369A1',
  A: '#D97706',
  B: '#DC2626',
  C: '#059669',
};

// Legacy export
export const ambevColors = chartColors;
