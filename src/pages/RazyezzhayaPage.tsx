import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RazyezzhayaProstranstvoSection } from '../components/RazyezzhayaProstranstvoSection';
import { RazyezzhayaScenariosSection } from '../components/RazyezzhayaScenariosSection';
import styles from './RazyezzhayaPage.module.css';
import { Header } from '../components/Header/Header';
import { MobileMenu } from '../components/MobileMenu';
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
import imgBlock8Bg from '../assets/raz_block8_bg.webp';
import imgBlock9Bg from '../assets/raz_block9_bg.webp';
import imgBlock10Bg from '../assets/raz_block10_bg.webp';
import imgBlock11Bg from '../assets/raz_block11_bg.webp';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';


gsap.registerPlugin(ScrollTrigger);

export const RazyezzhayaPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const block2SectionRef = useRef<HTMLElement>(null);
  const block2CardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

      setTimeout(() => ScrollTrigger.refresh(), 300);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className={styles.razPage}>
      <Header onMenuToggle={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Block 1: Hero */}
      <section className={styles.heroBlock}>
        <img src={imgRazHero} alt="Razyezzhaya Hero" className={styles.backgroundImage} />
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
            Компактный отель с чёткой логикой пространства и выразительным интерьером, который запоминается с первого взгляда.
          </p>
        </div>

        <div className={styles.heroFooterInfo}>
          <div className={styles.footerInfoLeft}>
            <p>Проект для краткосрочного проживания, в котором всё продумано до миллиметра.</p>
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
              На старте это было полностью очищенное пространство: без перегородок, без инженерии, без логики.
            </p>
            <div className={styles.divider}></div>
            <div className={styles.block2Subtitle}>
              <div className={styles.subtitleContent}>
                <p className={styles.subtitleMain}>Задача:</p>
                <p className={styles.subtitleText}>
                  С нуля выстроить систему: движение, функции, инженерную логику и комфорт в ограниченном объёме.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block2Visual}>
          <img src={imgBlock2Bg} alt="Razyezzhaya Interior" className={styles.block2Bg} />

          <div ref={block2CardsRef} className={styles.block2FeatureCards}>
            <div className={styles.featureCard}>
              <div className={styles.cardImgBox}>
                <img src={imgBlock2Card1} alt="Structure" />
              </div>
              <div className={styles.cardText}>
                <h3>Чёткая структура</h3>
                <p>Ритм и порядок вместо хаоса</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardImgBox}>
                <img src={imgBlock2Card2} alt="Compact" />
              </div>
              <div className={styles.cardText}>
                <h3>Компактность</h3>
                <p>Каждый элемент работает на несколько задач</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardImgBox}>
                <img src={imgBlock2Card3} alt="Expression" />
              </div>
              <div className={styles.cardText}>
                <h3>Выразительность</h3>
                <p>Без лишнего декора</p>
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
              <img src={imgBlock3Img} alt="Rhythm" />
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
          <img src={imgBlock4Bg} alt="Navigation" className={styles.fullBgImg} />
        </div>

        <div className={styles.sidePanelDark}>
          <div className={styles.panelInner}>
            <h2 className={styles.panelTitle}>Навигация через рисунок</h2>

            <div className={styles.panelDividerH}>
              <img src={imgBlock4LineH} alt="Line" />
            </div>

            <div className={styles.panelDescription}>
              <p>Шахматный рисунок работает как графическая система: задаёт ритм движения, усиливает перспективу и интуитивно направляет человека в пространстве.</p>
            </div>

            <div className={styles.panelListWrapper}>
              <ul className={styles.panelList}>
                <li>— ритм пола поддерживает ритм стен</li>
                <li>— диагональный рисунок усиливает глубину</li>
                <li>— единая система вместо набора приёмов</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5: Capsule System (Annotated via Component) */}
      <RazyezzhayaProstranstvoSection />

      {/* Block 6: Secondary Zones */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock6Bg} alt="Secondary Zones" className={styles.fullBgImg} />
          <div className={styles.fullBgOverlay} style={{ background: 'rgba(27, 58, 63, 0.2)' }}></div>
        </div>

        <div className={styles.block6Content}>
          <p className={styles.block6Tag}>Часть общей архитектуры</p>

          <div className={styles.block6MainRow}>
            <h2 className={styles.block6Title}>В проекте нет второстепенных зон. Даже функциональные пространства продолжают логику интерьера.</h2>

            <div className={styles.block6Details}>
              <h3 className={styles.detailsTitle}>Санузлы спроектированы как естественное продолжение</h3>
              <ul className={styles.detailsList}>
                <li>— цельная палитра и материалы</li>
                <li>— графичные акценты в отделке</li>
                <li>— встроенные решения без визуального шума</li>
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
          <img src={imgBlock8Bg} alt="Interior view" className={styles.fullBgImg} />
          <div className={styles.fullBgOverlay} style={{ background: 'rgba(20, 46, 51, 0.2)' }}></div>
        </div>
      </section>

      {/* Block 9: Photo */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock9Bg} alt="Interior view" className={styles.fullBgImg} />
          <div className={styles.fullBgOverlay} style={{ background: 'rgba(20, 46, 51, 0.2)' }}></div>
        </div>
      </section>

      {/* Block 10: Summary */}
      <section className={styles.summarySectionRaz}>
        <div className={styles.summaryBgContainer}>
          <img src={imgBlock11Bg} alt="Summary background" className={styles.summaryBgImg} />
          <div className={styles.summaryOverlay} style={{ background: 'rgba(27, 58, 63, 0.1)' }}></div>
        </div>

        <div className={styles.summaryContentContainer}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryCardTitle}>
              Из пустого пространства<br />
              мы собрали цельную<br />
              систему проживания
            </h2>
            <ul className={styles.summaryList}>
              <li>— компактные, но удобные номера</li>
              <li>— выразительный и узнаваемый интерьер</li>
              <li>— понятная навигация и структура</li>
              <li>— баланс приватности и открытых зон</li>
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
