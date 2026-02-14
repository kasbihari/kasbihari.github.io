export interface Skill {
  id: string;
  name: string;
  icon: string;
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
    description: 'Semantic HTML, modern CSS (Flexbox, Grid, animations), responsive design, Tailwind, Bootstrap.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'FileJson',
    category: 'frontend',
    level: 5,
    description: 'ES6+, DOM manipulation, asynchronous programming, functional programming, modules.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'FileCode',
    category: 'frontend',
    level: 4,
    description: 'Type safety, interfaces, generics, advanced types, React integration.'
  },
  {
    id: 'react',
    name: 'React',
    icon: 'Atom',
    category: 'frontend',
    level: 4,
    description: 'Hooks, context, state management (Zustand, Redux), performance optimization.'
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
    description: 'OOP, PDO, MVC pattern, Composer, Symfony basics.'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: 'Database',
    category: 'backend',
    level: 4,
    description: 'Query optimization, database design, relationships, indexing.'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'FileJson',
    category: 'backend',
    level: 3,
    description: 'Express, REST APIs, middleware, file system.'
  },
  {
    id: 'python',
    name: 'Python',
    icon: 'FileCode',
    category: 'backend',
    level: 2,
    description: 'Basic scripting, data processing, automation.'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'PenTool',
    category: 'design',
    level: 4,
    description: 'UI/UX design, prototyping, components, auto layout.'
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: 'Image',
    category: 'design',
    level: 3,
    description: 'Photo editing, composition, color correction.'
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    icon: 'PenTool',
    category: 'design',
    level: 3,
    description: 'Vector graphics, logo design, illustrations.'
  },
  {
    id: 'git',
    name: 'Git',
    icon: 'GitBranch',
    category: 'tools',
    level: 4,
    description: 'Version control, branching, merging, GitHub workflows.'
  },
  {
    id: 'webpack',
    name: 'Webpack',
    icon: 'Package',
    category: 'tools',
    level: 3,
    description: 'Bundling, loaders, plugins, optimization.'
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'Container',
    category: 'tools',
    level: 2,
    description: 'Containerization, Dockerfiles, docker-compose.'
  }
];

export const skillCategories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'design', name: 'Design' },
  { id: 'tools', name: 'Tools' }
];