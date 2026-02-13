import React from 'react';

const About: React.FC = () => {
  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl">
        <div className="flex-1">
          <h2 className="font-body text-5xl font-medium mb-6 text-white">About</h2>
          <div className="space-y-4 text-white/70 text-lg">
            <p>
              I architect digital experiences where performance meets visual poetry. 
              With a background in systems engineering and creative coding, I bridge 
              the gap between technical rigor and artistic expression.
            </p>
            <p>
              Currently focused on WebGL, generative design, and design systems 
              for forward‑thinking studios.
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 rounded-full bg-bordeaux/20 border border-bordeaux/30" />
        </div>
      </div>
    </section>
  );
};

export default About;