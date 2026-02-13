import React from 'react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  // Programmatic navigation – we can emit a custom event or use a global state.
  // For simplicity, we'll use a click handler that triggers a custom event.
  const handleViewWork = () => {
    const event = new CustomEvent('navigate', { detail: { section: 'projects' } });
    window.dispatchEvent(event);
  };

  return (
    <section className="section-container">
      <h2 className="text-7xl md:text-8xl font-display text-glow mb-6 leading-none">
        Hari Kasbi
      </h2>
      <p className="text-xl md:text-2xl font-body text-neon-white/80 max-w-2xl mb-12">
        Creative Developer & Systems Architect
      </p>
      <div className="flex space-x-4">
        <Button 
          onClick={handleViewWork}
          className="bg-neon-white/10 hover:bg-neon-white/20 text-neon-white border border-neon-white/30 backdrop-blur-sm transition-all duration-300"
        >
          View Work
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { section: 'contact' } }))}
          className="border-neon-white/30 text-neon-white hover:bg-neon-white/10"
        >
          Contact
        </Button>
      </div>
    </section>
  );
};

export default Hero;