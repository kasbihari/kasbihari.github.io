import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories, type Skill } from '../../../content/skills';
import './SkillGalaxy.css';

// Import all Lucide icons
import * as LucideIcons from 'lucide-react';

const SkillGalaxy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon || LucideIcons.Code2; // Fallback icon
  };

  // Calculate positions for skills in a spiral pattern - IMPROVED SPACING
  const calculatePositions = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35; // Increased from 0.3
    
    return skills.map((skill, index) => {
      // Use golden angle for even distribution
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const angle = index * goldenAngle;
      
      // Better distribution with more space
      const distance = radius * (0.7 + (index % 3) * 0.1); // More variation
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      return { x, y };
    });
  };

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Get bordeaux color for category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'all': return 'linear-gradient(135deg, var(--accent-4), var(--accent-3))';
      case 'frontend': return 'linear-gradient(135deg, var(--accent-2), var(--accent-3))';
      case 'backend': return 'linear-gradient(135deg, var(--accent), var(--accent-2))';
      case 'design': return 'linear-gradient(135deg, #d9254c, #ff466d)';
      case 'tools': return 'linear-gradient(135deg, var(--accent-4), var(--accent))';
      default: return 'var(--accent)';
    }
  };

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initial positions
  const positions = calculatePositions();

  return (
    <section id="skills" className="skillGalaxySection">
      <div className="skillGalaxyContainer">
        <div className="skillGalaxyHeader">
          <h2 className="skillGalaxyTitle">Skill Galaxy</h2>
          <p className="skillGalaxySubtitle">
            Interactive visualization of my technical and design expertise
          </p>
        </div>

        {/* Category Filters - Including 'All' */}
        <div className="filterContainer">
          <button
            className={`filterButton ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
            style={activeCategory === 'all' ? {
              background: getCategoryColor('all')
            } : {}}
          >
            All Skills
          </button>
          {skillCategories.map(category => (
            <button
              key={category.id}
              className={`filterButton ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={activeCategory === category.id ? {
                background: getCategoryColor(category.id)
              } : {}}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Galaxy Container */}
        <div className="skillGalaxyWrapper" ref={containerRef}>
          {/* Connections */}
          <svg className="connections">
            {positions.map((pos1, i) => 
              positions.slice(i + 1).map((pos2, j) => {
                const skill1 = skills[i];
                const skill2 = skills[j + i + 1];
                // Connect skills from same category (less connections for clarity)
                if (skill1.category === skill2.category && Math.random() > 0.7) {
                  return (
                    <line
                      key={`${i}-${j + i + 1}`}
                      className="connection"
                      x1={pos1.x}
                      y1={pos1.y}
                      x2={pos2.x}
                      y2={pos2.y}
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Skill Nodes with Icons */}
          {filteredSkills.map((skill, index) => {
            const pos = positions[index] || { x: 0, y: 0 };
            const IconComponent = getIconComponent(skill.icon);
            
            return (
              <motion.div
                key={skill.id}
                className="skillNode"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.03, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedSkill(skill)}
              >
                <div 
                  className={`skillNodeCircle ${skill.category}`}
                  style={{ 
                    background: getCategoryColor(skill.category),
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <div className="skillNodeLabel">{skill.name}</div>
              </motion.div>
            );
          })}

          {/* Skill Detail Panel */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                className="skillDetailPanel active"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="skillDetailHeader">
                  <div 
                    className="skillDetailIcon"
                    style={{ background: getCategoryColor(selectedSkill.category) }}
                  >
                    {(() => {
                      const Icon = getIconComponent(selectedSkill.icon);
                      return <Icon size={24} />;
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
                    <span>Proficiency</span>
                    <span>{selectedSkill.level}/5</span>
                  </div>
                  <div className="skillLevelBar">
                    <motion.div
                      className="skillLevelFill"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level * 20}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ background: getCategoryColor(selectedSkill.category) }}
                    />
                  </div>
                </div>
                
                <button
                  className="text-sm px-3 py-1.5 bg-white/10 hover:bg-white/20 text-ink rounded-full transition-all w-full mt-2"
                  onClick={() => setSelectedSkill(null)}
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
