"use client";
import React from "react";
import styles from "./rassrochkaButton.module.scss";

interface Props {
  cartItemData: { productId: number; quantity: number };
  disabled: boolean;
  onClick: () => void; 
}

const RassrochkaButton = ({ cartItemData, disabled, onClick }: Props) => {
  return (
    <button
      className={styles.addToCartButton}
      disabled={disabled}
      onClick={onClick}  
    >
      {disabled ? "купить в 1 клик" : "купить в 1 клик"}
    </button>
  );
};

export default RassrochkaButton;