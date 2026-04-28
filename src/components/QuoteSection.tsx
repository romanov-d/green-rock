import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import imgQuoteBg from '../assets/block4_bg.webp';
import styles from './QuoteSection.module.css';

const QUOTE_TEXT = "Хорошие пространства запоминаются не только тем, как выглядят. Они запоминаются тем, как в них себя чувствуешь.";

export const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [fillProgress, setFillProgress] = useState(0);
  const sectionMeta = useRef({ top: 0, height: 0 });

  const chars = useMemo(() => QUOTE_TEXT.split(''), []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !imgRef.current) return;
    
    const scrolled = window.scrollY;
    const vh = window.innerHeight;
    const { top, height } = sectionMeta.current;
    
    // Relative position of scroll within/near section
    const relativeScroll = scrolled - (top - vh);
    const totalRange = height + vh;
    const p = Math.max(0, Math.min(1, relativeScroll / totalRange));

    // Parallax: Direct style update for 60fps
    const y = (p - 0.5) * -100; // Smoother and larger range
    imgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.15)`;

    // Fill progress: only update state when needed
    // Start filling at 20% of section visibility, end at 80%
    const fillP = Math.max(0, Math.min(1, (p - 0.2) / 0.6));
    setFillProgress(prev => {
      const newVal = Math.floor(fillP * chars.length);
      const oldVal = Math.floor(prev * chars.length);
      return newVal !== oldVal ? fillP : prev;
    });
  }, [chars.length]);

  useEffect(() => {
    const updateMeta = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        sectionMeta.current = {
          top: rect.top + window.scrollY,
          height: rect.height
        };
      }
    };

    updateMeta();
    window.addEventListener('resize', updateMeta);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    }, { threshold: 0 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMeta);
      observer.disconnect();
    };
  }, [handleScroll]);

  const filledCount = Math.floor(fillProgress * chars.length);

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
      <div className={styles.quoteContent}>
        <h2 className={styles.quoteText}>
          {chars.map((char, i) => (
            <span
              key={i}
              className={`${styles.quoteChar} ${i < filledCount ? styles.quoteCharFilled : ''}`}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};
