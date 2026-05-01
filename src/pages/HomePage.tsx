import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { Helmet } from 'react-helmet-async';
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
import { MobileMenu } from '../components/MobileMenu';
import { TourPopup } from '../components/TourPopup';
import { useHeaderPopups } from '../hooks/useHeaderPopups';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();
  const {
    isMenuOpen,
    isTourPopupOpen,
    isProjectPopupOpen,
    toggleMenu,
    openTourPopup,
    closeTourPopup,
    openProjectPopup,
    closeProjectPopup,
    setIsMenuOpen
  } = useHeaderPopups();

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

  return (
    <div className={styles.premiumContainer}>
      <Helmet>
        <title>Грин Рок | Архитектура, ландшафт и дизайн интерьеров</title>
        <meta name="description" content="Проектируем и реализуем жилые и общественные пространства, в которых архитектура, ландшафт и интерьер связаны единой историей. Авторский надзор и комплексная реализация." />
        <meta name="keywords" content="архитектурное бюро, ландшафтный дизайн, дизайн интерьеров, проектирование домов, благоустройство, грин рок" />
        <meta property="og:title" content="Грин Рок | Архитектура, ландшафт и дизайн интерьеров" />
        <meta property="og:description" content="Проектируем и реализуем жилые и общественные пространства, в которых архитектура, ландшафт и интерьер связаны единой историей." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header 
        onMenuToggle={toggleMenu} 
        isMenuOpen={isMenuOpen} 
        onStartProjectClick={openProjectPopup} 
      />
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onStartProjectClick={openProjectPopup}
      />
      
      {/* Tour Popup for Hero Banner */}
      <TourPopup isOpen={isTourPopupOpen} onClose={closeTourPopup} />
      
      {/* Project Popup for Header Button */}
      <TourPopup 
        isOpen={isProjectPopupOpen}
        formId="project_popup" 
        onClose={closeProjectPopup}
        title={"Начать проект —\nс понимания пространства"}
        subtitle="Обсудим территорию, задачи и сценарии использования. Определим направление и решения, с которых стоит начать."
        buttonText="Начать проект"
      />
      
      <Hero onTourClick={openTourPopup} />

      <ProjectsSection />
      <ServicesSection />
      <QuoteSection />
      <FounderSection />
      <PrinciplesSection />
      <ContactSection />
      <DevelopmentSection />
      <Footer onStartProjectClick={openProjectPopup} />
    </div>
  );
};
