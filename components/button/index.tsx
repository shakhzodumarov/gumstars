import React from "react";
import styles from './Button.module.scss';

const Button: React.FC<{ classes: string; title: string; icon: React.ReactNode; link: string }> = ({ classes, title, icon, link }) => {
  return (
    <a
      className={`${styles.button} ${styles.aboutBtn} ${classes}`}
      target="_blank"
      href={link}
      rel="noopener noreferrer"
    >
      {title}
      {icon}
      <span className={`${styles.hoverBtn} ${styles.hoverBx}`}></span>
      <span className={`${styles.hoverBtn} ${styles.hoverBx2}`}></span>
      <span className={`${styles.hoverBtn} ${styles.hoverBx3}`}></span>
      <span className={`${styles.hoverBtn} ${styles.hoverBx4}`}></span>
    </a>
  );
};

export default Button;
