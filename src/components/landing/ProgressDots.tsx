'use client';

import { useEffect, useState } from 'react';

interface ProgressDotsProps {
  totalSections: number;
  sectionIds: string[];
}

export default function ProgressDots({ totalSections, sectionIds }: ProgressDotsProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.snap-container');
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / sectionHeight);

      setActiveSection(Math.min(currentSection, totalSections - 1));
    };

    const container = document.querySelector('.snap-container');
    container?.addEventListener('scroll', handleScroll);

    return () => container?.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sectionIds[index]);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`progress-dot ${activeSection === index ? 'active' : ''}`}
          aria-label={`Go to section ${index + 1}`}
          aria-current={activeSection === index ? 'true' : undefined}
        />
      ))}
    </nav>
  );
}
