import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutSections, aboutIntro } from '../../../content/about';
import * as LucideIcons from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const getIconComponent = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon || LucideIcons.User;
  };

  return (
    <section id="about" className="aboutSection">
      <div className="aboutContainer">
        {/* Header */}
        <div className="aboutHeader">
          <h2 className="aboutTitle">About Me</h2>
          <p className="aboutSubtitle">Developer, Designer, and Creative Thinker</p>
        </div>

        <div className="aboutContent">
          {/* Main Intro Card */}
          <motion.div 
            className="introCard"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="introTitle">{aboutIntro.title}</h3>
            <p className="introText">{aboutIntro.content}</p>
          </motion.div>

          {/* Compact Section Grid - Kleinere cards */}
          <div className="compactGrid">
            {aboutSections.map((section, index) => {
              const IconComponent = getIconComponent(section.icon);
              
              return (
                <motion.button
                  key={section.id}
                  className="compactCard"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setActivePopup(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="compactIcon">
                    <IconComponent size={18} />
                  </div>
                  <span className="compactTitle">{section.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {activePopup && (() => {
            const section = aboutSections.find(s => s.id === activePopup);
            if (!section) return null;
            const IconComponent = getIconComponent(section.icon);
            
            return (
              <div className="popupOverlay" onClick={() => setActivePopup(null)}>
                <motion.div 
                  className="popupContent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="popupHeader">
                    <div className="popupIcon">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 className="popupTitle">{section.title}</h3>
                      <button 
                        className="closeButton"
                        onClick={() => setActivePopup(null)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="popupBody">
                    <p>{section.content}</p>
                  </div>
                  
                  <div className="popupFooter">
                    <button 
                      className="popupCloseButton"
                      onClick={() => setActivePopup(null)}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutSection;
