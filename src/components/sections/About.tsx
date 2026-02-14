import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, 
  Quote, Coffee, Code, Zap, Dice5, 
  Gamepad2, Tv, PersonStanding, Car,
  Lightbulb, Palette, ShieldCheck, Users,
  Sun, Moon, Flower,
  Sparkles
} from 'lucide-react';

// ---------- Types ----------
type PassionKey = 'chess' | 'anime' | 'martialarts' | 'cars';
type CultureIndex = 0 | 1 | 2;

// ---------- Helper Components ----------
const ProgressBar: React.FC<{ value: number; max?: number }> = ({ value, max = 100 }) => (
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
    <div 
      className="h-full bg-bordeaux rounded-full transition-all duration-300"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

// ---------- Main Component ----------
const About: React.FC = () => {
  // State voor uitklapbare passies
  const [openPassion, setOpenPassion] = useState<PassionKey | null>(null);

  // State voor culture slider
  const [cultureIndex, setCultureIndex] = useState<CultureIndex>(0);
  const cultureSlides = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: 'Japanese Culture',
      text: 'The harmony, respect, and attention to detail in Japanese culture deeply influence my approach to design. Concepts like "kaizen" (continuous improvement) and "omotenashi" (selfless hospitality) shape how I approach user experience and craftsmanship in my work.'
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: 'Arabic Culture',
      text: 'The rich storytelling traditions, poetic language, and community-focused values of Arabic culture inspire my work. The emphasis on hospitality ("diyafa") and intricate calligraphic arts influence how I think about typography and creating welcoming digital experiences.'
    },
    {
      icon: <Flower className="w-8 h-8" />,
      title: 'Indian Culture',
      text: 'The vibrant diversity, spiritual depth, and celebratory nature of Indian culture fuel my creativity. From colorful festivals to philosophical concepts of "dharma" (duty/purpose), these elements inspire me to create work that\'s meaningful, colorful, and deeply human.'
    }
  ];

  const nextCulture = () => setCultureIndex(((cultureIndex + 1) % 3) as CultureIndex);
  const prevCulture = () => setCultureIndex(((cultureIndex - 1 + 3) % 3) as CultureIndex);

  // Toggle voor passie-uitklappers
  const togglePassion = (key: PassionKey) => {
    setOpenPassion(openPassion === key ? null : key);
  };

  // Ref voor scrollbare sectie
  const sectionRef = useRef<HTMLElement>(null);

  // Forceer focus op de sectie bij laden, zodat pijltjestoetsen werken
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      className="relative w-full h-screen overflow-y-auto scrollable-section px-4 md:px-12 pt-16 md:pt-24 pb-12 outline-none"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* ----- HERO HEADER (extra marge boven) ----- */}
        <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-body text-5xl md:text-6xl font-medium mb-4">
              Beyond the <span className="text-bordeaux">Code</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl">
              The person behind the pixels — a journey through my passions,
              inspirations, and what makes me who I am.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full glass border-2 border-bordeaux/30 overflow-hidden">
              <img 
                src="/assets/pfpa.jpeg" 
                alt="Krishna Bihari"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = '/images/k-logo.jpg')}
              />
            </div>
          </div>
        </div>

        {/* ----- TIMELINE ----- */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-center">
            My Journey <span className="text-bordeaux/80">✦</span>
          </h2>
          <div className="space-y-8">
            {[
              { icon: <Gamepad2 />, title: 'Early Beginnings', date: 'Childhood', desc: 'Growing up, I was fascinated by video games and animation. I spent hours drawing characters from my favorite anime and trying to understand how games were made. This curiosity about digital creation planted the seeds for my future path.' },
              { icon: <Code />, title: 'Discovering Code', date: 'High School Years', desc: 'My first encounter with HTML/CSS was through customizing MySpace profiles and forum signatures. I quickly realized I could build things that people actually used and enjoyed. This led me to pursue computer science and design seriously.' },
              { icon: <Sparkles />, title: 'Cultural Awakening', date: 'College Years', desc: 'Studying different cultures through their traditions, values, and artistic expressions became a passion. Japanese harmony and precision, Arabic storytelling and hospitality, and Indian vibrancy and spirituality all influenced my worldview and approach to creative work.' },
              { icon: <Palette />, title: 'Design & Development Fusion', date: 'Present', desc: 'Today, I see design and development not as separate disciplines but as two sides of the same coin. Every line of code has aesthetic implications, and every design choice has technical requirements. This holistic approach defines my work.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 items-start glass p-6 rounded-2xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux">
                  {item.icon}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-body text-2xl font-medium">{item.title}</h3>
                    <span className="text-sm text-white/40">{item.date}</span>
                  </div>
                  <p className="text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----- PASSIONS & INTERESTS ----- */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-center">
            Passions & Interests <span className="text-bordeaux/80">✦</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chess */}
            <PassionCard
              icon={<Gamepad2 />}
              title="Chess Strategy"
              subtitle="Elite tactical thinking"
              isOpen={openPassion === 'chess'}
              onToggle={() => togglePassion('chess')}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Rating</span>
                    <span className="text-bordeaux">1250</span>
                  </div>
                  <ProgressBar value={70} />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Favorite Opening</span>
                  <span className="text-bordeaux">King's Fianchetto</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Games Analyzed</span>
                  <span className="text-bordeaux">200+</span>
                </div>
                <p className="text-white/70 text-sm">
                  Chess teaches patience, strategic thinking, and the importance
                  of anticipating consequences — skills that directly translate
                  to debugging and system design.
                </p>
              </div>
            </PassionCard>

            {/* Anime */}
            <PassionCard
              icon={<Tv />}
              title="Anime & Storytelling"
              subtitle="Narrative inspiration"
              isOpen={openPassion === 'anime'}
              onToggle={() => togglePassion('anime')}
            >
              <div className="space-y-4">
                <h4 className="font-medium">Top 5 Anime:</h4>
                <ol className="list-decimal list-inside space-y-1 text-white/70 text-sm">
                  <li><strong>Bleach</strong> — Peak story</li>
                  <li><strong>Demon Slayer</strong> — Visual perfection</li>
                  <li><strong>Beyblade Metal Fusion</strong> — Childhood memories</li>
                  <li><strong>Naruto</strong> — Narrative balance</li>
                  <li><strong>Solo Leveling</strong> — Character development</li>
                </ol>
                <p className="text-white/70 text-sm">
                  Anime has taught me about visual storytelling, character
                  development, and creating emotional impact through design
                  choices — lessons I apply to UI/UX design.
                </p>
              </div>
            </PassionCard>

            {/* Martial Arts */}
            <PassionCard
              icon={<PersonStanding />}
              title="Martial Arts"
              subtitle="Discipline & focus"
              isOpen={openPassion === 'martialarts'}
              onToggle={() => togglePassion('martialarts')}
            >
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Years Training</span>
                  <span className="text-bordeaux">8+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Styles</span>
                  <span className="text-bordeaux">Taekwondo, Kickboxing, Muay Thai</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tournaments</span>
                  <span className="text-bordeaux">2</span>
                </div>
                <p className="text-white/70 text-sm">
                  Martial arts taught me discipline, resilience, and the
                  importance of continuous improvement — principles that guide
                  my approach to mastering new technologies.
                </p>
              </div>
            </PassionCard>

            {/* Cars */}
            <PassionCard
              icon={<Car />}
              title="Automotive Design"
              subtitle="Form meets function"
              isOpen={openPassion === 'cars'}
              onToggle={() => togglePassion('cars')}
            >
              <div className="space-y-4">
                <h4 className="font-medium">Dream Garage:</h4>
                <ul className="list-disc list-inside space-y-1 text-white/70 text-sm">
                  <li><strong>Mercedes W222 S63 amg</strong> — Engineering perfection</li>
                  <li><strong>Mazda RX-7 FD</strong> — Rotary elegance</li>
                  <li><strong>BMW F90 M5</strong> — Iconic design</li>
                  <li><strong>Cadillac Escalade V</strong> — Dominance on the road</li>
                </ul>
                <p className="text-white/70 text-sm">
                  Car design embodies the perfect marriage of aesthetics and
                  performance — a philosophy I carry into every project, ensuring
                  it's both beautiful and high-performing.
                </p>
              </div>
            </PassionCard>
          </div>
        </div>

        {/* ----- PERSONALITY TRAITS ----- */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-center">
            My Personality <span className="text-bordeaux/80">✦</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Lightbulb />, title: 'Analytical Thinker', desc: 'I break down complex problems into manageable pieces, finding elegant solutions through structured analysis.', value: 90 },
              { icon: <Palette />, title: 'Creative Visionary', desc: 'I see patterns and possibilities others might miss, combining unexpected elements into cohesive designs.', value: 85 },
              { icon: <ShieldCheck />, title: 'Detail-Oriented', desc: 'From pixel-perfect alignment to clean code architecture, I believe excellence is in the details.', value: 95 },
              { icon: <Users />, title: 'Collaborative Spirit', desc: 'I thrive in team environments where diverse perspectives lead to better solutions.', value: 80 }
            ].map((trait, i) => (
              <div key={i} className="glass-card p-6 hover:border-bordeaux/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mb-4">
                  {trait.icon}
                </div>
                <h3 className="font-body text-xl font-medium mb-2">{trait.title}</h3>
                <p className="text-white/70 text-sm mb-4">{trait.desc}</p>
                <ProgressBar value={trait.value} />
              </div>
            ))}
          </div>
        </div>

        {/* ----- CULTURAL INSPIRATIONS (SLIDER) ----- */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-center">
            Cultural Inspirations <span className="text-bordeaux/80">✦</span>
          </h2>
          <div className="glass-card p-8 relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mb-4">
                {cultureSlides[cultureIndex].icon}
              </div>
              <h3 className="font-body text-2xl font-medium mb-4">{cultureSlides[cultureIndex].title}</h3>
              <p className="text-white/70 max-w-2xl">{cultureSlides[cultureIndex].text}</p>
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={prevCulture}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-bordeaux transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {[0,1,2].map(i => (
                  <button
                    key={i}
                    onClick={() => setCultureIndex(i as CultureIndex)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === cultureIndex ? 'bg-bordeaux w-4' : 'bg-white/30'
                    }`}
                    aria-label={`Go to slide ${i+1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextCulture}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-bordeaux transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ----- DAILY PHILOSOPHY ----- */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-center">
            Daily Philosophy <span className="text-bordeaux/80">✦</span>
          </h2>
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <Quote className="w-10 h-10 text-bordeaux/50 mx-auto mb-4" />
              <blockquote className="font-body text-2xl md:text-3xl italic text-white/90">
                "Balance the board. Design the future."
              </blockquote>
              <p className="text-right mt-4 text-white/60">— Krishna Bihari</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <DailyItem icon={<Coffee />} time="Morning" activity="Chess tactics & planning the day" />
              <DailyItem icon={<Code />} time="Work Session" activity="Deep focus coding/design sprints" />
              <DailyItem icon={<Zap />} time="Afternoon" activity="Creative exploration & learning" />
              <DailyItem icon={<Dice5 />} time="Evening" activity="Training, anime, or gaming" />
            </div>
          </div>
        </div>

        {/* Extra ruimte onderaan voor comfortabel scrollen */}
        <div className="h-12" />
      </div>
    </section>
  );
};

// ----- Helper component voor Passion Cards -----
interface PassionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const PassionCard: React.FC<PassionCardProps> = ({ icon, title, subtitle, isOpen, onToggle, children }) => (
  <div className="glass-card p-6 cursor-pointer hover:border-bordeaux/50 transition-all" onClick={onToggle}>
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-body text-xl font-medium">{title}</h3>
          <p className="text-white/50 text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="text-bordeaux">
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </div>
    {isOpen && (
      <div className="mt-4 pt-4 border-t border-white/10">
        {children}
      </div>
    )}
  </div>
);

// ----- Helper component voor Daily Item -----
const DailyItem: React.FC<{ icon: React.ReactNode; time: string; activity: string }> = ({ icon, time, activity }) => (
  <div className="flex flex-col items-center text-center glass p-4 rounded-xl">
    <div className="w-10 h-10 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mb-2">
      {icon}
    </div>
    <div className="font-medium text-sm text-bordeaux mb-1">{time}</div>
    <div className="text-white/70 text-sm">{activity}</div>
  </div>
);

export default About;