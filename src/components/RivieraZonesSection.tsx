import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './RivieraZonesSection.module.css';

import imgZone1 from '../assets/riviera_zone1_bg.webp';
import imgZone2 from '../assets/riviera_zone2_bg.webp';
import imgZone3 from '../assets/riviera_zone3_bg.webp';
import imgZone4 from '../assets/riviera_zone4_bg.webp';
import imgZone5 from '../assets/riviera_zone5_bg.webp';
import imgCard1 from '../assets/riviera_card1.webp';
import imgCard2 from '../assets/riviera_card2.webp';
import imgCard3 from '../assets/riviera_card3.webp';
import imgCard4 from '../assets/riviera_card4.webp';

import arrowLeft from '../assets/arrow_left_circle.svg';
import arrowRight from '../assets/arrow_right_circle.svg';

interface ZoneSlide {
  number: string;
  title: string;
  description: string;
  bg: string;
  cards: { title: string; img: string }[];
}

const slides: ZoneSlide[] = [
  {
    number: "01",
    title: "Костровая зона",
    description: "Приватная площадка на нижней террасе участка. Пространство организовано для отдыха у костра с видом на сад и окружающий ландшафт.",
    bg: imgZone1,
    cards: [
      { title: "Маршруты по\nрельефу", img: imgCard1 },
      { title: "Спортивная\nплощадка", img: imgCard2 },
      { title: "Композиции из\nрастений", img: imgCard3 },
    ]
  },
  {
    number: "02",
    title: "Маршруты по рельефу",
    description: "Система плит и каскадных ступеней соединяет разные уровни участка. Маршруты позволяют комфортно перемещаться по саду и открывают новые видовые точки.",
    bg: imgZone2,
    cards: [
      { title: "Спортивная\nплощадка", img: imgCard2 },
      { title: "Композиции из\nрастений", img: imgCard3 },
      { title: "Газон с перепадами\nвысот", img: imgCard4 },
    ]
  },
  {
    number: "03",
    title: "Спортивная площадка",
    description: "Система плит и каскадных ступеней соединяет разные уровни участка. Маршруты позволяют комфортно перемещаться по саду и открывают новые видовые точки.",
    bg: imgZone3,
    cards: [
      { title: "Композиции из\nрастений", img: imgCard3 },
      { title: "Газон с перепадами\nвысот", img: imgCard4 },
    ]
  },
  {
    number: "04",
    title: "Композиции из растений",
    description: "Композиции из хвойных, декоративных злаков и кустарников формируют природный характер сада. Посадки мягко интегрируют архитектуру дома в лесной ландшафт.",
    bg: imgZone4,
    cards: [
      { title: "Газон с перепадами\nвысот", img: imgCard4 }
    ]
  },
  {
    number: "05",
    title: "Газон с перепадами высот",
    description: "Открытая зона сада, сформированная мягкими террасами рельефа. Газон объединяет разные части участка и создаёт пространство для отдыха и прогулок.",
    bg: imgZone5,
    cards: []
  }
];

export const RivieraZonesSection: React.FC = () => {
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
    <section ref={containerRef} className={styles.prinScrollContainer} style={{ height: `${slides.length * 100}vh` }}>
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
          <p className={styles.prinSubtitle}>Логика пространства</p>

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
                <p className={styles.prinCardTitle} style={{ whiteSpace: 'pre-line' }}>{card.title}</p>
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
