import React from 'react';

const About: React.FC = () => {
  return (
    <section className="section-container">
      <h2 className="text-5xl font-display text-glow mb-6">About</h2>
      <div className="space-y-4 text-neon-white/80 max-w-2xl">
        <p>I build performant, visually refined digital experiences with strict attention to technical discipline.</p>
        <p>Specialised in WebGL, systems architecture, and creative direction.</p>
      </div>
    </section>
  );
};

export default About;