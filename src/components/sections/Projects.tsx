import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const projects = [
  {
    title: 'Nebula Engine',
    description: 'Real‑time WebGL particle system met custom GLSL shaders.',
    tags: ['Three.js', 'GLSL', 'React'],
    url: '#'
  },
  {
    title: 'Spectra UI',
    description: 'Design system met cinematische neon-esthetiek, gebouwd voor schaal.',
    tags: ['Tailwind', 'Framer Motion', 'TypeScript'],
    url: '#'
  },
  {
    title: 'Portfolio 2026',
    description: 'Deze site – een studie in prestaties en minimalisme.',
    tags: ['Astro', 'Three.js', 'shadcn/ui'],
    url: '#'
  }
];

const Projects: React.FC = () => {
  return (
    <section className="section-container overflow-y-auto">
      <h2 className="text-5xl font-display text-glow mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {projects.map((project, i) => (
          <Card key={i} className="bg-surface/80 border-neon-white/10 backdrop-blur-sm hover:border-neon-white/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-neon-white">{project.title}</CardTitle>
              <CardDescription className="font-body text-neon-white/70">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neon-white/10 text-neon-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-neon-white hover:text-glow-subtle p-0" asChild>
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