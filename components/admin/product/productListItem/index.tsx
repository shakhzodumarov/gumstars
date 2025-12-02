"use client";
import { deleteProduct, updateProduct, getOneProduct } from "@/actions/product/product";
import styles from "./productListItem.module.scss";

import Button from "@/components/UI/button";
import Popup from "@/components/UI/popup";
import { TAddProductFormValues, TProductListItem } from "@/types/product";
import { useState, useCallback } from "react";
import EditProduct from "./editProduct";

interface IProps {
  data: TProductListItem;
  requestReload: () => void;
}

const ProductListItem = ({ data, requestReload }: IProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [productData, setProductData] = useState<TAddProductFormValues | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteProduct(data.id);
    if (response.error) {
      setIsLoading(false);
      setErrorMsg(response.error);
    }
    if (response.res) {
      setIsLoading(false);
      setErrorMsg("");
      setShowDelete(false);
      requestReload();
    }
  };

  const handleEdit = async () => {
    if (!productData) {
      setErrorMsg("No product data to update");
      return;
    }
    
    console.log("=== UPDATING PRODUCT ===");
    console.log("Product data being sent:", productData);
    
    if (!productData.images) {
      setErrorMsg("Please upload an image before submitting!");
      return;
    }
    
    if (!productData.name) {
      setErrorMsg("Please enter a product name!");
      return;
    }
    
    if (!productData.categoryID) {
      setErrorMsg("Please select a category!");
      return;
    }
    
    setIsLoading(true);
    const response = await updateProduct(data.id, productData);
    
    if (response.error) {
      setIsLoading(false);
      setErrorMsg(response.error);
      console.error("Error updating product:", response.error);
    } else if (response.res) {
      console.log("Product updated successfully:", response.res);
      setIsLoading(false);
      setErrorMsg("");
      setShowEdit(false);
      setProductData(null);
      requestReload();
    }
  };

  const loadProductData = async () => {
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      // Fetch the complete product data using existing getOneProduct
      const response = await getOneProduct(data.id);
      
      if (response.error) {
        setErrorMsg(response.error);
        setIsLoading(false);
        return;
      }
      
      if (response.res) {
        const product = response.res;
        
        console.log("Loaded product data:", product);
        
        // Convert the product data to the form format
        // Note: getOneProduct returns category: { id, parentID } so we use category.id
        const formData: TAddProductFormValues = {
          name: product.name,
          desc: product.desc || "",
          descrus: product.descrus || "",
          descuzb: product.descuzb || "",
          categoryID: product.category.id, // Get categoryID from category.id
          images: product.images || "",
          specifications: product.specs || [], // specs is already in ProductSpec[] format
          isAvailable: product.isAvailable
        };
        
        console.log("Formatted form data:", formData);
        
        setProductData(formData);
        setShowEdit(true);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setErrorMsg("Failed to load product data");
    } finally {
      setIsLoading(false);
    }
  };

  // Use useCallback to ensure stable reference for onChange
  const handleProductDataChange = useCallback((newData: TAddProductFormValues | ((prev: TAddProductFormValues) => TAddProductFormValues)) => {
    console.log("Product data change in ProductListItem:", newData);
    
    if (typeof newData === 'function') {
      setProductData(prevData => {
        if (!prevData) return prevData;
        const updated = newData(prevData);
        console.log("Functional update - previous:", prevData, "updated:", updated);
        return updated;
      });
    } else {
      console.log("Direct update:", newData);
      setProductData(newData);
    }
  }, []);

  return (
    <div className={styles.productListItem}>
      <span className={styles.name}>{data.name}</span>
      <span className={styles.category}>{data.category.name}</span>
      <div>
        <Button 
          text={isLoading && !showEdit && !showDelete ? "Загрузка..." : "Редактировать"} 
          onClick={loadProductData}
          disabled={isLoading}
        />
        <Button 
          text="Удалить" 
          onClick={() => setShowDelete(true)}
          disabled={isLoading}
        />
      </div>
      
      {showDelete && (
        <Popup
          content={<span className={styles.deleteMsg}>Уверен?</span>}
          width="300px"
          isLoading={isLoading}
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={handleDelete}
          cancelBtnText="НЕТ"
          confirmBtnText="ДА"
        />
      )}
      
      {showEdit && productData && (
        <Popup
          content={
            <EditProduct
              data={productData}
              errorMsg={errorMsg}
              onChange={handleProductDataChange}
            />
          }
          width="600px"
          isLoading={isLoading}
          onCancel={() => {
            setShowEdit(false);
            setProductData(null);
            setErrorMsg("");
          }}
          onClose={() => {
            setShowEdit(false);
            setProductData(null);
            setErrorMsg("");
          }}
          onSubmit={handleEdit}
          confirmBtnText="Сохранить изменения"
          title={`Редактировать продукт: ${data.name}`}
        />
      )}
    </div>
  );
};

export default ProductListItem;