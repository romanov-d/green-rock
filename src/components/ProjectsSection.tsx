import React from 'react';
import { Link } from 'react-router-dom';
import { RevealSection } from './RevealSection';

// Local assets for Block 2
import imgLubitovo from '../assets/project_lubitovo.webp';
import imgRazjezdzhaya from '../assets/project_razjezdzhaya.webp';
import imgRiviera from '../assets/project_riviera.webp';
import imgRepino from '../assets/project_repino.webp';

interface Project {
  id: string;
  name: string;
  meta: string;
  tags: string[];
  image: string;
  large?: boolean;
}

const projects: Project[] = [
  {
    id: 'lubitovo',
    name: 'Любитово',
    meta: '2025 · Новгородская область · 10000 м²',
    tags: ['частный дом', 'ландшафт'],
    image: imgLubitovo,
    large: true
  },
  {
    id: 'riviera',
    name: 'Ривьера',
    meta: '2025 · Ленинградская область · 3600 м²',
    tags: ['частный дом', 'ландшафт', 'архитектура'],
    image: imgRiviera
  },
  {
    id: 'repino',
    name: 'Репино парк',
    meta: '2025 · Ленинградская область · 1000 м²',
    tags: ['частный дом', 'ландшафт', 'архитектура'],
    image: imgRepino
  },
  {
    id: 'razjezdzhaya',
    name: 'Разъезжая',
    meta: '2025 · Санкт-Петербург · 500 м²',
    tags: ['капсульный отель', 'интерьеры', 'общественное пространство'],
    image: imgRazjezdzhaya,
    large: true
  }
];

import imgArrow from '../assets/arrow_diagonal_grey.svg';
import styles from './ProjectsSection.module.css';

export const ProjectsSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.projectsHistoryBlock}>
      <RevealSection>
        <section ref={sectionRef} className={`${styles.projectsSection} ${isVisible ? styles.isVisible : ''}`} id="projects">
          <div className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Новые проекты</h2>
            <div className={styles.filterBar}>
              <button className={`${styles.filterBtn} ${styles.active}`}>Все</button>
              <button className={styles.filterBtn}>Дизайн</button>
              <button className={styles.filterBtn}>Ландшафт</button>
              <button className={styles.filterBtn}>Архитектура</button>
              <button className={styles.filterBtn}>Интерьеры</button>
            </div>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <Link 
                key={project.id} 
                to={project.id === 'lubitovo' ? '/lubitovo' : project.id === 'riviera' ? '/riviera' : project.id === 'repino' ? '/repino-park' : project.id === 'razjezdzhaya' ? '/razyezzhaya' : `#${project.id}`} 
                className={`${styles.projectCard} ${project.large ? styles.large : ''}`}
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className={styles.projectCardImgWrapper}>
                  <img src={project.image} alt={project.name} className={styles.projectCardImg} />
                </div>
                <div className={styles.projectCardOverlay}></div>
                
                <div className={styles.projectCardHeader}>
                  <div className={styles.projectCardHeaderBlur}></div>
                  <div className={styles.projectCardTitleGroup}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <span className={styles.projectMeta}>{project.meta}</span>
                  </div>
                  <div className={styles.projectCardBtn}>
                    <img src={imgArrow} alt="Open" />
                  </div>
                </div>

                <div className={styles.projectTags}>
                  <div className={styles.projectTagsBlur}></div>
                  <div className={styles.projectTagsContent}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section className={styles.historySection}>
          <h2 className={styles.historyTitle}>
            Каждый проект — <br />
            это история
          </h2>
          <p className={styles.historyText}>
            Мы создаём не отдельные элементы, а среду, где удобно жить, отдыхать и проводить время.
          </p>
        </section>
      </RevealSection>
    </div>
  );
};
