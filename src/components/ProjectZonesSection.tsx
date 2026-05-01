import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './ProjectZonesSection.module.css';

// Assets
import bg1 from '../assets/lubitovo_slide1_bg.webp';
import bg2 from '../assets/lubitovo_slide2_bg.webp';
import bg3 from '../assets/lubitovo_slide3_bg.webp';
import bg4 from '../assets/lubitovo_slide4_bg.webp';
import bg5 from '../assets/lubitovo_slide5_bg.webp';

import cardPond from '../assets/lubitovo_card_pond.webp';
import cardFire from '../assets/lubitovo_card_fire.webp';
import cardLawn from '../assets/lubitovo_card_lawn.webp';
import cardGarden from '../assets/lubitovo_card_garden.webp';

import cardPondMobile from '../assets/lubitovo_card_pond_mobile.webp';
import cardFireMobile from '../assets/lubitovo_card_fire_mobile.webp';
import cardLawnMobile from '../assets/lubitovo_card_lawn_mobile.webp';
import cardGardenMobile from '../assets/lubitovo_card_garden_mobile.webp';

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
    title: "Лесная зона",
    description: "Посадки формируют естественный экран. Это не просто деревья — это буфер, который создает глубину участка.",
    bg: bg1,
    cards: [
      { title: "Пруд", img: cardPond, imgMobile: cardPondMobile },
      { title: "Зоны костра", img: cardFire, imgMobile: cardFireMobile },
      { title: "Лужайка", img: cardLawn, imgMobile: cardLawnMobile },
      { title: "Плодовый сад", img: cardGarden, imgMobile: cardGardenMobile },
    ]
  },
  {
    number: "02",
    title: "Пруд",
    description: "Но это не декоративный водоём. Это инженерная система с фильтрацией и расчётом циркуляции воды. Без этой проработки пруд превратился бы в проблему через сезон.",
    bg: bg2,
    cards: [
      { title: "Зоны костра", img: cardFire, imgMobile: cardFireMobile },
      { title: "Лужайка", img: cardLawn, imgMobile: cardLawnMobile },
      { title: "Плодовый сад", img: cardGarden, imgMobile: cardGardenMobile },
    ]
  },
  {
    number: "03",
    title: "Зоны костра",
    description: "Камерный костёр — для семьи. Более открытая зона — для гостей. Мы продумали расстояния, направление ветра и безопасность покрытий.",
    bg: bg3,
    cards: [
      { title: "Лужайка", img: cardLawn, imgMobile: cardLawnMobile },
      { title: "Плодовый сад", img: cardGarden, imgMobile: cardGardenMobile },
    ]
  },
  {
    number: "04",
    title: "Лужайка",
    description: "Газон рассчитан с учётом нагрузки и системы автополива. Он работает не как декорация, а как активная зона.",
    bg: bg4,
    cards: [
      { title: "Плодовый сад", img: cardGarden, imgMobile: cardGardenMobile },
    ]
  },
  {
    number: "05",
    title: "Плодовый сад",
    description: "Мы расположили его так, чтобы он был функциональным, но не нарушал общую композицию.",
    bg: bg5,
    cards: []
  }
];

export const ProjectZonesSection: React.FC = () => {
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

  const goToSlide = (index: number) => {
    if (!containerRef.current) return;
    const slideHeight = window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + (index * slideHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    if (activeIndex > 0) goToSlide(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) goToSlide(activeIndex + 1);
  };

  const active = slides[activeIndex];
  const progressWidth = ((activeIndex) / (slides.length - 1)) * 100;

  return (
    <section ref={containerRef} className={styles.zoneScrollContainer}>
      <div className={styles.zoneSticky}>
        {/* Backgrounds — crossfade */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.zoneBg} ${i === activeIndex ? styles.zoneBgActive : ''}`}
          >
            <img src={slide.bg} alt="" />
            <div className={styles.zoneBgOverlay} />
          </div>
        ))}

        {/* Content */}
        <div className={styles.zoneContent}>
          {/* Subtitle top-left */}
          <p className={styles.zoneSubtitle}>Логика пространства</p>

          {/* Title + Description (crossfade per slide) */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${styles.zoneTextBlock} ${i === activeIndex ? styles.zoneTextBlockActive : ''}`}
            >
              <h2 className={styles.zoneTitle}>{slide.title}</h2>
              <p className={styles.zoneDesc}>{slide.description}</p>
            </div>
          ))}

          {/* Cards right */}
          <div className={styles.zoneCards}>
            {active.cards.map((card, ci) => (
              <div
                key={`${activeIndex}-${ci}`}
                className={styles.zoneCard}
                style={{ animationDelay: `${ci * 100}ms` }}
              >
                <picture className={styles.zoneCardImgPicture}>
                  <source srcSet={card.imgMobile} media="(max-width: 768px)" />
                  <img src={card.img} alt="" className={styles.zoneCardImg} />
                </picture>
                <div className={styles.zoneCardGradient} />
                <p className={styles.zoneCardTitle}>{card.title}</p>
              </div>
            ))}
          </div>

          {/* Bottom controls */}
          <div className={styles.zoneControls}>
            <div className={styles.zoneArrows}>
              <img
                src={arrowLeft}
                alt="Previous"
                className={`${styles.zoneArrow} ${activeIndex === 0 ? styles.zoneArrowDisabled : ''}`}
                onClick={handlePrev}
              />
              <img
                src={arrowRight}
                alt="Next"
                className={`${styles.zoneArrow} ${activeIndex === slides.length - 1 ? styles.zoneArrowDisabled : ''}`}
                onClick={handleNext}
              />
            </div>
            <div className={styles.zoneProgressBar}>
              <div className={styles.zoneProgressFill} style={{ width: `${progressWidth}%` }} />
            </div>
            <span className={styles.zoneNumber}>{active.number}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
