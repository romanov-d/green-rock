import React, { useRef, useState, useEffect, useCallback } from 'react';

import bgMain from '../assets/principles_bg_main.webp';
import bgCard1 from '../assets/principles_card_1.webp';
import bgCard2 from '../assets/principles_card_2.webp';
import bgCard3 from '../assets/principles_card_3.webp';
import bgState4 from '../assets/principles_bg_4.webp';

import arrowLeft from '../assets/arrow_left_circle.svg';
import arrowRight from '../assets/arrow_right_circle.svg';

interface PrincipleSlide {
  number: string;
  title: string;
  description: string;
  bg: string;
  cards: { title: string; img: string }[];
}

const slides: PrincipleSlide[] = [
  {
    number: "01",
    title: "Бережное\nотношение к месту",
    description: "Мы не навязываем пространству случайные решения. Каждый проект начинается с понимания его характера, масштаба и того, как в нём будут жить люди.",
    bg: bgMain,
    cards: [
      { title: "Спокойствие клиента", img: bgCard1 },
      { title: "Баланс идеи\nи реальности", img: bgCard2 },
      { title: "Полный контроль\nрезультата", img: bgCard3 },
    ]
  },
  {
    number: "02",
    title: "Спокойствие\nклиента",
    description: "Вам не нужно погружаться в технические детали и координацию работ. Мы управляем проектом и отвечаем за весь процесс реализации.",
    bg: bgCard1,
    cards: [
      { title: "Баланс идеи\nи реальности", img: bgCard2 },
      { title: "Полный контроль\nрезультата", img: bgCard3 },
    ]
  },
  {
    number: "03",
    title: "Баланс идеи\nи реальности",
    description: "У каждого пространства — свои задачи. Наш подход — не типовые решения, а то, что действительно подходит именно этому месту.",
    bg: bgCard2,
    cards: [
      { title: "Полный контроль\nрезультата", img: bgCard3 },
    ]
  },
  {
    number: "04",
    title: "Полный контроль\nрезультата",
    description: "Команда профессионалов контролирует ключевые стадии, проверяет инженерные решения и качество исполнения на всех этапах проекта.",
    bg: bgState4,
    cards: []
  }
];

import styles from './PrinciplesSection.module.css';

export const PrinciplesSection: React.FC = () => {
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

  const active = slides[activeIndex];
  const progressWidth = ((activeIndex) / (slides.length - 1)) * 100;

  return (
    <section ref={containerRef} className={styles.prinScrollContainer}>
      <div className={styles.prinSticky}>
        {/* Backgrounds — crossfade */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.prinBg} ${i === activeIndex ? styles.prinBgActive : ''}`}
          >
            <img src={slide.bg} alt="" />
            <div className={styles.prinBgOverlay} />
          </div>
        ))}

        {/* Content */}
        <div className={styles.prinContent}>
          {/* Subtitle top-left */}
          <p className={styles.prinSubtitle}>Принципы работы<br />Грин Рок</p>

          {/* Title + Description (crossfade per slide) */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${styles.prinTextBlock} ${i === activeIndex ? styles.prinTextBlockActive : ''}`}
            >
              <h2 className={styles.prinTitle}>{slide.title}</h2>
              <p className={styles.prinDesc}>{slide.description}</p>
            </div>
          ))}

          {/* Cards right */}
          <div className={styles.prinCards}>
            {active.cards.map((card, ci) => (
              <div
                key={`${activeIndex}-${ci}`}
                className={styles.prinCard}
                style={{ animationDelay: `${ci * 100}ms` }}
              >
                <img src={card.img} alt="" className={styles.prinCardImg} />
                <div className={styles.prinCardGradient} />
                <p className={styles.prinCardTitle}>{card.title}</p>
              </div>
            ))}
          </div>

          {/* Bottom controls */}
          <div className={styles.prinControls}>
            <div className={styles.prinArrows}>
              <img src={arrowLeft} alt="Previous" className={styles.prinArrow} />
              <img src={arrowRight} alt="Next" className={styles.prinArrow} />
            </div>
            <div className={styles.prinProgressBar}>
              <div className={styles.prinProgressFill} style={{ width: `${progressWidth}%` }} />
            </div>
            <span className={styles.prinNumber}>{active.number}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
