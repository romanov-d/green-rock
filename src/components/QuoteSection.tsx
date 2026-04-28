import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgQuoteBg from '../assets/block4_bg.webp';
import styles from './QuoteSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const QUOTE_TEXT = "Хорошие пространства запоминаются не только тем, как выглядят. Они запоминаются тем, как в них себя чувствуешь.";

export const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chars = useMemo(() => QUOTE_TEXT.split(''), []);

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current || !containerRef.current) return;

    // Reset GSAP to avoid issues on re-renders
    const ctx = gsap.context(() => {
      // 1. Parallax for background
      gsap.fromTo(imgRef.current, 
        { y: -50, scale: 1.15 },
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // 2. Text Reveal Animation
      const charElements = containerRef.current?.querySelectorAll(`.${styles.quoteChar}`);
      if (charElements && charElements.length > 0) {
        gsap.to(charElements, {
          color: '#FFFFFF',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center', // Start when section hits center of screen
            end: 'bottom center', // End when section leaves center
            scrub: 0.5,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.quoteSection}>
      <img
        ref={imgRef}
        src={imgQuoteBg}
        alt=""
        className={styles.quoteBg}
        style={{ willChange: 'transform' }}
      />
      <div className={styles.quoteOverlay} />
      <div ref={containerRef} className={styles.quoteContent}>
        <h2 className={styles.quoteText}>
          {chars.map((char, i) => (
            <span
              key={i}
              className={styles.quoteChar}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};
