"use client";

// components/Gallery.tsx
// pages/partners.tsx
import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './Gallery.module.scss';

// Define partner company type
interface PartnerCompany {
  id: number;
  name: string;
  logo: string;
}

// Define benefit card type
interface BenefitCard {
  id: number;
  title: string;
  description: string;
}

const Partners = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: ''
  });

  // Sample partner companies
  const partnerCompanies: PartnerCompany[] = [
    { id: 1, name: 'Company One', logo: '/images/images/88.png' },
    { id: 2, name: 'Company Two', logo: '/images/images/89.png' },
    { id: 3, name: 'Company Three', logo: '/images/partner3.png' },
    { id: 4, name: 'Company Four', logo: '/images/partner4.png' },
    { id: 5, name: 'Company Five', logo: '/images/partner5.png' },
    { id: 6, name: 'Company Six', logo: '/images/partner6.png' },
  ];

  // Partnership benefits
  const benefitCards: BenefitCard[] = [
    { id: 1, title: 'Expanded Reach', description: 'Gain access to our established customer base and expand your market reach through joint marketing initiatives.' },
    { id: 2, title: 'Technical Support', description: 'Receive priority technical support, training, and implementation assistance from our expert team.' },
    { id: 3, title: 'Co-Marketing', description: 'Leverage our marketing resources for joint campaigns, case studies, and events to boost visibility.' },
    { id: 4, title: 'Revenue Growth', description: 'Unlock new revenue streams through our competitive commission structure and referral program.' },
    { id: 5, title: 'Innovation Access', description: 'Get early access to product roadmaps, beta features, and the ability to influence future developments.' },
    { id: 6, title: 'Networking Opportunities', description: 'Connect with other partners and industry leaders at exclusive events and partner summits.' },
  ];

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
        <title>Partner With Us</title>
        <meta name="description" content="Join our network of trusted partners" />
      </Head>

      {/* Header Section */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Partner With Us</h1>
          <p className={styles.subtitle}>Join our growing network of industry-leading partners and unlock new opportunities for growth and innovation. Join our growing network of industry-leading Join our growing network of industry-leading</p>
        </div>
      </section>

      {/* Partners Slider */}
      <section className={styles.partnersSlider}>
        <div className={styles.container}>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderTrack}>
              {/* Display partner logos twice for continuous animation */}
              {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
                <div key={`${company.id}-${index}`} className={styles.sliderItem}>
                  {/* Using placeholder for demo, replace with actual Image component later */}
                  <div className={styles.logoPlaceholder}>
                    {company.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  
     

      {/* Contact Form */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Become a Partner Today</h2>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.formLabel}>Company Name*</label>
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
              <label htmlFor="name" className={styles.formLabel}>Contact Name*</label>
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
              <label htmlFor="email" className={styles.formLabel}>Email Address*</label>
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
              <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
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
              <label htmlFor="website" className={styles.formLabel}>Company Website</label>
              <input 
                type="url" 
                id="website" 
                name="website"
                className={styles.formControl} 
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="partnershipType" className={styles.formLabel}>Partnership Type</label>
              <select 
                id="partnershipType" 
                name="partnershipType"
                className={styles.formControl}
                value={formData.partnershipType}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="technology">Technology Partner</option>
                <option value="solution">Solution Partner</option>
                <option value="reseller">Reseller</option>
                <option value="referral">Referral Partner</option>
              </select>
            </div>
            <button type="submit" className={styles.submitBtn}>Submit Application</button>
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