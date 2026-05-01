import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './RivieraImplementationSection.module.css';

import bg1 from '../assets/riviera_block5_main.webp';
import bg2 from '../assets/riviera_block5_card2.webp';
import bg3 from '../assets/riviera_block5_card3.webp';
import bg4 from '../assets/riviera_block5_card4.webp';
import bg4Mobile from '../assets/riviera_block5_card4_mobile.webp';

interface Card {
  number: string;
  title: string;
  bg: string;
}

interface SlideState {
  number: string;
  title: string;
  description: string[];
  bg: string;
  bgMobile?: string;
  cards: Card[];
}

const slides: SlideState[] = [
  {
    number: "01",
    title: "Точная геодезия",
    description: [
      "Перед началом работ мы\u00A0провели точную геодезическую съёмку, чтобы корректно работать со\u00A0сложным рельефом и\u00A0перепадами высот."
    ],
    bg: bg1,
    cards: [
      { number: "02", title: "Основания маршрутов", bg: bg2 },
      { number: "03", title: "Скрытая инженерия", bg: bg3 },
      { number: "04", title: "Работа с\u00A0водой", bg: bg4 }
    ]
  },
  {
    number: "02",
    title: "Основания маршрутов",
    description: [
      "Для дорожек, ступеней и\u00A0площадок подготовлены надёжные основания, рассчитанные на\u00A0долгую эксплуатацию."
    ],
    bg: bg2,
    cards: [
      { number: "03", title: "Скрытая инженерия", bg: bg3 },
      { number: "04", title: "Работа с\u00A0водой", bg: bg4 }
    ]
  },
  {
    number: "03",
    title: "Скрытая инженерия",
    description: [
      "Все инженерные системы интегрированы в\u00A0ландшафт и\u00A0остаются невидимыми, сохраняя чистоту архитектуры сада."
    ],
    bg: bg3,
    cards: [
      { number: "04", title: "Работа с\u00A0водой", bg: bg4 }
    ]
  },
  {
    number: "04",
    title: "Работа с\u00A0водой",
    description: [
      "Ручей и\u00A0водные элементы интегрированы в\u00A0систему дренажа участка, что обеспечивает устойчивый водный баланс."
    ],
    bg: bg4,
    bgMobile: bg4Mobile,
    cards: []
  }
];

export const RivieraImplementationSection: React.FC = () => {
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
    <section ref={containerRef} className={styles.svcScrollContainer}>
      <div className={styles.svcHeader}>
        <h2 className={styles.svcHeaderTitle}>Реализация</h2>
        <p className={styles.svcHeaderSubtitle}>
          Большая часть работы остаётся невидимой, но&nbsp;именно она обеспечивает устойчивость и&nbsp;долговечность проекта.
        </p>
      </div>

      <div className={styles.svcSticky}>
        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          const isPrev = i < activeIndex;
          return (
            <div
              key={i}
              className={`${styles.svcSlide} ${isActive ? styles.svcSlideActive : ''} ${isPrev ? styles.svcSlidePrev : ''}`}
            >
              <div className={`${styles.svcSlideBg} ${isActive ? styles.svcSlideBgActive : ''}`}>
                <picture>
                  {slide.bgMobile && <source srcSet={slide.bgMobile} media="(max-width: 768px)" />}
                  <img src={slide.bg} alt="" />
                </picture>
                <div className={styles.svcSlideBgOverlay} />
              </div>

              <div className={styles.svcSlideLayout}>
                <div className={styles.svcSlideLeft}>
                  <p className={`${styles.svcNum} ${isActive ? styles.svcNumActive : ''}`}>{slide.number}</p>
                  <h2 className={`${styles.svcHeading} ${isActive ? styles.svcHeadingActive : ''}`}>{slide.title}</h2>
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
  );
};
