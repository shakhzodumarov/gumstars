"use client";

import styles from "./productBoard.module.scss";
import { useState } from "react";
import { TProductBoard } from "@/types/product";

import {useTranslations} from 'next-intl';

const ProductBoard = ({ boardData }: { boardData: TProductBoard }) => {

  const t = useTranslations('Navbar');

  const { name, id, isAvailable, shortDesc, defaultQuantity } = boardData;
  const [quantity, setQuantity] = useState(defaultQuantity > 1 ? defaultQuantity : 1);


  const cartItemData = {
    productId: id,
    quantity: quantity,
  };

  return (
    <div className={styles.productBoard}>
      <h1>{name}</h1><hr />
      <span className={styles.shortDesc}>{shortDesc}</span>
      
      <section className={styles.addToCartSection}>
      </section>

    </div>
  );
};

export default ProductBoard;








