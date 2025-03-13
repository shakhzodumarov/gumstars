"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./productPage.module.scss";
import ProductBoard from "@/components/store/productPage/productBoard";
import { MinusIcon } from "@/components/icons/svgIcons";
import Gallery from "@/components/store/productPage/gallery";
import { getOneProduct } from "@/actions/product/product";
import { TProductPageInfo } from "@/types/product";
import { SK_Box } from "@/components/UI/skeleton";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import All from "../../all/page";

const ProductPage = () => {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const { productId } = useParams<{ productId: string[] }>();
  const [productInfo, setProductInfo] = useState<TProductPageInfo | null | undefined>(null);

  if (!productId) router.push("/");

  useEffect(() => {
    const getProductFromDB = async () => {
      const response = await getOneProduct(productId.toString());
      if (response.error) router.push("/");
      //@ts-ignore
      setProductInfo(response.res);
    };
    getProductFromDB();
  }, [productId, router]);

  return (
    <div>
      <div className={styles.backimg}>
        
      </div>
    {/* <div className="storeContainer"> */}
      <div className={styles.productPage}>
        <div className={styles.upperSection}>
          {/* Product board on the left */}
          <div className={styles.leftSection}>
            {productInfo ? (
              <ProductBoard
                boardData={{
                  id: productInfo.id,
                  isAvailable: productInfo.isAvailable,
                  defaultQuantity: 1,
                  name: productInfo.name,
                  shortDesc: productInfo.desc || "",
                }}
              />
            ) : (
              <div className={styles.boardLoading}>
                <SK_Box width="60%" height="14px" />
                <div className={styles.title}>
                  <SK_Box width="40%" height="30px" />
                  <SK_Box width="90%" height="16px" />
                </div>
                <div className={styles.desc}>
                  <SK_Box width="40%" height="14px" />
                  <SK_Box width="40%" height="14px" />
                  <SK_Box width="40%" height="14px" />
                </div>
              </div>
            )}
          </div>

          {/* Gallery in the center */}
          <div className={styles.centerSection}>
            {/* @ts-ignore */}
            <Gallery images={productInfo?.images} />
          </div>

          {/* Specifications on the right */}
          <div className={styles.rightSection}>
            <div className={styles.specification}>
              {productInfo ? (
                productInfo.specifications.map((spec, index) => (
                  <section key={index} className={styles.specGroup}>
                    <div className={styles.specGroupHead}>
                      <h3>{spec.groupName}</h3>
                    </div>
                    {spec.specs.map((row, index) => (
                      <div key={index} className={styles.row}>
                        <div className={styles.leftCol}>
                          <span>{row.name}</span>
                        </div>
                        <div className={styles.rightCol}>
                          <span>{row.value}</span>
                        </div>
                      </div>
                    ))}
                  </section>
                ))
              ) : (
                <SK_Box width="200px" height="30px" />
              )}
            </div>
          </div>
        </div>
      </div>
    {/* </div> */}
    <div className={styles.backimgs}>
        
      </div>
      <All/>
    </div>
  );
};

export default ProductPage;












