// components/ProjectSection.tsx
import React from 'react';
import Section from './section';
import ProjectCard from './projectCard';

const ProjectSection = () => {
  return (
    <Section title="Projects">
      <ProjectCard />
      {/* More ProjectCards can be added here */}
    </Section>
  );
};

export default ProjectSection;
