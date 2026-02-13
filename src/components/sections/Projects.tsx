import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const projects = [
  {
    title: 'Nebula Engine',
    description: 'Real‑time WebGL particle system with custom GLSL shaders.',
    tags: ['Three.js', 'GLSL', 'React'],
    url: '#'
  },
  {
    title: 'Spectra UI',
    description: 'Design system with minimalist aesthetics, built for scale.',
    tags: ['Tailwind', 'Framer Motion', 'TypeScript'],
    url: '#'
  },
  {
    title: 'Portfolio 2026',
    description: 'This very site – a study in restraint and typography.',
    tags: ['Astro', 'Three.js', 'shadcn/ui'],
    url: '#'
  }
];

const Projects: React.FC = () => {
  return (
    <section className="section-container overflow-y-auto">
      <h2 className="font-body text-5xl font-medium mb-12 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {projects.map((project, i) => (
          <Card key={i} className="bg-anthracite/80 border-white/10 hover:border-bordeaux/50 transition-all duration-300">
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