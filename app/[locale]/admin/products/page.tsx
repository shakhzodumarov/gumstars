"use client";
import styles from "./adminProducts.module.scss";

import { useEffect, useState, useCallback } from "react";
import Button from "@/components/UI/button";
import Popup from "@/components/UI/popup";
import ProductForm from "@/components/admin/product/productForm";
import { TAddProductFormValues, TProductListItem } from "@/types/product";
import { addProduct, getAllProducts } from "@/actions/product/product";
import ProductListItem from "@/components/admin/product/productListItem";

const initialForm: TAddProductFormValues = {
  name: "",
  isAvailable: false,
  desc: "",
  descrus: "",
  descuzb: "",
  images: "",
  categoryID: "",
  specifications: [],
};

const AdminProducts = () => {
  const [showProductWindow, setShowProductWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<TAddProductFormValues>(initialForm);
  const [productsList, setProductsList] = useState<TProductListItem[]>([]);

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    console.log("Form values updated in AdminProducts:", formValues);
  }, [formValues]);

  const getProductsList = async () => {
    const response = await getAllProducts();
    if (response.res) setProductsList(response.res);
  };

  // CRITICAL FIX: Use useCallback to ensure the onChange function is stable
  const handleFormChange = useCallback((newValues: TAddProductFormValues | ((prev: TAddProductFormValues) => TAddProductFormValues)) => {
    console.log("handleFormChange called with:", newValues);
    
    if (typeof newValues === 'function') {
      // If it's a function (functional update), call it with current state
      setFormValues(prevValues => {
        const updated = newValues(prevValues);
        console.log("Functional update - previous:", prevValues, "updated:", updated);
        return updated;
      });
    } else {
      // If it's a direct value, just set it
      console.log("Direct update:", newValues);
      setFormValues(newValues);
    }
  }, []);

  const handleAddProduct = async () => {
    console.log("=== SUBMITTING PRODUCT ===");
    console.log("Final form values:", formValues);
    
    if (!formValues.images) {
      alert("Please upload an image before submitting!");
      return;
    }
    
    if (!formValues.name) {
      alert("Please enter a product name!");
      return;
    }
    
    if (!formValues.categoryID) {
      alert("Please select a category!");
      return;
    }
    
    setIsLoading(true);
    const result = await addProduct(formValues);
    
    if (result.error) {
      console.error("Error adding product:", result.error);
      alert(`Error: ${result.error}`);
      setIsLoading(false);
    }
    
    if (result.res) {
      console.log("Product added successfully:", result.res);
      setIsLoading(false);
      setShowProductWindow(false);
      setFormValues(initialForm);
      getProductsList();
    }
  };

  const handleOpenProductWindow = () => {
    setFormValues(initialForm);
    setShowProductWindow(true);
  };

  const handleCloseProductWindow = () => {
    setFormValues(initialForm);
    setShowProductWindow(false);
  };

  return (
    <div className={styles.adminProducts}>
      <div className={styles.header}>
        <Button
          text="Добавить новый продукт"
          onClick={handleOpenProductWindow}
        />
      </div>
      <div className={styles.dataTable}>
        {productsList.length > 0 ? (
          <>
            {productsList.map((product) => (
              <ProductListItem
                key={product.id}
                data={product}
                requestReload={getProductsList}
              />
            ))}
          </>
        ) : (
          <div>Товара нет!</div>
        )}
      </div>
      {showProductWindow && (
        <Popup
          content={
            <ProductForm 
              formValues={formValues} 
              onChange={handleFormChange}
            />
          }
          isLoading={isLoading}
          onCancel={handleCloseProductWindow}
          onClose={handleCloseProductWindow}
          onSubmit={handleAddProduct}
          confirmBtnText="Добавить товар"
          title="Добавить новый продукт"
        />
      )}
    </div>
  );
};

export default AdminProducts;