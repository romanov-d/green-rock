import React, { useRef, useState, useEffect } from 'react';
import './RevealSection.css';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

export const RevealSection: React.FC<RevealSectionProps> = ({ children, className = '', stagger = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`reveal ${isVisible ? 'revealVisible' : ''} ${stagger ? 'revealStagger' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
