import styles from "./recentCard.module.scss";
import Image from "next/image";
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import { TProductCard } from "@/types/common";

const RecentCard = ({
  name,
  imgUrl,
  // specs,
  url,
  isAvailable = true,
  staticWidth = false,
}: TProductCard) => {
  
  const t = useTranslations('Productcard');
  
  return (
    <Link
      href={url}
      className={`${styles.productCard} ${staticWidth && styles.staticWidth} `}
    >
      {!isAvailable && (
        <div className={styles.outOfStock}>
          <span> {t('about')}</span>
        </div>
      )}
      <div className={styles.imageWrapper}>
        <Image src={imgUrl} alt={name} fill sizes="(max-width: 240px)" />
      </div>
      <div className={styles.textwrapper}>
        <span className={styles.title}>{name}</span>
        {/* <div className={styles.specWrapper}></div> */}
      </div>
    </Link>
  );
};

export default RecentCard;

