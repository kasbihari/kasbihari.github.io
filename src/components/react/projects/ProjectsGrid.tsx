import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, projectCategories, type Project } from '../../../content/projects';
import { ExternalLink, Github } from 'lucide-react';
import '../../../styles/projects.css';

const ProjectsGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter projects
  const filteredProjects = activeCategory === 'all' 
    ? projects.filter(p => p.featured)  // Toon alleen featured projects
    : projects.filter(project => project.category === activeCategory && project.featured);

  return (
    <section id="projects" className="projectsSection">
      <div className="projectsContainer">
        <div className="projectsHeader">
          <h2 className="projectsTitle">Selected Work</h2>
          <p className="projectsSubtitle">
            A curated showcase of my most impactful projects
          </p>
        </div>

        {/* Category Filters */}
        <div className="filterContainer">
          <button
            className={`filterButton ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {projectCategories.filter(cat => cat.id !== 'all').map(category => (
            <button
              key={category.id}
              className={`filterButton ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projectsGrid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="projectCard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="projectImage">
                  {project.emoji || '✨'}
                </div>
                <div className="projectContent">
                  <h3 className="projectTitle">{project.title}</h3>
                  <p className="projectDescription">{project.description}</p>
                  
                  <div className="projectTags">
                    <span className="projectTag">{project.category}</span>
                    {project.tags && project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="projectTag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="projectLinks">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projectLink"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projectLink"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="noProjects">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
