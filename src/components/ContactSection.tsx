import React from 'react';
import imgBg from '../assets/block7_bg.webp';
import imgArrow from '../assets/arrow_white_circle.svg';
import imgCheck from '../assets/consent_check.svg';
import styles from './ContactSection.module.css';
import { useFormSubmit } from '../hooks/useFormSubmit';

export const ContactSection: React.FC = () => {
  const { phone, status, error, honeypotRef, handlePhoneChange, handleSubmit } = useFormSubmit();

  return (
    <section id="start" className={styles.contactSection}>
      <div className={styles.contactBgContainer}>
        <img src={imgBg} alt="" className={styles.contactBg} />
        <div className={styles.contactOverlay}></div>
        <div className={styles.contactPlayBtn}>
          <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.5 16.5L9.25 26.4593L9.25 6.54071L26.5 16.5Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactHeader}>
          <h2 className={styles.contactTitle}>Увидеть проект вживую — даже на&nbsp;расстоянии</h2>
          <p className={styles.contactSubtitle}>
            Онлайн-тур помогает почувствовать масштаб, атмосферу и&nbsp;уровень реализации ещё до&nbsp;первой встречи.
          </p>
        </div>

        <div className={styles.contactFormContainer}>
          <div className={styles.contactFormLabel}>Записаться на онлайн-тур</div>

          {status === 'success' ? (
            <div className={styles.successMessage}>
              <p>Заявка принята! Мы свяжемся с вами в ближайшее время.</p>
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
                  maxLength={14}
                />
              </div>
              {error && <p className={styles.formError}>{error}</p>}
              <button type="submit" className={styles.contactSubmit} disabled={status === 'loading'}>
                <span className={styles.submitText}>
                  {status === 'loading' ? 'Отправляем...' : 'Записаться на онлайн-тур'}
                </span>
                <div className={styles.submitIcon}>
                  <img src={imgArrow} alt="" />
                </div>
              </button>
            </form>
          )}

          <div className={styles.contactConsent}>
            <div className={styles.consentCheck}>
              <img src={imgCheck} alt="" />
            </div>
            <p className={styles.consentText}>
              Я согласен(на) на&nbsp;обработку персональных данных в&nbsp;соответствии с&nbsp;политикой конфиденциальности
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
