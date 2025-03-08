import React from 'react';
import styles from './style.module.scss';

const Contact: React.FC = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <h2>Ташкент</h2>
        <p>Узбекистан, г.Ташкент, Чиланзарский р-он, ул.Диёдор, дом 71</p>
        <p>+998 93 123-02-12</p>
        <br />
        <h2>Долина</h2>
        <p>Узбекистан, г.Ташкент, Чиланзарский р-он, ул.Диёдор, дом 71</p>
        <p>+998 97 444-40-73</p>
        <br />
        <h2>
        Воха</h2>
        <p>Узбекистан, г.Ташкент, Чиланзарский р-он, ул.Диёдор, дом 71</p>
        <p>+998 97 444-40-82</p>
        
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
