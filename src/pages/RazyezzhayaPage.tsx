import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RazyezzhayaProstranstvoSection } from '../components/RazyezzhayaProstranstvoSection';
import { RazyezzhayaScenariosSection } from '../components/RazyezzhayaScenariosSection';
import styles from './RazyezzhayaPage.module.css';
import { Header } from '../components/Header/Header';
import { MobileMenu } from '../components/MobileMenu';
import { TourPopup } from '../components/TourPopup';
import { useHeaderPopups } from '../hooks/useHeaderPopups';
import { Helmet } from 'react-helmet-async';
// Assets
import imgRazHero from '../assets/project_raz_hero.webp';
import imgBlock2Bg from '../assets/raz_block2_bg.webp';
import imgBlock2Card1 from '../assets/raz_block2_card1.webp';
import imgBlock2Card2 from '../assets/raz_block2_card2.webp';
import imgBlock2Card3 from '../assets/raz_block2_card3.webp';
import imgBlock3Img from '../assets/raz_block3_img.webp';
import imgBlock4Bg from '../assets/raz_block4_bg.webp';
import imgBlock4LineH from '../assets/raz_block4_line_h.svg';
import imgBlock6Bg from '../assets/raz_block6_bg.webp';
import imgBlock6BgMobile from '../assets/raz_block6_bg_mobile.webp';
import imgBlock8Bg from '../assets/raz_block8_bg.webp';
import imgBlock9Bg from '../assets/raz_block9_bg.webp';
import imgBlock10Bg from '../assets/raz_block10_bg.webp';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';


gsap.registerPlugin(ScrollTrigger);

export const RazyezzhayaPage: React.FC = () => {
  const {
    isMenuOpen,
    isProjectPopupOpen,
    toggleMenu,
    openProjectPopup,
    closeProjectPopup,
  } = useHeaderPopups();
  const block2SectionRef = useRef<HTMLElement>(null);
  const block2CardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      if (!block2SectionRef.current || !block2CardsRef.current) return;

      const cards = block2CardsRef.current;
      const section = block2SectionRef.current;

      gsap.to(cards, {
        x: () => -(cards.scrollWidth - window.innerWidth + 20),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${cards.scrollWidth - window.innerWidth + 20}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      setTimeout(() => ScrollTrigger.refresh(), 500);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className={styles.razPage}>
      <Helmet>
        <title>Разъезжая | Дизайн интерьера капсульного отеля - Грин Рок</title>
        <meta name="description" content="Кейс проектирования компактного отеля в Санкт-Петербурге. Реализовали чёткую логику пространства, интуитивную навигацию и выразительный интерьер с нуля." />
        <meta name="keywords" content="дизайн отеля, Разъезжая, капсульный отель, дизайн интерьера спб, планировка отеля, грин рок" />
        <meta property="og:title" content="Разъезжая | Дизайн интерьера капсульного отеля - Грин Рок" />
        <meta property="og:description" content="Кейс проектирования компактного отеля в Санкт-Петербурге. Реализовали чёткую логику пространства." />
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
        subtitle="Обсудим территорию, задачи и сценарии использования. Определим направление и решения, с которых стоит начать."
        buttonText="Начать проект"
      />

      {/* Block 1: Hero */}
      <section className={styles.heroBlock}>
        <img src={imgRazHero} alt="Интерьер отеля на Разъезжей - дизайн от Грин Рок" className={styles.backgroundImage} />
        <div className={styles.overlay} style={{ background: 'linear-gradient(to bottom, rgba(12, 26, 28, 0.24) 0%, rgba(12, 26, 28, 0.6) 86.7%)' }}></div>

        <div className={styles.glassyNavTags}>
          <div className={styles.tag}>Дизайн</div>
          <div className={styles.tag}>Ландшафт</div>
          <div className={styles.tag}>Архитектура</div>
          <div className={styles.tag}>Интерьеры</div>
        </div>

        <div className={styles.heroCenteredBox}>
          <h1 className={styles.heroTitleCentered}>Разъезжая</h1>
          <p className={styles.heroSubtitleCentered}>
            {"Компактный отель с\u00A0чёткой логикой пространства и\u00A0выразительным интерьером, который запоминается с\u00A0первого взгляда."}
          </p>
        </div>

        <div className={styles.heroFooterInfo}>
          <div className={styles.footerInfoLeft}>
            <p>{"Проект для\u00A0краткосрочного проживания, в\u00A0котором всё\u00A0продумано до\u00A0миллиметра."}</p>
          </div>
          <div className={styles.footerInfoRight}>
            <p>Санкт-Петербург</p>
            <p>Капсульный отель</p>
            <p>Площадь 500 м²</p>
          </div>
        </div>

        <div className={styles.bottomScroll}>
          <span className={styles.scrollText}>Смотреть проект</span>
          <div className={styles.scrollProgress}>
            <div className={styles.scrollProgressFill}></div>
          </div>
        </div>
      </section>

      {/* Block 2: Concept */}
      <section ref={block2SectionRef} className={styles.projectBlock2}>
        <div className={styles.block2Header}>
          <div className={styles.block2Intro}>
            <p className={styles.block2Text}>
              {"На\u00A0старте это было полностью очищенное пространство: без\u00A0перегородок, без\u00A0инженерии, без\u00A0логики."}
            </p>
            <div className={styles.divider}></div>
            <div className={styles.block2Subtitle}>
              <div className={styles.subtitleContent}>
                <p className={styles.subtitleMain}>{"Задача:"}</p>
                <p className={styles.subtitleText}>
                  {"С\u00A0нуля выстроить систему: движение, функции, инженерную логику и\u00A0комфорт в\u00A0ограниченном объёме."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block2Visual}>
          <img src={imgBlock2Bg} alt="Концепция интерьера отеля Разъезжая" className={styles.block2Bg} />

          <div ref={block2CardsRef} className={styles.block2FeatureCards}>
            <div className={styles.featureCard}>
              <div className={styles.cardImgBox}>
                <img src={imgBlock2Card1} alt="Архитектурная структура отеля" />
              </div>
              <div className={styles.cardText}>
                <h3>{"Чёткая структура"}</h3>
                <p>{"Ритм и\u00A0порядок вместо хаоса"}</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardImgBox}>
                <img src={imgBlock2Card2} alt="Компактные решения в интерьере" />
              </div>
              <div className={styles.cardText}>
                <h3>{"Компактность"}</h3>
                <p>{"Каждый элемент работает на\u00A0несколько задач"}</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardImgBox}>
                <img src={imgBlock2Card3} alt="Выразительная архитектура интерьера" />
              </div>
              <div className={styles.cardText}>
                <h3>{"Выразительность через архитектуру"}</h3>
                <p>{"Без\u00A0лишнего декора"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Rhythm */}
      <section className={styles.projectBlock3}>
        <div className={styles.block3Container}>
          <div className={styles.block3HeaderMobile}>
            <h2 className={styles.block3Title}>Ритм. Камерность. Приватность.</h2>
            <div className={styles.textIntro}>
              <p>Когда нет исходной структуры, её нужно задать с нуля.</p>
            </div>
          </div>

          <div className={styles.block3Left}>
            <div className={styles.block3ImageBox}>
              <img src={imgBlock3Img} alt="Ритм и геометрия в коридорах отеля" />
            </div>
          </div>

          <div className={styles.block3Right}>
            <h2 className={styles.block3TitleDesktop}>Ритм. Камерность. Приватность.</h2>

            <div className={styles.block3ContentRow}>
              <div className={styles.verticalLineBox}></div>

              <div className={styles.block3TextContent}>
                <div className={styles.textIntroDesktop}>
                  <p>Когда нет исходной структуры, её нужно задать с нуля.</p>
                </div>

                <div className={styles.textDetails}>
                  <p>— Мы выстраиваем пространство через повторяемость: ритм становится основой навигации и восприятия.</p>
                  <p>— Коридор превращается не просто в проход, а в последовательность зон: с паузами, глубиной и ощущением уединения.</p>
                  <p>— Ниши у окон формируют микро-пространства: места, где можно остановиться, отстраниться, побыть внутри, а не просто пройти мимо.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Navigation */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock4Bg} alt="Графичная навигация на полу отеля" className={styles.fullBgImg} />
        </div>

        <div className={styles.sidePanelDark}>
          <div className={styles.panelInner}>
            <h2 className={styles.panelTitle}>{"Навигация через рисунок"}</h2>

            <div className={styles.panelDividerH}>
              <img src={imgBlock4LineH} alt="Line" />
            </div>

            <div className={styles.panelDescription}>
              <p>{"Когда пространство собрано, ему\u00A0нужно задать направление. Мы\u00A0отказались от\u00A0дополнительных элементов навигации\u00A0— роль проводника берёт на\u00A0себя пол."}</p>
              <p>{"Шахматный рисунок работает как\u00A0графическая система: задаёт ритм движения, усиливает перспективу и\u00A0интуитивно направляет человека в\u00A0пространстве."}</p>
            </div>

            <div className={styles.panelListWrapper}>
              <ul className={styles.panelList}>
                <li>{"— ритм пола поддерживает ритм стен"}</li>
                <li>{"— диагональный рисунок усиливает глубину"}</li>
                <li>{"— единая система вместо набора приёмов"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5: Capsule System (Annotated via Component) */}
      <RazyezzhayaProstranstvoSection />

      {/* Block 6: Secondary Zones */}
      <section className={`${styles.rivieraFullBlock} ${styles.projectBlock6}`}>
        <div className={styles.fullBgContainer}>
          <picture className={styles.fullBgImg}>
              <source srcSet={imgBlock6BgMobile} media="(max-width: 768px)" />
              <img src={imgBlock6Bg} alt="Интерьер санузлов в едином стиле" className={styles.fullBgImgInner} />
            </picture>
          <div className={styles.fullBgOverlay}></div>
        </div>

        <div className={styles.block6Content}>
          <p className={styles.block6Tag}>{"Часть общей архитектуры"}</p>

          <div className={styles.block6MainRow}>
            <h2 className={styles.block6Title}>
              {"В\u00A0проекте нет\u00A0второстепенных зон. Даже\u00A0функциональные пространства продолжают логику интерьера."}
            </h2>

            <div className={styles.block6Details}>
              <h3 className={styles.detailsTitle}>{"Санузлы спроектированы как\u00A0естественное продолжение"}</h3>
              <ul className={styles.detailsList}>
                <li>{"— цельная палитра и\u00A0материалы"}</li>
                <li>{"— графичные акценты в\u00A0отделке"}</li>
                <li>{"— встроенные решения без\u00A0визуального шума"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 7: Scenarios (Animated component) */}
      <RazyezzhayaScenariosSection />

      {/* Block 8: Photo */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock8Bg} alt="Детали отделки и освещения в отеле" className={styles.fullBgImg} />
          <div className={styles.fullBgOverlay} style={{ background: 'rgba(20, 46, 51, 0.2)' }}></div>
        </div>
      </section>

      {/* Block 9: Photo */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock9Bg} alt="Перспектива пространства и ритм материалов" className={styles.fullBgImg} />
          <div className={styles.fullBgOverlay} style={{ background: 'rgba(20, 46, 51, 0.2)' }}></div>
        </div>
      </section>

      {/* Block 10: Summary */}
      <section className={styles.summarySectionRaz}>
        <div className={styles.summaryBgContainer}>
          <img src={imgBlock10Bg} alt="Финальный вид реализованного проекта Разъезжая" className={styles.summaryBgImg} />
          <div className={styles.summaryOverlay} style={{ background: 'rgba(27, 58, 63, 0.1)' }}></div>
        </div>

        <div className={styles.summaryContentContainer}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryCardTitle}>
              {"Из\u00A0пустого пространства мы\u00A0собрали цельную систему проживания, где\u00A0каждый элемент\u00A0— часть общей архитектуры, а\u00A0не\u00A0отдельное решение."}
            </h2>
            <ul className={styles.summaryList}>
              <li>{"— компактные, но\u00A0удобные номера"}</li>
              <li>{"— выразительный и\u00A0узнаваемый интерьер"}</li>
              <li>{"— понятная навигация и\u00A0структура"}</li>
              <li>{"— баланс приватности и\u00A0открытых зон"}</li>
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
};

export default RazyezzhayaPage;
