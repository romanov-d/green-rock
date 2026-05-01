import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imgPopupArrow from '../assets/arrow_white_circle.svg';
import imgPopupClose from '../assets/popup_close.svg';
import imgCheck from '../assets/consent_check.svg';
import styles from './TourPopup.module.css';
import { useFormSubmit } from '../hooks/useFormSubmit';

interface TourPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  formId?: string;
}

export const TourPopup: React.FC<TourPopupProps> = ({
  isOpen,
  onClose,
  title = "Увидеть проект вживую — даже на расстоянии",
  subtitle = "Онлайн-тур помогает почувствовать масштаб, атмосферу и уровень реализации ещё до первой встречи.",
  buttonText = "Записаться на онлайн-тур",
  formId = 'tour_popup'
}) => {
  const { phone, status, error, honeypotRef, handlePhoneChange, handleSubmit, reset } = useFormSubmit(formId);
  const [isAgreed, setIsAgreed] = React.useState(false);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.popupOverlay}>
          <motion.div
            className={styles.popupBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className={styles.tourPopupContainer}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className={styles.popupCloseBtn} onClick={handleClose}>
              <img src={imgPopupClose} alt="Close" />
            </button>

            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>{title}</h2>
              <p className={styles.popupSubtitle}>
                {subtitle}
              </p>
            </div>

            {status === 'success' ? (
              <div className={styles.popupSuccess}>
                <p>Заявка принята! Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                />
                <div className={styles.popupFormPill}>
                  <div className={styles.formInputWrapper}>
                    <span className={styles.inputPrefix}>+7</span>
                    <input
                      type="tel"
                      placeholder="(000) 000-00-00"
                      className={styles.popupInput}
                      value={phone}
                      onChange={handlePhoneChange}
                      disabled={status === 'loading'}
                      autoComplete="tel"
                      maxLength={14}
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.popupSubmitBtn}
                    disabled={status === 'loading' || !isAgreed}
                  >
                    <span>{status === 'loading' ? 'Отправляем...' : buttonText}</span>
                    <div className={styles.submitIcon}>
                      <img src={imgPopupArrow} alt="Arrow" />
                    </div>
                  </button>
                </div>
                {error && <p className={styles.popupError}>{error}</p>}

                <div className={styles.popupConsent} onClick={() => setIsAgreed(!isAgreed)}>
                  <div className={`${styles.consentCheck} ${isAgreed ? styles.consentCheckActive : ''}`}>
                    {isAgreed && <img src={imgCheck} alt="" />}
                  </div>
                  <p className={styles.consentText}>
                    {"Я согласен(на) на обработку персональных данных в соответствии с политикой конфиденциальности"}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
