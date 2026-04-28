import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './ArchitectureSection.module.css';

// Assets
import imgSlide1Bg from '../assets/services_arch_slide1_bg.webp';
import imgSlide1Card1 from '../assets/services_arch_slide1_card1.webp';
import imgSlide1Card2 from '../assets/services_arch_slide1_card2.webp';
import imgSlide1Card3 from '../assets/services_arch_slide1_card3.webp';

import arrowLeft from '../assets/arrow_left_circle.svg';
import arrowRight from '../assets/arrow_right_circle.svg';

interface ArchSlide {
  number: string;
  title: string;
  description: string;
  bg: string;
  cards: { title: string; img: string }[];
}

const slides: ArchSlide[] = [
  {
    number: "01",
    title: "Как здание\nживёт на участке",
    description: "Мы определяем, где и как стоит дом, чтобы он работал с рельефом, светом и окружением.",
    bg: imgSlide1Bg,
    cards: [
      { title: "Пространство изнутри", img: imgSlide1Card1 },
      { title: "Характер и внешний вид", img: imgSlide1Card2 },
      { title: "От идеи до строительства", img: imgSlide1Card3 },
    ]
  },
  {
    number: "02",
    title: "Пространство\nизнутри",
    description: "Продумываем планировку и связи между зонами, чтобы всё было интуитивно, удобно и работало в повседневной жизни.",
    bg: imgSlide1Card1,
    cards: [
      { title: "Характер и внешний вид", img: imgSlide1Card2 },
      { title: "От идеи до строительства", img: imgSlide1Card3 },
    ]
  },
  {
    number: "03",
    title: "Характер\nи внешний вид",
    description: "Формируем архитектуру, материалы и детали, которые задают стиль и создают цельный образ пространства.",
    bg: imgSlide1Card2,
    cards: [
      { title: "От идеи до строительства", img: imgSlide1Card3 },
    ]
  },
  {
    number: "04",
    title: "От идеи до\nстроительства объектов",
    description: "Разрабатываем документацию и реализуем объекты: коттеджные посёлки, глэмпинги, веранды.",
    bg: imgSlide1Card3,
    cards: []
  }
];

export const ArchitectureSection: React.FC = () => {
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
    <section ref={containerRef} id="architecture" className={styles.archScrollContainer}>
      <div className={styles.archSticky}>
        {/* Backgrounds — crossfade */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.archBg} ${i === activeIndex ? styles.archBgActive : ''}`}
          >
            <img src={slide.bg} alt="" />
            <div className={styles.archBgOverlay} />
          </div>
        ))}

        {/* Content */}
        <div className={styles.archContent}>
          {/* Subtitle top-left */}
          <p className={styles.archSubtitle}>Архитектура<br />Грин Рок</p>

          {/* Title + Description (crossfade per slide) */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${styles.archTextBlock} ${i === activeIndex ? styles.archTextBlockActive : ''}`}
            >
              <h2 className={styles.archTitle}>{slide.title}</h2>
              <p className={styles.archDesc}>{slide.description}</p>
            </div>
          ))}

          {/* Cards right */}
          <div className={styles.archCards}>
            {active.cards.map((card, ci) => (
              <div
                key={`${activeIndex}-${ci}`}
                className={styles.archCard}
                style={{ animationDelay: `${ci * 100}ms` }}
              >
                <img src={card.img} alt="" className={styles.archCardImg} />
                <div className={styles.archCardGradient} />
                <p className={styles.archCardTitle}>{card.title}</p>
              </div>
            ))}
          </div>

          {/* Bottom controls */}
          <div className={styles.archControls}>
            <div className={styles.archArrows}>
              <img src={arrowLeft} alt="Previous" className={styles.archArrow} />
              <img src={arrowRight} alt="Next" className={styles.archArrow} />
            </div>
            <div className={styles.archProgressBar}>
              <div className={styles.archProgressFill} style={{ width: `${progressWidth}%` }} />
            </div>
            <span className={styles.archNumber}>{active.number}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

