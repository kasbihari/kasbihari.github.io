import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Github, Linkedin, Twitter } from 'lucide-react';

const socialItems = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/kasbihari' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/krishnabihari' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/krishnabihari' },
];

const RadialSocial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
    let base = Math.min(vw, vh) * 0.12;
    base = Math.min(base, 180);
    base = Math.max(base, 100);

    // Angles from 135° to 225°? Actually we want northwest quadrant: angles where cos negative, sin positive.
    // For a bottom-right anchor, we need x negative (left) and y negative (up).
    // Using standard angle from positive x axis, we want direction vectors where cos negative and sin positive.
    // Then translate = (cos * radius, -sin * radius) gives both negative.
    // So we can pick angles between 90° and 180°, e.g., 120° to 180°.
    const startAngle = 120;
    const endAngle = 180;
    const step = (endAngle - startAngle) / (socialItems.length - 1);
    const ang = Array.from({ length: socialItems.length }, (_, i) => (startAngle + i * step) * (Math.PI / 180));
    return { radius: base, angles: ang };
  }, [dimensions]);

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

      <div className="fixed bottom-8 right-8 z-50" ref={menuRef}>
        <motion.button
          ref={triggerRef}
          className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:text-bordeaux transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Social menu"
        >
          <Share2 size={28} />
        </motion.button>

        <AnimatePresence>
          {isOpen && socialItems.map((item, i) => {
            const angle = angles[i];
            // For bottom-right anchor: x = cos(angle) * radius (negative for left), y = -sin(angle) * radius (negative for up)
            const x = Math.cos(angle) * radius;
            const y = -Math.sin(angle) * radius;
            const Icon = item.icon;

            return (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-0 right-0 glass p-3 rounded-full text-white/80 hover:text-white"
                style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                transition={{ delay: i * 0.02, type: 'spring', stiffness: 300, damping: 28 }}
                whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(94,42,44,0.5)' }}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RadialSocial;