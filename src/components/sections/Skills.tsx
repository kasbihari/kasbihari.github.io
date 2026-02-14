import React from 'react';
import SkillGalaxy from '../skills/SkillGalaxy';

const Skills: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <SkillGalaxy />
      </div>
    </section>
  );
};

export default Skills;