import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories, type Skill } from '../../content/skills';
import './SkillGalaxy.css';

import * as LucideIcons from 'lucide-react';

const SkillGalaxy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Icon helper
  const getIconComponent = useCallback((iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Code2;
  }, []);

  // Bereken posities voor alle skills (gebaseerd op container grootte)
  const positions = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.38;

    const calculatedPositions: { x: number; y: number; category: string; skillId: string }[] = [];

    // Groepeer per categorie
    const categoryGroups = {
      frontend: skills.filter(s => s.category === 'frontend'),
      backend: skills.filter(s => s.category === 'backend'),
      design: skills.filter(s => s.category === 'design'),
      tools: skills.filter(s => s.category === 'tools')
    };

    let skillIndex = 0;
    const sectorAngle = Math.PI / 2;

    Object.entries(categoryGroups).forEach(([category, catSkills], catIndex) => {
      const startAngle = catIndex * sectorAngle;
      const radiusStep = maxRadius / (catSkills.length * 0.7);
      const angleStep = 0.5;

      catSkills.forEach((skill, index) => {
        const angleVariation = (Math.random() - 0.5) * 0.4;
        const angle = startAngle + (index * angleStep) + angleVariation + Math.PI / 4;
        const radius = (index + 1.5) * radiusStep * 1.3;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        calculatedPositions[skillIndex] = { x, y, category, skillId: skill.id };
        skillIndex++;
      });
    });

    return calculatedPositions;
  }, [dimensions]);

  // Gefilterde skills op basis van actieve categorie
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  // Kleuren voor categorieën (bordeaux tinten)
  const getCategoryColor = useCallback((category: string) => {
    const colors: Record<string, string> = {
      'all': 'rgba(94, 42, 44, 0.9)',
      'frontend': 'rgba(180, 28, 59, 0.9)',
      'backend': 'rgba(127, 17, 38, 0.9)',
      'design': 'rgba(217, 37, 76, 0.9)',
      'tools': 'rgba(92, 13, 27, 0.9)'
    };
    return colors[category] || colors.all;
  }, []);

  // Glow kleuren
  const getGlowColor = useCallback((category: string) => {
    const colors: Record<string, string> = {
      'frontend': 'rgba(180, 28, 59, 0.25)',
      'backend': 'rgba(127, 17, 38, 0.25)',
      'design': 'rgba(217, 37, 76, 0.25)',
      'tools': 'rgba(92, 13, 27, 0.25)'
    };
    return colors[category] || 'rgba(94, 42, 44, 0.25)';
  }, []);

  // Verbindingen tussen skills (alleen bij hover, beperkt aantal)
  const connections = useMemo(() => {
    if (!isHovering || positions.length === 0) return [];

    const conns: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    const maxConnections = Math.min(positions.length * 2, 40);

    for (let i = 0; i < positions.length && conns.length < maxConnections; i++) {
      const pos1 = positions[i];
      for (let j = i + 1; j < Math.min(i + 4, positions.length); j++) {
        const pos2 = positions[j];
        if (pos1.category === pos2.category) {
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            conns.push({
              x1: pos1.x,
              y1: pos1.y,
              x2: pos2.x,
              y2: pos2.y,
              color: getCategoryColor(pos1.category)
            });
          }
        }
      }
    }
    return conns;
  }, [positions, isHovering, getCategoryColor]);

  // Resize handler met debounce
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Sectie titel */}
      <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-white text-center">
        Skills <span className="text-bordeaux/80">✦</span>
      </h2>

      {/* Filters */}
      <div className="filterContainer flex flex-wrap gap-3 justify-center mb-8">
        <button
          className={`filterButton px-6 py-2 rounded-full glass transition-all duration-300 ${
            activeCategory === 'all' ? 'bg-bordeaux text-white border-bordeaux/50' : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {skillCategories.map(category => (
          <motion.button
            key={category.id}
            className={`filterButton px-6 py-2 rounded-full glass transition-all duration-300 ${
              activeCategory === category.id ? 'bg-bordeaux text-white border-bordeaux/50' : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Galaxy Container */}
      <div
        className="relative w-full overflow-hidden rounded-2xl glass-card border border-white/10"
        style={{ height: '600px', touchAction: 'none' }}
        ref={containerRef}
      >
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag={true}
          dragElastic={0.1}
          dragMomentum={true}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Statische achtergrond grid */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <circle cx="50%" cy="50%" r="3" fill="rgba(180, 28, 59, 0.6)" className="galaxyCenter" />
            {[0.3, 0.6].map((radius, i) => (
              <circle
                key={`ring-${i}`}
                cx="50%"
                cy="50%"
                r={`${radius * 45}%`}
                fill="none"
                stroke="rgba(180, 28, 59, 0.07)"
                strokeWidth="1"
                strokeDasharray="8,8"
              />
            ))}
            {[...Array(4)].map((_, i) => {
              const angle = (i * Math.PI) / 2;
              const length = 48;
              const x1 = 50 + Math.cos(angle) * 3;
              const y1 = 50 + Math.sin(angle) * 3;
              const x2 = 50 + Math.cos(angle) * length;
              const y2 = 50 + Math.sin(angle) * length;
              return (
                <line
                  key={`sector-${i}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="rgba(180, 28, 59, 0.1)"
                  strokeWidth="1.2"
                />
              );
            })}
            {/* Orbits */}
            {[1, 2].map((_, i) => (
              <circle
                key={`orbit-${i}`}
                cx="50%"
                cy="50%"
                r={`${(i + 1) * 20}%`}
                fill="none"
                stroke="rgba(180, 28, 59, 0.04)"
                strokeWidth="1"
                strokeDasharray="15,10"
              />
            ))}
          </svg>

          {/* Verbindingen */}
          {isHovering && connections.length > 0 && (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {connections.map((conn, index) => (
                <motion.line
                  key={`conn-${index}`}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke={conn.color}
                  strokeWidth="0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.01 }}
                />
              ))}
            </svg>
          )}

          {/* Skill Nodes */}
          {filteredSkills.map((skill, index) => {
            const pos = positions.find(p => p.skillId === skill.id) || { x: 0, y: 0 };
            const IconComponent = getIconComponent(skill.icon);

            if (!pos.x && !pos.y) return null;

            return (
              <motion.div
                key={skill.id}
                className="absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  x: '-50%',
                  y: '-50%',
                  zIndex: 10
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.015,
                  type: 'spring',
                  stiffness: 180,
                  damping: 18,
                  mass: 0.8
                }}
                whileHover={{
                  scale: 1.25,
                  zIndex: 100,
                  transition: { duration: 0.15 }
                }}
                onClick={() => setSelectedSkill(skill)}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg"
                  style={{ background: getCategoryColor(skill.category) }}
                  animate={{
                    y: [0, -2, 0],
                    boxShadow: isHovering
                      ? `0 0 25px ${getCategoryColor(skill.category)}`
                      : `0 0 12px ${getCategoryColor(skill.category)}`
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    boxShadow: { duration: 0.2 }
                  }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <IconComponent size={20} />
                </motion.div>

                {isHovering && (
                  <motion.div
                    className="absolute top-full mt-2 px-2 py-1 text-xs rounded glass whitespace-nowrap"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {skill.name}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailpaneel */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="absolute top-4 right-4 w-64 glass-card p-5 z-50 border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ background: getCategoryColor(selectedSkill.category) }}
                >
                  {(() => {
                    const Icon = getIconComponent(selectedSkill.icon);
                    return <Icon size={18} />;
                  })()}
                </div>
                <div>
                  <h3 className="font-body text-lg font-medium text-white">{selectedSkill.name}</h3>
                  <p className="text-white/50 text-xs">
                    {skillCategories.find(c => c.id === selectedSkill.category)?.name}
                  </p>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-4">{selectedSkill.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Mastery</span>
                  <span>{selectedSkill.level}/5</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level * 20}%` }}
                    transition={{ duration: 0.6 }}
                    style={{ background: getCategoryColor(selectedSkill.category) }}
                  />
                </div>
              </div>

              <button
                className="w-full py-2 text-sm glass rounded-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setSelectedSkill(null)}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillGalaxy;