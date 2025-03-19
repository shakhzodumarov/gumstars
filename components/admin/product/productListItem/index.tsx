"use client";
import { deleteProduct, updateProduct } from "@/actions/product/product";
import styles from "./productListItem.module.scss";

import Button from "@/components/UI/button";
import Popup from "@/components/UI/popup";
import { TAddProductFormValues, TProductListItem } from "@/types/product";
import { useState } from "react";
import EditProduct from "./editProduct"; // You'll need to create this component

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
    
    setIsLoading(true);
    const response = await updateProduct(data.id, productData);
    
    if (response.error) {
      setIsLoading(false);
      setErrorMsg(response.error);
    } else {
      setIsLoading(false);
      setErrorMsg("");
      setShowEdit(false);
      requestReload();
    }
  };

  const loadProductData = async () => {
    // You might want to fetch the complete product data here
    // For now we'll just use the existing data and add required fields
    setProductData({
      name: data.name,
      categoryID: data.category.id,
      images: "", // These would need to be loaded from the server
      specifications: [], // These would need to be loaded from the server
      isAvailable: true, // Default value, would need to be loaded from the server
      desc: "",
      descrus: "",
      descuzb: ""
    });
    setShowEdit(true);
  };

  return (
    <div className={styles.productListItem}>
      <span className={styles.name}>{data.name}</span>
      <span className={styles.category}>{data.category.name}</span>
      <div>
        <Button text="Редактировать" onClick={loadProductData} />
        <Button text="Удалить" onClick={() => setShowDelete(true)} />
      </div>
      
      {showDelete && (
        <Popup
          content={<span className={styles.deleteMsg}>Уверен?</span>}
          width="300px"
          isLoading={isLoading}
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={() => handleDelete()}
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
              onChange={setProductData}
            />
          }
          width="600px"
          isLoading={isLoading}
          onCancel={() => setShowEdit(false)}
          onClose={() => setShowEdit(false)}
          onSubmit={handleEdit}
          title={`Редактировать продукт: ${data.name}`}
        />
      )}
    </div>
  );
};

export default ProductListItem;
