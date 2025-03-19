import React from 'react';
import styles from './style.module.scss';
import { useTranslations } from 'next-intl';
import { BiLogoFacebook, BiLogoInstagram, BiLogoTelegram } from 'react-icons/bi';
import { Link } from '@/i18n/routing';
import { BsInstagram } from 'react-icons/bs';

const Contact: React.FC = () => {
  const t = useTranslations('HomePage');
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <h2>{t('niggaonefour')}</h2>
        <p>{t('niggaoneseven')}</p>
        <br />
        <h2>{t('niggaonefive')}</h2>
        <p>+998 71 200-44-88</p>
        <br />
        {/* <h2>{t('niggaonefive')}</h2> */}
        <p>+998 97 444-40-72</p>
        <br />
        <h2>
        E-mail</h2>
        <p>info@gumstar.com</p>
        <br />
        <h2>
        {t('niggaonenine')}</h2>
        <div className={styles.social}>
              <Link href={"https://www.instagram.com/alif.gum?igsh=MWFxY3FpZzlqbXNscA=="}><BsInstagram width={50} strokeWidth={0} /></Link>
              <Link href={"https://www.facebook.com/share/1UAGoXZJoF/"}><BiLogoFacebook width={50} strokeWidth={0} /></Link>
              <Link href={"https://t.me/alif_gum"}><BiLogoTelegram width={50} strokeWidth={0} /></Link>
            </div>
        
      </div>
      <div className={styles.mapContainer}>
        <div id="yandex-map" className={styles.yandexMap}>
{/* @ts-ignore */}
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A6765b4fa89ed04eb7369a88396047d4c1a7a675b41d292022c8d6f66c543d818&amp;source=constructor" width="800" height="600" frameborder="0" className={styles.themotiontext} ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

