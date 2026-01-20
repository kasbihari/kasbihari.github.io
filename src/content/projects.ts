export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'full-stack' | 'frontend' | 'design' | 'pet-project';
  tags: string[];
  year: number;
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  details: {
    challenge: string;
    solution: string;
    technologies: string[];
    results: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'portfolio-v2',
    title: 'Cinematic Portfolio',
    description: 'A visually stunning portfolio website blending code, art and culture with cinematic animations.',
    category: 'frontend',
    tags: ['Astro', 'React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    year: 2024,
    image: '/images/portfolio-preview.jpg',
    link: 'https://kasbihari.github.io',
    github: 'https://github.com/kasbihari/kasbihari.github.io',
    featured: true,
    details: {
      challenge: 'Create a memorable portfolio that stands out to recruiters while maintaining performance.',
      solution: 'Built with Astro for speed, React for interactivity, and Framer Motion for cinematic animations.',
      technologies: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      results: ['95+ Performance Score', 'Cinematic user experience', 'Fully responsive design']
    }
  },
  {
    id: 'ecommerce-platform',
    title: 'Full-Stack E-Commerce',
    description: 'A complete e-commerce platform with admin dashboard, payment integration, and inventory management.',
    category: 'full-stack',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    year: 2023,
    image: '/images/ecommerce-preview.jpg',
    github: 'https://github.com/kasbihari/ecommerce-platform',
    featured: true,
    details: {
      challenge: 'Build a scalable e-commerce solution with real-time inventory and secure payments.',
      solution: 'Microservices architecture with separate API, admin panel, and storefront.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
      results: ['Handles 10k+ products', 'Sub-second page loads', 'Secure payment processing']
    }
  },
  {
    id: 'brand-identity',
    title: 'Tech Startup Brand Identity',
    description: 'Complete brand identity design for a SaaS startup including logo, typography, and marketing materials.',
    category: 'design',
    tags: ['Logo Design', 'Brand Identity', 'Typography', 'Marketing'],
    year: 2023,
    image: '/images/brand-preview.jpg',
    featured: true,
    details: {
      challenge: 'Create a modern, trustworthy brand identity for a B2B SaaS company.',
      solution: 'Minimalist design system with scalable components and clear visual hierarchy.',
      technologies: ['Figma', 'Illustrator', 'Photoshop', 'After Effects'],
      results: ['Cohesive brand system', 'Scalable design assets', 'Positive client feedback']
    }
  },
  {
    id: 'task-manager',
    title: 'Collaborative Task Manager',
    description: 'Real-time task management application with team collaboration features and progress tracking.',
    category: 'pet-project',
    tags: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Real-time'],
    year: 2023,
    image: '/images/task-manager-preview.jpg',
    github: 'https://github.com/kasbihari/task-manager',
    featured: false,
    details: {
      challenge: 'Build a real-time collaborative app with offline capabilities.',
      solution: 'React frontend with Socket.io for real-time updates and service workers for offline support.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'PWA'],
      results: ['Real-time collaboration', 'Offline functionality', 'Intuitive UI/UX']
    }
  },
  {
    id: 'data-visualization',
    title: 'Interactive Data Dashboard',
    description: 'Dynamic data visualization dashboard with real-time analytics and custom reporting.',
    category: 'frontend',
    tags: ['D3.js', 'React', 'Chart.js', 'API Integration'],
    year: 2024,
    image: '/images/dashboard-preview.jpg',
    github: 'https://github.com/kasbihari/data-dashboard',
    featured: false,
    details: {
      challenge: 'Visualize complex datasets in an intuitive, interactive way.',
      solution: 'Custom D3.js visualizations with React components for interactivity.',
      technologies: ['React', 'D3.js', 'Chart.js', 'TypeScript', 'REST API'],
      results: ['Interactive charts', 'Real-time data updates', 'Export functionality']
    }
  },
  {
    id: 'mobile-app-design',
    title: 'Fitness App UI/UX Design',
    description: 'Complete mobile app design for a fitness tracking application with workout plans and progress analytics.',
    category: 'design',
    tags: ['UI Design', 'UX Research', 'Prototyping', 'Mobile Design'],
    year: 2024,
    image: '/images/fitness-app-preview.jpg',
    featured: false,
    details: {
      challenge: 'Design an engaging fitness app that motivates users to achieve their goals.',
      solution: 'User-centered design with gamification elements and clear progress tracking.',
      technologies: ['Figma', 'Prototyping', 'User Testing', 'Design Systems'],
      results: ['High-fidelity prototypes', 'User-tested flows', 'Design system']
    }
  }
];

export const projectCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'full-stack', name: 'Full-Stack' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'design', name: 'Design' },
  { id: 'pet-project', name: 'Pet Projects' },
];
