"use client";
import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '../../i18n/routing';
import styles from './languageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const locale = useLocale(); // Get the current locale
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      {/* Button to toggle the dropdown */}
      <button 
        className={`${styles.switchBtn} ${isDropdownOpen ? styles.active : ''}`} 
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen ? 'true' : 'false'} // Correct aria-expanded value
      >
        {locale === 'uz' ? 'UZ' : locale === 'en' ? 'EN' : 'RU'}
        <span className={styles.arrow}></span>
      </button>

      {/* Dropdown menu */}
      <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
        <Link href="/" locale={locale === 'uz' ? 'en' : locale === 'en' ? 'ru' : 'uz'} passHref>
          <button className={styles.dropdownItem}>
            {locale === 'uz' ? 'EN' : locale === 'en' ? 'RU' : 'UZ'}
          </button>
        </Link>

        {/* Second option */}
        <Link href="/" locale={locale === 'uz' ? 'ru' : locale === 'en' ? 'uz' : 'en'} passHref>
          <button className={styles.dropdownItem}>
            {locale === 'uz' ? 'RU' : locale === 'en' ? 'UZ' : 'EN'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
