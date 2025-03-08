"use client";
import { TAddCategory } from "@/actions/category/category";
import styles from "./addCategory.module.scss";

interface IProps {
  errorMsg: string;
  data: TAddCategory;
  onChange: (data: TAddCategory) => void;
}

const AddCategory = ({ data, errorMsg, onChange }: IProps) => {
  return (
    <div className={styles.addCategory}>
      <div className={styles.row}>
        <span className={styles.col1}>Название категории:</span>
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

export default AddCategory;
