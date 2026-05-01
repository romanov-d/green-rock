import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './ServicesDesignScroller.module.css';

import bg1 from '../assets/services_block2_bg.webp';
import bg2 from '../assets/services_block2_card2.webp';
import bg3 from '../assets/services_block2_card3.webp';
import bg4 from '../assets/services_block2_card4.webp';
import imgArrowDiagonal from '../assets/arrow_diagonal_white_small.svg';

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
    title: "Идея",
    description: [
      "Определяем концепцию и\u00A0логику проекта, которая объединяет все решения"
    ],
    bg: bg1,
    cards: [
      { number: "02", title: "Сценарии жизни", subtitle: "", bg: bg2 },
      { number: "03", title: "Образ", subtitle: "", bg: bg3 },
      { number: "04", title: "Понимание", subtitle: "", bg: bg4 }
    ]
  },
  {
    number: "02",
    title: "Сценарии жизни",
    description: [
      "Формируем, как\u00A0будет устроена жизнь в\u00A0пространстве и\u00A0как\u00A0вы\u00A0взаимодействуете с\u00A0ним"
    ],
    bg: bg2,
    cards: [
      { number: "03", title: "Образ", subtitle: "", bg: bg3 },
      { number: "04", title: "Понимание", subtitle: "", bg: bg4 }
    ]
  },
  {
    number: "03",
    title: "Образ",
    description: [
      "Создаём целостный визуальный стиль без\u00A0случайных решений"
    ],
    bg: bg3,
    cards: [
      { number: "04", title: "Понимание", subtitle: "", bg: bg4 }
    ]
  },
  {
    number: "04",
    title: "Понимание",
    description: [
      "Даём чёткое представление о\u00A0будущем результате ещё до\u00A0начала работ"
    ],
    bg: bg4,
    cards: []
  }
];

export const ServicesDesignScroller: React.FC = () => {
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
    <section ref={containerRef} id="design" className={styles.svcScrollContainer}>
      <div className={styles.mobileHeaderBlock}>
        <h2 className={styles.mobileHeaderTitle}>Дизайн</h2>
        <p className={styles.mobileHeaderDesc}>
          Мы проектируем не&nbsp;отдельные элементы, а&nbsp;среду, где удобно жить, отдыхать и&nbsp;проводить время.
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
              {/* Background */}
              <div className={`${styles.svcSlideBg} ${isActive ? styles.svcSlideBgActive : ''}`}>
                <img loading="lazy" decoding="async" src={slide.bg} alt={`Этап проектирования — ${slide.title}`} />
                <div className={styles.svcSlideBgOverlay} />
              </div>

              {/* Content */}
              <div className={styles.svcSlideLayout}>
                <div className={styles.svcSlideLeft}>
                  <p className={`${styles.svcNum} ${isActive ? styles.svcNumActive : ''}`}>{slide.number}</p>
                  <h2 className={`${styles.svcHeading} ${isActive ? styles.svcHeadingActive : ''}`}>{slide.title}</h2>
                  <div className={`${styles.svcDesc} ${isActive ? styles.svcDescActive : ''}`}>
                    {slide.description.map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                  <a 
                    href="/#projects" 
                    className={`${styles.svcCta} ${isActive ? styles.svcCtaActive : ''}`}
                  >
                    <span>Смотреть кейсы</span>
                    <div className={styles.svcCtaIcon}>
                      <img loading="lazy" decoding="async" src={imgArrowDiagonal} alt="Перейти к проектам" />
                    </div>
                  </a>
                </div>

                <div className={styles.svcSlideRight}>
                  {slide.cards.map((card, ci) => (
                    <div key={ci} className={`${styles.svcCard} ${isActive ? styles.svcCardActive : ''}`} style={{ transitionDelay: `${ci * 80}ms` }}>
                      <div className={styles.svcCardBg}>
                        <img loading="lazy" decoding="async" src={card.bg} alt={`Кейс Грин Рок — ${card.title}`} />
                        <div className={styles.svcCardBgOverlay} />
                      </div>
                      <p className={styles.svcCardNum}>{card.number}</p>
                      <div className={styles.svcCardInfo}>
                        <h3>{card.title}</h3>
                        <p>{card.subtitle}</p>
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
