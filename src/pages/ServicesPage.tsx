import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import styles from './ServicesPage.module.css';

// Assets
import imgHeroBg from '../assets/services_hero_bg.webp';
import imgBlock3Card1 from '../assets/services_block3_card1.webp';
import imgBlock3Card2 from '../assets/services_block3_card2.webp';
import imgBlock3Card3 from '../assets/services_block3_card3.webp';
import imgBlock3Card4 from '../assets/services_block3_card4.webp';
import imgBlock3Card1Mobile from '../assets/services_block3_card1_mobile.webp';
import imgBlock3Card2Mobile from '../assets/services_block3_card2_mobile.webp';
import imgBlock3Card3Mobile from '../assets/services_block3_card3_mobile.webp';
import imgBlock3Card4Mobile from '../assets/services_block3_card4_mobile.webp';
import imgBlock5Top from '../assets/services_block5_top.webp';
import imgBlock5Left from '../assets/services_block5_left.webp';
import imgBlock5Right from '../assets/services_block5_right.webp';
import imgBlock6Bg from '../assets/services_block6_bg.webp';
import imgBlock6BgMobile from '../assets/services_block6_bg_mobile.webp';
import imgBlock6Card1 from '../assets/services_block6_card1.webp';
import imgBlock6Card2 from '../assets/services_block6_card2.webp';
import imgBlock6Card3 from '../assets/services_block6_card3.webp';
import imgProcess01 from '../assets/services_process_01.webp';
import imgProcess02 from '../assets/services_process_02.webp';
import imgProcess03 from '../assets/services_process_03.webp';
import imgProcess04 from '../assets/services_process_04.webp';
import imgProcess05 from '../assets/services_process_05.webp';
import imgProcess06 from '../assets/services_process_06.webp';
import imgBlock8Bg from '../assets/services_block8_bg.webp';
import imgShape411 from '../assets/services_block8_shape_411.svg';
import imgShape302 from '../assets/services_block8_shape_302.svg';
import imgArrowDiagonal from '../assets/arrow_diagonal_white_small.svg';
import arrowLeftCircle from '../assets/arrow_left_circle.svg';
import arrowRightCircle from '../assets/arrow_right_circle.svg';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ArchitectureSection } from '../components/ArchitectureSection';
import { ServicesDesignScroller } from '../components/ServicesDesignScroller';
import { Header } from '../components/Header/Header';
import { MobileMenu } from '../components/MobileMenu';
import { TourPopup } from '../components/TourPopup';
import { ManagementSection } from '../components/ManagementSection';
import { RevealSection } from '../components/RevealSection';
import { useHeaderPopups } from '../hooks/useHeaderPopups';
import { Helmet } from 'react-helmet-async';

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();
  const {
    isMenuOpen,
    isProjectPopupOpen,
    toggleMenu,
    openProjectPopup,
    closeProjectPopup,
  } = useHeaderPopups();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el && lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        else if (el) el.scrollIntoView();
      }, 400);
    }
  }, [location.hash, lenis]);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const processRef = React.useRef<HTMLDivElement>(null);
  const [processProgress, setProcessProgress] = React.useState(0);
  const [benefitsProgress, setBenefitsProgress] = React.useState(0);

  const handleSliderScroll = React.useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setBenefitsProgress(scrollLeft / maxScroll);
      }
    }
  }, []);

  const handleScroll = React.useCallback(() => {
    if (!processRef.current) return;
    const rect = processRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = processRef.current.offsetHeight;

    if (rect.top <= 0 && rect.bottom >= windowHeight) {
      const scrolled = -rect.top;
      const scrollable = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      setProcessProgress(progress);
    } else if (rect.top > 0) {
      setProcessProgress(0);
    } else if (rect.bottom < windowHeight) {
      setProcessProgress(1);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleSliderScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (slider) {
        slider.removeEventListener('scroll', handleSliderScroll);
      }
    };
  }, [handleScroll, handleSliderScroll]);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 435;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.servicesPage}>
      <Helmet>
        <title>Услуги | Грин Рок: Архитектура, ландшафт и интерьеры</title>
        <meta name="description" content="Комплексные услуги по проектированию и реализации жилых пространств. Создаем целостную среду: от идеи и концепции до авторского сопровождения и реализации." />
        <meta name="keywords" content="услуги ландшафтного дизайна, проектирование интерьеров, авторский надзор, архитектурное проектирование, ландшафтные работы спб" />
        <meta property="og:title" content="Услуги | Грин Рок: Архитектура, ландшафт и интерьеры" />
        <meta property="og:description" content="Комплексные услуги по проектированию и реализации жилых пространств. Создаем целостную среду." />
        <meta property="og:type" content="website" />
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
      <RevealSection>
        <section className={styles.servicesHero}>
          <div className={styles.heroBgContainer}>
            <img src={imgHeroBg} alt="Environment" className={styles.heroBgImg} />
            <div className={styles.heroOverlay}></div>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>{"Мы создаём среду,"}</span>
              <span className={styles.titleLine}>{"в\u00A0которой хочется жить"}</span>
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.animateSubtitle}`}>
              {"Работаем с\u00A0проектом как\u00A0с\u00A0цельной историей\u00A0— где\u00A0архитектура, ландшафт и\u00A0внутреннее пространство связаны между собой и\u00A0подчинены одной логике."}
            </p>
          </div>
        </section>
      </RevealSection>

      {/* Block 2: Design Approach (Animated Scroller) */}
      <ServicesDesignScroller />

      {/* Block 3: Landscape Grid */}
      <RevealSection>
        <section id="landscape" className={styles.landscapeSection}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>{"Ландшафт"}</h2>
            <p className={styles.sectionDesc}>
              <span className={styles.opacityMuted}>{"Берём на\u00A0себя всё, что\u00A0связано с\u00A0участком. Это\u00A0не\u00A0про «сделать красиво»."}</span>
              <span>{" Это\u00A0создать место, куда\u00A0хочется возвращаться."}</span>
            </p>
          </div>

          <div className={styles.landscapeGrid}>
            <div className={styles.landscapeCard}>
              <picture className={styles.cardBgAbs}>
                <source srcSet={imgBlock3Card1Mobile} media="(max-width: 768px)" />
                <img src={imgBlock3Card1} alt="" className={styles.cardBgAbsImg} />
              </picture>
              <div className={styles.cardOverlayAbs} style={{ background: 'rgba(14, 44, 43, 0.25)' }}></div>
              <div className={styles.cardTopContent}>
                <h3 className={styles.landscapeCardTitle}>{"Сценарии и\u00A0логика пространства"}</h3>
              </div>
              <div className={styles.cardBottomContent}>
                <p className={styles.cardText}>{"Зона отдыха, движения, уединения. Как\u00A0вы\u00A0перемещаетесь по\u00A0пространству и\u00A0как\u00A0оно ощущается в\u00A0разное время."}</p>
              </div>
            </div>

            <div className={styles.landscapeCard}>
              <picture className={styles.cardBgAbs}>
                <source srcSet={imgBlock3Card2Mobile} media="(max-width: 768px)" />
                <img src={imgBlock3Card2} alt="" className={styles.cardBgAbsImg} />
              </picture>
              <div className={styles.cardOverlayAbs} style={{ background: 'rgba(14, 44, 43, 0.25)' }}></div>
              <div className={styles.cardTopContent}>
                <h3 className={styles.landscapeCardTitle}>{"Озеленение и\u00A0работа с\u00A0природой"}</h3>
              </div>
              <div className={styles.cardBottomContent}>
                <p className={styles.cardText}>{"С\u00A0учётом климата, участка и\u00A0того, как\u00A0пространство будет выглядеть и\u00A0развиваться со\u00A0временем."}</p>
              </div>
            </div>

            <div className={styles.landscapeCard}>
              <picture className={styles.cardBgAbs}>
                <source srcSet={imgBlock3Card4Mobile} media="(max-width: 768px)" />
                <img src={imgBlock3Card4} alt="" className={styles.cardBgAbsImg} />
              </picture>
              <div className={styles.cardOverlayAbs} style={{ background: 'rgba(14, 44, 43, 0.25)' }}></div>
              <div className={styles.cardTopContent}>
                <h3 className={styles.landscapeCardTitle}>{"Вода, свет и\u00A0атмосфера"}</h3>
              </div>
              <div className={styles.cardBottomContent}>
                <p className={styles.cardText}>{"Пруды, отражения, освещение и\u00A0вечерние сценарии\u00A0— всё, что\u00A0делает участок живым и\u00A0объёмным."}</p>
              </div>
            </div>

            <div className={styles.landscapeCard}>
              <picture className={styles.cardBgAbs}>
                <source srcSet={imgBlock3Card3Mobile} media="(max-width: 768px)" />
                <img src={imgBlock3Card3} alt="" className={styles.cardBgAbsImg} />
              </picture>
              <div className={styles.cardOverlayAbs} style={{ background: 'rgba(14, 44, 43, 0.25)' }}></div>
              <div className={styles.cardTopContent}>
                <h3 className={styles.landscapeCardTitle}>{"Конструкции и\u00A0инженерия"}</h3>
              </div>
              <div className={styles.cardBottomContent}>
                <p className={styles.cardText}>{"Дорожки, террасы, дренаж, полив\u00A0— решения, которые не\u00A0видны, но\u00A0от\u00A0которых зависит, как\u00A0долго всё будет работать."}</p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <ArchitectureSection />
      </RevealSection>

      {/* Block 5: Interiors */}
      <RevealSection>
        <section id="interior" className={styles.interiorsSection}>
          <div className={styles.interiorsBgOverlay}>
            <img src={imgBlock5Top} alt="" className={styles.sectionBgImg} />
            <div className={styles.greenGlassOverlay} />
          </div>

          <div className={styles.interiorsHeader}>
            <div className={styles.headerLeft}>
              <h2 className={styles.sectionTitle}>{"Интерьеры"}</h2>
              <p className={`${styles.sectionDesc} ${styles.opacityMuted}`}>{"То, что\u00A0человек чувствует, а\u00A0не\u00A0только видит."}</p>
            </div>
            <div className={styles.headerRight}>
              <button 
                onClick={openProjectPopup} 
                className={styles.interiorsCta}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div className={styles.ctaIconCircle}>
                  <img src={imgArrowDiagonal} alt="" />
                </div>
                <span>Начать проект</span>
              </button>
            </div>
          </div>

          <div className={styles.interiorsLayout}>
            <div className={`${styles.interiorCard} ${styles.largeCard}`}>
              <img src={imgBlock5Top} alt="" className={styles.cardBgCover} />
              <div className={styles.cardDarkenOverlay} />
              <div className={styles.cardContentCentered}>
                <h3 className={styles.interiorCardTitle}>Пространства для отдыха</h3>
                <p className={styles.interiorCardSubtitle}>где хочется остаться дольше</p>
              </div>
            </div>

            <div className={styles.interiorsBottomRow}>
              <div className={styles.interiorCard}>
                <img src={imgBlock5Left} alt="" className={styles.cardBgCover} />
                <div className={styles.cardDarkenOverlay} />
                <div className={styles.cardContentCentered}>
                  <h3 className={styles.interiorCardTitle}>Места, <br />которые запоминаются</h3>
                  <p className={styles.interiorCardSubtitle}>с первого визита</p>
                </div>
              </div>

              <div className={styles.interiorCard}>
                <img src={imgBlock5Right} alt="" className={styles.cardBgCover} />
                <div className={styles.cardDarkenOverlay} />
                <div className={styles.cardContentCentered}>
                  <h3 className={styles.interiorCardTitle}>Атмосфера</h3>
                  <p className={styles.interiorCardSubtitle}>которая работает на бренд</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Block 6: Management */}
      <RevealSection>
        <ManagementSection
          bgImage={imgBlock6Bg}
          bgImageMobile={imgBlock6BgMobile}
          cards={[
            {
              title: "Есть участок, и\u00A0хочется сразу сделать всё правильно",
              subtitle: "Продумать пространство заранее и\u00A0избежать переделок в\u00A0будущем",
              image: imgBlock6Card1
            },
            {
              title: "Проект требует точных и\u00A0продуманных решений",
              subtitle: "Сложные условия, масштаб и\u00A0задачи, где\u00A0важен опыт и\u00A0продуманность",
              image: imgBlock6Card2
            },
            {
              title: "Необходимо пространство, которое запоминается",
              subtitle: "И\u00A0создаёт впечатление, а\u00A0не\u00A0просто выглядит аккуратно",
              image: imgBlock6Card3
            }
          ]}
        />
      </RevealSection>

      {/* Block 7: Process Stages */}
      <section ref={processRef} className={styles.processSection}>
        <div className={styles.processBgOverlay}>
          <img src={imgProcess01} alt="" className={styles.processBgImg} />
          <div className={styles.darkGreenGlassOverlay} />
        </div>

        <div className={styles.processSticky}>
          <div className={styles.processSectionHeader}>
            <h2 className={styles.processSectionTitle}>{"Как мы\u00A0ведём проект"}</h2>
          </div>

          <div 
            className={styles.processTrack}
            style={{ 
              transform: window.innerWidth <= 768 
                ? `translateX(-${processProgress * 85}%)` 
                : 'none' 
            }}
          >
            <div className={styles.processCard}>
              <img src={imgProcess01} alt="" className={styles.processCardBg} />
              <div className={styles.processCardOverlay} />
              <span className={styles.processCardNumber}>01</span>
              <div className={styles.processCardContent}>
                <h3 className={styles.processCardTitle}>{"Погружение"}</h3>
                <p className={styles.processCardDesc}>
                  {"Выезжаем на\u00A0объект, изучаем пространство, рельеф, окружение и\u00A0сценарии использования. Фиксируем всё\u00A0— от\u00A0замеров до\u00A0съёмки с\u00A0дрона\u00A0— чтобы\u00A0видеть проект целиком."}
                </p>
              </div>
            </div>

            <div className={styles.processCard}>
              <img src={imgProcess02} alt="" className={styles.processCardBg} />
              <div className={styles.processCardOverlay} />
              <span className={styles.processCardNumber}>02</span>
              <div className={styles.processCardContent}>
                <h3 className={styles.processCardTitle}>{"Концепция"}</h3>
                <p className={styles.processCardDesc}>
                  {"Продумываем, как\u00A0пространство будет использоваться\u00A0— и\u00A0формируем логику, в\u00A0которой всё\u00A0связано между собой."}
                </p>
              </div>
            </div>

            <div className={styles.processCard}>
              <img src={imgProcess03} alt="" className={styles.processCardBg} />
              <div className={styles.processCardOverlay} />
              <span className={styles.processCardNumber}>03</span>
              <div className={styles.processCardContent}>
                <h3 className={styles.processCardTitle}>{"Решения"}</h3>
                <p className={styles.processCardDesc}>
                  {"Создаём проект под\u00A0конкретную задачу. Каждое решение\u00A0— индивидуально: под\u00A0участок, архитектуру и\u00A0цели проекта."}
                </p>
              </div>
            </div>

            <div className={styles.processCard}>
              <img src={imgProcess04} alt="" className={styles.processCardBg} />
              <div className={styles.processCardOverlay} />
              <span className={styles.processCardNumber}>04</span>
              <div className={styles.processCardContent}>
                <h3 className={styles.processCardTitle}>{"Комплектация"}</h3>
                <p className={styles.processCardDesc}>
                  {"Берём на\u00A0себя материалы и\u00A0процессы. Подбираем, закупаем и\u00A0координируем подрядчиков. Вы\u00A0не\u00A0погружаетесь в\u00A0операционные задачи."}
                </p>
              </div>
            </div>

            <div className={styles.processCard}>
              <img src={imgProcess05} alt="" className={styles.processCardBg} />
              <div className={styles.processCardOverlay} />
              <span className={styles.processCardNumber}>05</span>
              <div className={styles.processCardContent}>
                <h3 className={styles.processCardTitle}>{"Реализация"}</h3>
                <p className={styles.processCardDesc}>
                  {"Контролируем стройку и\u00A0качество исполнения, сохраняя целостность идеи на\u00A0всех этапах."}
                </p>
              </div>
            </div>

            <div className={styles.processCard}>
              <img src={imgProcess06} alt="" className={styles.processCardBg} />
              <div className={styles.processCardOverlay} />
              <span className={styles.processCardNumber}>06</span>
              <div className={styles.processCardContent}>
                <h3 className={styles.processCardTitle}>{"Сопровождение"}</h3>
                <p className={styles.processCardDesc}>
                  {"Остаёмся с\u00A0проектом после сдачи. Следим за\u00A0тем, как\u00A0пространство работает, и\u00A0при\u00A0необходимости корректируем его в\u00A0течение первого года."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 8: Benefits Slider */}
      <RevealSection>
        <section className={styles.benefitsSection}>
          <div className={styles.benefitsBgContainer}>
            <img src={imgBlock8Bg} alt="" className={styles.benefitsBgImg} />
            <div className={styles.benefitsBgOverlay} />
          </div>

          <div className={styles.benefitsSectionContent}>
            <div className={styles.benefitsHeader}>
              <h2 className={styles.benefitsTitle}>{"Что вы получаете, работая с Грин Рок"}</h2>
            </div>

            <div className={styles.benefitsBottomContent}>
              <div className={styles.benefitsControlsRow}>
                <div className={styles.benefitsProgress}>
                  <div className={styles.progressFill} style={{ width: `${Math.max(10, benefitsProgress * 100)}%` }} />
                </div>
                <div className={styles.benefitsArrows}>
                  <div className={styles.arrowBtn} onClick={() => scrollSlider('left')}>
                    <img src={arrowLeftCircle} alt="Назад" />
                  </div>
                  <div className={styles.arrowBtn} onClick={() => scrollSlider('right')}>
                    <img src={arrowRightCircle} alt="Вперед" />
                  </div>
                </div>
              </div>

              <div className={styles.benefitsSlider} ref={sliderRef}>
                <div className={`${styles.benefitCard} ${styles.benefitCardW411}`}>
                  <img src={imgShape411} alt="" className={styles.cardShape} />
                  <div className={styles.cardInner}>
                    <h3 className={styles.benefitCardTitle}>Цельное пространство</h3>
                    <p className={styles.benefitCardDesc}>{"Архитектура, ландшафт и интерьер связаны между собой и работают как единое решение"}</p>
                  </div>
                </div>

                <div className={`${styles.benefitCard} ${styles.benefitCardW411}`}>
                  <img src={imgShape411} alt="" className={styles.cardShape} />
                  <div className={styles.cardInner}>
                    <h3 className={styles.benefitCardTitle}>Понимание проекта заранее</h3>
                    <p className={styles.benefitCardDesc}>Вы видите будущий результат и принимаете решения ещё до начала реализации</p>
                  </div>
                </div>

                <div className={`${styles.benefitCard} ${styles.benefitCardW302}`}>
                  <img src={imgShape302} alt="" className={styles.cardShape} />
                  <div className={styles.cardInner}>
                    <h3 className={styles.benefitCardTitle}>Продуманные решения</h3>
                    <p className={styles.benefitCardDesc}>Все элементы согласованы между собой и работают в рамках одной логики</p>
                  </div>
                </div>

                <div className={`${styles.benefitCard} ${styles.benefitCardW411}`}>
                  <img src={imgShape411} alt="" className={styles.cardShape} />
                  <div className={styles.cardInner}>
                    <h3 className={styles.benefitCardTitle}>Спокойная реализация</h3>
                    <p className={styles.benefitCardDesc}>Проект ведётся системно, с соблюдением сроков и проходит без лишних сложностей</p>
                  </div>
                </div>

                <div className={`${styles.benefitCard} ${styles.benefitCardW302}`}>
                  <img src={imgShape302} alt="" className={styles.cardShape} />
                  <div className={styles.cardInner}>
                    <h3 className={styles.benefitCardTitle}>Долговечный результат</h3>
                    <p className={styles.benefitCardDesc}>Пространство сохраняет актуальность и выглядит уверенно со временем</p>
                  </div>
                </div>

                <div className={`${styles.benefitCard} ${styles.benefitCardW411}`}>
                  <img src={imgShape411} alt="" className={styles.cardShape} />
                  <div className={styles.cardInner}>
                    <h3 className={styles.benefitCardTitle}>Место, куда хочется возвращаться</h3>
                    <p className={styles.benefitCardDesc}>Создаём среду, которая работает в повседневной жизни и приносит удовольствие</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <ContactSection />
      </RevealSection>

      <Footer onStartProjectClick={openProjectPopup} />
    </div>
  );
};
