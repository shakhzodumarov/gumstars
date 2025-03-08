// HeroSection.tsx
import React from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.scss';

interface ButtonProps {
  label: string;
  href: string;
  primary?: boolean;
}

interface HeroSectionProps {
  title: string;
  description: string;
  videoSrc: string;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  videoSrc,

  primaryButton,
  secondaryButton
}) => {
  return (
    <section className={styles.heroSection}>
      {/* Background Video */}
      <div className={styles.videoContainer}>
        <video 
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
      </div>
      
      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.buttonGroup}>
            <Link href={primaryButton.href} className={styles.primaryButton}>
              {primaryButton.label}
            </Link>
            <Link href={secondaryButton.href} className={styles.secondaryButton}>
              {secondaryButton.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;