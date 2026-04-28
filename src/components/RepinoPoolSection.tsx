import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RepinoPoolSection.module.css';

import imgBlock5Bg from '../assets/repino_block5_bg.webp';
import imgPoolSvg from '../assets/pool.svg';

gsap.registerPlugin(ScrollTrigger);

export const RepinoPoolSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    let mm = gsap.matchMedia();

    const initAnimation = () => {
      mm.add("(max-width: 768px)", () => {
        gsap.to(svgRef.current, {
          x: () => {
            if (!svgRef.current) return 0;
            return -(svgRef.current.scrollWidth - window.innerWidth + 40);
          },
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
    };

    if (svgRef.current.complete) {
      initAnimation();
    } else {
      svgRef.current.addEventListener('load', () => {
        initAnimation();
        ScrollTrigger.refresh();
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectBlock5}>
      <div className={styles.poolBgContainer}>
        <img src={imgBlock5Bg} alt="Pool Background" className={styles.poolBgImg} />
        <div className={styles.poolBgOverlay}></div>
      </div>

      <div className={styles.poolContent}>
        <div className={styles.poolHeader}>
          <h2 className={styles.poolTitle}>Бассейн с откатной террасой</h2>
          <p className={styles.poolDescription}>
            Бассейн интегрирован в общую композицию участка и связан с террасой из лиственницы. Мы продумали не только визуальное решение, но и каждый слой конструкции — от подготовки котлована до монтажа чаши и оборудования.
          </p>
        </div>

        <div className={styles.poolVisualWrapper}>
          <img ref={svgRef} src={imgPoolSvg} alt="Pool Details" className={styles.poolDetailsSvg} />
        </div>
      </div>
    </section>
  );
};
