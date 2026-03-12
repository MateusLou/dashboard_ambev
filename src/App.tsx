import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { StickyNav } from './components/StickyNav';
import { DemandSection } from './sections/DemandSection';
import { CapacitySection } from './sections/CapacitySection';
import { ModalsSection } from './sections/ModalsSection';
import { ScenariosSection } from './sections/ScenariosSection';
import { RecommendationSection } from './sections/RecommendationSection';
import { RiskSection } from './sections/RiskSection';
import { kpis } from './data/caseData';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${theme.colors.cinzaClaro};
    color: ${theme.colors.preto};
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }
`;

const PageLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const Footer = styled.footer`
  background: ${theme.colors.azulEscuro};
  color: rgba(255,255,255,0.5);
  text-align: center;
  padding: ${theme.spacing.md};
  font-size: 12px;
  margin-top: ${theme.spacing.lg};
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <StickyNav />
      <PageLayout>
        <Header />
        <Main>
          <KPIGrid>
            {kpis.map((kpi, i) => (
              <KPICard key={kpi.label} {...kpi} delay={i * 180} />
            ))}
          </KPIGrid>

          <DemandSection />
          <CapacitySection />
          <ModalsSection />
          <ScenariosSection />
          <RecommendationSection />
          <RiskSection />
        </Main>

        <Footer>
          Ambev Long Neck — NENO Supply Chain Analysis · Insper Junior · Fevereiro 2026
        </Footer>
      </PageLayout>
    </>
  );
}
