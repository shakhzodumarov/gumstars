"use client";

import styles from "./page.module.scss";
import { useTranslations } from 'next-intl';
import HomeContent from "@/components/homecontent";
import StatisticsCard from "@/components/statisticss";
import ContactSection from "@/components/contactSection";
import HeroSection from "@/components/herosection";
import Contact from "@/components/contactform";
import TrandingSlider from "@/components/carousel";
import NavigationDots from "@/components/navigationdots";

export default function Home() {
  const t = useTranslations('HomePage');
  
  const stats = [
    { value: '87%', label: 'Customer Satisfaction' },
    { value: '24K+', label: 'Active Users' },
    { value: '$2.4M', label: 'Revenue Generated' }
  ];
  
  // Section IDs for navigation dots
  const sectionIds = ['hero', 'statistics', 'trending', 'content', 'contact-section', 'contact-form'];
  const sectionNames = [t('viewall'), t('wideadtitleone'), t('wideadtitletwo'), t('latestnews'), t('blogtitlezero'), t('blogtitlezero')];
  
  const handleFormSubmit = (formData: {
    name: string;
    phoneNumber: string;
    reason: string;
  }) => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend API
    alert('Form submitted successfully!');
  };
  
  return (
    <>
      {/* Main content */}
      <div className={styles.homePage}>
        <div>
          <section id="hero">
            <HeroSection
              title={t('title')}
              description={t('about')}
              videoSrc="/images/images/gums.mp4"
            
              primaryButton={{
                label: t('loading'),
                href: "/company"
              }}
              secondaryButton={{
                label: t('latesttovars'),
                href: "/all"
              }}
            />
          </section>
          
          <section id="statistics">
            <StatisticsCard
              title={t('wideadtitleone')}
              description={t('blogtitletwo')}
              imageUrl="/images/images/zavods.jpg"
              imageAlt="Product performance"
      
            />
          </section>
          
          <section id="trending">
            <TrandingSlider/>
          </section>
          
          <section id="content">
            <HomeContent/>
          </section>
          <br />
          <br />
          <br />
          <br />
          <br /><br />
          <br />
          <br />
          <section id="contact-section">
            <ContactSection
              title={t('callaccessoriestwo')}
              subtitle="We're here to help you succeed"
              description={t('callaccessoriesthree')}
              ctaText={t('niggaonetwo')}
              onSubmit={handleFormSubmit}
            />
          </section>
          
          <section id="contact-form">
            <Contact/>
          </section>
        </div>
        
        {/* Navigation Dots */}
        <NavigationDots sectionIds={sectionIds} sectionNames={sectionNames} />
      </div>
    </>
  );
}

