import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgQuoteBg from '../assets/block4_bg.webp';
import styles from './QuoteSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const QUOTE_TEXT = "Хорошие пространства запоминаются не\u00A0только тем, как\u00A0выглядят. Они\u00A0запоминаются тем, как\u00A0в\u00A0них себя чувствуешь.";

export const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chars = useMemo(() => QUOTE_TEXT.split(''), []);

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current || !containerRef.current) return;

    // Reset GSAP to avoid issues on re-renders
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation
      const charElements = containerRef.current?.querySelectorAll(`.${styles.quoteChar}`);
      if (charElements && charElements.length > 0) {
        gsap.to(charElements, {
          color: '#FFFFFF',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%', // Start slightly earlier
            end: 'center 40%', // End much faster (before section center leaves screen)
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
