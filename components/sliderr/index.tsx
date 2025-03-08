import styles from './Home.module.scss';

const Theslider = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.h1}>Motor Oil</h1>
        
        </div>
      </header>
      <div className={styles.banner}>
        <div className={styles.product}>
        
          {/* @ts-ignore */}
          <div className={styles.soda} style={{ '--url': 'url(/adad.png)' }}></div>
        </div>

        <div className={styles.rock}>
          <img src="/images/images/rock1.png" alt="rock 1" />
          <img src="/images/images/rock2.png" alt="rock 2" />
          <img src="/images/images/rock3.png" alt="rock 3" />
        </div>
      </div>
    </div>
  );
};

export default Theslider;
