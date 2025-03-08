"use client";

import React, { useState, useEffect } from 'react';
import styles from './NavigationDots.module.scss';

interface NavDotProps {
  sectionIds: string[];
  sectionNames: string[];
}

const NavigationDots: React.FC<NavDotProps> = ({ sectionIds, sectionNames }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id));
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Find the current section
      let currentSectionIndex = 0;
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionIndex = index;
          }
        }
      });
      
      setActiveSection(currentSectionIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);
  
  const scrollToSection = (index: number) => {
    const section = document.getElementById(sectionIds[index]);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className={styles.navDotsContainer}>
      <div className={styles.dotsWrapper}>
        {sectionIds.map((_, index) => (
          <div 
            key={index}
            className={`${styles.dotItem} ${index === activeSection ? styles.active : ''}`}
            onClick={() => scrollToSection(index)}
          >
            <div className={styles.dot}></div>
            <div className={styles.dotTooltip}>{sectionNames[index]}</div>
          </div>
        ))}
        <div className={styles.dotsLine}></div>
      </div>
    </div>
  );
};

export default NavigationDots;