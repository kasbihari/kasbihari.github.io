import React, { useState, useEffect } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Skills from './sections/Skills';
import FadeTransition from './FadeTransition';
import Footer from './Footer';

type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact'; // <-- skills toegevoegd

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('hero');

  const setSectionFromHash = () => {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (['hero', 'about', 'projects', 'skills', 'contact'].includes(hash)) {
      setActiveSection(hash as Section);
    } else {
      setActiveSection('hero');
    }
  };

  useEffect(() => {
    setSectionFromHash();
    window.addEventListener('hashchange', setSectionFromHash);
    return () => window.removeEventListener('hashchange', setSectionFromHash);
  }, []);

  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[data-nav-item]') || target.closest('button[data-nav-item]');
      if (!anchor) return;
      e.preventDefault();
      const href = anchor.getAttribute('href')?.substring(1);
      if (href && ['hero', 'about', 'projects', 'skills', 'contact'].includes(href)) {
        setActiveSection(href as Section);
        history.pushState(null, '', `#${href}`);
      }
    };
    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return <Hero />;
      case 'about': return <About />;
      case 'projects': return <Projects />;
      case 'skills': return <Skills />;
      case 'contact': return <Contact />;
      default: return <Hero />;
    }
  };

  return (
    <main className="fixed inset-0 z-10 overflow-hidden">
      <div className="relative w-full h-full overflow-y-auto scrollable-section">
        <FadeTransition keyValue={activeSection}>
          {renderSection()}
        </FadeTransition>
        <Footer />
      </div>
    </main>
  );
};

export default App;