import React, { useState, useEffect } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import FadeTransition from './FadeTransition';

type Section = 'hero' | 'about' | 'projects' | 'contact';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('hero');

  const setSectionFromHash = () => {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (['hero', 'about', 'projects', 'contact'].includes(hash)) {
      setActiveSection(hash as Section);
    } else {
      setActiveSection('hero');
    }
  };

  useEffect(() => {
    setSectionFromHash();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setSectionFromHash();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[data-nav-item]');
      if (!anchor) return;

      e.preventDefault();
      const href = anchor.getAttribute('href')?.substring(1);
      if (href && ['hero', 'about', 'projects', 'contact'].includes(href)) {
        setActiveSection(href as Section);
        history.pushState(null, '', `#${href}`);
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  const renderSection = () => {
    let sectionComponent;
    switch (activeSection) {
      case 'hero': sectionComponent = <Hero />; break;
      case 'about': sectionComponent = <About />; break;
      case 'projects': sectionComponent = <Projects />; break;
      case 'contact': sectionComponent = <Contact />; break;
      default: sectionComponent = <Hero />;
    }
    return (
      <FadeTransition keyValue={activeSection}>
        {sectionComponent}
      </FadeTransition>
    );
  };

  return (
    <main className="fixed inset-0 z-10 overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {renderSection()}
      </div>
    </main>
  );
};

export default App;