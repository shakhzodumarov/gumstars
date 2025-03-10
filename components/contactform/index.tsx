import React from 'react';
import styles from './style.module.scss';
import { useTranslations } from 'next-intl';
import { BiLogoFacebook, BiLogoInstagram } from 'react-icons/bi';
import { Link } from '@/i18n/routing';
import { BsInstagram } from 'react-icons/bs';

const Contact: React.FC = () => {
  const t = useTranslations('HomePage');
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <h2>{t('niggaonefour')}</h2>
        <p>{t('niggaoneseven')}</p>
        <p>+998 93 123-02-12</p>
        <br />
        <h2>{t('niggaonefive')}</h2>
        <p>+998 97 444-40-73</p>
        <br />
        <h2>
        {t('niggaonesix')}</h2>
        <p>+998 97 444-40-82</p>
        <br />
        <h2>
        E-mail</h2>
        <p>info@gumstar.com</p>
        <br />
        <h2>
        {t('niggaonenine')}</h2>
        <div className={styles.social}>
              <Link href={"https://www.instagram.com/"}><BsInstagram width={50} strokeWidth={0} /></Link>
              <Link href={"https://www.facebook.com/"}><BiLogoFacebook width={50} strokeWidth={0} /></Link>
            </div>
        
      </div>
      <div className={styles.mapContainer}>
        <div id="yandex-map" className={styles.yandexMap}>
{/* @ts-ignore */}
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af1c4d9e2d22d7c3d3309a02d5b6e23de03a0af6f09dd05afa8c7c4f424438843&amp;source=constructor" width="800" height="600" frameborder="0" className={styles.themotiontext} ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
