import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Coffee,
  Code,
  Zap,
  Dice5,
  Gamepad2,
  Tv,
  PersonStanding,
  Car,
  Lightbulb,
  ShieldCheck,
  Users,
  Sun,
  Moon,
  Flower,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HOOK: Intersection Observer for scroll reveals
───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   UTILITY: Animated reveal wrapper
───────────────────────────────────────────── */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────
   COMPONENT: Thin accent line divider
───────────────────────────────────────────── */
const AccentLine: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="h-px flex-1 bg-white/10" />
    <div className="w-1.5 h-1.5 rounded-full bg-bordeaux" />
    <div className="h-px w-8 bg-bordeaux/40" />
  </div>
);

/* ─────────────────────────────────────────────
   COMPONENT: Chapter label (cinematic pacing)
───────────────────────────────────────────── */
const ChapterLabel: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-bordeaux/60 text-xs tracking-[0.3em] uppercase">{number}</span>
    <div className="w-8 h-px bg-bordeaux/40" />
    <span className="text-white/30 text-xs tracking-[0.2em] uppercase">{title}</span>
  </div>
);

/* ─────────────────────────────────────────────
   COMPONENT: Expandable deep-dive block
   (feels native — no FAQ aesthetics)
───────────────────────────────────────────── */
const DeepDive: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  id: string;
  openId: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}> = ({ icon, title, subtitle, id, openId, onToggle, children }) => {
  const isOpen = openId === id;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`border-b border-white/8 transition-colors duration-300 ${isOpen ? "border-bordeaux/20" : ""}`}
      style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
    >
      {/* Trigger row */}
      <button
        onClick={() => onToggle(id)}
        className="w-full py-7 flex items-center gap-5 text-left group"
        aria-expanded={isOpen}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            isOpen ? "bg-bordeaux text-white" : "bg-bordeaux/15 text-bordeaux group-hover:bg-bordeaux/25"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-base font-medium transition-colors duration-200 ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
            {title}
          </div>
          <div className="text-white/40 text-sm mt-0.5">{subtitle}</div>
        </div>
        <ChevronDown
          size={16}
          className={`text-bordeaux/60 transition-transform duration-400 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Animated content panel */}
      <div
        style={{ height, overflow: "hidden", transition: "height 0.45s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div ref={contentRef} className="pb-8 pl-15" style={{ paddingLeft: "3.75rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN: About Page
───────────────────────────────────────────── */
const About: React.FC = () => {
  const [openPassion, setOpenPassion] = useState<string | null>(null);
  const [cultureIndex, setCultureIndex] = useState(0);

  const togglePassion = (id: string) =>
    setOpenPassion((prev) => (prev === id ? null : id));

  /* Culture carousel data */
  const cultureSlides = [
    {
      icon: <Sun className="w-6 h-6" />,
      label: "Japanese",
      keyword: "Kaizen",
      text: "Harmony, precision, and the philosophy of continuous improvement influence every design decision — shipping is never done, only paused.",
    },
    {
      icon: <Moon className="w-6 h-6" />,
      label: "Arabic",
      keyword: "Storytelling",
      text: "Hospitality and geometric beauty in calligraphy inform how I think about typography and user flow — each screen should feel like a welcome.",
    },
    {
      icon: <Flower className="w-6 h-6" />,
      label: "Indian",
      keyword: "Dharma",
      text: "Vibrancy, spiritual depth, and purposeful design remind me that what I build must be meaningful and inclusive — not just beautiful.",
    },
  ];

  return (
    <section className="min-h-screen px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto space-y-32">

        {/* ══════════════════════════════════════
            CHAPTER 01 — OPENING: WHO IS THIS?
            Asymmetric hero — image floats right,
            text bleeds left for editorial tension.
        ══════════════════════════════════════ */}
        <div className="relative">
          <ChapterLabel number="01" title="The Person" /> <br />

          {/* Large decorative initial */}
          <div
            aria-hidden
            className="absolute -left-4 -top-8 text-[11rem] font-name leading-none text-white/[0.03] select-none pointer-events-none"
          >
            K
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            {/* Text column */}
            <Reveal>
              <h1 className="font-name text-6xl md:text-7xl text-white leading-tight mb-2">
                Krishna
                <br />
              </h1> <br /><br /><br />
              <p className="text-bordeaux/80 tracking-[0.15em] uppercase text-sm mb-8 font-mono">
                Creative Developer · Systems Architect
              </p>
              <p className="text-white/55 text-lg leading-relaxed max-w-lg">
                I build digital experiences where performance meets visual poetry.
                With a background in systems engineering and creative coding,
                I sit at the intersection of technical rigour and artistic expression.
              </p>

              {/* Inline stat chips — fast-read identity signals */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { v: "8+", l: "Years training" },
                  { v: "1250", l: "Chess rating" },
                  { v: "5", l: "Martial arts styles" },
                  { v: "∞", l: "Curiosity" },
                ].map((s) => (
                  <div key={s.l} className="glass px-4 py-2.5 rounded-lg text-center min-w-[80px]">
                    <div className="text-bordeaux font-medium text-lg leading-none">{s.v}</div>
                    <div className="text-white/40 text-xs mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Portrait — offset card */}
            <Reveal delay={150}>
              <div className="relative flex-shrink-0 mx-auto md:mx-0 w-48 md:w-56">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(94,42,44,0.25)]">
                  <img
                    src="/assets/pfpa.jpeg"
                    alt="Krishna Bihari"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "/images/k-logo.jpg")}
                  />
                </div>
                {/* Decorative corner accent */}
                <div
                  aria-hidden
                  className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-bordeaux/40 rounded-br-lg pointer-events-none"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <AccentLine className="mt-16" />
          </Reveal>
        </div>

        {/* ══════════════════════════════════════
            CHAPTER 02 — ORIGIN STORY
            Cinematic paragraphs — no bullet lists,
            prose pacing with typographic weight shift.
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <ChapterLabel number="02" title="The Origin" />
          </Reveal>

          <div className="space-y-10">
            {/* Each paragraph is its own reveal unit — creates reading rhythm */}
            <Reveal delay={50}>
              <p className="text-white/70 text-xl leading-relaxed">
                Growing up, I was captivated by{" "}
                <span className="text-white font-medium">cars, video games, and animation</span>.
                I spent hours sketching anime characters and reverse-engineering how games were made —
                that obsessive curiosity about creation led me to coding at an early age,
                starting with Scratch and Code.org.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-white/55 text-lg leading-relaxed">
                In high school, I discovered the power of HTML and CSS while customising online portfolios.
                The realisation that I could build things people <em>actually used and enjoyed</em> lit a fire
                that grew into a serious pursuit of computer science and design.
              </p>
            </Reveal>

            <Reveal delay={150}>
              {/* Pull quote — visual anchor mid-story */}
              <div className="glass-card p-8 border-l-2 border-bordeaux">
                <Quote className="w-7 h-7 text-bordeaux/50 mb-4" />
                <p className="font-body text-2xl italic text-white/90 leading-snug">
                  "Every line of code carries aesthetic weight, and every design choice has technical consequences."
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-white/55 text-lg leading-relaxed">
                Today, design and development aren't separate disciplines to me — they're two sides of the same coin.
                This holistic philosophy defines my work: creating experiences that are beautiful <em>and</em> performant,
                with a cultural signature that sets them apart.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CHAPTER 03 — PRINCIPLES
            Four values as a horizontal strip — 
            compact, scannable, weighted visually.
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <ChapterLabel number="03" title="What I Stand For" />
            <h2 className="font-body text-4xl text-white mb-12">Values & Principles</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {[
              { icon: <Lightbulb size={20} />, title: "Craftsmanship", desc: "Pixel-perfect execution and clean, maintainable code." },
              { icon: <Users size={20} />, title: "Collaboration", desc: "Great work emerges from diverse perspectives." },
              { icon: <ShieldCheck size={20} />, title: "Precision", desc: "Detail separates good from exceptional." },
              { icon: <Zap size={20} />, title: "Curiosity", desc: "Always learning, always exploring." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-[rgba(10,10,10,0.9)] p-6 h-full flex flex-col gap-4 group hover:bg-bordeaux/5 transition-colors duration-300">
                  <div className="w-9 h-9 rounded-full bg-bordeaux/15 flex items-center justify-center text-bordeaux group-hover:bg-bordeaux group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-1">{item.title}</div>
                    <div className="text-white/45 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            CHAPTER 04 — PASSIONS
            Deep-dive accordion — native portfolio feel.
            Smooth height animation, no FAQ aesthetics.
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <ChapterLabel number="04" title="Beyond the Screen" />
            <h2 className="font-body text-4xl text-white mb-3">Life Outside Work</h2>
            <p className="text-white/40 text-base mb-10">
              The things that fuel the work. Tap to go deeper.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="glass-card p-0 overflow-hidden">
              <div className="px-8">

                {/* Chess */}
                <DeepDive
                  id="chess"
                  icon={<Gamepad2 size={18} />}
                  title="Chess Strategy"
                  subtitle="Tactical thinking & foresight · Rating 1250"
                  openId={openPassion}
                  onToggle={togglePassion}
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[
                        { v: "1250", l: "Rating" },
                        { v: "200+", l: "Games analysed" },
                        { v: "King's Fianchetto", l: "Favourite opening" },
                      ].map((s) => (
                        <div key={s.l} className="glass p-3 rounded-lg">
                          <div className="text-bordeaux font-medium text-sm">{s.v}</div>
                          <div className="text-white/40 text-xs mt-0.5">{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Chess teaches patience, strategic depth, and the art of anticipating consequences —
                      skills directly transferable to debugging and architecture. Like a well-played King's Fianchetto,
                      great code builds a quiet positional stronghold that exerts long-range influence.
                    </p>
                  </div>
                </DeepDive>

                {/* Anime */}
                <DeepDive
                  id="anime"
                  icon={<Tv size={18} />}
                  title="Anime & Storytelling"
                  subtitle="Narrative & visual inspiration"
                  openId={openPassion}
                  onToggle={togglePassion}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { title: "Bleach", note: "peak storytelling" },
                        { title: "Demon Slayer", note: "visual perfection" },
                        { title: "Beyblade Metal Fusion", note: "childhood" },
                        { title: "Naruto", note: "narrative balance" },
                        { title: "Solo Leveling", note: "character arcs" },
                      ].map((a, i) => (
                        <div key={i} className="glass px-3 py-1.5 rounded-full flex items-center gap-2">
                          <span className="text-white/30 text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-white/80 text-sm font-medium">{a.title}</span>
                          <span className="text-white/30 text-xs">— {a.note}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Anime taught me about visual storytelling, character arcs, and creating emotional impact through design —
                      lessons I apply directly to UI/UX. Interfaces should tell a story, not just serve a function.
                    </p>
                  </div>
                </DeepDive>

                {/* Martial Arts */}
                <DeepDive
                  id="martialarts"
                  icon={<PersonStanding size={18} />}
                  title="Martial Arts"
                  subtitle="Discipline & continuous improvement · 8+ years"
                  openId={openPassion}
                  onToggle={togglePassion}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["Taekwondo", "Kickboxing", "Muay Thai", "Krav Maga"].map((style) => (
                        <span key={style} className="badge">{style}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass p-3 rounded-lg text-center">
                        <div className="text-bordeaux font-medium">8+</div>
                        <div className="text-white/40 text-xs">Years training</div>
                      </div>
                      <div className="glass p-3 rounded-lg text-center">
                        <div className="text-bordeaux font-medium">2</div>
                        <div className="text-white/40 text-xs">Tournaments</div>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Martial arts forged discipline, resilience, and the relentless pursuit of improvement —
                      principles that guide how I master new technologies and push through creative blocks.
                    </p>
                  </div>
                </DeepDive>

                {/* Cars */}
                <DeepDive
                  id="cars"
                  icon={<Car size={18} />}
                  title="Automotive Design"
                  subtitle="Where form meets function perfectly"
                  openId={openPassion}
                  onToggle={togglePassion}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {[
                        { car: "Mercedes W222 S63 AMG", note: "peak luxury athlete" },
                        { car: "Kimera EVO 37", note: "exquisite Italian masterpiece" },
                        { car: "BMW E31 850i", note: "underrated V12 elegance" },
                        { car: "Mitsubishi GTO", note: "truly underrated masterpiece" },
                        { car: "Cadillac Escalade V", note: "pure American dominance" },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                          <span className="text-white/75 text-sm font-medium">{c.car}</span>
                          <span className="text-white/35 text-xs">{c.note}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Car design is the perfect marriage of aesthetics and performance —
                      a philosophy I carry into every project. What I build must be both beautiful and fast.
                    </p>
                  </div>
                </DeepDive>

              </div>
            </div>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════
            CHAPTER 05 — CULTURAL DNA
            Carousel rebuilt as a side-by-side
            switcher — more spatial, less slideshow.
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <ChapterLabel number="05" title="Cultural DNA" />
            <h2 className="font-body text-4xl text-white mb-12">Roots & Inspirations</h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="glass-card p-0 overflow-hidden">
              {/* Tab switcher */}
              <div className="flex border-b border-white/8">
                {cultureSlides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setCultureIndex(i)}
                    className={`flex-1 py-4 px-2 text-sm font-medium transition-all duration-200 relative flex items-center justify-center gap-2 ${
                      cultureIndex === i
                        ? "text-white"
                        : "text-white/35 hover:text-white/60"
                    }`}
                  >
                    <span className="hidden sm:inline">{slide.label}</span>
                    <span className="sm:hidden">{slide.icon}</span>
                    {/* Active indicator */}
                    {cultureIndex === i && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-bordeaux rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Content panel */}
              <div className="p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                  {cultureSlides[cultureIndex].icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className="font-body text-2xl text-white">{cultureSlides[cultureIndex].label}</h3>
                    <span className="text-bordeaux/70 text-sm font-mono tracking-wider">
                      · {cultureSlides[cultureIndex].keyword}
                    </span>
                  </div>
                  <p className="text-white/60 text-base leading-relaxed">
                    {cultureSlides[cultureIndex].text}
                  </p>
                </div>
              </div>

              {/* Navigation row */}
              <div className="flex items-center justify-between px-8 pb-6">
                <div className="flex gap-2">
                  {cultureSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCultureIndex(i)}
                      className={`rounded-full transition-all duration-200 ${
                        cultureIndex === i
                          ? "w-6 h-1.5 bg-bordeaux"
                          : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCultureIndex((cultureIndex - 1 + 3) % 3)}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center hover:text-bordeaux transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCultureIndex((cultureIndex + 1) % 3)}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center hover:text-bordeaux transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════
            CHAPTER 06 — DAILY PHILOSOPHY
            Full-width closer — cinematic endpoint.
            Rhythm blocks + personal quote.
        ══════════════════════════════════════ */}
        <div>
          <Reveal>
            <ChapterLabel number="06" title="Daily Rhythm" />
          </Reveal>

          {/* Philosophy quote — standalone visual weight */}
          <Reveal delay={80}>
            <div className="text-center py-14 relative">
              {/* Large decorative quote mark */}
              <div
                aria-hidden
                className="absolute top-0 left-1/2 -translate-x-1/2 text-[8rem] font-serif leading-none text-bordeaux/8 select-none pointer-events-none"
              >
                "
              </div>
              <blockquote className="font-body text-3xl md:text-4xl italic text-white/90 relative z-10 max-w-2xl mx-auto leading-snug">
                Balance the board. Design the future.
              </blockquote>
              <p className="text-white/35 text-sm mt-5 tracking-widest uppercase font-mono">
                — Krishna Bihari
              </p>
            </div>
          </Reveal>

          {/* Day rhythm — horizontal timeline feel */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 glass rounded-2xl overflow-hidden">
              {[
                { icon: <Coffee size={18} />, time: "Morning", activity: "Chess & planning", detail: "Strategic warm-up" },
                { icon: <Code size={18} />, time: "Work", activity: "Deep focus", detail: "Systems & interfaces" },
                { icon: <Sparkles size={18} />, time: "Afternoon", activity: "Creative learning", detail: "New tech & concepts" },
                { icon: <Dice5 size={18} />, time: "Evening", activity: "Training & anime", detail: "Rest & inspiration" },
              ].map((block, i) => (
                <div
                  key={i}
                  className={`p-6 text-center relative ${
                    i < 3 ? "border-r border-white/6 md:border-r" : ""
                  } ${i >= 2 ? "border-t border-white/6 md:border-t-0" : ""}`}
                >
                  {/* Time label */}
                  <div className="text-bordeaux/60 text-xs font-mono tracking-[0.2em] uppercase mb-3">{block.time}</div>
                  <div className="w-10 h-10 rounded-full bg-bordeaux/15 flex items-center justify-center text-bordeaux mx-auto mb-3">
                    {block.icon}
                  </div>
                  <div className="text-white/80 text-sm font-medium">{block.activity}</div>
                  <div className="text-white/35 text-xs mt-1">{block.detail}</div>
                  {/* Connecting arrow for md+ */}
                  {i < 3 && (
                    <ArrowRight
                      size={12}
                      aria-hidden
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-bordeaux/25 hidden md:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Closing accent */}
        <Reveal>
          <AccentLine />
        </Reveal>

      </div>
    </section>
  );
};

export default About;