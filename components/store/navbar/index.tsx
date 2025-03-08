"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./navbar.module.scss";
import { BiLogoFacebook, BiPhoneCall } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive';

const StoreNavBar = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const [hideNavbar, setHideNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Define transparent pages
  const transparentPages = ['/', '/all'];
  const isTransparentPage = transparentPages.includes(pathname);

  useEffect(() => {
    let prevPositionY = 0;
    if (typeof window !== "undefined") prevPositionY = window.scrollY;
    
    const handleScroll = () => {
      // Hide navbar on scroll down and show on scroll up
      if (typeof window !== "undefined") {
        prevPositionY < window.scrollY && window.scrollY > 100
          ? setHideNavbar(true)
          : setHideNavbar(false);
        
        // Change background color when scrolled past 100px
        setScrolled(window.scrollY > 100);
        
        prevPositionY = window.scrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`${styles.navbar} 
        ${hideNavbar && styles.hideNavbar} 
        ${scrolled ? styles.scrolled : ''} 
        ${isTransparentPage && !scrolled ? styles.transparent : ''}
        ${menuOpen ? styles.menuOpen : ''}`}
    >
      <div className={`${styles.navbarContent} storeContainer`}>
        <Link href={"/"} className={styles.logo}>
          <Image
            src={"/images/images/gumstar.png"}
            className={styles.imagelogo}
            width={100}
            height={100}
            alt="logo"
          />
        </Link>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.navContainer}>
          <ul className={`${styles.navLinks}`}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : ''}>
                Asosiy
                <span className={styles.linkUnderline}></span>
              </Link>
            </li>
            <li>
              <Link href="/company" className={pathname === '/company' ? styles.active : ''}>
                kompaniya haqida
                <span className={styles.linkUnderline}></span>
              </Link>
            </li>
            <li>
              <Link href="/all" className={pathname === '/all' ? styles.active : ''}>
                mahsulotlar
                <span className={styles.linkUnderline}></span>
              </Link>
            </li>
            <li>
              <Link href="/partners" className={pathname === '/partners' ? styles.active : ''}>
                hamkorlik
                <span className={styles.linkUnderline}></span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className={pathname === '/contact' ? styles.active : ''}>
                aloqa
                <span className={styles.linkUnderline}></span>
              </Link>
            </li>
          </ul>

          <div className={styles.navRight}>
            <LanguageSwitcher />

            <div className={styles.social}>
              <Link href={"https://www.instagram.com/"}><BsInstagram width={50} strokeWidth={0} /></Link>
              <Link href={"https://www.facebook.com/"}><BiLogoFacebook width={50} strokeWidth={0} /></Link>
            </div>

            <div className={styles.phoneNumber}>
              <Link href="tel:+998974444082">+998 97 444-40-82</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StoreNavBar;