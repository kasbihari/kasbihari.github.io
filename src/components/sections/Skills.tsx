import React from 'react';
import SkillGalaxy from '../skills/SkillGalaxy';

const Skills: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-12 py-12">
      <div className="max-w-6xl w-full mx-auto">
        <SkillGalaxy />
      </div>
    </section>
  );
};

export default Skills;