"use client";
import React from 'react';
import styles from './InteractiveManufacturingImage.module.scss';
import { useTranslations } from 'next-intl';

interface InteractiveManufacturingImageProps {
  imageSrc: string;
  imageAlt: string;
}

const InteractiveManufacturingImage: React.FC<InteractiveManufacturingImageProps> = ({
  imageSrc = "/api/placeholder/1200/800",
  imageAlt = "Manufacturing facility layout"
}) => {
  const t = useTranslations('HomePage');

  return (
    <div className={styles.container}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.image}
      />
    </div>
  );
};

export default InteractiveManufacturingImage;