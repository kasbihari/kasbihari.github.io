import React from 'react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  const handleViewWork = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { section: 'projects' } }));
  };

  return (
    <section className="section-container-centered">
      <div className="content-card text-center">
        <h1 className="font-name text-6xl md:text-8xl mb-6 text-white">
          Krishna Bihari
        </h1>
        <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
          I architect digital experiences where performance meets visual poetry. 
          Creative Developer & Systems Architect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleViewWork}
            className="bg-bordeaux hover:bg-bordeaux-light text-white px-8 py-6 text-lg transition-all duration-300"
          >
            Explore My Work
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { section: 'contact' } }))}
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;