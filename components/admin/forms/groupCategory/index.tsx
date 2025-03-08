"use client";
import { useState } from "react";
import styles from "./groupCategory.module.scss";
import { TGetAllCategories } from "@/actions/category/category";

interface IProps {
  errorMsg: string;
  data: TGetAllCategories;
  onChange: (data: TGetAllCategories) => void;
}

const GroupCategory = ({ errorMsg, data, onChange }: IProps) => {
  return (
    <div className={styles.groupCategoryForm}>
      <div className={styles.row}>
        <span className={styles.col1}>Название группы категорий:</span>
        <input
          name="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.currentTarget.value })}
          type="text"
          placeholder="имя..."
        />
      </div>
      <div className={styles.row}>
        <span className={styles.col1}>URL-адрес:</span>
        <input
          name="url"
          onChange={(e) => onChange({ ...data, url: e.currentTarget.value })}
          type="text"
          placeholder="URL-адрес..."
          value={data.url}
        />
      </div>
      
      {errorMsg !== "" && (
        <div className={styles.row}>
          <span className={styles.error}>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default GroupCategory;
