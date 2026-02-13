import React from 'react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  const handleViewWork = () => {
    const event = new CustomEvent('navigate', { detail: { section: 'projects' } });
    window.dispatchEvent(event);
  };

  return (
    <section className="section-container">
      <h1 className="font-name text-7xl md:text-8xl mb-4 text-white">
        Krishna Bihari
      </h1>
      <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl mb-12">
        Creative Developer & Systems Architect
      </p>
      <div className="flex space-x-4">
        <Button 
          onClick={handleViewWork}
          className="bg-white/10 hover:bg-bordeaux text-white border border-white/20 transition-colors duration-300"
        >
          View Work
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { section: 'contact' } }))}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Contact
        </Button>
      </div>
    </section>
  );
};

export default Hero;