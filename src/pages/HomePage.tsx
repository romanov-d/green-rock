import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import styles from './HomePage.module.css';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';

import { ProjectsSection } from '../components/ProjectsSection';
import { ServicesSection } from '../components/ServicesSection';
import { QuoteSection } from '../components/QuoteSection';
import { FounderSection } from '../components/FounderSection';
import { PrinciplesSection } from '../components/PrinciplesSection';
import { ContactSection } from '../components/ContactSection';
import { DevelopmentSection } from '../components/DevelopmentSection';
import { Footer } from '../components/Footer';
import { TourPopup } from '../components/TourPopup';
import { MobileMenu } from '../components/MobileMenu';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isTourPopupOpen, setIsTourPopupOpen] = React.useState(false);

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el && lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        else if (el) el.scrollIntoView();
      }, 400);
    }
  }, [location.hash, lenis]);

  const toggleMenu = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    if (isMenuOpen || isTourPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen, isTourPopupOpen]);

  return (
    <div className={styles.premiumContainer}>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <TourPopup isOpen={isTourPopupOpen} onClose={() => setIsTourPopupOpen(false)} />
      
      <Hero onTourClick={() => setIsTourPopupOpen(true)}>
        <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      </Hero>

      <ProjectsSection />
      <ServicesSection />
      <QuoteSection />
      <FounderSection />
      <PrinciplesSection />
      <ContactSection />
      <DevelopmentSection />
      <Footer />
    </div>
  );
};
