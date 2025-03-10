import React from 'react';
import Image from 'next/image';
import styles from './StatisticsCard.module.scss';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';


interface StatisticsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
}) => {
  const t = useTranslations('HomePage');
  return (
    <div className={styles.card}>
      {/* Title Section */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Middle Section */}
      <div className={styles.contentSection}>
        <div className={styles.imageContainer}>
          <Image 
            src={imageUrl} 
            alt={imageAlt} 
            fill 
            className={styles.image}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{description}</p>
          <br />
          <Link
          href={"/about"}
          className={styles.tamombuttom}
          >
          <button>{t('blogtitlethree')}</button></Link>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
