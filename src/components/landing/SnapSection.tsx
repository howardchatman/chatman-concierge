'use client';

import { useEffect, useRef, useState } from 'react';

interface SnapSectionProps {
  id: string;
  backgroundImage: string;
  children: React.ReactNode;
  gradientDirection?: 'bottom' | 'top' | 'center';
  className?: string;
  isFirst?: boolean;
}

export default function SnapSection({
  id,
  backgroundImage,
  children,
  gradientDirection = 'bottom',
  className = '',
  isFirst = false,
}: SnapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(isFirst);

  useEffect(() => {
    if (isFirst) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        root: document.querySelector('.snap-container')
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isFirst]);

  const gradientStyles = {
    bottom: {
      background: 'linear-gradient(to top, #09090B 0%, rgba(9,9,11,0.7) 50%, transparent 100%)',
    },
    top: {
      background: 'linear-gradient(to bottom, #09090B 0%, rgba(9,9,11,0.7) 50%, transparent 100%)',
    },
    center: {
      background: 'rgba(9,9,11,0.6)',
    },
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`snap-section items-center justify-center ${className}`}
      aria-label={`Section ${id}`}
    >
      {/* Background Image with slow zoom */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${isVisible ? 'animate-slow-zoom' : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        role="img"
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0" style={gradientStyles[gradientDirection]} />

      {/* Content */}
      <div
        className={`relative z-10 w-full h-full flex flex-col items-center ${
          className.includes('snap-section-scroll') ? 'justify-start' : 'justify-center'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
        }}
      >
        {children}
      </div>
    </section>
  );
}
