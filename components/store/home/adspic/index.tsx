import Image from "next/image";
import styles from "./adspic.module.scss";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface IProps {
  imgUrl: string;
  linkText?: string;
  url: string;
  title: string;
  isLightBG?: boolean;
  smallTitle: string;
}

const AdsPic = ({
  imgUrl,
  linkText,
  smallTitle,
  title,
  url,
  isLightBG = false,
}: IProps) => {
  // Initialize the translations hook
  const t = useTranslations('Widead');

  // Set default linkText if it's not provided
  const defaultLinkText = linkText || t('title');

  return (
    <div
      className={`${styles.wideAd} ${isLightBG ? styles.darkText : styles.darkText}`}
    >
      <span>{smallTitle}</span>
      <h3>{title}</h3>
      <Link href={url}>{defaultLinkText}</Link>
      <Image src={imgUrl} width={150} height={150} alt={title} sizes="(max-width:240px)" className={styles.images} />
    </div>
  );
};

export default AdsPic;

