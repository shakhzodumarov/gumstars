"use client";
import styles from "./adminProducts.module.scss";

import { useEffect, useState } from "react";
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
  images: [],
  categoryID: "",
  specifications: [],
};

const AdminProducts = () => {
  const [showProductWindow, setShowProductWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] =
    useState<TAddProductFormValues>(initialForm);
  const [productsList, setProductsList] = useState<TProductListItem[]>([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = async () => {
    const response = await getAllProducts();
    if (response.res) setProductsList(response.res);
  };

  const handleAddProduct = async () => {
    setIsLoading(true);
    const result = await addProduct(formValues);
    if (result.error) {
      setIsLoading(false);
    }
    if (result.res) {
      setIsLoading(false);
      setShowProductWindow(false);
    }
  };

  return (
    <div className={styles.adminProducts}>
      <div className={styles.header}>
        <Button
          text="Добавить новый продукт"
          onClick={() => setShowProductWindow(true)}
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
            <ProductForm formValues={formValues} onChange={setFormValues} />
          }
          isLoading={isLoading}
          onCancel={() => setShowProductWindow(false)}
          onClose={() => setShowProductWindow(false)}
          onSubmit={() => handleAddProduct()}
          confirmBtnText="Добавить товар"
          title="Добавить новый продукт"
        />
      )}
    </div>
  );
};

export default AdminProducts;
