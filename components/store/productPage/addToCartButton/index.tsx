"use client";
import React from "react";
import styles from "./addToCartButton.module.scss"; // Adjust path to your SCSS
import {useTranslations} from 'next-intl';


interface Props {
  cartItemData: { productId: string; quantity: number };
  disabled: boolean;
  onClick: () => void; // onClick handler passed down from parent
}

const AddToCartButton = ({ cartItemData, disabled, onClick }: Props) => {
  const t = useTranslations('Products');
  return (
    <button
      className={styles.addToCartButton}
      disabled={disabled}
      onClick={onClick}  // Trigger the pop-up when clicked
    >
      {disabled ? t('blogdesczeroclick') : t('blogdesczeroclick')}
    </button>
  );
};

export default AddToCartButton;

