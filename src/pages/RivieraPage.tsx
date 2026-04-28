import React from 'react';
import styles from './RivieraPage.module.css';

// Assets
import imgRivieraBg from '../assets/project_riviera_hero.webp';
import imgBlock2Main from '../assets/riviera_block2_main.webp';
import imgBlock2Plan from '../assets/riviera_block2_plan.webp';
import imgBlock3Img from '../assets/riviera_block3_img.webp';
import imgBlock4Bg from '../assets/riviera_block4_bg.webp';
import imgBlock6Full from '../assets/riviera_block6_full.webp';
import imgBlock8Summary from '../assets/riviera_block8_summary.webp';
import { RivieraZonesSection } from '../components/RivieraZonesSection';
import { ContactSection } from '../components/ContactSection';
import { RivieraImplementationSection } from '../components/RivieraImplementationSection';
import imgLineV from '../assets/riviera_line_v.svg';
import imgLineH from '../assets/riviera_line_h.svg';
import { Footer } from '../components/Footer';

import { Header } from '../components/Header/Header';
import { MobileMenu } from '../components/MobileMenu';

export const RivieraPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.projectPage}>
      <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <section className={styles.projectHero}>
        <img src={imgRivieraBg} alt="Ривьера" className={styles.projectHeroBg} />
        <div className={styles.projectHeroOverlay}></div>

        {/* Hero Content */}
        <div className={styles.projectHeroContent}>
          {/* Glassy Nav Tags - Mobile Only */}
          <div className={styles.glassyNavTags}>
            <div className={styles.glassyTag}>Дизайн</div>
            <div className={styles.glassyTag}>Ландшафт</div>
            <div className={styles.glassyTag}>Архитектура</div>
            <div className={styles.glassyTag}>Интерьеры</div>
          </div>

          <div className={styles.projectHeroMain}>
            <h1 className={`${styles.projectTitle} ${styles.animateTitleV2}`}>Ривьера</h1>
            <p className={`${styles.projectSubtitle} ${styles.animateSubtitleV2}`}>
              Частный сад на сложном рельефе, где природный ручей стал центром всей ландшафтной архитектуры.
            </p>

            {/* Mobile Specs */}
            <div className={`${styles.projectSpecs} ${styles.mobileOnly}`}>
              <p>3600 м²</p>
              <p>Ленинградская область</p>
              <p>Частная резиденция</p>
            </div>
          </div>

          <div className={styles.projectHeroBottom}>
            <div className={`${styles.projectServices} ${styles.desktopOnly}`}>
              <p>Проектирование и реализация участка<br />со сложным рельефом и существующим ручьём</p>
            </div>

            <div className={styles.projectScroll}>
              <span className={styles.scrollHint}>Смотреть проект</span>
              <div className={styles.scrollIndicator}>
                <div className={styles.scrollIndicatorFill}></div>
              </div>
            </div>

            {/* Desktop Specs */}
            <div className={`${styles.projectSpecs} ${styles.desktopOnly}`}>
              <p>3600 м²</p>
              <p>Ленинградская область</p>
              <p>Частная резиденция</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Logic and Routes */}
      <section className={styles.projectBlock2}>
        <div className={styles.block2Header}>
          <div className={styles.block2Intro}>
            <p className={styles.block2Text}>
              Исходные условия на участке были непростые. Уклон до 20%, значительные перепады высот, существующий ручей и необходимость сохранить часть взрослых деревьев.
            </p>
            <div className={styles.block2Subtitle}>
              <div className={styles.subtitleDivider}></div>
              <div className={styles.subtitleContent}>
                <p>Главной задачей стало не выравнивать рельеф,</p>
                <p>а сделать его основой композиции будущего сада.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block2Visual}>
          <img src={imgBlock2Main} alt="Riviera Terrain" className={styles.block2Bg} />

          <div className={styles.block2FloatingCard}>
            <div className={styles.cardPlan}>
              <img src={imgBlock2Plan} alt="Riviera Plan" />
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.cardColumn}>
                <p>Спортивная площадка</p>
                <p>Изгородь из композиций</p>
                <p>Островки с горной сосной</p>
                <p>Забор</p>
              </div>
              <div className={styles.cardDivider}></div>
              <div className={styles.cardColumn}>
                <p>Ручей</p>
                <p>Газон с перепадами</p>
                <p>Каскадные ступени</p>
                <p>Существующие деревья</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Architecture of Relief */}
      <section className={styles.projectBlock3Riviera}>
        <div className={styles.block3Container}>
          <div className={styles.block3Visual}>
            <img src={imgBlock3Img} alt="Relief Architecture" />
          </div>
          <div className={styles.block3Content}>
            <h2 className={styles.block3Title}>Архитектура рельефа</h2>
            <div className={styles.block3DescWrapper}>
              <div className={styles.descDivider}>
                <img src={imgLineV} alt="Line" />
              </div>
              <div className={styles.descText}>
                <p>Вместо выравнивания участка мы использовали естественный рельеф как основу структуры сада.</p>
                <p>Перепады высот сформировали террасы, маршруты и видовые точки, а существующий ручей стал центральным элементом композиции.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Water Element */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock4Bg} alt="Water Element" className={styles.fullBgImg} />
        </div>

        <div className={styles.sidePanelDark}>
          <div className={styles.panelInner}>
            <h2 className={styles.panelTitle}>Вода как элемент ландшафтной архитектуры</h2>

            <div className={styles.panelDividerH}>
              <img src={imgLineH} alt="Line" />
            </div>

            <div className={styles.panelDescription}>
              <p>Существующий ручей стал центральным элементом композиции сада.</p>
              <p>Мы не только сохранили его, но и интегрировали в проект, создав био-свейл для естесственной очистки воды и устойчивой экосистемы участка.</p>
            </div>

            <div>
              <h3 className={styles.listTitle}>В рамках проекта:</h3>
              <ul className={styles.panelList}>
                <li>— сформировано новое русло ручья с естественной геометрией</li>
                <li>— укреплены берега природным камнем и гравийными фракциями</li>
                <li>— высажены растения для естественной фильтрации воды</li>
                <li>— ручей интегрирован в систему дренажа и рельефа участка</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5: Implementation (Scrolling) */}
      <RivieraImplementationSection />

      {/* Block 6: Full Width Image */}
      <section className={styles.projectImageFull}>
        <img src={imgBlock6Full} alt="Riviera Detail" className={styles.fullBgImage} />
      </section>

      {/* Block 7: Zones with Scroll */}
      <RivieraZonesSection />

      {/* Block 8: Summary Card */}
      <section className={styles.rivieraSummarySection}>
        <div className={styles.summaryBgContainer}>
          <img src={imgBlock8Summary} alt="Riviera Summary" className={styles.summaryBgImg} />
          <div className={styles.summaryBgOverlay}></div>
        </div>

        <div className={styles.summaryCard}>
          <h2 className={styles.summaryCardTitle}>Ривьера — это</h2>
          <div className={styles.summaryCardList}>
            <p>— архитектурно выстроенный рельеф</p>
            <p>— безопасный заезд с уклоном 20%</p>
            <p>— работающий биосвейл</p>
            <p>— каскадная система движения</p>
            <p>— скрытые подпорные конструкции</p>
            <p>— устойчивые посадки</p>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
};
