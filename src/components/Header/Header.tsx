import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import imgLogo from '../../assets/logo.svg';
import imgArrowIcon from '../../assets/arrow_icon.svg';

interface HeaderProps {
  onMenuToggle: (e?: React.MouseEvent) => void;
  onStartProjectClick?: (e?: React.MouseEvent) => void;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onStartProjectClick, isMenuOpen }) => {
  const handleStartProject = (e: React.MouseEvent) => {
    if (onStartProjectClick) {
      e.preventDefault();
      onStartProjectClick(e);
    }
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <Link to="/" className={styles.logo}>
        <img src={imgLogo} alt="ГРИН РОК" />
      </Link>

      <nav className={styles.navMenu}>
        <Link to="/services#design" className={styles.navItem}>Дизайн</Link>
        <Link to="/services#landscape" className={styles.navItem}>Ландшафт</Link>
        <Link to="/services#architecture" className={styles.navItem}>Архитектура</Link>
        <Link to="/#projects" className={styles.navItem}>Проекты</Link>
        <Link to="/#about" className={styles.navItem}>О нас</Link>
      </nav>

      <div className={styles.headerActions}>
        <a 
          href="#start" 
          className={`${styles.ctaButton} header-cta-no-circle`}
          onClick={handleStartProject}
        >
          <div className={styles.ctaIcon}>
            <img src={imgArrowIcon} alt="Arrow" />
          </div>
          <span className={styles.ctaText}>Начать проект</span>
        </a>

        <button 
          className={`${styles.burgerTrigger} ${isMenuOpen ? styles.burgerActive : ''}`} 
          onClick={onMenuToggle}
          aria-label="Toggle Menu"
        >
          <div className={`${styles.burgerIcon} ${isMenuOpen ? styles.burgerOpen : ''}`}>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};
