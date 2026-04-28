import React from 'react';
import styles from './Hero.module.css';
import imgBackground from '../../assets/background.webp';
import imgPcOnline from '../../assets/pconline.svg';
import imgMobileOnline from '../../assets/herobanner.svg';

interface HeroProps {
  onTourClick: () => void;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ onTourClick, children }) => {
  return (
    <div className={styles.heroBlock}>
      {children}
      {/* Background Section */}
      <img src={imgBackground} alt="Background" className={styles.backgroundImage} />
      <div className={styles.overlay}></div>
      <div className={styles.heroMeshContainer}></div>

      {/* Hero Section */}
      <main className={styles.heroSection}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Пространства.</span>
            <span className={styles.titleLine}>Истории.</span>
            <span className={styles.titleLine}>Жизнь.</span>
          </h1>
          <p className={`${styles.heroSubtitle} ${styles.animateSubtitle}`}>
            Проектируем и реализуем ландшафты, в которых хочется жить.
          </p>
        </div>
      </main>

      <section 
        className={`${styles.tourCardWrapper} ${styles.animateCard}`} 
        onClick={onTourClick}
      >
        <img src={imgPcOnline} alt="Online Tour" className={styles.pcOnlyCard} />
        <img src={imgMobileOnline} alt="Online Tour" className={styles.mobileOnlyCard} />
      </section>

      {/* Bottom Navigation / Scroll Progress */}
      <div className={styles.bottomScroll}>
        <span className={styles.scrollText}>Подробнее</span>
        <div className={styles.scrollProgress}>
          <div className={styles.scrollProgressFill}></div>
        </div>
      </div>
    </div>
  );
};
