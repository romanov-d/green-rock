import React from 'react';
import styles from './ManagementSection.module.css';

interface ManagementCardProps {
  title: string;
  subtitle: string;
  image: string;
}

const ManagementCard: React.FC<ManagementCardProps> = ({ title, subtitle, image }) => {
  return (
    <div className={styles.managementCard}>
      <div className={styles.cardBgContainer}>
        <img src={image} alt="" className={styles.cardBgFull} />
        <div className={styles.cardGlassOverlay} />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardInfoTitle}>{title}</h3>
        <p className={styles.cardInfoSubtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

interface ManagementSectionProps {
  cards: ManagementCardProps[];
  bgImage: string;
  bgImageMobile?: string;
}

export const ManagementSection: React.FC<ManagementSectionProps> = ({ cards, bgImage, bgImageMobile }) => {
  return (
    <section className={styles.managementSection}>
      <div className={styles.sectionBg}>
        <picture>
          {bgImageMobile && <source srcSet={bgImageMobile} media="(max-width: 768px)" />}
          <img src={bgImage} alt="" className={styles.bgImg} />
        </picture>
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.sectionContent}>
        <div className={styles.contentHeaderCentered}>
          <h2 className={`${styles.headerTitleLarge} anim-fade-up`}>
            {"Мы подключаемся там, где важно собрать пространство целиком — без компромиссов и случайных решений."}
          </h2>
        </div>

        <div className={styles.managementCards}>
          {cards.map((card, index) => (
            <ManagementCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
