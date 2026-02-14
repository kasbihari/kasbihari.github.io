import React from 'react';

const About: React.FC = () => {
  return (
    <section className="section-container-centered scrollable-section">
      <div className="glass-card max-w-4xl">
        <h2 className="font-body text-4xl md:text-5xl font-medium mb-8 text-white text-center">
          My Story
        </h2>
        <div className="space-y-6 text-white/80 text-lg max-w-2xl mx-auto">
          <p className="leading-relaxed">
            My journey began in systems engineering, where I discovered the beauty of 
            logical structures. But I soon realized that code could be more than 
            functional—it could be emotional.
          </p>
          <p className="leading-relaxed">
            Today, I bridge the gap between technical rigor and artistic expression. 
            I create digital experiences that feel alive, using WebGL, generative 
            design, and thoughtful interaction patterns.
          </p>
          <p className="leading-relaxed">
            Every project is an opportunity to tell a story—through motion, through 
            space, through the subtle dance of light and shadow.
          </p>
          <p className="leading-relaxed">
            Based in Amsterdam, I work with forward-thinking studios and brands to 
            craft immersive digital narratives that leave a lasting impression.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;