import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS for styling
import styles from './ContactSection.module.scss';
import Image from 'next/image';

interface ContactFormData {
  name: string;
  phoneNumber: string;
  reason: string;
}

interface ContactSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  onSubmit?: (formData: ContactFormData) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText = "Submit",
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phoneNumber: '',
    reason: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for contact';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.(formData);
      // Optional: Reset form after successful submission
      // setFormData({ name: '', phoneNumber: '', reason: '' });
    }
  };

  return (
    <div className={styles.contactSection}>
      <Image
      src={"/images/images/image.png"}
      alt='img'
      width={800}
      height={800}
      className={styles.imagesback}
      />
      <Image
      src={"/images/images/adobepr.png"}
      alt='img'
      width={800}
      height={800}
      className={styles.imagesbackes}
      />
      <div className={styles.contentColumn}>
        <h2 className={styles.title}>{title}</h2>
        {/* <h3 className={styles.subtitle}>{subtitle}</h3> */}
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.formColumn}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
            <PhoneInput
              international
              defaultCountry="UZ"
              value={formData.phoneNumber}
              onChange={phone => setFormData(prev => ({ ...prev, phoneNumber: phone || '' }))}
              className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ''} ${styles.phoneinput}`}
              placeholder="Enter your phone number"
             
            />
            {errors.phoneNumber && <span className={styles.errorMessage}>{errors.phoneNumber}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reason" className={styles.label}>Reason for Contact</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.reason ? styles.inputError : ''} ${styles.PhoneInput}`}
              placeholder="Tell us why you're reaching out"
              rows={4}
            />
            {errors.reason && <span className={styles.errorMessage}>{errors.reason}</span>}
          </div>

          <button type="submit" className={styles.submitButton}>
            {ctaText}
          </button>
        </form>
      </div>
      <Image
      src={"/images/images/image.png"}
      alt='img'
      width={800}
      height={800}
      className={styles.imagesbacks}
      />
    </div>
  );
};

export default ContactSection;
