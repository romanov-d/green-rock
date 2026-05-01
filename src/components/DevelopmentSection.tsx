import React from 'react';
import imgMesh from '../assets/block8_mesh.webp';
import imgBanner from '../assets/dev_banner.webp';
import imgBannerMobile from '../assets/dev_banner_mobile.webp';
import imgThumbGlamping from '../assets/video_thumb_glamping.webp';
import imgThumbRelief from '../assets/video_thumb_relief.webp';
import imgPlay from '../assets/play_button_circle.svg';
import styles from './DevelopmentSection.module.css';

export const DevelopmentSection: React.FC = () => {
  return (
    <section className={styles.devSection}>
      <div className={styles.devMeshContainer}>
        <img loading="lazy" decoding="async" src={imgMesh} alt="" className={styles.devMesh} />
        <div className={styles.devBgOverlay}></div>
      </div>

      <div className={styles.devContent}>
        <div className={styles.devVideosContainer}>
          <div className={styles.devHeader}>
            <h2 className={styles.devTitle}>Видеообзоры</h2>
            <p className={styles.devSubtitle}>{"Проекты, детали и решения — в формате коротких видео"}</p>
          </div>

          <div className={styles.devVideoGrid}>
            {/* Video Card 1 */}
            <div className={styles.videoCard}>
              <img loading="lazy" decoding="async" src={imgThumbGlamping} alt="Глэмпинг" className={styles.videoThumb} />
              <div className={styles.videoOverlay}>
                {/* Desktop Info */}
                <div className={styles.videoCardInfoWrap}>
                  <div className={styles.videoInfoLeft}>
                    <h3 className={styles.videoCardTitle}>Глэмпинг</h3>
                    <span className={styles.videoCategory}>Коммерческий ландшафтный проект</span>
                  </div>
                  <div className={styles.videoDuration}>3:01</div>
                </div>

                {/* Mobile Info Bars */}
                <div className={styles.videoTopBar}>
                  <h3 className={styles.videoCardTitleMobile}>Глэмпинг</h3>
                  <span className={styles.videoCategoryMobile}>Коммерческий ландшафтный проект</span>
                </div>
                <div className={styles.videoBottomBar}>
                  <div className={styles.videoDurationMobile}>3:01</div>
                </div>
              </div>
              <button className={styles.videoPlayBtn}>
                <img loading="lazy" decoding="async" src={imgPlay} alt="Play" />
              </button>
            </div>

            {/* Video Card 2 */}
            <div className={styles.videoCard}>
              <img loading="lazy" decoding="async" src={imgThumbRelief} alt="Рельеф" className={styles.videoThumb} />
              <div className={styles.videoOverlay}>
                {/* Desktop Info */}
                <div className={styles.videoCardInfoWrap}>
                  <div className={styles.videoInfoLeft}>
                    <h3 className={styles.videoCardTitle}>Рельеф</h3>
                    <span className={styles.videoCategory}>{"Многоуровневый ландшафт с водоёмом и террасами"}</span>
                  </div>
                  <div className={styles.videoDuration}>3:14</div>
                </div>

                {/* Mobile Info Bars */}
                <div className={styles.videoTopBar}>
                  <h3 className={styles.videoCardTitleMobile}>Рельеф</h3>
                  <span className={styles.videoCategoryMobile}>{"Многоуровневый ландшафт с водоёмом и террасами"}</span>
                </div>
                <div className={styles.videoBottomBar}>
                  <div className={styles.videoDurationMobile}>3:14</div>
                </div>
              </div>
              <button className={styles.videoPlayBtn}>
                <img loading="lazy" decoding="async" src={imgPlay} alt="Play" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.devBanner}>
          <picture className={styles.bannerImgPicture}>
              <source srcSet={imgBannerMobile} media="(max-width: 768px)" />
              <img loading="lazy" decoding="async" src={imgBanner} alt="Development" className={styles.bannerImg} />
            </picture>
          <div className={styles.bannerTopBlur}></div>
          <div className={styles.bannerBottomBlur}></div>
          <div className={styles.bannerGradient}></div>
          <div className={styles.bannerContent}>
            <div className={styles.bannerLeft}>
              <h2 className={styles.bannerTitle}>Грин Рок <br /> <span>Development</span></h2>
              <p className={styles.bannerTagline}>{"Следующий уровень — среда целиком"}</p>
            </div>
            <div className={styles.bannerRight}>
              <h3 className={styles.bannerHeading}>{"Создаём коттеджные посёлки, в\u00A0которых всё\u00A0развивается по\u00A0одной логике"}</h3>
              <p className={styles.bannerDesc}>
                {"Мы\u00A0расширяем подход и\u00A0работаем с\u00A0территорией как\u00A0с\u00A0единой системой\u00A0— от\u00A0общей концепции до\u00A0архитектуры домов и\u00A0ландшафта"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
