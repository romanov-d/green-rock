import { useState, useEffect } from 'react';

export const useHeaderPopups = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTourPopupOpen, setIsTourPopupOpen] = useState(false);
  const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen || isTourPopupOpen || isProjectPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen, isTourPopupOpen, isProjectPopupOpen]);

  const toggleMenu = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMenuOpen(prev => !prev);
  };

  const openTourPopup = () => setIsTourPopupOpen(true);
  const closeTourPopup = () => setIsTourPopupOpen(false);
  
  const openProjectPopup = () => setIsProjectPopupOpen(true);
  const closeProjectPopup = () => setIsProjectPopupOpen(false);

  return {
    isMenuOpen,
    isTourPopupOpen,
    isProjectPopupOpen,
    toggleMenu,
    openTourPopup,
    closeTourPopup,
    openProjectPopup,
    closeProjectPopup,
    setIsMenuOpen
  };
};
