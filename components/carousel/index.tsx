"use client";

import React, { useEffect, useState } from 'react';
import styles from './Carousel.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';

const AutoImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const slides = [
    {
      id: 1,
      title: "PLIX",
      description: "House special with secret sauce",
      price: "Biz bilan mazali saqichlar kolleksiyasini kashf eting",
      image: "/images/images/plix.png",
      color: "#3D8D7A"
    },
    {
      id: 2,
      title: "PULPY",
      description: "Fresh from our wood-fired oven",
      price: "Biz bilan mazali saqichlar kolleksiyasini kashf eting",
      image: "/images/images/pulpy.jpg",
      color: "#16C47F"
    },
    {
      id: 3,
      title: "ALIF",
      description: "Handmade daily with local ingredients",
      price: "Biz bilan mazali saqichlar kolleksiyasini kashf eting",
      image: "/images/images/88.png",
      color: "#15B392"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 4000); // Change slide every 5 seconds
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className={styles.autoSliderContainer}>
      <div className={styles.sliderWrapper}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className={styles.slide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ 
              backgroundColor: `${slides[currentIndex].color}15` // Light version of the color
            }}
          >
            <div className={styles.slideContent}>
              <div className={styles.textContent}>
                <span className={styles.slideNumber}>
                  {currentIndex + 1}/{slides.length}
                </span>
                <h2 
                  className={styles.slideTitle}
                  style={{ color: slides[currentIndex].color }}
                >
                  {slides[currentIndex].title}
                </h2>
                {/* <p className={styles.slideDescription}>
                  {slides[currentIndex].description}
                </p> */}
                <div className={styles.priceTag} style={{ backgroundColor: slides[currentIndex].color }}>
                  {slides[currentIndex].price}
                </div>
                <Link
                href={"/all"}
                >
                <button 
                  className={styles.orderButton}
                  style={{ 
                    backgroundColor: slides[currentIndex].color,
                    boxShadow: `0 4px 15px ${slides[currentIndex].color}80`
                  }}
                >
                  batafsil
                </button></Link>
              </div>
              <div className={styles.imageContainer}>
                <div 
                  className={styles.imageWrapper}
                  style={{ boxShadow: `0 20px 30px ${slides[currentIndex].color}40` }}
                >
                  <div className={styles.imageBackground} style={{ backgroundColor: slides[currentIndex].color }}></div>
                  <img 
                    src={slides[currentIndex].image} 
                    alt={slides[currentIndex].title} 
                    className={styles.slideImage} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.sliderControls}>
          <button 
            className={`${styles.controlButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={() => goToSlide(index)}
                style={{ 
                  backgroundColor: index === currentIndex ? slides[currentIndex].color : 'transparent',
                  borderColor: index === currentIndex ? slides[currentIndex].color : '#ccc' 
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className={`${styles.controlButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Next slide"
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
      </div>
    </section>
  );
};

export default AutoImageSlider;