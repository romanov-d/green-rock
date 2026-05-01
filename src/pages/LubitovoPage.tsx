import React from 'react';
import styles from './LubitovoPage.module.css';

// Assets
import imgLubitovoBg from '../assets/project_lubitovo_hero.webp';
import imgBlock2Main from '../assets/lubitovo_block2_main.webp';
import imgBlock2Plan from '../assets/lubitovo_block2_plan.webp';
import imgBlock5Image from '../assets/lubitovo_block5_image.webp';
import imgBlock7Bg from '../assets/lubitovo_block7_bg.webp';
import imgBlock8Bg from '../assets/lubitovo_block8_bg.webp';
import imgBlock9Bg from '../assets/lubitovo_block9_bg.webp';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ProjectZonesSection } from '../components/ProjectZonesSection';
import { ProjectRoutesDetailed } from '../components/ProjectRoutesDetailed';
import { Header } from '../components/Header/Header';
import { MobileMenu } from '../components/MobileMenu';
import { TourPopup } from '../components/TourPopup';
import { useHeaderPopups } from '../hooks/useHeaderPopups';
import { Helmet } from 'react-helmet-async';

export const LubitovoPage: React.FC = () => {
  const {
    isMenuOpen,
    isProjectPopupOpen,
    toggleMenu,
    openProjectPopup,
    closeProjectPopup,
    setIsMenuOpen
  } = useHeaderPopups();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Scroll reveal for task list items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          }
        });
      },
      {
        threshold: 0.8,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const items = document.querySelectorAll(`.${styles.taskList} li`);
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);



  return (
    <div className={styles.projectPage}>
      <Helmet>
        <title>Любитово | Проект ландшафтного дизайна - Грин Рок</title>
        <meta name="description" content="Кейс ландшафтного проектирования частной резиденции в Новгородской области. Превратили участок 10 000 м² в систему функциональных пространств с прудом и продуманными маршрутами." />
        <meta name="keywords" content="ландшафтный дизайн, Любитово, проектирование участка, частная резиденция, пруд на участке, грин рок" />
        <meta property="og:title" content="Любитово | Проект ландшафтного дизайна - Грин Рок" />
        <meta property="og:description" content="Кейс ландшафтного проектирования частной резиденции 10 000 м² в Новгородской области." />
        <meta property="og:type" content="article" />
      </Helmet>
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
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
      
      {/* Hero Section */}
      <section className={styles.projectHero}>
        <img src={imgLubitovoBg} alt="Панорамный вид участка Любитово - ландшафтный дизайн Грин Рок" className={styles.projectHeroBg} />
        <div className={styles.projectHeroOverlay}></div>

        {/* Header */}
        <Header 
          onMenuToggle={toggleMenu} 
          isMenuOpen={isMenuOpen} 
          onStartProjectClick={openProjectPopup}
        />

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
            <h1 className={`${styles.projectTitle} ${styles.animateTitleV2}`}>Любитово</h1>
            <p className={`${styles.projectSubtitle} ${styles.animateSubtitleV2}`}>
              {"участок, который мы\u00A0превратили в\u00A0систему пространств"}
            </p>

            {/* Mobile Specs */}
            <div className={`${styles.projectSpecs} ${styles.mobileOnly}`}>
              <p>10 000 м²</p>
              <p>Новгородская область</p>
              <p>Частная резиденция</p>
            </div>
          </div>

          <div className={styles.projectHeroBottom}>
            <div className={styles.projectServices}>
              <p>Проектирование</p>
              <p>Инженерная подготовка</p>
              <p>Реализация под ключ</p>
            </div>

            <div className={styles.projectScroll}>
              <span className={styles.scrollHint}>Смотреть проект</span>
              <div className={styles.scrollIndicator}>
                <div className={styles.scrollIndicatorFill}></div>
              </div>
            </div>

            <div className={`${styles.projectSpecs} ${styles.desktopOnly}`}>
              <p>10 000 м²</p>
              <p>Новгородская область</p>
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
              Этот участок нельзя было решить одним красивым эскизом. Здесь требовалась система: логика движения, приватность, инженерная база и сценарии для разных состояний — от тихого вечера до встречи с друзьями.
            </p>
            <div className={styles.block2Subtitle}>
              <div className={styles.subtitleDivider}></div>
              <div className={styles.subtitleContent}>
                <p>Мы начали не с посадок.</p>
                <p>Мы начали с маршрутов.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block2Visual}>
          <img src={imgBlock2Main} alt="Маршруты и дорожки на участке Любитово" className={styles.block2Bg} />

          <div className={styles.block2FloatingCard}>
            <div className={styles.cardPlan}>
              <img src={imgBlock2Plan} alt="Генплан участка Любитово" />
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.cardColumn}>
                <p>Зона отдыха</p>
                <p>Посадки</p>
                <p>Плодовый сад</p>
                <p>Теплицы</p>
              </div>
              <div className={styles.cardDivider}></div>
              <div className={styles.cardColumn}>
                <p>Зона костра</p>
                <p>Барбекю</p>
                <p>Пирс</p>
                <p>Качель</p>
              </div>
              <div className={styles.cardDivider}></div>
              <div className={styles.cardColumn}>
                <p>Баня</p>
                <p>Чан</p>
                <p>Водные чаши</p>
                <p>Погреб</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Main Task */}
      <section className={styles.projectBlock3}>
        <div className={styles.block3Container}>
          <h2 className={styles.block3Title}>Главная задача</h2>
          <p className={styles.block3Description}>
            Создать сад, который живёт, а не просто выглядит. Участок должен стать естественным продолжением дома и леса — пространством, где можно проводить время в разных сценариях: от тихого вечера у воды до встречи с друзьями у костра.
          </p>

          <div className={styles.block3Cards}>
            <div className={styles.taskCard}>
              <h3 className={styles.taskCardTitle}>Запрос заказчика</h3>
              <ul className={styles.taskList}>
                <li>ощущение природы без эффекта «дизайна»</li>
                <li>место для костра и встреч</li>
                <li>пруд как живой центр участка</li>
                <li>пространство для детей</li>
                <li>плодовый сад</li>
                <li>минимальный уход</li>
              </ul>
            </div>

            <div className={styles.taskCard}>
              <h3 className={styles.taskCardTitle}>Исходные условия среды</h3>
              <ul className={styles.taskList}>
                <li>пространство без зонирования</li>
                <li>риск застоя воды</li>
                <li>отсутствие продуманной навигации</li>
                <li>активные и тихие зоны не разделены</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProjectZonesSection />

      {/* Block 5: Full Width Image */}
      <section className={styles.projectImageFull}>
        <img src={imgBlock5Image} alt="Цветущий сад и декоративные кустарники в Любитово" className={styles.fullBgImage} />
      </section>

      {/* Block 6: Detailed Routes */}
      <ProjectRoutesDetailed />

      {/* Block 7: Variants and Realization */}
      <section className={styles.projectSplitBlock}>
        <img src={imgBlock7Bg} alt="Процесс реализации ландшафтного проекта" className={styles.splitBg} />
        <div className={styles.splitOverlay}></div>
        
        <div className={styles.splitContentWrapper}>
          <div className={styles.splitEmpty}></div>
          <div className={styles.splitContent}>
            <div className={styles.contentInner}>
              <h2 className={styles.splitTitle}>Проект прошёл через несколько вариантов генплана и альтернативных решений</h2>
              <div className={styles.accentLine}></div>

              <div className={styles.splitSection}>
                <h3>Мы тестировали</h3>
                <ul className={styles.splitList}>
                  <li>— плотность посадок</li>
                  <li>— конфигурацию зон</li>
                  <li>— маршруты</li>
                  <li>— масштаб костровых пространств</li>
                </ul>
              </div>

              <div className={styles.splitSection}>
                <h3>На этапе реализации контролировали</h3>
                <ul className={styles.splitList}>
                  <li>— укладку оснований</li>
                  <li>— точность геометрии</li>
                  <li>— работу инженерных систем</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 8: Separator Image */}
      <section className={styles.projectImageFull}>
        <img src={imgBlock8Bg} alt="Зона отдыха у воды на участке Любитово" className={styles.fullBgImage} />
      </section>

      <section className={styles.lubitovoSummarySection}>
        <div className={styles.summaryBgContainer}>
          <img src={imgBlock9Bg} alt="Завершенный проект Любитово - Грин Рок" className={styles.summaryBgImg} />
          <div className={styles.summaryOverlay}></div>
        </div>

        <div className={styles.summaryContentContainer}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryCardTitle}>Любитово — это</h2>
            <ul className={styles.summaryList}>
              <li>— сад с несколькими сценариями жизни</li>
              <li>— чёткое разделение активных и тихих зон</li>
              <li>— инженерно проработанный водоем</li>
              <li>— устойчивый газон</li>
              <li>— продуманная система маршрутов</li>
              <li>— место, куда хочется возвращаться</li>
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};
