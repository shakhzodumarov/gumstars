"use client";
import React from 'react';
import styles from './TextImageComponent.module.scss';

interface TextImageComponentProps {
  title?: string;
  subtitle?: string;
  description?: string[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeText?: string;
}

const TextImageComponent: React.FC<TextImageComponentProps> = ({
  title = "Innovative Solutions",
  subtitle = "Transforming ideas into reality",
  description = [
    "Our team of experts works tirelessly to deliver cutting-edge solutions that meet your business needs. With years of experience in the industry, we understand the challenges you face and are committed to helping you overcome them.",
    "Whether you're looking to streamline your operations, enhance customer experience, or break into new markets, we have the expertise and tools to support your journey."
  ],
  primaryButtonText = "Learn More",
  secondaryButtonText = "Contact Us",
  imageSrc = "/images/images/zavod.jpg",
  imageAlt = "Innovative business solutions",
  badgeText = "Featured"
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>{title}</h2>
          
          {description.map((paragraph, index) => (
            <p key={index} className={styles.description}>
              {paragraph}
            </p>
          ))}
          
        </div>
        
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className={styles.image}
            />
            {/* {badgeText && <div className={styles.imageBadge}>{badgeText}</div>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImageComponent;