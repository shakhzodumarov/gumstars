"use client";

import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './Gallery.module.scss';
import { useTranslations } from 'next-intl';



const Partners = () => {
  const t = useTranslations('Blogers');
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: ''
  });




  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your API
    alert('Thank you for your interest in becoming a partner! We will contact you soon.');
  };

  return (
    <div className={styles.partnersPage}>
      <Image
      src={"/images/images/image.png"}
      alt='img'
      width={800}
      height={800}
      className={styles.wentonmy}
      />
      <Image
      src={"/images/images/orv.png"}
      alt='img'
      width={500}
      height={500}
      className={styles.wentonmys}
      />
      <Head>
        <title>{t('latesttovars')}</title>
        <meta name="description" content={t('latesttovars')} />
      </Head>

      {/* Header Section */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('latesttovars')}</h1>
          <p className={styles.subtitle}>{t('viewall')}</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('wideadtitleone')}</h2>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.formLabel}>{t('latesttovarscontact')}</label>
              <input 
                type="text" 
                id="company" 
                name="company"
                className={styles.formControl} 
                value={formData.company}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>{t('viewallmesage')}</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className={styles.formControl} 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>{t('wideadtitleonethanks')}</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className={styles.formControl} 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>{t('newest')}</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                className={styles.formControl} 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="website" className={styles.formLabel}>{t('oldest')}</label>
              <input 
                type="url" 
                id="website" 
                name="website"
                className={styles.formControl} 
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="submit" className={styles.submitBtn}>{t('mostExpensive')}</button>
          </form>
        </div>
        <Image
      src={"/images/images/orv.png"}
      alt='img'
      width={500}
      height={500}
      className={styles.wentonmyss}
      />
      <Image
      src={"/images/images/image.png"}
      alt='img'
      width={600}
      height={600}
      className={styles.wentonmry}
      />
      </section>
    </div>
  );
};

export default Partners;