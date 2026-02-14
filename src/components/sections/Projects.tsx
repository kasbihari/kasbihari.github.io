import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Github, ExternalLink, Play } from 'lucide-react';

type Filter = 'all' | 'pet' | 'assignment';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'pet' | 'assignment';
  status: 'Done' | 'In Progress';
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Kazora Watches',
    description: 'Premium Watch E-commerce. Built a secure PHP/MySQL store with robust admin/user management. Features excellent product presentation and Google Maps integration.',
    category: 'assignment',
    status: 'Done',
    tech: ['PHP', 'MySQL', 'Bootstrap'],
    codeUrl: 'https://github.com/kasbihari/Kazora'
  },
  {
    id: 2,
    title: 'Project in progress...',
    description: 'Coming soon...',
    category: 'pet',
    status: 'In Progress',
    tech: ['Unity', 'C#', 'Pixel Art'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'CodeLibrary',
    description: 'Snippets, patterns and micro-components that I use daily. With search and tags functionality.',
    category: 'pet',
    status: 'Done',
    tech: ['JavaScript', 'Patterns', 'Design'],
    liveUrl: 'https://kasbihari.github.io/CodeLibrary/',
    codeUrl: 'https://github.com/kasbihari/CodeLibrary'
  },
  {
    id: 4,
    title: 'Project in progress...',
    description: 'Coming soon...',
    category: 'assignment',
    status: 'In Progress',
    tech: ['D3.js', 'JavaScript', 'Bootstrap'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 5,
    title: 'Project in progress...',
    description: 'Coming soon...',
    category: 'pet',
    status: 'Done',
    tech: ['HTML/CSS', 'JavaScript', 'Bootstrap'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 6,
    title: 'Budget Buddy',
    description: 'Sleek Finance Manager (Symfony/Chart.js). Built a secure platform for managing transactions, reporting, and visualization. Features a premium dashboard and robust user/admin system.',
    category: 'assignment',
    status: 'Done',
    tech: ['Symfony', 'Charts.js', 'Bootstrap'],
    codeUrl: 'https://github.com/kasbihari/Budget-Buddy'
  }
];

const Badge: React.FC<{ children: React.ReactNode; variant?: 'status' | 'category' }> = ({ children, variant = 'status' }) => {
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
  const variantClasses = variant === 'status'
    ? children === 'Done' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
    : 'bg-bordeaux/20 text-bordeaux-light';
  return <span className={`${baseClasses} ${variantClasses}`}>{children}</span>;
};

const TechTag: React.FC<{ tech: string }> = ({ tech }) => (
  <span className="px-2 py-1 text-xs rounded-full glass text-white/70">{tech}</span>
);

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-body text-4xl md:text-5xl font-medium mb-8 text-white text-center">
          Projects <span className="text-bordeaux/80">✦</span>
        </h2>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {(['all', 'pet', 'assignment'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full glass transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-bordeaux text-white border-bordeaux/50'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter === 'all' ? 'All Projects' : filter === 'pet' ? 'Pet Projects' : 'Assignments'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass-card border-white/10 hover:border-bordeaux/50 transition-all duration-500 flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-body text-xl text-white flex-1">{project.title}</CardTitle>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Badge variant="status">{project.status}</Badge>
                    <Badge variant="category">{project.category === 'pet' ? 'Pet' : 'Assignment'}</Badge>
                  </div>
                </div>
                <CardDescription className="font-body text-white/60 text-sm mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag, i) => (
                    <TechTag key={i} tech={tag} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-3 pt-4 border-t border-white/10">
                {project.liveUrl && project.liveUrl !== '#' ? (
                  <Button variant="ghost" className="text-white hover:text-bordeaux p-0 h-auto flex items-center gap-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} /> Live
                    </a>
                  </Button>
                ) : (
                  <span className="text-white/40 flex items-center gap-1 text-sm cursor-not-allowed">
                    <Play size={16} /> Preview
                  </span>
                )}
                {project.codeUrl && project.codeUrl !== '#' ? (
                  <Button variant="ghost" className="text-white hover:text-bordeaux p-0 h-auto flex items-center gap-1" asChild>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> Code
                    </a>
                  </Button>
                ) : (
                  <span className="text-white/40 flex items-center gap-1 text-sm cursor-not-allowed">
                    <Github size={16} /> Code
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;