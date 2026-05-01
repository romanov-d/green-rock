import React from 'react';
import imgBg from '../assets/block7_bg.webp';
import imgArrow from '../assets/arrow_white_circle.svg';
import imgCheck from '../assets/consent_check.svg';
import styles from './ContactSection.module.css';
import { useFormSubmit } from '../hooks/useFormSubmit';

export const ContactSection: React.FC = () => {
  const { phone, status, error, honeypotRef, handlePhoneChange, handleSubmit } = useFormSubmit();
  const [isAgreed, setIsAgreed] = React.useState(false);

  return (
    <section id="start" className={styles.contactSection}>
      <div className={styles.contactBgContainer}>
        <img loading="lazy" decoding="async" src={imgBg} alt="" className={styles.contactBg} />
        <div className={styles.contactOverlay}></div>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactHeader}>
          <h2 className={styles.contactTitle}>{"Увидеть проект вживую — даже на\u00A0расстоянии"}</h2>
          <p className={styles.contactSubtitle}>
            {"Онлайн-тур помогает почувствовать масштаб, атмосферу и\u00A0уровень реализации ещё до\u00A0первой встречи."}
          </p>
        </div>

        <div className={styles.contactFormContainer}>
          <div className={styles.contactFormLabel}>Записаться на онлайн-тур</div>

          {status === 'success' ? (
            <div className={styles.successMessage}>
              <p>Заявка принята! Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время.</p>
            </div>
          ) : (
            <form className={styles.contactFormGlass} onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from users, bots fill it */}
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
              />
              <div className={styles.contactInputGroup}>
                <span className={styles.contactPrefix}>+7</span>
                <input
                  type="tel"
                  placeholder="(000) 000-00-00"
                  className={styles.contactInput}
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={status === 'loading'}
                  autoComplete="tel"
                  maxLength={15}
                />
              </div>
              {error && <p className={styles.formError}>{error}</p>}
              <button 
                type="submit" 
                className={styles.contactSubmit} 
                disabled={status === 'loading' || !isAgreed}
              >
                <span className={styles.submitText}>
                  {status === 'loading' ? 'Отправляем...' : 'Записаться на онлайн-тур'}
                </span>
                <div className={styles.submitIcon}>
                  <img loading="lazy" decoding="async" src={imgArrow} alt="" />
                </div>
              </button>
            </form>
          )}

          <div className={styles.contactConsent} onClick={() => setIsAgreed(!isAgreed)}>
            <div className={`${styles.consentCheck} ${isAgreed ? styles.consentCheckActive : ''}`}>
              {isAgreed && <img loading="lazy" decoding="async" src={imgCheck} alt="" />}
            </div>
            <p className={styles.consentText}>
              {"Я согласен(на) на\u00A0обработку персональных данных в\u00A0соответствии с\u00A0политикой конфиденциальности"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
