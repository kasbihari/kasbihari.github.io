import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="section-container-centered min-h-screen">
      <div className="glass-card w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-16 px-6 md:px-12 my-auto">
        
        {/* Naam – subtiel groot, maar niet overdreven */}
        <h1
          className="
            font-name
            text-5xl sm:text-6xl md:text-7xl
            text-white text-center
            leading-tight
            mb-12 md:mb-16
            drop-shadow-[0_0_10px_rgba(94,42,44,0.4)]
          "
        >
          Krishna Bihari
        </h1> <br /><br />

        {/* Quote – in een verfijnde box */}
        <div
          className="
            glass
            max-w-md mx-auto
            p-6 md:p-8
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
              text-lg sm:text-xl md:text-2xl
              text-white/80 text-center
              leading-relaxed
            "
          >
            "Blending Code, Art & Culture"
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;