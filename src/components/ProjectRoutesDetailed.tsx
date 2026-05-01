import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProjectRoutesDetailed.module.css';

// Assets
import marshrutiSvg from '../assets/marshruti.svg';

gsap.registerPlugin(ScrollTrigger);

export const ProjectRoutesDetailed: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    if (!sectionRef.current || !svgRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      // Mobile animation: Sticky + Slide
      gsap.to(svgRef.current, {
        x: () => -(svgRef.current?.scrollWidth || 0) + window.innerWidth - 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => {
      mm.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectRoutesDetailed}>
      <div className={styles.routesBgOverlay}>
        <div className={styles.noiseLayer}></div>
      </div>

      <div className={styles.routesContainer}>
        <div className={`${styles.routesText} ${isVisible ? styles.routesVisualActive : ''}`} style={{ transitionDelay: '0.1s' }}>
          <h2 className={styles.routesTitle}>Маршруты — невидимая<br />архитектура сада</h2>
          <p className={styles.routesSubtitle}>Одно из&nbsp;важных решений проекта — логика движения.</p>
        </div>

        <div className={`${styles.routesVisual} ${isVisible ? styles.routesVisualActive : ''}`} style={{ transitionDelay: '0.3s' }}>
          <img ref={svgRef} src={marshrutiSvg} alt="Маршруты проекта" className={styles.marshrutiImage} />
        </div>
      </div>
    </section>
  );
};
