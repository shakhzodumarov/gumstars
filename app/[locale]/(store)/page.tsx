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
  const sectionNames = ['Asosiy', 'Biz Haqimizda', 'Katalog', 'Hamkorlar', 'Muloqot', 'Kontakt'];
  
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
              title="Transform Your Digital Experience"
              description="We create innovative solutions that help businesses thrive in the digital landscape. Our cutting-edge technology and creative approach deliver exceptional results for our clients."
              videoSrc="/images/images/gumstarr.mp4"
            
              primaryButton={{
                label: "Get Started",
                href: "/contact"
              }}
              secondaryButton={{
                label: "Learn More",
                href: "/about"
              }}
            />
          </section>
          
          <section id="statistics">
            <StatisticsCard
              title="Product Performance"
              description="Our flagship product has exceeded expectations across all key performance indicators. The latest quarterly report shows significant growth in user adoption and revenue generation while maintaining high satisfaction rates."
              imageUrl="/images/images/busines.jpg"
              imageAlt="Product performance"
      
            />
          </section>
          
          <section id="trending">
            <TrandingSlider/>
          </section>
          
          <section id="content">
            <HomeContent/>
          </section>
          
          <section id="contact-section">
            <ContactSection
              title="Get in Touch"
              subtitle="We're here to help you succeed"
              description="Have questions about our services? Need to schedule a consultation? 
                          Our team is ready to assist you with any inquiries you may have. 
                          Fill out the form and we'll get back to you within 24 hours. 
                          Your business needs are our top priority."
              ctaText="Send Message"
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

