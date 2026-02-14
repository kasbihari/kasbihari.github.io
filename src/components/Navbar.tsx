import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = ['Hero', 'About', 'Projects', 'Skills', 'Contact'];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (section: string) => {
    // Stuur custom event met de sectie (in lowercase)
    window.dispatchEvent(new CustomEvent('navigate', { detail: { section: section.toLowerCase() } }));
    setIsOpen(false); // sluit menu op mobiel
  };

  // Sluit menu bij klik buiten
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('button[aria-label="Menu"]')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Desktop versie */}
      <nav className="fixed top-8 left-8 z-50 hidden md:flex flex-col items-start space-y-3">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleNavigate(item)}
            className="font-body text-xl uppercase tracking-widest text-white/60 hover:text-bordeaux transition-all duration-300 glass px-4 py-2 rounded-lg"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobiele versie */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-bordeaux transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="mobile-menu absolute top-16 left-0 glass p-4 rounded-2xl border border-white/10 flex flex-col space-y-3 min-w-[150px]">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                className="font-body text-lg text-white/80 hover:text-bordeaux transition-colors text-left px-2 py-1"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;