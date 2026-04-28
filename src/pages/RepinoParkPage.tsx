import React from 'react';
import styles from './RepinoParkPage.module.css';

// Assets
import imgRepinoBg from '../assets/project_repino_hero.webp';
import imgBlock2Bg from '../assets/repino_block2_bg.webp';
import imgBlock2Card from '../assets/repino_block2_card.webp';
import imgLineV from '../assets/repino_line_v.svg';
import imgBlock3Img from '../assets/repino_block3_img.webp';
import imgBlock3Line from '../assets/repino_block3_line.svg';
import imgBlock4Full from '../assets/repino_block4_full.webp';
import imgBlock6Bg from '../assets/repino_block6_bg.webp';
import imgBlock6Line from '../assets/repino_block6_line.svg';
import imgBlock7Bg from '../assets/repino_block7_bg.webp';
import imgBlock8Bg from '../assets/repino_block8_bg.webp';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { RepinoPoolSection } from '../components/RepinoPoolSection';

import { Header } from '../components/Header/Header';
import { MobileMenu } from '../components/MobileMenu';

export const RepinoParkPage: React.FC = () => {
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
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hero Section */}
      <section className={styles.projectHero}>
        <img src={imgRepinoBg} alt="Репино парк" className={styles.projectHeroBg} />
        <div className={styles.projectHeroOverlay}></div>

        {/* Header */}
        <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />

        {/* Hero Content */}
        <div className={styles.projectHeroContent}>
          {/* Glassy Nav Tags - Mobile Only */}
          <div className={styles.glassyNavTags}>
            <div className={styles.glassyTag}>Дизайн</div>
            <div className={styles.glassyTag}>Ланшафт</div>
            <div className={styles.glassyTag}>Архитектура</div>
            <div className={styles.glassyTag}>Интерьеры</div>
          </div>

          <div className={styles.projectHeroMain}>
            <h1 className={`${styles.projectTitle} ${styles.animateTitleV2}`}>Репино парк</h1>
            <p className={`${styles.projectSubtitle} ${styles.animateSubtitleV2}`}>
              Современный частный сад в сосновом окружении,<br className={styles.desktopOnly} />где архитектура дома продолжена в ландшафте.
            </p>

            {/* Mobile Specs */}
            <div className={`${styles.projectSpecs} ${styles.mobileOnly}`}>
              <p>1000 м²</p>
              <p>Ленинградская область</p>
              <p>Частная резиденция</p>
            </div>
          </div>

          <div className={styles.projectHeroBottom}>
            <div className={`${styles.projectServices} ${styles.desktopOnly}`}>
              <p>Частный сад, где строгая архитектура дома<br />сочетается с мягкой природной средой</p>
            </div>

            <div className={styles.projectScroll}>
              <span className={styles.scrollHint}>Смотреть проект</span>
              <div className={styles.scrollIndicator}>
                <div className={styles.scrollIndicatorFill} style={{ width: '50%', background: '#2f5552' }}></div>
              </div>
            </div>

            {/* Desktop Specs */}
            <div className={`${styles.projectSpecs} ${styles.desktopOnly}`}>
              <p>1000 м²</p>
              <p>Ленинградская область</p>
              <p>Частная резиденция</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Concept */}
      <section className={styles.projectBlock2}>
        <div className={styles.block2Header}>
          <div className={styles.block2Intro}>
            <p className={styles.block2Text}>
              Концепция озеленения основана на тематике современного скандинавского сада с аккуратными отсылками к японским каменным садам
            </p>
            <div className={styles.block2Subtitle}>
              <div className={styles.subtitleDivider}>
                <img src={imgLineV} alt="Line" />
              </div>
              <div className={styles.subtitleContent}>
                <p className={styles.subtitleMain}>Главный принцип — баланс:</p>
                <div className={styles.subtitleList}>
                  <p>— четкие формы, продиктованные архитектурой дома</p>
                  <p>— плавные переходы покрытий</p>
                  <p>— мягкая пластика посадок</p>
                  <p>— выразительные каменные акценты</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.block2Visual}>
          <img src={imgBlock2Bg} alt="Repino Landscape" className={styles.block2Bg} />

          <div className={styles.block2FloatingCard}>
            <div className={styles.cardPlan}>
              <img src={imgBlock2Card} alt="Details" />
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.cardColumn}>
                <p>Бассейн с терассой</p>
                <p>Сад камней</p>
                <p>Зона костра</p>
              </div>
              <div className={styles.cardDivider}></div>
              <div className={styles.cardColumn}>
                <p>Зона отдыха</p>
                <p>Качель</p>
                <p>Пилон</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Pavements */}
      <section className={styles.projectBlock3}>
        <div className={styles.block3Container}>
          <div className={styles.block3Visual}>
            <img src={imgBlock3Img} alt="Pavements" className={styles.block3Img} />
          </div>

          <div className={styles.block3Content}>
            <h2 className={styles.block3Title}>Покрытия, которые формируют пространство.</h2>

            <div className={styles.block3Subtitle}>
              <div className={styles.subtitleDivider}>
                <img src={imgBlock3Line} alt="Line" />
              </div>
              <div className={styles.subtitleContent}>
                <p className={styles.subtitleMain}>
                  В проекте покрытия работают не как фон, а как часть композиции. Они связывают дом, входную зону, маршруты и места отдыха в единую систему.
                </p>
                <div className={styles.subtitleList}>
                  <p>— крупноформатная брусчатка во въездной зоне</p>
                  <p>— пошаговые дорожки по газону</p>
                  <p>— хаотичные маршруты с гранитной крошкой</p>
                  <p>— натуральный камень у зоны костра</p>
                  <p>— лиственничный настил у бассейна</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swappable container for Block 4 and 5 */}
      <div className={styles.swappableBlocks}>
        {/* Block 4: Full Width Image */}
        <section className={`${styles.projectImageFull} ${styles.swapOrder1}`}>
          <img src={imgBlock4Full} alt="Repino Detail" className={styles.fullBgImage} />
        </section>

        {/* Block 5: Pool */}
        <div className={styles.swapOrder2}>
          <RepinoPoolSection />
        </div>
      </div>

      {/* Block 6: Curved Bench */}
      <section className={styles.rivieraFullBlock}>
        <div className={styles.fullBgContainer}>
          <img src={imgBlock6Bg} alt="Curved Bench" className={styles.fullBgImg} />
        </div>

        <div className={styles.sidePanelDark}>
          <div className={styles.panelInner}>
            <h2 className={styles.panelTitle}>Изогнутая скамья — форма, продиктованная деревьями.</h2>

            <div className={styles.panelDividerH}>
              <img src={imgBlock6Line} alt="Line" />
            </div>

            <div className={styles.panelDescription}>
              <p>Скамья не поставлена в пространстве, а выстроена вокруг трёх существующих сосен и стала частью композиции участка.</p>
            </div>

            <div>
              <h3 className={styles.listTitle}>Архитектура вписывается в природу, а не подавляет её:</h3>
              <ul className={styles.panelList}>
                <li>— основание из лиственницы/кортеновой стали</li>
                <li>— площадь клумбы вокруг — 25 м²</li>
                <li>— объём — около 9 м³</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 7: Greenery */}
      <section className={styles.projectBlock7}>
        <div className={styles.greeneryHeader}>
          <h2 className={styles.greeneryTitle}>Озеленение как часть композиции</h2>
          <div className={styles.greeneryDesc}>
            <p>Посадки поддерживают архитектуру участка, смягчают геометрию дома и сохраняют ощущение жизни среди сосен.</p>
            <p>В проекте использованы хвойные формы, почвопокровные, декоративные кустарники и многолетники с природным характером.</p>
          </div>
        </div>
        <div className={styles.greeneryVisual}>
          <img src={imgBlock7Bg} alt="Greenery" className={styles.greeneryBgImg} />
          <div className={styles.greeneryOverlay}></div>
        </div>
      </section>

      {/* Block 8: Summary */}
      <section className={styles.rivieraSummarySection}>
        <div className={styles.summaryBgContainer}>
          <img src={imgBlock8Bg} alt="Repino Summary" className={styles.summaryBgImg} />
          <div className={styles.summaryBgOverlay}></div>
        </div>

        <div className={styles.summaryCard}>
          <h2 className={styles.summaryCardTitle}>Репино парк — это единая среда для жизни:</h2>
          <div className={styles.summaryCardList}>
            <p>— бассейн с откатной террасой</p>
            <p>— зона костра</p>
            <p>— пластичная скамья вокруг сосен</p>
            <p>— гамак и качель</p>
            <p>— сад камней у входной группы</p>
            <p>— продуманная система покрытий</p>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
};
