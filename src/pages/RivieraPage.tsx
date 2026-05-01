import React from 'react';
import styles from './RivieraPage.module.css';

// Assets
import imgRivieraBg from '../assets/project_riviera_hero.webp';
import imgBlock2Main from '../assets/riviera_block2_main.webp';
import imgBlock2MainMobile from '../assets/riviera_block2_main_mobile.webp';
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
import { TourPopup } from '../components/TourPopup';
import { useHeaderPopups } from '../hooks/useHeaderPopups';
import { Helmet } from 'react-helmet-async';

export const RivieraPage: React.FC = () => {
  const {
    isMenuOpen,
    isProjectPopupOpen,
    toggleMenu,
    openProjectPopup,
    closeProjectPopup,
  } = useHeaderPopups();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.projectPage}>
      <Helmet>
        <title>Ривьера | Ландшафтный дизайн на сложном рельефе - Грин Рок</title>
        <meta name="description" content="Проект ландшафтной архитектуры частного сада со сложным рельефом и природным ручьем. Ленинградская область. Укрепление берегов, каскадные террасы и био-свейл." />
        <meta name="keywords" content="ландшафтный дизайн, Ривьера, сложный рельеф, биосвейл, каскадный сад, благоустройство спб, грин рок" />
        <meta property="og:title" content="Ривьера | Ландшафтный дизайн на сложном рельефе - Грин Рок" />
        <meta property="og:description" content="Проект ландшафтной архитектуры частного сада со сложным рельефом и природным ручьем." />
        <meta property="og:type" content="article" />
      </Helmet>
      <Header 
        onMenuToggle={toggleMenu} 
        isMenuOpen={isMenuOpen} 
        onStartProjectClick={openProjectPopup}
      />
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => toggleMenu()} 
        onStartProjectClick={openProjectPopup}
      />
      
      <TourPopup 
        isOpen={isProjectPopupOpen}
        formId="project_popup" 
        onClose={closeProjectPopup}
        title={"Начать проект —\nс понимания пространства"}
        subtitle={"Обсудим территорию, задачи и\u00A0сценарии использования. Определим направление и\u00A0решения, с\u00A0которых стоит начать."}
        buttonText="Начать проект"
      />

      <section className={styles.projectHero}>
        <img fetchPriority="high" decoding="async" src={imgRivieraBg} alt="Панорамный вид проекта Ривьера - ландшафт на сложном рельефе" className={styles.projectHeroBg} />
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
              {"Частный сад на\u00A0сложном рельефе, где\u00A0природный ручей стал центром всей\u00A0ландшафтной архитектуры."}
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
              <p>{"Проектирование и\u00A0реализация участка"}<br />{"со\u00A0сложным рельефом и\u00A0существующим ручьём"}</p>
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
              {"Исходные условия на\u00A0участке были непростые. Уклон до\u00A020%, значительные перепады высот, существующий ручей и\u00A0необходимость сохранить часть взрослых деревьев."}
            </p>
            <div className={styles.block2Subtitle}>
              <div className={styles.subtitleDivider}></div>
              <div className={styles.subtitleContent}>
                <p>{"Главной задачей стало не\u00A0выравнивать рельеф,"}</p>
                <p>{"а\u00A0сделать его основой композиции будущего сада."}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block2Visual}>
          <picture className={styles.block2Bg}>
              <source srcSet={imgBlock2MainMobile} media="(max-width: 768px)" />
              <img loading="lazy" decoding="async" src={imgBlock2Main} alt="Террасирование и укрепление склона на участке Ривьера" className={styles.block2BgImg} />
            </picture>

          <div className={styles.block2FloatingCard}>
            <div className={styles.cardPlan}>
              <img loading="lazy" decoding="async" src={imgBlock2Plan} alt="План благоустройства участка Ривьера" />
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.cardColumn}>
                <p>{"Спортивная площадка"}</p>
                <p>{"Изгородь из\u00A0композиций"}</p>
                <p>{"Островки с\u00A0горной сосной"}</p>
                <p>{"Забор"}</p>
              </div>
              <div className={styles.cardDivider}></div>
              <div className={styles.cardColumn}>
                <p>{"Ручей"}</p>
                <p>{"Газон с\u00A0перепадами"}</p>
                <p>{"Каскадные ступени"}</p>
                <p>{"Существующие деревья"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Architecture of Relief */}
      <section className={styles.projectBlock3Riviera}>
        <div className={styles.block3Container}>
          <div className={styles.block3Visual}>
            <img loading="lazy" decoding="async" src={imgBlock3Img} alt="Архитектура рельефа и лестницы в саду Ривьера" />
          </div>
          <div className={styles.block3Content}>
            <h2 className={styles.block3Title}>Архитектура рельефа</h2>
            <div className={styles.block3DescWrapper}>
              <div className={styles.descDivider}>
                <img loading="lazy" decoding="async" src={imgLineV} alt="Line" />
              </div>
              <div className={styles.descText}>
                <p>{"Вместо выравнивания участка мы использовали естественный рельеф как\u00A0основу структуры сада."}</p>
                <p>{"Перепады высот сформировали террасы, маршруты и\u00A0видовые точки, а\u00A0существующий ручей стал центральным элементом композиции."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Water Element */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img loading="lazy" decoding="async" src={imgBlock4Bg} alt="Природный ручей интегрированный в ландшафт" className={styles.fullBgImg} />
        </div>

        <div className={styles.sidePanelDark}>
          <div className={styles.panelInner}>
            <h2 className={styles.panelTitle}>Вода как элемент ландшафтной архитектуры</h2>

            <div className={styles.panelDividerH}>
              <img loading="lazy" decoding="async" src={imgLineH} alt="Line" />
            </div>

            <div className={styles.panelDescription}>
              <p>Существующий ручей стал центральным элементом композиции сада.</p>
              <p>{"Мы не\u00A0только сохранили его, но\u00A0и\u00A0интегрировали в\u00A0проект, создав био-свейл для\u00A0естесственной очистки воды и\u00A0устойчивой экосистемы участка."}</p>
            </div>

            <div>
              <h3 className={styles.listTitle}>В рамках проекта:</h3>
              <ul className={styles.panelList}>
                <li>{"— сформировано новое русло ручья с\u00A0естественной геометрией"}</li>
                <li>{"— укреплены берега природным камнем и\u00A0гравийными фракциями"}</li>
                <li>{"— высажены растения для\u00A0естественной фильтрации воды"}</li>
                <li>{"— ручей интегрирован в\u00A0систему дренажа и\u00A0рельефа участка"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5: Implementation (Scrolling) */}
      <RivieraImplementationSection />

      {/* Block 6: Full Width Image */}
      <section className={styles.projectImageFull}>
        <img loading="lazy" decoding="async" src={imgBlock6Full} alt="Детали мощения и озеленения в проекте Ривьера" className={styles.fullBgImage} />
      </section>

      {/* Block 7: Zones with Scroll */}
      <RivieraZonesSection />

      {/* Block 8: Summary Card */}
      <section className={styles.rivieraSummarySection}>
        <div className={styles.summaryBgContainer}>
          <img loading="lazy" decoding="async" src={imgBlock8Summary} alt="Завершенный ландшафтный проект Ривьера" className={styles.summaryBgImg} />
          <div className={styles.summaryBgOverlay}></div>
        </div>

        <div className={styles.summaryCard}>
          <h2 className={styles.summaryCardTitle}>Ривьера — это</h2>
          <div className={styles.summaryCardList}>
            <p>— архитектурно выстроенный рельеф</p>
            <p>{"— безопасный заезд с\u00A0уклоном 20%"}</p>
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
