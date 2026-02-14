export interface Skill {
    id: string;
    name: string;
    icon: string; // Naam van het Lucide-icon (bijv. 'Code2', 'FileJson')
    category: 'frontend' | 'backend' | 'design' | 'tools';
    level: number; // 1-5
    description: string;
  }
  
  export const skills: Skill[] = [
    {
      id: 'html-css',
      name: 'HTML & CSS',
      icon: 'Code2',
      category: 'frontend',
      level: 5,
      description: 'Semantische HTML, moderne CSS (Flexbox, Grid, animaties), responsive design, Tailwind, Bootstrap.'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: 'FileJson',
      category: 'frontend',
      level: 5,
      description: 'ES6+, DOM-manipulatie, asynchroon programmeren, functioneel programmeren, modules.'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: 'FileCode',
      category: 'frontend',
      level: 4,
      description: 'Type safety, interfaces, generics, advanced types, integratie met React.'
    },
    {
      id: 'react',
      name: 'React',
      icon: 'Atom',
      category: 'frontend',
      level: 4,
      description: 'Hooks, context, state management (Zustand, Redux), performance optimalisatie.'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: 'Workflow',
      category: 'frontend',
      level: 3,
      description: 'SSR, SSG, API routes, file-based routing, deployment.'
    },
    {
      id: 'php',
      name: 'PHP',
      icon: 'Database',
      category: 'backend',
      level: 4,
      description: 'OOP, PDO, MVC-patroon, Composer, Symfony basis.'
    },
    {
      id: 'mysql',
      name: 'MySQL',
      icon: 'Database',
      category: 'backend',
      level: 4,
      description: 'Query optimalisatie, database ontwerp, relaties, indexeren.'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: 'FileJson',
      category: 'backend',
      level: 3,
      description: 'Express, REST APIs, middleware, bestandssysteem.'
    },
    {
      id: 'python',
      name: 'Python',
      icon: 'FileCode',
      category: 'backend',
      level: 2,
      description: 'Basis scripting, data processing, automatisering.'
    },
    {
      id: 'figma',
      name: 'Figma',
      icon: 'PenTool',
      category: 'design',
      level: 4,
      description: 'UI/UX design, prototyping, componenten, auto layout.'
    },
    {
      id: 'photoshop',
      name: 'Photoshop',
      icon: 'Image',
      category: 'design',
      level: 3,
      description: 'Foto bewerking, compositie, kleurcorrectie.'
    },
    {
      id: 'illustrator',
      name: 'Illustrator',
      icon: 'PenTool',
      category: 'design',
      level: 3,
      description: 'Vector graphics, logo ontwerp, illustraties.'
    },
    {
      id: 'git',
      name: 'Git',
      icon: 'GitBranch',
      category: 'tools',
      level: 4,
      description: 'Versiebeheer, branching, merging, GitHub workflows.'
    },
    {
      id: 'webpack',
      name: 'Webpack',
      icon: 'Package',
      category: 'tools',
      level: 3,
      description: 'Bundelen, loaders, plugins, optimalisatie.'
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: 'Container',
      category: 'tools',
      level: 2,
      description: 'Containerisatie, Dockerfiles, docker-compose.'
    }
  ];
  
  export const skillCategories = [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'design', name: 'Design' },
    { id: 'tools', name: 'Tools' }
  ];