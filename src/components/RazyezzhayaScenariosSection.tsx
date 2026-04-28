import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './RazyezzhayaScenariosSection.module.css';

import bg0 from '../assets/raz_block7_bg.webp';
import bg1 from '../assets/raz_block7_card2.webp';
import bg2 from '../assets/raz_block7_card3.webp';
import bg3 from '../assets/raz_block7_card4.webp';

interface Card {
  number: string;
  title: string;
  subtitle: string;
  bg: string;
}

interface SlideState {
  number: string;
  title: string;
  description: string[];
  bg: string;
  cards: Card[];
}

const slides: SlideState[] = [
  {
    number: "01",
    title: "Общение",
    description: [
      "Зона для взаимодействия — без жёсткой функции, но с понятным ощущением комфорта."
    ],
    bg: bg0,
    cards: [
      { number: "02", title: "Открытость", subtitle: "", bg: bg1 },
      { number: "03", title: "Тишина", subtitle: "", bg: bg2 },
      { number: "04", title: "Сценарии", subtitle: "", bg: bg3 }
    ]
  },
  {
    number: "02",
    title: "Открытость",
    description: [
      "Светлое пространство для отдыха и свободного времени."
    ],
    bg: bg1,
    cards: [
      { number: "03", title: "Тишина", subtitle: "", bg: bg2 },
      { number: "04", title: "Сценарии", subtitle: "", bg: bg3 }
    ]
  },
  {
    number: "03",
    title: "Тишина",
    description: [
      "Приватная зона для работы или уединения в тишине."
    ],
    bg: bg2,
    cards: [
      { number: "04", title: "Сценарии", subtitle: "", bg: bg3 }
    ]
  },
  {
    number: "04",
    title: "Сценарии",
    description: [
      "Разные уровни освещения и рассадки для любых задач."
    ],
    bg: bg3,
    cards: []
  }
];

export const RazyezzhayaScenariosSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const idx = Math.min(slides.length - 1, Math.floor(p * slides.length));
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ background: '#1b3a3f' }}>
      <div className={styles.scenariosHeaderRow}>
        <h2 className={styles.scenariosHeaderTitle}>Пространство раскрывается</h2>
        <p className={styles.scenariosHeaderDesc}>После компактных и приватных зон отель меняет характер. Третий этаж становится точкой, где можно остановиться, выдохнуть и остаться дольше.</p>
      </div>

      <section ref={containerRef} className={styles.svcScrollContainer}>
        <div className={styles.svcSticky}>
          {slides.map((slide, i) => {
            const isActive = i === activeIndex;
            const isPrev = i < activeIndex;
            return (
              <div
                key={i}
                className={`${styles.svcSlide} ${isActive ? styles.svcSlideActive : ''} ${isPrev ? styles.svcSlidePrev : ''}`}
              >
                {/* Background */}
                <div className={`${styles.svcSlideBg} ${isActive ? styles.svcSlideBgActive : ''}`}>
                  <img src={slide.bg} alt="" />
                  <div className={styles.svcSlideBgOverlay} />
                </div>

                {/* Content */}
                <div className={styles.svcSlideLayout}>
                  <div className={styles.svcSlideLeft}>
                    <p className={`${styles.svcNum} ${isActive ? styles.svcNumActive : ''}`}>{slide.number}</p>
                    {slide.title && <h2 className={`${styles.svcHeading} ${isActive ? styles.svcHeadingActive : ''}`}>{slide.title}</h2>}
                    <div className={`${styles.svcDesc} ${isActive ? styles.svcDescActive : ''}`}>
                      {slide.description.map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className={styles.svcSlideRight}>
                    {slide.cards.map((card, ci) => (
                      <div key={ci} className={`${styles.svcCard} ${isActive ? styles.svcCardActive : ''}`} style={{ transitionDelay: `${ci * 80}ms` }}>
                        <div className={styles.svcCardBg}>
                          <img src={card.bg} alt="" />
                          <div className={styles.svcCardBgOverlay} />
                        </div>
                        <p className={styles.svcCardNum}>{card.number}</p>
                        <div className={styles.svcCardInfo}>
                          <h3>{card.title}</h3>
                          {card.subtitle && <p>{card.subtitle}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
