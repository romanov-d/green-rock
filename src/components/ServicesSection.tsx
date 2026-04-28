import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './ServicesSection.module.css';
import { RevealSection } from './RevealSection';

import bg0 from '../assets/block3_main_bg.webp';
import bg1 from '../assets/principles_bg_1.webp';
import bg2 from '../assets/principles_bg_2.webp';
import bg3 from '../assets/principles_bg_3.webp';
import arrowIcon from '../assets/arrow_white_circle.svg';

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
    title: "Ландшафты",
    description: [
      "Чувствовать природу, а не ухаживать за ней.",
      "Участок становится удобным и живым: с маршрутами, растениями и водой, которые работают без лишнего ухода."
    ],
    bg: bg0,
    cards: [
      { number: "02", title: "Архитектура", subtitle: "Форма, вписанная в природу", bg: bg1 },
      { number: "03", title: "Дизайн", subtitle: "Где красота встречает функцию", bg: bg2 },
      { number: "04", title: "Интерьер", subtitle: "Продуманные до ощущений", bg: bg3 }
    ]
  },
  {
    number: "02",
    title: "Архитектура",
    description: [
      "Дом не спорит с местом — он становится его частью.",
      "Архитектура рождается из ландшафта: света, рельефа и тишины вокруг."
    ],
    bg: bg1,
    cards: [
      { number: "03", title: "Дизайн", subtitle: "Где красота встречает функцию", bg: bg2 },
      { number: "04", title: "Интерьеры", subtitle: "Продуманные до ощущений", bg: bg3 }
    ]
  },
  {
    number: "03",
    title: "Дизайн",
    description: [
      "Пространство собирается в цельную идею.",
      "Так, чтобы каждый элемент работал — и выглядел естественно в вашей жизни."
    ],
    bg: bg2,
    cards: [
      { number: "04", title: "Интерьеры", subtitle: "Продуманные до ощущений", bg: bg3 }
    ]
  },
  {
    number: "04",
    title: "Интерьер",
    description: [
      "Материалы, свет и детали создают ощущение спокойствия и уюта каждый день."
    ],
    bg: bg3,
    cards: []
  }
];


export const ServicesSection: React.FC = () => {
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
    <section ref={containerRef} className={styles.svcScrollContainer} id="services">
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
              <RevealSection className={styles.svcSlideLayoutWrapper}>
                <div className={styles.svcSlideLayout}>
                  <div className={styles.svcSlideLeft}>
                    <p className={`${styles.svcNum} ${isActive ? styles.svcNumActive : ''}`}>{slide.number}</p>
                    <h2 className={`${styles.svcHeading} ${isActive ? styles.svcHeadingActive : ''}`}>{slide.title}</h2>
                    <div className={`${styles.svcDesc} ${isActive ? styles.svcDescActive : ''}`}>
                      {slide.description.map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                    <a href="#more" className={`${styles.svcCta} ${isActive ? styles.svcCtaActive : ''}`}>
                      <div className={styles.svcCtaIcon}><img src={arrowIcon} alt="" /></div>
                      <span>Подробнее об услуге</span>
                    </a>
                  </div>

                  <div className={styles.svcSlideRight}>
                    {slide.cards.map((card, ci) => (
                      <div key={ci} className={`${styles.svcCard} ${isActive ? styles.svcCardActive : ''}`} style={{ transitionDelay: `${ci * 80}ms` }}>
                        <div className={styles.svcCardBg}>
                          <img src={card.bg} alt="" />
                          <div className={styles.svcCardBgOverlay} />
                        </div>
                        <p className={styles.svcCardNum}>{card.number}</p>
                        <div className={styles.svcCardArrow}><img src={arrowIcon} alt="" /></div>
                        <div className={styles.svcCardInfo}>
                          <h3>{card.title}</h3>
                          <p>{card.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            </div>
          );
        })}
      </div>
    </section>
  );
};
