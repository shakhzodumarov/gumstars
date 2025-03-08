import styles from "./catListItem.module.scss";

import Image from "next/image";
// import Link from "next/link";
import {Link} from '@/i18n/routing';

import { TGroupJSON } from "@/types/categories";

const CategoryListItem = ({ categoryData }: { categoryData: TGroupJSON }) => {
  const { categories, group } = { ...categoryData };
  return (
    <li className={styles.categoryItem}>
      <Link href={"/list/" + group.url}>
      
        {group.name}
      </Link>
      <div>
        {categories && categories.length > 0 && (
          <Image
            className={styles.arrow}
            src={"images/icons/arrowIcon01.svg"}
            width={6}
            height={10}
            alt=""
          />
        )}
      </div>
      {categories && categories.length > 0 && (
        <div className={styles.subCat}>
          {categories.map((item, index) => (
            <div className={styles.catGroup} key={index}>
              <Link href={"/list/" + group.url + "/" + item.category.url}>
                {item.category.name}
              </Link>

              {item.subCategories && item.subCategories?.length > 0 ? (
                <div className={styles.children}>
                  {item.subCategories.map((link, index) => (
                    <Link
                      key={index}
                      href={
                        "/list/" +
                        group.url +
                        "/" +
                        item.category.url +
                        "/" +
                        link.url
                      }
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default CategoryListItem;
