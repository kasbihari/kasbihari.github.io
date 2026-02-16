import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = ['Hero', 'About', 'Projects', 'Skills', 'Contact'];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (section: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { section: section.toLowerCase() } }));
    setIsOpen(false);
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
      {/* Desktop versie (vanaf md) */}
      <nav className="fixed top-8 left-8 z-50 hidden md:flex flex-col items-start space-y-3">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleNavigate(item)}
            className="
              font-body text-xl uppercase tracking-widest
              text-white/60 hover:text-white
              transition-all duration-300
              glass px-6 py-3 rounded-full
              min-w-[140px] text-left
              hover:bg-bordeaux/20 hover:border-bordeaux/50
            "
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobiele versie (tot md) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-bordeaux transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="mobile-menu absolute top-16 left-0 glass p-3 rounded-3xl border border-white/10 flex flex-col space-y-2 min-w-[160px]">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                className="
                  font-body text-base text-white/80 hover:text-white
                  transition-colors text-left px-4 py-2
                  rounded-full hover:bg-bordeaux/20
                "
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