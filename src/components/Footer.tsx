import React from 'react';
import imgLogo from '../assets/footer_logo.svg';
import imgYoutube from '../assets/youtube_icon.svg';
import imgTelegram from '../assets/telegram_icon.svg';
import imgFooterImage from '../assets/footer_image.webp';
import imgArrow from '../assets/arrow_white_circle.svg';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerV2}>
      <div className={styles.footerV2Bg}>
        <img src={imgFooterImage} alt="" />
      </div>
      <div className={styles.footerV2Container}>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className={styles.footerDesktopInner}>
          {/* Left Column */}
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <img src={imgLogo} alt="Грин Рок" />
            </div>
            <div className={styles.footerDividerH}></div>
            <div className={styles.footerNavSection}>
              <span className={styles.footerLabel}>Навигация</span>
              <div className={styles.footerLinks}>
                <a href="#projects">Проекты</a>
                <a href="#about">О компании</a>
                <a href="#team">Команда</a>
                <a href="#principles">Принципы</a>
                <a href="#videos">Видеообзоры</a>
              </div>
            </div>
            <div className={styles.footerNavSection}>
              <span className={styles.footerLabel}>Услуги</span>
              <div className={styles.footerLinks}>
                <a href="#landscape">Ландшафт</a>
                <a href="#design">Дизайн</a>
                <a href="#architecture">Архитектура</a>
                <a href="#interior">Интерьер</a>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className={styles.footerDividerV}></div>

          {/* Middle Column */}
          <div className={styles.footerMiddle}>
            <div className={styles.footerBrand}>
              <h2 className={styles.footerCompany}>Грин Рок</h2>
              <p className={styles.footerQuote}>
                Каждый проект — это чья-то жизнь. Мы создаём пространства, которые становятся её частью.
              </p>
            </div>
            <div className={styles.footerContactsSection}>
              <span className={styles.footerLabel}>Контакты</span>
              <div className={styles.footerLinks}>
                <p>+7 999 123 45 67</p>
                <p>info@greenrock.ru</p>
                <p>Санкт-Петербург</p>
              </div>
            </div>
            
            <div className={styles.footerSocials}>
              <a href="https://youtube.com" className={styles.footerSocialIcon}>
                <img src={imgYoutube} alt="YouTube" />
              </a>
              <a href="https://t.me" className={styles.footerSocialIcon}>
                <img src={imgTelegram} alt="Telegram" />
              </a>
            </div>
          </div>

          {/* Right Column — Promo Image */}
          <div className={styles.footerRight}>
            <div className={styles.footerPromo}>
              <img src={imgFooterImage} alt="Проект" className={styles.footerPromoImg} />
              <a href="#discuss" className={styles.footerPromoCta}>
                <div className={styles.footerCtaArrow}>
                  <img src={imgArrow} alt="Обсудить" />
                </div>
                <span className={styles.footerCtaText}>Обсудить проект</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLine}></div>
          <div className={styles.footerInfo}>
            <p className={styles.footerCopyright}>© Грин Рок, Санкт-Петербург | 2026. Все права защищены</p>
            <a href="/privacy" className={styles.footerPrivacy}>Политика конфиденциальности</a>
          </div>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        {/* Mobile Header (Hidden on Desktop) */}
        <div className={styles.footerMobileTop}>
          <div className={styles.footerMobileLogo}>
            <img src={imgLogo} alt="Грин Рок" />
          </div>
          <div className={styles.footerMobileBrand}>
            <h2 className={styles.footerMobileCompany}>Грин Рок</h2>
            <p className={styles.footerMobileQuote}>
              Каждый проект — это чья-то жизнь. Мы создаём пространства, которые становятся её частью.
            </p>
          </div>
        </div>

        {/* Discuss Box (Matches Hero Mobile Style) */}
        <div className={styles.footerDiscussBox}>
          <div className={styles.discussBoxGlass}></div>
          <div className={styles.discussContent}>
            <h3 className={styles.discussTitle}>Хотите обсудить ваш проект?</h3>
            <p className={styles.discussSubtitle}>Свяжитесь с нами и мы ответим на любые интересующие вас вопросы</p>
            <div className={styles.discussImageWrap}>
              <img src={imgFooterImage} alt="Discuss" />
            </div>
          </div>
          <a href="#discuss" className={styles.discussArrowBtn}>
            <img src={imgArrow} alt="Discuss" />
          </a>
        </div>

        <div className={styles.footerDividerMobile}></div>

        {/* Links Grid */}
        <div className={styles.footerLinksGrid}>
          <div className={styles.footerNavCol}>
            <h4 className={styles.footerLabel}>Навигация</h4>
            <div className={styles.footerLinkList}>
              <a href="#projects">Проекты</a>
              <a href="#about">О компании</a>
              <a href="#team">Команда</a>
              <a href="#principles">Принципы</a>
              <a href="#videos">Видеообзоры</a>
            </div>
          </div>
          <div className={styles.footerNavCol}>
            <h4 className={styles.footerLabel}>Услуги</h4>
            <div className={styles.footerLinkList}>
              <a href="#landscape">Ландшафт</a>
              <a href="#design">Дизайн</a>
              <a href="#architecture">Архитектура</a>
              <a href="#interior">Интерьер</a>
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className={styles.footerContactsMobile}>
          <h4 className={styles.footerLabel}>Контакты</h4>
          <div className={styles.footerContactList}>
            <p>+7 999 123 45 67</p>
            <p>info@greenrock.ru</p>
            <p>Санкт-Петербург</p>
          </div>
        </div>

        {/* Socials */}
        <div className={styles.footerSocialsMobile}>
          <a href="https://youtube.com" className={styles.socialIcon}>
            <img src={imgYoutube} alt="YouTube" />
          </a>
          <a href="https://t.me" className={styles.socialIcon}>
            <img src={imgTelegram} alt="Telegram" />
          </a>
        </div>

        {/* Legal Info */}
        <div className={styles.footerLegalMobile}>
          <a href="/privacy" className={styles.privacyLink}>Политика конфиденциальности</a>
          <p className={styles.copyright}>© Грин Рок, Санкт-Петербург | 2026. Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};
