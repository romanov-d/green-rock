import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imgPopupArrow from '../assets/arrow_white_circle.svg';
import imgPopupClose from '../assets/popup_close.svg';
import styles from './TourPopup.module.css';
import { useFormSubmit } from '../hooks/useFormSubmit';

interface TourPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourPopup: React.FC<TourPopupProps> = ({ isOpen, onClose }) => {
  const { phone, status, error, honeypotRef, handlePhoneChange, handleSubmit, reset } = useFormSubmit();

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
              <h2 className={styles.popupTitle}>Увидеть проект вживую — даже на расстоянии</h2>
              <p className={styles.popupSubtitle}>
                Онлайн-тур помогает почувствовать масштаб, атмосферу и уровень реализации ещё до первой встречи.
              </p>
            </div>

            {status === 'success' ? (
              <div className={styles.popupSuccess}>
                <p>Заявка принята! Мы свяжемся с вами в ближайшее время.</p>
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
                  <button type="submit" className={styles.popupSubmitBtn} disabled={status === 'loading'}>
                    <span>{status === 'loading' ? 'Отправляем...' : 'Записаться на онлайн-тур'}</span>
                    <div className={styles.submitIcon}>
                      <img src={imgPopupArrow} alt="Arrow" />
                    </div>
                  </button>
                </div>
                {error && <p className={styles.popupError}>{error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
