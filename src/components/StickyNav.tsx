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
  background: rgba(30, 39, 97, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 40px;
  padding: 6px 10px;
  display: flex;
  gap: 4px;
  box-shadow: 0 4px 24px rgba(30, 39, 97, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: opacity 0.3s ease;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? 'all' : 'none')};
`;

const NavItem = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? theme.colors.ambar : 'transparent')};
  color: ${(p) => (p.$active ? theme.colors.azulEscuro : 'rgba(255,255,255,0.75)')};
  border: none;
  cursor: pointer;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: ${(p) => (p.$active ? 800 : 500)};
  letter-spacing: 0.3px;
  font-family: ${theme.fonts.body};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(p) => (p.$active ? theme.colors.ambar : 'rgba(255,255,255,0.12)')};
    color: ${(p) => (p.$active ? theme.colors.azulEscuro : 'white')};
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
