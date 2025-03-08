"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './BoxAnimation.module.scss';

const MultiImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = useRef(null);
  
  // Sample images - replace with your actual images
  const images = [
    { id: 1, src: "/images/images/busines.jpg", alt: "Image 1" },
    { id: 2, src: "/images/images/busines.jpg", alt: "Image 2" },
    { id: 3, src: "/images/images/busines.jpg", alt: "Image 3" },
    { id: 4, src: "/images/images/busines.jpg", alt: "Image 4" },
    { id: 5, src: "/images/images/busines.jpg", alt: "Image 5" },
    { id: 6, src: "/images/images/busines.jpg", alt: "Image 6" },
    { id: 7, src: "/images/images/busines.jpg", alt: "Image 7" },
    { id: 8, src: "/images/images/busines.jpg", alt: "Image 8" },
  ];

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 2000); // Change slide every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (sliderRef.current) {
      //@ts-ignore
      sliderRef.current.scrollTo({
        //@ts-ignore
        left: index * (sliderRef.current.offsetWidth / 3),
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % (images.length - 2);
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + (images.length - 2)) % (images.length - 2);
    goToSlide(newIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.hovertext}>
      {/* <h1>Fabrika Haqida</h1> */}
    <div className={styles.multiSliderContainer}>
      <div className={styles.sliderWrapper}>
        <div 
          ref={sliderRef}
          className={styles.sliderTrack}
          style={{
            width: '100%',
            transform: `translateX(-${activeIndex * (100 / 3)}%)`
          }}
        >
          {images.map((image) => (
            <div key={image.id} className={styles.slide}>
              <div className={styles.imageWrapper}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className={styles.slideImage} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          className={`${styles.controlButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div className={styles.dotsContainer}>
          {images.slice(0, images.length - 2).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className={`${styles.controlButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <button 
          className={`${styles.controlButton} ${styles.playPauseButton}`}
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      </div>
    </div></div>
  );
};

export default MultiImageSlider;