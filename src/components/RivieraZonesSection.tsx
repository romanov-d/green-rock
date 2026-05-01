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
import imgCard1Mobile from '../assets/riviera_card1_mobile.webp';
import imgCard2Mobile from '../assets/riviera_card2_mobile.webp';
import imgCard3Mobile from '../assets/riviera_card3_mobile.webp';
import imgCard4Mobile from '../assets/riviera_card4_mobile.webp';

import arrowLeft from '../assets/arrow_left_circle.svg';
import arrowRight from '../assets/arrow_right_circle.svg';

interface ZoneSlide {
  number: string;
  title: string;
  description: string;
  bg: string;
  cards: { title: string; img: string; imgMobile: string }[];
}

const slides: ZoneSlide[] = [
  {
    number: "01",
    title: "Костровая зона",
    description: "Приватная площадка на нижней террасе участка. Пространство организовано для отдыха у костра с видом на сад и окружающий ландшафт.",
    bg: imgZone1,
    cards: [
      { title: "Маршруты", img: imgCard1, imgMobile: imgCard1Mobile },
      { title: "Площадка", img: imgCard2, imgMobile: imgCard2Mobile },
      { title: "Растения", img: imgCard3, imgMobile: imgCard3Mobile },
    ]
  },
  {
    number: "02",
    title: "Маршруты",
    description: "Система плит и каскадных ступеней соединяет разные уровни участка. Маршруты позволяют комфортно перемещаться по саду и открывают новые видовые точки.",
    bg: imgZone2,
    cards: [
      { title: "Площадка", img: imgCard2, imgMobile: imgCard2Mobile },
      { title: "Растения", img: imgCard3, imgMobile: imgCard3Mobile },
      { title: "Газон", img: imgCard4, imgMobile: imgCard4Mobile },
    ]
  },
  {
    number: "03",
    title: "Площадка",
    description: "Система плит и каскадных ступеней соединяет разные уровни участка. Маршруты позволяют комфортно перемещаться по саду и открывают новые видовые точки.",
    bg: imgZone3,
    cards: [
      { title: "Растения", img: imgCard3, imgMobile: imgCard3Mobile },
      { title: "Газон", img: imgCard4, imgMobile: imgCard4Mobile },
    ]
  },
  {
    number: "04",
    title: "Растения",
    description: "Композиции из хвойных, декоративных злаков и кустарников формируют природный характер сада. Посадки мягко интегрируют архитектуру дома в лесной ландшафт.",
    bg: imgZone4,
    cards: [
      { title: "Газон", img: imgCard4, imgMobile: imgCard4Mobile }
    ]
  },
  {
    number: "05",
    title: "Газон",
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

  const goToSlide = (idx: number) => {
    if (!containerRef.current) return;
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = (idx / (slides.length - 1)) * scrollableHeight;
    const offsetTop = containerRef.current.offsetTop;

    window.scrollTo({
      top: offsetTop + targetScroll,
      behavior: 'smooth'
    });
  };

  const nextSlide = () => {
    if (activeIndex < slides.length - 1) {
      goToSlide(activeIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }
  };

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
            <img loading="lazy" decoding="async" src={slide.bg} alt="" />
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
                <picture className={styles.prinCardImgPicture}>
                  <source srcSet={card.imgMobile} media="(max-width: 768px)" />
                  <img loading="lazy" decoding="async" src={card.img} alt="" className={styles.prinCardImg} />
                </picture>
                <div className={styles.prinCardGradient} />
                <p className={styles.prinCardTitle} style={{ whiteSpace: 'pre-line' }}>{card.title}</p>
              </div>
            ))}
          </div>

          {/* Bottom controls */}
          <div className={styles.prinControls}>
            <div className={styles.prinArrows}>
              <img
                src={arrowLeft}
                alt="Previous"
                className={`${styles.prinArrow} ${activeIndex === 0 ? styles.prinArrowDisabled : ''}`}
                onClick={prevSlide}
              />
              <img
                src={arrowRight}
                alt="Next"
                className={`${styles.prinArrow} ${activeIndex === slides.length - 1 ? styles.prinArrowDisabled : ''}`}
                onClick={nextSlide}
              />
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
