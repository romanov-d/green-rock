import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Page transition duration (PageTransition.tsx) is 0.6s exit + 0.6s enter.
// With AnimatePresence mode="wait" the new page mounts only AFTER the old page exits.
// We wait 680ms to ensure the new page is in the DOM before scanning elements.
const SCAN_DELAY_MS = 680;

const SKIP_CLASSES = ['title-line', 'animate-subtitle', 'animate-card-text', 'gs-header', 'gs-card', 'gs-text'];

// Covers both homepage heroBlock and project page projectHero sections
const isInHero = (el: Element): boolean =>
  !!el.closest('[class*="heroBlock"], [class*="projectHero"]');

// Skip elements inside the site navigation header
const isInSiteHeader = (el: Element): boolean =>
  !!el.closest('header');

// Skip elements already inside a card (card animation covers them)
const isInCard = (el: Element): boolean =>
  !!el.closest('[class*="Card"]');

const shouldSkip = (el: Element): boolean =>
  SKIP_CLASSES.some(cls => el.classList.contains(cls)) || isInHero(el);

const isInViewport = (el: Element): boolean => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0 && r.left < window.innerWidth && r.right > 0;
};

export const GlobalScrollAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('gs-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    const reveal = (el: Element, cls: string) => {
      if (shouldSkip(el)) return;
      el.classList.add(cls);
      if (isInViewport(el)) {
        el.classList.add('gs-in');
      } else {
        observer.observe(el);
      }
    };

    const applyAnimations = () => {
      // Headers
      document.querySelectorAll('h1, h2, h3').forEach(h => reveal(h, 'gs-header'));

      // Cards — animate ALL [class*="Card"] elements individually
      document.querySelectorAll('[class*="Card"]').forEach(c => reveal(c, 'gs-card'));

      // Text and buttons — skip if inside a card (card covers them) or site header nav
      document.querySelectorAll('p, button').forEach(el => {
        if (isInCard(el) || isInSiteHeader(el)) return;
        reveal(el, 'gs-text');
      });
    };

    const timer = setTimeout(applyAnimations, SCAN_DELAY_MS);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};
