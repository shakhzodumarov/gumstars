import styles from "./productCard.module.scss";

import Image from "next/image";
// import Link from "next/link";
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

import { TProductCard } from "@/types/common";

const ProductCard = ({
  name,
  imgUrl,
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
        <Image src={imgUrl[0]} alt={name} fill sizes="(max-width: 240px)" />
        <Image src={imgUrl[1]} alt={name} fill sizes="(max-width: 240px)" />
      </div>
      <div className={styles.textwrapper}> 
      <span className={styles.title}>{name}</span>
      {/* <div className={styles.specWrapper}>
</div> */} </div>

      {/* <div className={styles.bottomSection}>
   <Link href={url} className={styles.linkbutton}> 
        <button>
        Узнать больше
        </button>
        </Link>

      </div> */}
    </Link>
  );
};

export default ProductCard;
