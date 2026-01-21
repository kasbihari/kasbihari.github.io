import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '../../../content/skills';
import './SkillGalaxy.css';

import * as LucideIcons from 'lucide-react';

const SkillGalaxy = () => {
  const containerRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Get icon component - optimized
  const getIconComponent = useCallback((iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Code2;
  }, []);

  // Pre-calculate positions with MUCH more space - OPTIMIZED
  const positions = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.38; // Increased from 0.32
    
    const calculatedPositions = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    // Group by category first for better organization
    const categoryGroups = {
      'frontend': skills.filter(s => s.category === 'frontend'),
      'backend': skills.filter(s => s.category === 'backend'),
      'design': skills.filter(s => s.category === 'design'),
      'tools': skills.filter(s => s.category === 'tools')
    };
    
    let skillIndex = 0;
    
    // Place each category in its own quadrant with MUCH MORE SPACE
    Object.entries(categoryGroups).forEach(([category, catSkills], catIndex) => {
      const sectorAngle = Math.PI / 2; // 90 degrees per quadrant
      const startAngle = catIndex * sectorAngle;
      
      // Use logarithmic spacing for more room
      const radiusStep = maxRadius / (catSkills.length * 0.7); // More spacing
      const angleStep = 0.5; // Reduced angle step for more space
      
      catSkills.forEach((skill, index) => {
        // Spread skills out more
        const angleVariation = (Math.random() - 0.5) * 0.4; // Reduced variation
        const angle = startAngle + (index * angleStep) + angleVariation + Math.PI/4;
        
        // Increased minimum radius and spacing
        const radius = (index + 1.5) * radiusStep * 1.3; // 30% more spacing
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        calculatedPositions[skillIndex] = { 
          x, 
          y, 
          category,
          skillId: skill.id // Add skillId for quick lookup
        };
        skillIndex++;
      });
    });
    
    return calculatedPositions;
  }, [dimensions]);

  // Optimized skill filtering with useMemo
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  // Optimized category colors
  const getCategoryColor = useCallback((category) => {
    const colors = {
      'all': 'rgba(127, 17, 38, 0.9)',
      'frontend': 'rgba(180, 28, 59, 0.9)',
      'backend': 'rgba(127, 17, 38, 0.9)',
      'design': 'rgba(217, 37, 76, 0.9)',
      'tools': 'rgba(92, 13, 27, 0.9)'
    };
    return colors[category] || colors.all;
  }, []);

  // Optimized glow colors
  const getGlowColor = useCallback((category) => {
    const colors = {
      'frontend': 'rgba(180, 28, 59, 0.25)',
      'backend': 'rgba(127, 17, 38, 0.25)',
      'design': 'rgba(217, 37, 76, 0.25)',
      'tools': 'rgba(92, 13, 27, 0.25)'
    };
    return colors[category] || 'rgba(127, 17, 38, 0.25)';
  }, []);

  // Optimized resize handler with debounce
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150); // Debounced
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Pre-calculated connections for better performance
  const connections = useMemo(() => {
    if (!isHovering || positions.length === 0) return [];
    
    const conns = [];
    const maxConnections = Math.min(positions.length * 2, 40); // Limit connections for performance
    
    for (let i = 0; i < positions.length && conns.length < maxConnections; i++) {
      const pos1 = positions[i];
      
      // Only check nearby nodes (max 3)
      for (let j = i + 1; j < Math.min(i + 4, positions.length); j++) {
        const pos2 = positions[j];
        
        if (pos1.category === pos2.category) {
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect if not too far (adjusted for new spacing)
          if (distance < 180) { // Increased from 120
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

  // Handle skill select
  const handleSkillSelect = useCallback((skill) => {
    setSelectedSkill(skill);
  }, []);

  // Handle close
  const handleCloseDetail = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  return (
    <section id="skills" className="skillGalaxySection">
      <div className="skillGalaxyContainer">
        {/* Header */}
        <div className="skillGalaxyHeader">
          <h2 className="skillGalaxyTitle">Skill Galaxy</h2>
        </div>

        {/* Filters */}
        <div className="filterContainer">
          {[{id: 'all', name: 'All'}, ...skillCategories].map(category => (
            <motion.button
              key={category.id}
              className={`filterButton ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={activeCategory === category.id ? {
                background: getCategoryColor(category.id)
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Galaxy Container */}
        <div 
          className="skillGalaxyWrapper" 
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Static Galaxy Grid - Optimized (no animations) */}
          <svg className="galaxyGrid">
            {/* Center point */}
            <circle 
              cx="50%" 
              cy="50%" 
              r="3" 
              fill="rgba(180, 28, 59, 0.6)"
              className="galaxyCenter"
            />
            
            {/* Concentric rings - FEWER for performance */}
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
            
            {/* Sector dividing lines - REDUCED for performance */}
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
          </svg>

          {/* Static Orbits - Optimized */}
          <svg className="orbits">
            {[1, 2].map((orbit, i) => (
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

          {/* Optimized Connections */}
          {isHovering && connections.length > 0 && (
            <svg className="nodeConnections">
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

          {/* Skill Nodes - Optimized rendering */}
          {filteredSkills.map((skill, index) => {
            const pos = positions.find(p => p?.skillId === skill.id) || { x: 0, y: 0 };
            const IconComponent = getIconComponent(skill.icon);
            
            if (!pos.x && !pos.y) return null;
            
            return (
              <motion.div
                key={skill.id}
                className="skillNode"
                style={{
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                }}
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  x: "-50%",
                  y: "-50%"
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: "-50%",
                  y: "-50%"
                }}
                transition={{ 
                  delay: index * 0.015, // Reduced delay
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  mass: 0.8 // Lighter for better performance
                }}
                whileHover={{ 
                  scale: 1.25, // Reduced from 1.3
                  zIndex: 100,
                  transition: { duration: 0.15 } // Faster
                }}
                onClick={() => handleSkillSelect(skill)}
              >
                <motion.div 
                  className={`skillNodeCircle ${skill.category}`}
                  style={{ 
                    background: getCategoryColor(skill.category),
                  }}
                  animate={{
                    y: [0, -2, 0], // Reduced movement
                    boxShadow: isHovering 
                      ? `0 0 25px ${getCategoryColor(skill.category)}`
                      : `0 0 12px ${getCategoryColor(skill.category)}`
                  }}
                  transition={{
                    y: {
                      duration: 3, // Slower for less CPU
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    boxShadow: { duration: 0.2 }
                  }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <IconComponent size={16} /> {/* Smaller icon */}
                </motion.div>
                
                {/* Label - only renders when needed */}
                {isHovering && (
                  <motion.div 
                    className="skillNodeLabel"
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

          {/* Detail Panel */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                className="skillDetailPanel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="skillDetailHeader">
                  <div 
                    className="skillDetailIcon"
                    style={{ 
                      background: getCategoryColor(selectedSkill.category),
                    }}
                  >
                    {(() => {
                      const Icon = getIconComponent(selectedSkill.icon);
                      return <Icon size={16} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="skillDetailName">{selectedSkill.name}</h3>
                    <p className="skillDetailCategory">
                      {skillCategories.find(c => c.id === selectedSkill.category)?.name}
                    </p>
                  </div>
                </div>
                
                <p className="skillDetailDescription">{selectedSkill.description}</p>
                
                <div className="skillLevel">
                  <div className="skillLevelLabel">
                    <span>Mastery</span>
                    <span>{selectedSkill.level}/5</span>
                  </div>
                  <div className="skillLevelBar">
                    <motion.div
                      className="skillLevelFill"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level * 20}%` }}
                      transition={{ duration: 0.6 }}
                      style={{ background: getCategoryColor(selectedSkill.category) }}
                    />
                  </div>
                </div>
                
                <button
                  className="closeButton"
                  onClick={handleCloseDetail}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillGalaxy;
