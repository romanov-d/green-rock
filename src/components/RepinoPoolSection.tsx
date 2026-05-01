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

      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(svgRef.current,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top 80%",
            }
          }
        );
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
          <h2 className={styles.poolTitle}>{"Бассейн с\u00A0откатной террасой"}</h2>
          <p className={styles.poolDescription}>
            {"Бассейн интегрирован в\u00A0общую композицию участка и\u00A0связан с\u00A0террасой из\u00A0лиственницы. Мы\u00A0продумали не\u00A0только визуальное решение, но\u00A0и\u00A0каждый слой конструкции\u00A0— от\u00A0подготовки котлована до\u00A0монтажа чаши и\u00A0оборудования."}
          </p>
        </div>

        <div className={styles.poolVisualWrapper}>
          <img 
            ref={svgRef} 
            src={imgPoolSvg} 
            alt="Pool Details" 
            className={styles.poolDetailsSvg} 
          />
        </div>
      </div>
    </section>
  );
};
