import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const projects = [
  {
    title: 'Nebula Engine',
    description: 'Real‑time WebGL particle system with custom GLSL shaders. Interactive hover effects and color mapping.',
    tags: ['Three.js', 'GLSL', 'React'],
    category: 'webgl',
    url: '#'
  },
  {
    title: 'Spectra UI',
    description: 'Design system with minimalist aesthetics, built for scale. Used across 5+ production applications.',
    tags: ['Tailwind', 'Framer Motion', 'TypeScript'],
    category: 'design-system',
    url: '#'
  },
  {
    title: 'Portfolio 2026',
    description: 'This very site – a study in restraint, typography, and interactive backgrounds.',
    tags: ['Astro', 'Three.js', 'shadcn/ui'],
    category: 'web',
    url: '#'
  },
  {
    title: 'Fluid Simulations',
    description: 'Real-time fluid dynamics in the browser using WebGL compute shaders.',
    tags: ['WebGL', 'Compute Shaders', 'Math'],
    category: 'webgl',
    url: '#'
  },
  {
    title: 'Motion System',
    description: 'Generative motion library for React applications with spring physics.',
    tags: ['React', 'Animation', 'Framer'],
    category: 'library',
    url: '#'
  }
];

const categories = ['all', 'webgl', 'design-system', 'web', 'library'];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="section-container-centered overflow-y-auto">
      <h2 className="font-body text-4xl md:text-5xl font-medium mb-8 text-white text-center">
        Selected Work
      </h2>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300
              ${activeCategory === cat 
                ? 'bg-bordeaux text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProjects.map((project, i) => (
          <Card key={i} className="bg-anthracite/40 border-white/10 hover:border-bordeaux/50 transition-all duration-500 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-body text-2xl text-white">{project.title}</CardTitle>
              <CardDescription className="font-body text-white/60">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-white hover:text-bordeaux p-0" asChild>
                <a href={project.url}>Learn more →</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;