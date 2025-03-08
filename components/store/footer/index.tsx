import Image from "next/image";
import styles from "./footer.module.scss";
// import Link from "next/link";
import {Link} from '@/i18n/routing';
import {
  FacebookIcon,
  InstagramIcon,
} from "@/components/icons/svgIcons";
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footter');
  return (
    <footer className={styles.storeFooter}>
      <div className={`${styles.footerWrapper} storeContainer`}>
      </div>
      <section className={styles.bottom}>
        <div className={`${styles.footerWrapper} storeContainer`}>
          <span>{t('blogdescone')} <Link href={"https://www.smkweb.com/"}>SMK WEB</Link></span>
          <div className={styles.legal}>
        
          </div>
          <div className={styles.social}>
            <Link href={"https://www.instagram.com/"}>
              <InstagramIcon width={20} strokeWidth={0} />
            </Link>
            <Link href={"https://www.facebook.com"}>
              <FacebookIcon width={20} strokeWidth={0} />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
