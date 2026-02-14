import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white/40 text-xs md:text-sm font-body glass px-4 py-2 rounded-full whitespace-nowrap mx-auto mb-4 w-fit">
      © {year} Krishna Bihari — <span className="text-bordeaux/60">keep exploring</span> <span className="ml-1">→</span>
    </footer>
  );
};

export default Footer;