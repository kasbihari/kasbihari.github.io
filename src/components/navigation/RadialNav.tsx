import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Home, User, Briefcase, Brain, Mail } from 'lucide-react';

const navItems = [
  { section: 'Hero', icon: Home },
  { section: 'About', icon: User },
  { section: 'Projects', icon: Briefcase },
  { section: 'Skills', icon: Brain },
  { section: 'Contact', icon: Mail },
];

const RadialNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { radius, angles } = useMemo(() => {
    const vw = dimensions.width;
    const vh = dimensions.height;
    // Base radius proportional to screen, but with a comfortable minimum
    let base = Math.min(vw, vh) * 0.16;
    base = Math.min(base, 220);
    base = Math.max(base, 150); // ensure at least 150px

    // Angular spread from 10° to 90° (80° total) for 5 items → step of 20°
    const startAngle = 10;
    const endAngle = 90;
    const step = (endAngle - startAngle) / (navItems.length - 1);
    const ang = Array.from({ length: navItems.length }, (_, i) => (startAngle + i * step) * (Math.PI / 180));
    return { radius: base, angles: ang };
  }, [dimensions]);

  useEffect(() => {
    const updateActive = () => {
      const hash = window.location.hash.slice(1).toLowerCase();
      setActiveSection(hash || 'hero');
    };
    window.addEventListener('hashchange', updateActive);
    updateActive();
    return () => window.removeEventListener('hashchange', updateActive);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNavigate = useCallback((section: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { section: section.toLowerCase() } }));
    setIsOpen(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-8 left-8 z-50" ref={menuRef}>
        <motion.button
          ref={triggerRef}
          className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:text-bordeaux transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <Menu size={28} />
        </motion.button>

        <AnimatePresence>
          {isOpen && navItems.map((item, i) => {
            const angle = angles[i];
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = activeSection === item.section.toLowerCase();
            const Icon = item.icon;

            return (
              <motion.button
                key={item.section}
                ref={el => { itemRefs.current[i] = el; }}
                className={`absolute top-0 left-0 glass p-3 rounded-full transition-colors ${
                  isActive ? 'bg-bordeaux text-white' : 'text-white/80 hover:text-white'
                }`}
                style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                transition={{ delay: i * 0.02, type: 'spring', stiffness: 300, damping: 28 }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(94,42,44,0.5)' }}
                onClick={() => handleNavigate(item.section)}
                aria-label={item.section}
              >
                <Icon size={24} />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RadialNav;