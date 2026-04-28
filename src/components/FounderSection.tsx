import React, { useRef, useState, useEffect, useCallback } from 'react';
import imgBg from '../assets/founder_bg.webp';
import imgArrowIcon from '../assets/arrow_white_circle.svg';

// Team photos
import imgGrigoriy from '../assets/team_anastasia.webp'; // Re-mapped as requested
import imgIvan from '../assets/team_avatar2.webp';    // Re-mapped as requested
import imgPavel from '../assets/team_pavel.webp';
import imgAnastasia from '../assets/team_ivan.webp';   // Re-mapped as requested
import imgNaim from '../assets/team_naim.webp';

// Signature (only for founder)
import imgSignature from '../assets/founder_signature.svg';
import imgAvatarBorder from '../assets/avatar_border.svg';

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  quote: string;
  isFounder?: boolean;
}

const team: TeamMember[] = [
  {
    name: "Григорий Балыко",
    role: "Основатель Грин Рок· 8 лет практики",
    photo: imgGrigoriy,
    quote: "«Пространство либо работает, либо нет. Всё остальное — декорации».",
    isFounder: true
  },
  {
    name: "Иван Гук",
    role: "Геодезист",
    photo: imgIvan,
    quote: "«Продумываем пространство на годы»"
  },
  {
    name: "Павел Ройсс",
    role: "Прораб",
    photo: imgPavel,
    quote: "«Берём ответственность за результат»"
  },
  {
    name: "Анастасья Имшеник",
    role: "Ведущий дизайнер",
    photo: imgAnastasia,
    quote: "«Проектируем то, что можно реализовать»"
  },
  {
    name: "Наим Рустамов",
    role: "каменьщик-плиточник, мастер высш. к.",
    photo: imgNaim,
    quote: "«Внимательны к каждой детали»"
  }
];

// Heading text — same for all except founder state
const HEADING_TEAM = "Специалисты, которые ведут проект от первой идеи до готового пространства.";

import styles from './FounderSection.module.css';

export const FounderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
    const idx = Math.min(team.length - 1, Math.floor(p * team.length));
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const active = team[activeIndex];

  return (
    <section ref={containerRef} id="about" className={styles.teamScrollContainer}>
      <div className={styles.teamSticky}>
        {/* Background */}
        <img src={imgBg} alt="" className={styles.teamBg} />
        <div className={styles.teamBgOverlay} />

        {/* Content */}
        <div className={styles.teamContent}>
          {/* Left — Quote or Heading */}
          <div className={styles.teamLeft}>
            {active.isFounder ? (
              <div className={styles.teamFounderQuote} key="founder">
                <h2 className={`${styles.teamQuoteText} anim-fade-up`}>{active.quote}</h2>
                <div className={`${styles.teamSignature} anim-fade-up`} style={{ animationDelay: '0.2s' }}>
                  <img src={imgSignature} alt="Подпись" />
                </div>
              </div>
            ) : (
              <div className={styles.teamHeadingBlock} key={`heading-${activeIndex}`}>
                <h2 className={`${styles.teamHeading} anim-fade-up`}>{HEADING_TEAM}</h2>
                <a href="#consult" className={`${styles.teamCta} anim-fade-up`} style={{ animationDelay: '0.15s' }}>
                  <div className={styles.teamCtaIcon}><img src={imgArrowIcon} alt="" /></div>
                  <span>Консультация с архитектором</span>
                </a>
              </div>
            )}
          </div>

          {/* Caveat quote — bottom left (only for non-founder) */}
          {!active.isFounder && (
            <p key={`quote-${activeIndex}`} className={`${styles.teamMemberQuote} anim-fade-up-team`} style={{ animationDelay: '0.3s' }}>
              {active.quote}
            </p>
          )}

          {/* Founder promise — bottom left */}
          {active.isFounder && (
            <p className={`${styles.teamPromise} anim-fade-up-team`} style={{ animationDelay: '0.4s' }}>
              Мы отвечаем за результат — от идеи до реализации
            </p>
          )}

          {/* Right — Photo card */}
          <div className={styles.teamPortraitArea}>
            {team.map((member, i) => (
              <div
                key={i}
                className={`${styles.teamCard} ${i === activeIndex ? styles.teamCardActive : ''}`}
              >
                <img src={member.photo} alt={member.name} className={styles.teamCardPhoto} />
                <div className={styles.teamCardGradient} />
                {/* Show on card for everyone EXCEPT founder on mobile */}
                <div className={`${styles.teamCardInfo} ${member.isFounder ? styles.founderInfoHideMobile : ''}`}>
                  <h3 className={styles.teamCardName}>{member.name}</h3>
                  <p className={styles.teamCardRole}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Mobile Info Block (Bottom) - ONLY for Founder */}
          {active.isFounder && (
            <div className={styles.teamActiveInfoMobile}>
              <h3 className={styles.teamCardName}>{active.name}</h3>
              <p className={styles.teamCardRole}>{active.role}</p>
            </div>
          )}

          {/* Avatars nav — right side */}
          <div className={styles.teamAvatars}>
            {team.map((member, i) => (
              <div
                key={i}
                className={`${styles.teamAvatarDot} ${i === activeIndex ? styles.teamAvatarDotActive : ''}`}
                onClick={() => {
                  // Option to scroll to person? For now just manual
                }}
              >
                <img 
                  src={imgAvatarBorder} 
                  alt="" 
                  className={`${styles.teamAvatarBorderSvg} ${i === activeIndex ? styles.teamAvatarBorderVisible : ''}`} 
                />
                <div className={styles.teamAvatarImgWrapper}>
                  <img src={member.photo} alt={member.name} />
                </div>
              </div>
            ))}
          </div>

          {/* Counter */}
          <span className={styles.teamCounter}>
            {String(activeIndex + 1).padStart(2, '0')}/{String(team.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};
