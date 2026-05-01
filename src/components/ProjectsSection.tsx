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
  const [activeFilter, setActiveFilter] = React.useState('Все');
  const cardRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  // Filter projects based on the screenshot logic
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'Все' || activeFilter === 'Дизайн') return true;
    if (activeFilter === 'Ландшафт') return project.tags.includes('ландшафт');
    if (activeFilter === 'Архитектура') return project.tags.includes('архитектура') || project.id === 'lubitovo';
    if (activeFilter === 'Интерьеры') return project.tags.includes('интерьеры');
    return true;
  });

  // Section observer — for header (title + filter bar) only
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Per-card observer — each card animates when it individually enters the viewport
  // Re-run when activeFilter changes to observe newly rendered cards
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.cardVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    cardRefs.current.forEach(card => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, [activeFilter, filteredProjects]);

  return (
    <div className={styles.projectsHistoryBlock}>
      <RevealSection>
        <section ref={sectionRef} className={`${styles.projectsSection} ${isVisible ? styles.isVisible : ''}`} id="projects">
          <div className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Новые проекты</h2>
            <div className={styles.filterBar}>
              {['Все', 'Дизайн', 'Ландшафт', 'Архитектура', 'Интерьеры'].map(filter => (
                <button 
                  key={filter} 
                  className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                ref={el => { cardRefs.current[index] = el; }}
                to={project.id === 'lubitovo' ? '/lubitovo' : project.id === 'riviera' ? '/riviera' : project.id === 'repino' ? '/repino-park' : project.id === 'razjezdzhaya' ? '/razyezzhaya' : `#${project.id}`}
                className={`${styles.projectCard} ${project.large ? styles.large : ''}`}
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className={styles.projectCardImgWrapper}>
                  <img src={project.image} alt={`Проект ${project.name} — ${project.tags.join(', ')}`} className={styles.projectCardImg} />
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
            {"Мы создаём не\u00A0отдельные элементы, а\u00A0среду, где\u00A0удобно жить, отдыхать и\u00A0проводить время."}
          </p>
        </section>
      </RevealSection>
    </div>
  );
};
