// components/CenterContent.tsx

import React from 'react';
import styles from './CenterContent.module.scss';

const CenterContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bizning assortimentimiz</h1>
        <p className={styles.description}>Biz dunyoni mazaliroq qilamiz!</p>
        <div className={styles.buttons}>
          <button className={styles.button}>Asorti</button>
          <button className={styles.button}>Asorti</button>
        </div>
      </div>
    </div>
  );
};

export default CenterContent;
