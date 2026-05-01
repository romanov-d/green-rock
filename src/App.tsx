import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { LubitovoPage } from './pages/LubitovoPage';
import { RivieraPage } from './pages/RivieraPage';
import { RepinoParkPage } from './pages/RepinoParkPage';
import { RazyezzhayaPage } from './pages/RazyezzhayaPage';
import { ServicesPage } from './pages/ServicesPage';

import { PageTransition } from './components/PageTransition';
import { GlobalScrollAnimation } from './components/GlobalScrollAnimation';

import { ReactLenis, useLenis } from 'lenis/react';

function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!location.hash) {
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenis]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <ReactLenis root>
      <ScrollToTop />
      <GlobalScrollAnimation />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/lubitovo" element={<PageTransition><LubitovoPage /></PageTransition>} />
          <Route path="/riviera" element={<PageTransition><RivieraPage /></PageTransition>} />
          <Route path="/repino-park" element={<PageTransition><RepinoParkPage /></PageTransition>} />
          <Route path="/razyezzhaya" element={<PageTransition><RazyezzhayaPage /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </ReactLenis>
  );
}

export default App;
