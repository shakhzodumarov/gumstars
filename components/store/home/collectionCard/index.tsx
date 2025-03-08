import styles from "./collectionCard.module.scss";
import Image from "next/image";
import { TCollectionCard } from "@/types/collections";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface IProps {
  collection: TCollectionCard;
}

const CollectionCard = ({ collection }: IProps) => {
  const t = useTranslations("HomePage");

  return (
    <div>
      <div className={styles.collectionCard}>
        <div className={styles.leftCol}>
          <h2>{collection.name}</h2>
          {collection.collections.map((collection, index) => (
            <p key={index}>{collection.label}</p>
          ))}
        </div>

        <div className={styles.imageWrapper}>
          <Image src={collection.imgUrl} alt={collection.name} fill sizes="(max-width:140px)" />
        </div>
      </div>
      <br />
      <br />
      <div className={styles.wrapper}>
        <Link href={collection.url} className={styles.linkwrapper}>
          <a>{t("niggasinparisthreee")}</a>
          <div className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
