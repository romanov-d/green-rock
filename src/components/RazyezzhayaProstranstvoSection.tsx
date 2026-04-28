import React, { useRef, useCallback, useEffect } from 'react';
import styles from './RazyezzhayaProstranstvoSection.module.css';

import imgProstranstvoSvg from '../assets/prostranstvo.svg';
import imgBlock5Bg from '../assets/raz_block5_bg.webp';

export const RazyezzhayaProstranstvoSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !svgRef.current) return;
    if (window.innerWidth > 768) {
      svgRef.current.style.transform = '';
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const scrolled = Math.max(0, -rect.top);
    const p = Math.min(1, scrolled / scrollableHeight);
    const maxTranslate = -(svgRef.current.scrollWidth - window.innerWidth + 40);
    svgRef.current.style.transform = `translateX(${p * maxTranslate}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section ref={containerRef} className={styles.projectBlockAnnotated}>
      <div className={styles.stickyInner}>
        <div className={styles.sectionBg}>
          <img src={imgBlock5Bg} alt="Background" className={styles.bgImg} />
          <div className={styles.bgOverlay}></div>
        </div>

        <div className={styles.contentZIndex}>
          <div className={styles.annotatedHeader}>
            <h2 className={styles.annotatedTitle}>Когда пространство ограничено —<br />каждый метр должен работать.</h2>
            <p className={styles.annotatedSubtitle}>Мы не просто разместили номера, а спроектировали систему проживания, где всё встроено в архитектуру. Капсульные модули позволяют сохранить плотность, не жертвуя комфортом и ощущением уединения.</p>
          </div>

          <div className={styles.annotatedVisualWrapper}>
            <img ref={svgRef} src={imgProstranstvoSvg} alt="Prostranstvo Details" className={styles.prostranstvoSvg} />
          </div>
        </div>
      </div>
    </section>
  );
};
