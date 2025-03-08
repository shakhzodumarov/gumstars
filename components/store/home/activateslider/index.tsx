import React from 'react';
import Image from 'next/image';


import styles from './activate.module.scss'; // Importing SCSS module


const ActiveSlider: React.FC = () => {
  return (
    <article className="card">
      {/* <Image
        className="card__background"
        src="h"
        alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
        width="1920"
        height="2193"
      /> */}
      <div className={styles.card__content}>
        <div className="card__content--container flow">
          <h2 className={styles.card__title}>Colombia</h2>
          <p className={styles.card__description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
            labore laudantium deserunt fugiat numquam.
          </p>
        </div>
        <button className={styles.card__button}>Read more</button>
      </div>
    </article>
  );
};

export default ActiveSlider;
