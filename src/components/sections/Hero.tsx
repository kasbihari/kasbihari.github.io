import React from 'react';
import { Button } from '../ui/button';
import { Zap, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const handleNavigate = (section: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { section } }));
  };

  return (
    <section className="section-container-centered min-h-screen">
      <div className="glass-card w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-12 my-auto space-y-8">
        
        {/* Naam met sterke glow – inline style voor zekerheid */}
        <h1
          className="
            font-name
            text-5xl sm:text-6xl md:text-7xl
            text-white text-center
            leading-tight
          "
          style={{
            textShadow: '0 0 8px rgba(94,42,44,0.8), 0 0 16px rgba(94,42,44,0.5), 0 0 24px rgba(94,42,44,0.3)'
          }}
        >
          Krishna Bihari
        </h1> <br /><br />

        {/* Tagline in glass box */}
        <div
          className="
            glass
            max-w-lg mx-auto
            p-5 md:p-6
            rounded-2xl
            border border-white/10
            hover:border-bordeaux/50 hover:shadow-[0_0_30px_rgba(94,42,44,0.3)]
            transition-all duration-500 ease-out
            backdrop-blur-lg
          "
        >
          <p
            className="
              font-body
              text-xl md:text-2xl
              text-center
              leading-relaxed
            "
          >
            Blending{' '}
            <span className="bg-gradient-to-r from-bordeaux to-bordeaux-light bg-clip-text text-transparent font-semibold">
              Code
            </span>
            , Art & Culture
          </p>
        </div>

        {/* Beschrijvende tekst */}
        <p className="font-body text-lg md:text-xl text-white/70 text-center max-w-2xl mx-auto leading-relaxed">
          Front-end developer & visual creator — I build stylish,
          performance-focused experiences with a cultural signature.
        </p>

        {/* Knoppen */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Button
            onClick={() => handleNavigate('projects')}
            className="bg-bordeaux hover:bg-bordeaux-light text-white px-8 py-6 text-lg transition-all duration-300 glass flex-1 sm:flex-none"
          >
            <Zap className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNavigate('contact')}
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg glass flex-1 sm:flex-none"
          >
            <Mail className="mr-2 h-5 w-5" />
            Let's build something amazing!
          </Button>
        </div>

        {/* Skill-chips */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
          {[
            'HTML/CSS',
            'JavaScript/TypeScript',
            'Next/Node/React',
            'Bootstrap/Tailwind',
            'PHP/Symfony',
            'SQL',
            'Unity/C#',
            'Adobe/Canva'
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full glass text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;