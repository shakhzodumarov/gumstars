"use client";
// pages/contact.tsx
import React from 'react';

import styles from './contact.module.scss';
import ContactForm from '@/components/contactform';
import Map from '@/components/map';


const Contact: React.FC = () => {
  

  return (
    <div className={styles.contactContainer}>
      <ContactForm/>
      <br />
      <br />
      {/* <Map/> */}
    </div>
  );
};

export default Contact;
