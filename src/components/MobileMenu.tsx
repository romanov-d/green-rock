import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import imgYoutube from '../assets/youtube_icon.svg';
import imgTelegram from '../assets/telegram_icon.svg';
import imgPromoImg from '../assets/mobilemenubanner.svg';

import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProjectClick?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onStartProjectClick }) => {
  const handleBannerClick = () => {
    if (onStartProjectClick) {
      onStartProjectClick();
      onClose();
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.mobileMenuOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className={styles.mobileMenuContainer}>
            {/* Spacer to match Header height and prevent jump */}
            <div className={styles.mobileMenuHeader} />
            {/* Navigation & Services Grid */}
            <div className={styles.mobileMenuGrid}>
              <div className={styles.mobileMenuSection}>
                <h4 className={styles.mobileMenuLabel}>Навигация</h4>
                <nav className={styles.mobileMenuLinks}>
                  <Link to="/#projects" onClick={onClose}>Проекты</Link>
                  <Link to="/#about" onClick={onClose}>О компании</Link>
                </nav>
              </div>

              <div className={styles.mobileMenuSection}>
                <h4 className={styles.mobileMenuLabel}>Услуги</h4>
                <nav className={styles.mobileMenuLinks}>
                  <Link to="/services#landscape" onClick={onClose}>Ландшафт</Link>
                  <Link to="/services#design" onClick={onClose}>Дизайн</Link>
                  <Link to="/services#architecture" onClick={onClose}>Архитектура</Link>
                  <Link to="/services" onClick={onClose}>Интерьер</Link>
                </nav>
              </div>
            </div>

            {/* Contacts Section */}
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileMenuContacts}>
                <h4 className={styles.mobileMenuLabel}>Контакты</h4>
                <div className={styles.mobileMenuLinks}>
                  <p>+7 999 123 45 67</p>
                  <p>info@greenrock.ru</p>
                  <p>Санкт-Петербург</p>
                </div>
              </div>

              {/* Socials */}
              <div className={styles.mobileMenuSocials}>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialIcon}>
                  <img src={imgYoutube} alt="YouTube" />
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" className={styles.socialIcon}>
                  <img src={imgTelegram} alt="Telegram" />
                </a>
              </div>

              {/* Promo Card - SVG Banner from Figma */}
              <div className={styles.mobileMenuPromo} onClick={handleBannerClick}>
                <img src={imgPromoImg} alt="Promo" className={styles.promoFullImg} />
              </div>

              {/* Copyright */}
              <p className={styles.mobileMenuCopyright}>
                © Грин Рок, Санкт-Петербург | 2026. Все права защищены
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
