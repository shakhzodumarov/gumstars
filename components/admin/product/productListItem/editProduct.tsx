"use client";
import { useEffect, useState } from "react";
import styles from "./editProduct.module.scss";
import { TAddProductFormValues } from "@/types/product";
import { getAllCategories } from "@/actions/category/category"; // Assuming you have this
import { getOneProduct } from "@/actions/product/product";

interface IProps {
  data: TAddProductFormValues;
  errorMsg: string;
  onChange: (data: TAddProductFormValues) => void;
}

const EditProduct = ({ data, errorMsg, onChange }: IProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullProductData, setFullProductData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories for the dropdown
        const categoriesResponse = await getAllCategories();
        if (categoriesResponse.res) {
          setCategories(categoriesResponse.res);
        }
        
        // If we have more complete product data, set it here
        // This assumes you have a way to get the complete product by ID
        if (data && data.name) {
          //@ts-ignore
          const productResponse = await getOneProduct(data.id);
          if (productResponse.res) {
            setFullProductData(productResponse.res);
            
            // Update the form data with the complete product info
            onChange({
              ...data,
              name: productResponse.res.name,
              desc: productResponse.res.desc || "",
              categoryID: productResponse.res.category.id,
              images: productResponse.res.images,
              specifications: productResponse.res.specs || [],
              isAvailable: productResponse.res.isAvailable
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: keyof TAddProductFormValues, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.editProduct}>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      
      <div className={styles.formGroup}>
        <label>Название:</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="..."
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Описание:</label>
        <textarea
          value={data.desc || ""}
          onChange={(e) => handleChange("desc", e.target.value)}
          placeholder="..."
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Категория:</label>
        <select
          value={data.categoryID}
          onChange={(e) => handleChange("categoryID", e.target.value)}
          
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Доступность:</label>
        <input
          type="checkbox"
          checked={data.isAvailable}
          onChange={(e) => handleChange("isAvailable", e.target.checked)}
          placeholder="..."
        />
      </div>
      
      {/* Images section */}
      <div className={styles.formGroup}>
        <label>Изображения:</label>
        <div className={styles.imagesList}>
          {/* @ts-ignore */}
          {data.images && data.images.map((img, index) => (
            <div key={index} className={styles.imageItem}>
              <img src={img} alt={`Product ${index}`} width="50" height="50" />
              <button
                type="button"
                onClick={() => {
                  const newImages = data.images;
                  //@ts-ignore
                  newImages.splice(index, 1);
                  handleChange("images", newImages);
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        {/* Image upload functionality would go here */}
      </div>
      
      {/* Specifications editing would be more complex - basic implementation: */}
      <div className={styles.formGroup}>
        <label>Технические характеристики:</label>
        {data.specifications && data.specifications.map((spec, index) => (
          <div key={index} className={styles.specGroup}>
            <p>Group ID: {spec.specGroupID}</p>
            <ul>
              {spec.specValues.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProduct;