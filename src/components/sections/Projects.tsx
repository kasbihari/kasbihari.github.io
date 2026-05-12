import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Github, ExternalLink, ArrowRight, Clock } from 'lucide-react';

/* ─────────────────────────────────────────────
   PERFORMANCE NOTES:
   - Removed framer-motion entirely (saves ~40 kB)
   - Filter renders a sub-array, no DOM thrash
   - IntersectionObserver for card reveals (no scroll listener)
   - Project data defined outside component — no re-creation on render
───────────────────────────────────────────── */

type Category = 'all' | 'pet' | 'assignment';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'pet' | 'assignment';
  status: 'Done' | 'In Progress';
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  year: string;
}

/* Static data — outside component, zero re-creation */
const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Kazora Watches',
    description:
      'Secure PHP/MySQL e-commerce store with robust admin/user management, excellent product presentation and Google Maps integration.',
    category: 'assignment',
    status: 'Done',
    tech: ['PHP', 'MySQL', 'Bootstrap'],
    codeUrl: 'https://github.com/kasbihari/Kazora',
    year: '2024',
  },
  {
    id: 2,
    title: 'CodeLibrary',
    description:
      'A personal library of snippets, patterns and micro-components I use daily. Features search and tag filtering.',
    category: 'pet',
    status: 'Done',
    tech: ['JavaScript', 'Patterns', 'Design'],
    liveUrl: 'https://kasbihari.github.io/CodeLibrary/',
    codeUrl: 'https://github.com/kasbihari/CodeLibrary',
    year: '2024',
  },
  {
    id: 3,
    title: 'Budget Buddy',
    description:
      'Sleek finance manager built on Symfony and Chart.js. Secure platform for transactions, reporting, and visualisation with a premium dashboard.',
    category: 'assignment',
    status: 'Done',
    tech: ['Symfony', 'Chart.js', 'Bootstrap'],
    codeUrl: 'https://github.com/kasbihari/Budget-Buddy',
    year: '2024',
  },
  {
    id: 4,
    title: 'SDG Dashboard',
    description:
      'Real-time UN Sustainable Development Goals tracker. Interactive charts, KPI monitoring, user auth, AI chatbot insights, and CSV export.',
    category: 'assignment',
    status: 'Done',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
    liveUrl: '#',
    codeUrl: 'https://github.com/kasbihari/SDG-Dashboard',
    year: '2025',
  },
  {
    id: 5,
    title: 'Stichting Waahan',
    description:
      'Custom WordPress theme coded in PHP and Bootstrap — no drag-and-drop. Tailored design aligned with Waahan Mobility specific branding needs.',
    category: 'assignment',
    status: 'Done',
    tech: ['HTML/CSS', 'PHP', 'Bootstrap', 'WordPress'],
    liveUrl: 'https://preview.waahanmobility.com',
    year: '2025',
  },
  {
    id: 6,
    title: 'Social Media Platform',
    description:
      'A full-featured social platform in active development — authentication, feeds, real-time notifications and a custom design system.',
    category: 'assignment',
    status: 'In Progress',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    year: '2026',
  },
];

/* ─── Scroll-reveal hook — IntersectionObserver, no scroll listener ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Project card ─── */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { ref, visible } = useReveal();
  const isDone = project.status === 'Done';

  return (
    <div
      ref={ref}
      className="group glass-card p-0 overflow-hidden flex flex-col h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
      }}
    >
      {/* ── Card header strip ── */}
      <div className="px-6 pt-6 pb-4 border-b border-white/6">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-body text-lg font-medium text-white group-hover:text-bordeaux/90 transition-colors duration-200 leading-tight">
            {project.title}
          </h3>
          {/* Status badge */}
          <span
            className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-mono ${
              isDone
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-amber-500/15 text-amber-400'
            }`}
          >
            {isDone ? 'Done' : 'In Progress'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/25 text-xs font-mono">
          <span className="uppercase tracking-wider">
            {project.category === 'pet' ? 'Pet project' : 'Assignment'}
          </span>
          <span>·</span>
          <span>{project.year}</span>
          {!isDone && <Clock size={11} className="text-amber-400/70" />}
        </div>
      </div>

      {/* ── Description ── */}
      <div className="px-6 py-4 flex-1">
        <p className="text-white/55 text-sm leading-relaxed">{project.description}</p>
      </div>

      {/* ── Tech tags ── */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 text-xs rounded-full glass text-white/50">
            {t}
          </span>
        ))}
      </div>

      {/* ── Footer links ── */}
      <div className="px-6 pb-5 flex items-center gap-4 border-t border-white/6 pt-4">
        {project.liveUrl && project.liveUrl !== '#' ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-bordeaux transition-colors duration-150"
          >
            <ExternalLink size={13} />
            Live demo
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-white/20 cursor-not-allowed">
            <ExternalLink size={13} />
            No preview
          </span>
        )}
        {project.codeUrl && project.codeUrl !== '#' ? (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-bordeaux transition-colors duration-150"
          >
            <Github size={13} />
            Source
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-white/20 cursor-not-allowed">
            <Github size={13} />
            Private
          </span>
        )}
        {/* Arrow — hover reveal */}
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowRight size={14} className="text-bordeaux/60" />
        </div>
      </div>
    </div>
  );
};

/* ─── Filter tab ─── */
const FilterTab: React.FC<{
  label: string;
  value: Category;
  active: Category;
  count: number;
  onClick: (v: Category) => void;
}> = ({ label, value, active, count, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active === value
        ? 'bg-bordeaux text-white shadow-[0_0_16px_rgba(94,42,44,0.4)]'
        : 'glass text-white/50 hover:text-white/80'
    }`}
  >
    {label}
    <span
      className={`ml-2 text-xs font-mono ${
        active === value ? 'text-white/70' : 'text-white/25'
      }`}
    >
      {count}
    </span>
  </button>
);

/* ─── Main Projects component ─── */
const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Category>('all');

  const filtered = filter === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === filter);

  const counts = {
    all: ALL_PROJECTS.length,
    pet: ALL_PROJECTS.filter((p) => p.category === 'pet').length,
    assignment: ALL_PROJECTS.filter((p) => p.category === 'assignment').length,
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">

        {/* ══════════════════════════════════════
            HEADER — editorial, left-aligned
        ══════════════════════════════════════ */}
        <div className="mb-16">
          <p className="text-bordeaux/60 text-xs tracking-[0.3em] uppercase font-mono mb-3">
            Selected work
          </p>
          <h2 className="font-body text-5xl md:text-6xl font-medium text-white mb-4 leading-tight">
            Projects
          </h2>
          <p className="text-white/40 text-lg max-w-md leading-relaxed">
            A mix of freelance assignments and personal experiments —
            each one a different problem solved.
          </p>
        </div>

        {/* ══════════════════════════════════════
            FILTER TABS
        ══════════════════════════════════════ */}
        <div className="flex flex-wrap gap-2 mb-12">
          <FilterTab label="All" value="all" active={filter} count={counts.all} onClick={setFilter} />
          <FilterTab label="Personal" value="pet" active={filter} count={counts.pet} onClick={setFilter} />
          <FilterTab label="Assignments" value="assignment" active={filter} count={counts.assignment} onClick={setFilter} />
        </div>

        {/* ══════════════════════════════════════
            PROJECT GRID — 3 columns on large screens
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ══════════════════════════════════════
            FOOTER NOTE
        ══════════════════════════════════════ */}
        <div className="mt-16 text-center">
          <p className="text-white/25 text-sm font-mono">
            More on{' '}
            <a
              href="https://github.com/kasbihari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bordeaux/60 hover:text-bordeaux transition-colors underline underline-offset-4"
            >
              github.com/kasbihari
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Projects;