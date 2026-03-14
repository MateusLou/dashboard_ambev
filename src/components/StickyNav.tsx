import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface NavSection {
  id: string;
  label: string;
}

const sections: NavSection[] = [
  { id: 'demanda', label: 'Demanda' },
  { id: 'capacidade', label: 'Capacidade' },
  { id: 'modais', label: 'Modais' },
  { id: 'cenarios', label: 'Cenários' },
  { id: 'recomendacao', label: 'Recomendação' },
  { id: 'risco', label: 'Risco' },
];

const Nav = styled.nav<{ $visible: boolean }>`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: #FFFFFF;
  backdrop-filter: blur(12px);
  border-radius: 40px;
  padding: 6px 10px;
  display: flex;
  gap: 4px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid #E2E8F0;
  transition: opacity 0.3s ease;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? 'all' : 'none')};
`;

const NavItem = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? theme.colors.azulEscuro : 'transparent')};
  color: ${(p) => (p.$active ? '#FFFFFF' : theme.colors.cinzaEscuro)};
  border: none;
  cursor: pointer;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: ${(p) => (p.$active ? 700 : 500)};
  letter-spacing: 0.3px;
  font-family: ${theme.fonts.body};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(p) => (p.$active ? theme.colors.azulEscuro : '#F0F2F5')};
    color: ${(p) => (p.$active ? '#FFFFFF' : theme.colors.preto)};
  }
`;

export function StickyNav() {
  const [active, setActive] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 200);

      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(s.id);
          return;
        }
      }
      setActive('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Nav $visible={visible}>
      {sections.map((s) => (
        <NavItem key={s.id} $active={active === s.id} onClick={() => scrollTo(s.id)}>
          {s.label}
        </NavItem>
      ))}
    </Nav>
  );
}
