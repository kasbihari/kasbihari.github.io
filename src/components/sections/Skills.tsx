import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Code2, Layout, Server, Database, Palette, Wrench,
  Globe, Layers, Box, Terminal, Figma, Cpu,
  ChevronRight, Sparkles, BarChart2,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   PERFORMANCE NOTES:
   - framer-motion removed entirely (~40 kB saved)
   - All animations via CSS transitions + keyframes
   - IntersectionObserver for scroll reveals
   - Canvas replaced by SVG grid (static, no rAF)
   - Skill data defined as const outside component
   - No Math.random() on re-render (positions pre-computed)
───────────────────────────────────────────── */

/* ══════════════════════════════════════════════
   DATA — defined outside component (zero re-creation)
══════════════════════════════════════════════ */
type Category = 'frontend' | 'backend' | 'design' | 'tools';

interface Skill {
  id: string;
  name: string;
  category: Category;
  level: number; // 1–5
  years: string;
  description: string;
  icon: React.ReactNode;
}

const SKILLS: Skill[] = [
  // Frontend
  { id: 'react', name: 'React / Next.js', category: 'frontend', level: 5, years: '3+', description: 'Primary framework for all production work. Deep knowledge of hooks, SSR, App Router and performance patterns.', icon: <Code2 size={18} /> },
  { id: 'ts', name: 'TypeScript', category: 'frontend', level: 4, years: '2+', description: 'Strong typing across all projects. Generics, utility types and strict mode fluency.', icon: <Layers size={18} /> },
  { id: 'css', name: 'HTML / CSS', category: 'frontend', level: 5, years: '5+', description: 'Foundation of everything. Custom properties, complex layouts, animations and responsive design.', icon: <Layout size={18} /> },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 5, years: '2+', description: 'Utility-first workflow with custom design tokens. Plugin authoring and performance optimisation.', icon: <Sparkles size={18} /> },
  { id: 'js', name: 'JavaScript', category: 'frontend', level: 5, years: '5+', description: 'ES2024+, async/await, Web APIs, Canvas, WebGL basics and performance profiling.', icon: <Terminal size={18} /> },

  // Backend
  { id: 'node', name: 'Node.js', category: 'backend', level: 4, years: '2+', description: 'REST APIs, middleware, file I/O and real-time with WebSockets.', icon: <Server size={18} /> },
  { id: 'php', name: 'PHP / Symfony', category: 'backend', level: 4, years: '3+', description: 'MVC architecture, Doctrine ORM, security and custom WordPress themes.', icon: <Globe size={18} /> },
  { id: 'python', name: 'Python', category: 'backend', level: 3, years: '2+', description: 'Scripting, data processing and AI/ML prototyping with pandas and numpy.', icon: <Cpu size={18} /> },
  { id: 'sql', name: 'SQL / Prisma', category: 'backend', level: 4, years: '3+', description: 'MariaDB, MySQL, query optimisation and type-safe ORM with Prisma.', icon: <Database size={18} /> },

  // Design
  { id: 'figma', name: 'Figma', category: 'design', level: 4, years: '2+', description: 'Component libraries, auto-layout, prototyping and design-to-code handoff.', icon: <Figma size={18} /> },
  { id: 'adobe', name: 'Adobe Suite', category: 'design', level: 3, years: '3+', description: 'Photoshop, Illustrator and Premiere for asset creation and post-production.', icon: <Palette size={18} /> },
  { id: 'motion', name: 'Motion / Animation', category: 'design', level: 4, years: '2+', description: 'CSS keyframes, Web Animations API, Framer Motion and GSAP for cinematic UX.', icon: <BarChart2 size={18} /> },

  // Tools
  { id: 'git', name: 'Git / GitHub', category: 'tools', level: 5, years: '4+', description: 'Branch strategy, PR workflows, GitHub Actions CI/CD and monorepo management.', icon: <Box size={18} /> },
  { id: 'unity', name: 'Unity / C#', category: 'tools', level: 3, years: '2+', description: 'Game prototyping, physics, scripting and cross-platform build pipelines.', icon: <Wrench size={18} /> },
  { id: 'wp', name: 'WordPress / Bubble', category: 'tools', level: 4, years: '3+', description: 'Custom theme development, ACF, plugin architecture and no-code prototyping.', icon: <Globe size={18} /> },
];

const CATEGORIES: { id: Category | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: SKILLS.length },
  { id: 'frontend', label: 'Frontend', count: SKILLS.filter(s => s.category === 'frontend').length },
  { id: 'backend', label: 'Backend', count: SKILLS.filter(s => s.category === 'backend').length },
  { id: 'design', label: 'Design', count: SKILLS.filter(s => s.category === 'design').length },
  { id: 'tools', label: 'Tools', count: SKILLS.filter(s => s.category === 'tools').length },
];

/* Category color map — bordeaux tonal palette */
const CAT_COLOR: Record<string, string> = {
  frontend: 'rgba(180,28,59,0.85)',
  backend: 'rgba(127,17,38,0.85)',
  design: 'rgba(217,37,76,0.85)',
  tools: 'rgba(92,13,27,0.85)',
};
const CAT_BORDER: Record<string, string> = {
  frontend: 'rgba(180,28,59,0.4)',
  backend: 'rgba(127,17,38,0.4)',
  design: 'rgba(217,37,76,0.4)',
  tools: 'rgba(92,13,27,0.35)',
};

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Mastery pip row ─── */
const MasteryPips: React.FC<{ level: number; color: string }> = ({ level, color }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="h-1 rounded-full transition-all duration-300"
        style={{
          width: i <= level ? '14px' : '8px',
          background: i <= level ? color : 'rgba(255,255,255,0.1)',
        }}
      />
    ))}
  </div>
);

/* ─── Skill row — single row in the table ─── */
const SkillRow: React.FC<{
  skill: Skill;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}> = ({ skill, index, isSelected, onSelect }) => {
  const { ref, visible } = useReveal();
  const color = CAT_COLOR[skill.category];
  const border = CAT_BORDER[skill.category];

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 45}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 45}ms`,
      }}
    >
      <button
        onClick={() => onSelect(isSelected ? '' : skill.id)}
        className={`w-full text-left border-b transition-all duration-200 group ${
          isSelected
            ? 'border-bordeaux/30 bg-bordeaux/5'
            : 'border-white/6 hover:border-white/12 hover:bg-white/[0.025]'
        }`}
        aria-expanded={isSelected}
      >
        {/* ── Main row ── */}
        <div className="flex items-center gap-4 px-5 py-4">
          {/* Icon circle */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{
              background: isSelected ? color : 'rgba(255,255,255,0.06)',
              color: isSelected ? '#fff' : 'rgba(255,255,255,0.45)',
              boxShadow: isSelected ? `0 0 16px ${color}` : 'none',
            }}
          >
            {skill.icon}
          </div>

          {/* Name + category */}
          <div className="flex-1 min-w-0">
            <div
              className={`text-sm font-medium transition-colors duration-150 ${
                isSelected ? 'text-white' : 'text-white/70 group-hover:text-white/90'
              }`}
            >
              {skill.name}
            </div>
            <div className="text-white/25 text-xs font-mono mt-0.5 capitalize">
              {skill.category} · {skill.years} yrs
            </div>
          </div>

          {/* Mastery pips — hidden on mobile */}
          <div className="hidden sm:block">
            <MasteryPips level={skill.level} color={color} />
          </div>

          {/* Chevron */}
          <ChevronRight
            size={14}
            className={`text-white/25 flex-shrink-0 transition-transform duration-200 ${
              isSelected ? 'rotate-90 text-bordeaux/70' : 'group-hover:text-white/50'
            }`}
          />
        </div>

        {/* ── Expandable detail panel ── */}
        <div
          style={{
            maxHeight: isSelected ? '120px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="px-5 pb-5 pl-[3.25rem] flex flex-col gap-3">
            {/* Mobile pips */}
            <div className="sm:hidden">
              <MasteryPips level={skill.level} color={color} />
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{skill.description}</p>
            {/* Mastery label */}
            <div className="flex items-center gap-2">
              <div
                className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{ background: `${color}22`, color, border: `1px solid ${border}` }}
              >
                Level {skill.level} / 5
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

/* ─── Category summary card ─── */
const CategoryCard: React.FC<{
  category: Category;
  active: boolean;
  onClick: () => void;
  index: number;
}> = ({ category, active, onClick, index }) => {
  const { ref, visible } = useReveal();
  const skills = SKILLS.filter(s => s.category === category);
  const avgLevel = (skills.reduce((a, s) => a + s.level, 0) / skills.length).toFixed(1);
  const color = CAT_COLOR[category];

  const labels: Record<Category, string> = {
    frontend: 'Frontend', backend: 'Backend', design: 'Design', tools: 'Tools',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
      }}
    >
      <button
        onClick={onClick}
        className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
          active
            ? 'border-bordeaux/40 bg-bordeaux/8 shadow-[0_0_20px_rgba(94,42,44,0.15)]'
            : 'glass hover:border-white/15'
        }`}
      >
        {/* Color strip top */}
        <div
          className="w-6 h-1 rounded-full mb-4"
          style={{ background: color }}
        />
        <div className="text-white/80 text-sm font-medium mb-0.5">{labels[category]}</div>
        <div className="text-white/30 text-xs font-mono">{skills.length} skills · avg {avgLevel}</div>
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN: Skills page
══════════════════════════════════════════════ */
const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string>('');

  const filtered = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? '' : id));
  }, []);

  /* Aggregate stat */
  const totalYears = 5;
  const avgMastery = (SKILLS.reduce((a, s) => a + s.level, 0) / SKILLS.length).toFixed(1);

  return (
    <section className="min-h-screen px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ══════════════════════════════════════
            HEADER
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <p className="text-bordeaux/60 text-xs tracking-[0.3em] uppercase font-mono mb-3">
              Capabilities
            </p>
            <h2 className="font-body text-5xl md:text-6xl font-medium text-white mb-4 leading-tight">
              Skills &
              <br />
              <span className="text-white/35">Expertise</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-white/40 text-lg max-w-md leading-relaxed">
              {SKILLS.length} tools across {CATEGORIES.length - 1} domains.
              {' '}{totalYears}+ years of building, {avgMastery} average mastery.
            </p>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════
            CATEGORY OVERVIEW CARDS
            Clickable — act as filter shortcuts
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-mono mb-5">
              Domains
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['frontend', 'backend', 'design', 'tools'] as Category[]).map((cat, i) => (
              <CategoryCard
                key={cat}
                category={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory((prev) => prev === cat ? 'all' : cat)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            FILTER TABS + SKILL TABLE
        ══════════════════════════════════════ */}
        <div>
          {/* ── Filter tabs ── */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-bordeaux text-white shadow-[0_0_14px_rgba(94,42,44,0.4)]'
                      : 'glass text-white/45 hover:text-white/75'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 font-mono ${activeCategory === cat.id ? 'text-white/60' : 'text-white/20'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* ── Skill table ── */}
          <Reveal delay={60}>
            <div className="glass-card p-0 overflow-hidden">

              {/* Table header */}
              <div className="flex items-center gap-4 px-5 py-3 border-b border-white/8 bg-white/[0.02]">
                <div className="w-9 flex-shrink-0" />
                <div className="flex-1 text-white/25 text-xs tracking-[0.2em] uppercase font-mono">
                  Skill
                </div>
                <div className="hidden sm:block text-white/25 text-xs tracking-[0.2em] uppercase font-mono pr-6">
                  Mastery
                </div>
                <div className="w-4 flex-shrink-0" />
              </div>

              {/* Rows */}
              <div>
                {filtered.map((skill, i) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    index={i}
                    isSelected={selectedId === skill.id}
                    onSelect={handleSelect}
                  />
                ))}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="py-12 text-center text-white/25 text-sm font-mono">
                  No skills in this category.
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════
            CLOSING STATEMENT
            Cinematic — reads as the last beat
        ══════════════════════════════════════ */}
        <Reveal delay={80}>
          <div className="border-t border-white/8 pt-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-mono mb-2">
                Always learning
              </p>
              <p className="text-white/55 text-base max-w-sm leading-relaxed">
                Every project is an opportunity to go deeper.
                The stack evolves — the craft never stops.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="glass px-4 py-3 rounded-xl text-center min-w-[72px]">
                <div className="text-bordeaux font-medium text-lg leading-none">{SKILLS.length}</div>
                <div className="text-white/35 text-xs mt-1">Skills</div>
              </div>
              <div className="glass px-4 py-3 rounded-xl text-center min-w-[72px]">
                <div className="text-bordeaux font-medium text-lg leading-none">{avgMastery}</div>
                <div className="text-white/35 text-xs mt-1">Avg level</div>
              </div>
              <div className="glass px-4 py-3 rounded-xl text-center min-w-[72px]">
                <div className="text-bordeaux font-medium text-lg leading-none">{totalYears}+</div>
                <div className="text-white/35 text-xs mt-1">Years</div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Skills;