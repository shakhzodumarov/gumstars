import styles from './Carousel.module.scss';

const GalleryofImages: React.FC = () => {

  const images2 = [
'/images/images/Shell-Logo.png', '/images/images/winiron.jpg', '/images/images/hyundaixteer.png',
//  '/images/images/wulsgenfilter.jpg', 
  ];

  return (
    <main className={styles.main}>
    <br /> <br />
      <div className={`${styles.slider} ${styles.reverse}`} style={{ '--width': '200px', '--height': '200px', '--quantity': 9 } as React.CSSProperties}>
        <div className={styles.list}>
          {images2.map((src, index) => (
            <div key={index} className={styles.item} style={{ '--position': index + 1 } as React.CSSProperties}>
              <img src={src} alt={`slider-item-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GalleryofImages;
