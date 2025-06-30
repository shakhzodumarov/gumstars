"use client";

import styles from "./productBoard.module.scss";
import { useState } from "react";
import { TProductBoard } from "@/types/product";
import { useLocale } from 'next-intl';

const ProductBoard = ({ boardData }: { boardData: TProductBoard }) => {
  const locale = useLocale(); // Get the current locale
  const { name, id, isAvailable, shortDesc, shortDescrus, shortDescuzb, defaultQuantity } = boardData;
  const [quantity, setQuantity] = useState(defaultQuantity > 1 ? defaultQuantity : 1);
  
  const cartItemData = {
    productId: id, 
    quantity: quantity,
  };

  // Determine which description to show based on the locale
  const getLocalizedDescription = () => {
    switch (locale) {
      case 'en':
        return shortDesc;
      case 'ru':
        return shortDescrus;
      case 'uz':
        return shortDescuzb;
      default:
        return shortDescuzb; // Fallback to English
    }
  };

  return (
    <div className={styles.productBoard}>
      <h1>{name}</h1> <hr />
      <span className={styles.shortDesc}>{getLocalizedDescription()}</span>
      
      <section className={styles.addToCartSection}>
      </section>
    </div>
  );
};

export default ProductBoard;







