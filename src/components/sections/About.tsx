import React, { useState } from "react";
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
  ChevronUp,
} from "lucide-react";

type CultureIndex = 0 | 1 | 2;

const ProgressBar: React.FC<{ value: number; max?: number }> = ({
  value,
  max = 100,
}) => (
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
    <div
      className="h-full bg-bordeaux rounded-full transition-all duration-300"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

const About: React.FC = () => {
  const [openPassion, setOpenPassion] = useState<string | null>(null);
  const [cultureIndex, setCultureIndex] = useState<CultureIndex>(0);

  const cultureSlides = [
    {
      icon: <Sun className="w-7 h-7" />,
      title: "Japanese",
      text: "Harmony, precision, and the philosophy of 'kaizen' (continuous improvement) influence my design process.",
    },
    {
      icon: <Moon className="w-7 h-7" />,
      title: "Arabic",
      text: "Storytelling, hospitality, and the geometric beauty of calligraphy inspire my approach to typography and user experience.",
    },
    {
      icon: <Flower className="w-7 h-7" />,
      title: "Indian",
      text: "Vibrancy, spiritual depth, and the concept of 'dharma' (purpose) remind me that design must be meaningful and inclusive.",
    },
  ];

  const nextCulture = () =>
    setCultureIndex(((cultureIndex + 1) % 3) as CultureIndex);
  const prevCulture = () =>
    setCultureIndex(((cultureIndex - 1 + 3) % 3) as CultureIndex);

  const togglePassion = (key: string) => {
    setOpenPassion(openPassion === key ? null : key);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 py-16">
      <div className="max-w-5xl w-full mx-auto space-y-16">
        {/* Header with profile */}
        <div className="glass-card p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full glass border-2 border-bordeaux/30 overflow-hidden">
              <img
                src="/assets/pfpa.jpeg"
                alt="Krishna Bihari"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/images/k-logo.jpg")}
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-name text-5xl md:text-6xl text-white mb-3">
              Krishna Bihari
            </h1> <br /><br /><br />
            <p className="font-body text-2xl text-white/70 mb-4">
              Creative Developer & Systems Architect
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              I build digital experiences where performance meets visual poetry.
              With a background in systems engineering and creative coding,
              I bridge technical rigor and artistic expression.
            </p>
          </div>
        </div>

        {/* My Story */}
        <div className="space-y-8 glass-card p-10 md:p-14">
          <h2 className="font-body text-4xl md:text-5xl font-medium text-white border-b border-white/10 pb-5">
            My Story
          </h2>
          <div className="space-y-5 text-white/70 text-lg leading-relaxed">
            <p>
              Growing up, I was captivated by cars, video games, and animation.
              I spent hours sketching anime characters and deconstructing how
              games were made. This curiosity about creation led me to explore
              coding at an early age, starting with Scratch and Code.org.
            </p>
            <p>
              In high school, I discovered the power of HTML and CSS while
              customising online portfolios. I realised I could build things
              that people actually used and enjoyed. This spark grew into a
              serious pursuit of computer science and design.
            </p>
            <p>
              Today, I see design and development not as separate disciplines
              but as two sides of the same coin. Every line of code carries
              aesthetic weight, and every design choice has technical
              consequences. This holistic philosophy defines my work: creating
              experiences that are both beautiful and performant, with a
              cultural signature that sets them apart.
            </p>
          </div>
        </div>

        {/* Values & Principles */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-white text-center">
            What I Value
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lightbulb className="w-7 h-7" />,
                title: "Craftsmanship",
                desc: "I believe in pixel‑perfect execution and clean, maintainable code.",
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Collaboration",
                desc: "Great work emerges from diverse perspectives and open dialogue.",
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: "Precision",
                desc: "Attention to detail separates good from exceptional.",
              },
              {
                icon: <Zap className="w-7 h-7" />,
                title: "Curiosity",
                desc: "I’m always learning, always exploring new technologies and ideas.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-8 text-center hover:border-bordeaux/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="font-body text-xl font-medium text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond Work - Expandable Passion Cards (icons only) */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-white text-center">
            Beyond Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chess */}
            <div
              className="glass-card p-8 cursor-pointer hover:border-bordeaux/50 transition-all"
              onClick={() => togglePassion("chess")}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                    <Gamepad2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-body text-xl font-medium text-white">
                      Chess Strategy
                    </h3>
                    <p className="text-white/50 text-sm">
                      Tactical thinking & foresight
                    </p>
                  </div>
                </div>
                <div className="text-bordeaux">
                  {openPassion === "chess" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
              {openPassion === "chess" && (
                <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
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
                    Chess teaches patience, strategic depth, and the art of
                    anticipating consequences—skills directly transferable to
                    debugging and system architecture. Like a well‑played King’s
                    Fianchetto, great code relies on building a quiet, positional
                    stronghold that exerts long‑range influence, ensuring the
                    system remains resilient under pressure.
                  </p>
                </div>
              )}
            </div>

            {/* Anime */}
            <div
              className="glass-card p-8 cursor-pointer hover:border-bordeaux/50 transition-all"
              onClick={() => togglePassion("anime")}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                    <Tv size={24} />
                  </div>
                  <div>
                    <h3 className="font-body text-xl font-medium text-white">
                      Anime & Storytelling
                    </h3>
                    <p className="text-white/50 text-sm">
                      Narrative & visual inspiration
                    </p>
                  </div>
                </div>
                <div className="text-bordeaux">
                  {openPassion === "anime" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
              {openPassion === "anime" && (
                <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                  <h4 className="font-medium">Top 5 Anime:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-white/70 text-sm">
                    <li>
                      <strong>Bleach</strong> – peak storytelling
                    </li>
                    <li>
                      <strong>Demon Slayer</strong> – visual perfection
                    </li>
                    <li>
                      <strong>Beyblade Metal Fusion</strong> – childhood memories
                    </li>
                    <li>
                      <strong>Naruto</strong> – narrative balance
                    </li>
                    <li>
                      <strong>Solo Leveling</strong> – character development
                    </li>
                  </ol>
                  <p className="text-white/70 text-sm">
                    Anime has taught me about visual storytelling, character
                    arcs, and creating emotional impact through design—lessons I
                    apply to UI/UX. By blending aesthetic depth with functional
                    clarity, I craft interfaces that resonate with users and tell a
                    compelling story.
                  </p>
                </div>
              )}
            </div>

            {/* Martial Arts */}
            <div
              className="glass-card p-8 cursor-pointer hover:border-bordeaux/50 transition-all"
              onClick={() => togglePassion("martialarts")}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                    <PersonStanding size={24} />
                  </div>
                  <div>
                    <h3 className="font-body text-xl font-medium text-white">
                      Martial Arts
                    </h3>
                    <p className="text-white/50 text-sm">
                      Discipline & continuous improvement
                    </p>
                  </div>
                </div>
                <div className="text-bordeaux">
                  {openPassion === "martialarts" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
              {openPassion === "martialarts" && (
                <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Years Training</span>
                    <span className="text-bordeaux">8+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Styles</span>
                    <span className="text-bordeaux">
                      Taekwondo, Kickboxing, Muay Thai, Krav Maga
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tournaments</span>
                    <span className="text-bordeaux">2</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Martial arts taught me discipline, resilience, and the
                    relentless pursuit of improvement—principles that guide my
                    approach to mastering new technologies. This mindset allows me
                    to overcome obstacles and constantly push the boundaries of
                    what I can create.
                  </p>
                </div>
              )}
            </div>

            {/* Cars */}
            <div
              className="glass-card p-8 cursor-pointer hover:border-bordeaux/50 transition-all"
              onClick={() => togglePassion("cars")}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                    <Car size={24} />
                  </div>
                  <div>
                    <h3 className="font-body text-xl font-medium text-white">
                      Automotive Design
                    </h3>
                    <p className="text-white/50 text-sm">
                      Form meets function
                    </p>
                  </div>
                </div>
                <div className="text-bordeaux">
                  {openPassion === "cars" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
              {openPassion === "cars" && (
                <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                  <h4 className="font-medium">Dream Garage:</h4>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-sm">
                    <li>
                      <strong>Mercedes W222 S63 AMG</strong> – peak luxury athlete
                    </li>
                    <li>
                      <strong>Kimera EVO 37</strong> – exquisite Italian masterpiece
                    </li>
                    <li>
                      <strong>BMW E31 850i</strong> – underrated V12 elegance
                    </li>
                    <li>
                      <strong>Mitsubishi GTO</strong> – truly underrated masterpiece
                    </li>
                    <li>
                      <strong>Cadillac Escalade V</strong> – pure American dominance
                    </li>
                  </ul>
                  <p className="text-white/70 text-sm">
                    Car design embodies the perfect marriage of aesthetics and
                    performance—a philosophy I carry into every project, ensuring
                    that what I build is both beautiful and high‑performing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cultural Inspirations */}
        <div>
          <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-white text-center">
            Cultural Inspirations
          </h2>
          <div className="glass-card p-10">
            <div className="flex items-center gap-6">
              <button
                onClick={prevCulture}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:text-bordeaux transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mb-4">
                  {cultureSlides[cultureIndex].icon}
                </div>
                <h3 className="font-body text-2xl font-medium text-white mb-3">
                  {cultureSlides[cultureIndex].title}
                </h3>
                <p className="text-white/60 text-base max-w-lg">
                  {cultureSlides[cultureIndex].text}
                </p>
              </div>
              <button
                onClick={nextCulture}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:text-bordeaux transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Philosophy */}
        <div className="glass-card p-10">
          <div className="text-center">
            <Quote className="w-10 h-10 text-bordeaux/50 mx-auto mb-5" />
            <blockquote className="font-body text-2xl md:text-3xl italic text-white/90">
              "Balance the board. Design the future."
            </blockquote>
            <p className="text-right mt-5 text-white/60 text-lg">
              — Krishna Bihari
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
            <div className="glass p-4 rounded-lg text-center">
              <Coffee className="w-6 h-6 text-bordeaux mx-auto mb-2" />
              <div className="font-medium text-sm text-white/80">Morning</div>
              <div className="text-white/50 text-xs">Chess & planning</div>
            </div>
            <div className="glass p-4 rounded-lg text-center">
              <Code className="w-6 h-6 text-bordeaux mx-auto mb-2" />
              <div className="font-medium text-sm text-white/80">Work</div>
              <div className="text-white/50 text-xs">Deep focus</div>
            </div>
            <div className="glass p-4 rounded-lg text-center">
              <Zap className="w-6 h-6 text-bordeaux mx-auto mb-2" />
              <div className="font-medium text-sm text-white/80">Afternoon</div>
              <div className="text-white/50 text-xs">Creative learning</div>
            </div>
            <div className="glass p-4 rounded-lg text-center">
              <Dice5 className="w-6 h-6 text-bordeaux mx-auto mb-2" />
              <div className="font-medium text-sm text-white/80">Evening</div>
              <div className="text-white/50 text-xs">Training & anime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;