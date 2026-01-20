export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  level: number; // 1-5
  color: string;
  description: string;
  icon: string; // Lucide icon name
}

export const skills: Skill[] = [
  // Frontend
  { id: 'html', name: 'HTML', category: 'frontend', level: 5, color: '#E34F26', description: 'Semantic HTML5, accessibility, modern standards', icon: 'Code2' },
  { id: 'css', name: 'CSS', category: 'frontend', level: 5, color: '#1572B6', description: 'CSS3, animations, responsive design, Flexbox/Grid', icon: 'Palette' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 5, color: '#F7DF1E', description: 'ES6+, modern patterns, async programming', icon: 'FileCode' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 4, color: '#3178C6', description: 'Type safety, generics, advanced types', icon: 'Type' },
  { id: 'react', name: 'React', category: 'frontend', level: 5, color: '#61DAFB', description: 'Hooks, context, advanced patterns, state management', icon: 'Atom' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 4, color: '#000000', description: 'SSR, ISR, App Router, API routes', icon: 'Layers' },
  { id: 'astro', name: 'Astro', category: 'frontend', level: 4, color: '#FF5D01', description: 'Islands architecture, static site generation', icon: 'Rocket' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 5, color: '#06B6D4', description: 'Utility-first, responsive design, plugins', icon: 'Wind' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', level: 4, color: '#7952B3', description: 'Responsive frameworks, component libraries', icon: 'Box' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 4, color: '#339933', description: 'REST APIs, Express, middleware, server-side', icon: 'Server' },
  { id: 'php', name: 'PHP', category: 'backend', level: 4, color: '#777BB4', description: 'Backend development, Laravel/Symfony', icon: 'Database' },
  { id: 'symfony', name: 'Symfony', category: 'backend', level: 3, color: '#000000', description: 'PHP framework, MVC architecture', icon: 'Cog' },
  { id: 'python', name: 'Python', category: 'backend', level: 3, color: '#3776AB', description: 'Backend scripting, automation, data processing', icon: 'Snake' },
  { id: 'csharp', name: 'C#', category: 'backend', level: 3, color: '#239120', description: '.NET framework, OOP, desktop applications', icon: 'Cog' },
  { id: 'sql', name: 'SQL', category: 'backend', level: 4, color: '#336791', description: 'Database queries, optimization, relational design', icon: 'Database' },
  { id: 'mariadb', name: 'MariaDB', category: 'backend', level: 3, color: '#003545', description: 'Relational database management', icon: 'Database' },
  { id: 'phpmyadmin', name: 'PHPMyAdmin', category: 'backend', level: 4, color: '#6C78AF', description: 'Database administration, management', icon: 'Settings' },
  
  // Design
  { id: 'photoshop', name: 'Photoshop', category: 'design', level: 5, color: '#31A8FF', description: 'Photo editing, digital art, compositing', icon: 'Image' },
  { id: 'illustrator', name: 'Illustrator', category: 'design', level: 5, color: '#FF9A00', description: 'Vector graphics, branding, illustration', icon: 'PenTool' },
  { id: 'lightroom', name: 'Lightroom', category: 'design', level: 4, color: '#31A8FF', description: 'Photo editing, batch processing, presets', icon: 'Camera' },
  { id: 'canva', name: 'Canva', category: 'design', level: 4, color: '#00C4CC', description: 'Graphic design, templates, social media', icon: 'Layout' },
  { id: 'affinity', name: 'Affinity', category: 'design', level: 3, color: '#222222', description: 'Alternative design suite, vector/raster', icon: 'PenTool' },
  { id: 'sketchup', name: 'SketchUp', category: 'design', level: 3, color: '#005F9E', description: '3D modeling, architectural design', icon: 'Cube' },
  { id: 'figma', name: 'Figma', category: 'design', level: 5, color: '#F24E1E', description: 'UI/UX design, prototyping, components', icon: 'LayoutGrid' },
  
  // Tools
  { id: 'flstudio', name: 'FL Studio', category: 'tools', level: 4, color: '#FF6B00', description: 'Music production, audio editing', icon: 'Music' },
  { id: 'github', name: 'GitHub', category: 'tools', level: 5, color: '#181717', description: 'Version control, CI/CD, project management', icon: 'GitBranch' },
  { id: 'git', name: 'Git', category: 'tools', level: 5, color: '#F05032', description: 'Version control, branching, workflows', icon: 'GitCommit' },
];

export const skillCategories = [
  { id: 'frontend', name: 'Frontend', color: '#b41c3b' },
  { id: 'backend', name: 'Backend', color: '#7f1126' },
  { id: 'design', name: 'Design', color: '#d9254c' },
  { id: 'tools', name: 'Tools', color: '#5c0d1b' },
];
