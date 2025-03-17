"use client";
import { useEffect, useState } from "react";
import { TProductRecentItem } from "@/types/product";
import { TGroupJSON, TCategory } from "@/types/categories";
import styles from "./all.module.scss";
import { getRecentProducts } from "@/actions/product/product";
import { getAllCategoriesJSON } from "@/actions/category/category";
import RecentCard from "@/components/store/common/recentCard";
import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/routing';
// import CenterContent from "@/components/centercontent";
import Image from "next/image";

export default function All() {
  const [recentProducts, setRecentProducts] = useState<TProductRecentItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProductRecentItem[]>([]);
  const [categories, setCategories] = useState<TGroupJSON[]>([]);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('HomePage');



  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Keep the loading state for 2 seconds
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await getAllCategoriesJSON();
        if (categoriesResponse.error) {
          setError(categoriesResponse.error);
        } else {
          const fetchedCategories = categoriesResponse.res ?? [];
          setCategories(fetchedCategories);
          
          // Set default selected parent category (first category)
          if (fetchedCategories.length > 0) {
            setSelectedParent(fetchedCategories[0].group.id);
          }
        }

        // Fetch products
        const productsResponse = await getRecentProducts();
        if (productsResponse.error) {
          setError(productsResponse.error);
        } else {
          const products = productsResponse.res ?? [];
          setRecentProducts(products);
          // Do not filter products here, let the useEffect handle it
        }
      } catch (err) {
        setError("Ошибка при загрузке данных");
      } finally {
        setTimeout(() => setIsSplashVisible(false), 1000);
      }
    };

    fetchData();
  }, []);

  // Log product and category structure for debugging
  useEffect(() => {
    if (recentProducts.length > 0) {
      console.log("Product example:", recentProducts[0]);
    }
    if (categories.length > 0) {
      console.log("Categories structure:", categories);
    }
  }, [recentProducts, categories]);

  // Filter products based on selected categories
  useEffect(() => {
    console.log("Filtering products based on:");
    console.log("- Selected parent:", selectedParent);
    console.log("- Selected child:", selectedChild);
    console.log("- Total products:", recentProducts.length);
    
    if (recentProducts.length === 0) {
      return;
    }

    // If no parent category is selected, show all products
    if (!selectedParent) {
      console.log("No parent selected, showing all products");
      setFilteredProducts(recentProducts);
      return;
    }

    let filtered = [];
    
    // If a child category is selected
    if (selectedChild) {
      console.log(`Filtering by child category: ${selectedChild}`);
      
      // Check product structure to determine how to filter
      //@ts-ignore
      filtered = recentProducts.filter(product => {
        // Try all possible property names that might hold category ID
        const matches = 
        //@ts-ignore
          product.categoryId === selectedChild || 
          //@ts-ignore
          product.category_id === selectedChild || 
          (product.category && product.category.id === selectedChild);
        
        if (matches) {
          console.log(`Product ${product.id || product.name} matches child category`);
        }
        
        return matches;
      });
    } 
    // If only a parent category is selected
    else {
      console.log(`Filtering by parent category: ${selectedParent}`);
      const parentGroup = categories.find(group => group.group.id === selectedParent);
      
      if (parentGroup && parentGroup.categories) {
        const childIds = parentGroup.categories.map(cat => cat.category.id);
        console.log(`Child category IDs of parent ${selectedParent}:`, childIds);
         //@ts-ignore
        filtered = recentProducts.filter(product => {
          // Try different possible property names for category ID
           //@ts-ignore
          const categoryId = product.categoryId || product.category_id || (product.category && product.category.id);
          
          // Check if product belongs to any child category of selected parent
          const belongsToChild = childIds.includes(categoryId);
          
          // Check if product directly belongs to parent category
          const belongsToParent = 
            categoryId === selectedParent || 
            //@ts-ignore
            product.parentCategoryId === selectedParent || 
             //@ts-ignore
            product.parent_category_id === selectedParent ||
             //@ts-ignore
            (product.parentCategory && product.parentCategory.id === selectedParent);
          
          const matches = belongsToChild || belongsToParent;
          
          if (matches) {
            console.log(`Product ${product.id || product.name} matches parent category or its children`);
          }
          
          return matches;
        });
      }
    }

    console.log(`Filtered products: ${filtered.length} out of ${recentProducts.length}`);
    setFilteredProducts(filtered);
  }, [selectedParent, selectedChild, recentProducts, categories]);

  const handleParentCategoryClick = (parentId: string) => {
    console.log("Parent category clicked:", parentId);
    if (selectedParent === parentId) {
      // If clicking the already selected parent, show all products
      setSelectedParent(null);
      setSelectedChild(null);
    } else {
      setSelectedParent(parentId);
      setSelectedChild(null); // Reset child selection when parent changes
    }
  };

  const handleChildCategoryClick = (childId: string) => {
    console.log("Child category clicked:", childId);
    if (selectedChild === childId) {
      // Toggle off if already selected
      setSelectedChild(null);
    } else {
      setSelectedChild(childId);
    }
  };

  const handleAllProductsClick = () => {
    console.log("All products clicked");
    setSelectedParent(null);
    setSelectedChild(null);
  };

  const getFilterStatus = () => {
    const parentName = categories.find(g => g.group.id === selectedParent)?.group.name;
    const childCategory = selectedChild 
      ? categories.find(g => g.group.id === selectedParent)?.categories.find(c => c.category.id === selectedChild)?.category
      : null;
    
    if (selectedParent && selectedChild) {
      return `${parentName} › ${childCategory?.name}`;
    } else if (selectedParent) {
      return `${parentName}`;
    } else {
      return t('allProducts');
    }
  };

  return (
    <div>
       {isLoading ? (
        <div className={styles.loadingScreen}>
        <div className={styles.radiatingWaves}></div>
        <div className={styles.logoContainer}>
          <img src="/images/images/stars.png" alt="Logo" className={styles.spinningLogo} />
        </div>
      </div>

       ) : (<div className={styles.tyler}>
      {/* <CenterContent /> */}
      <Image
      src={"/images/images/image.png"}
      alt="img"
      width={600}
      height={600}
      className={styles.disco}
      />
      <div className={styles.homePageContainer}>
        {isSplashVisible ? (
          <div className={styles.splashScreen}>Loading...</div>
        ) : (
          <div className={styles.contentWrapper}>
            {/* Category Filters */}
            <div className={styles.categoryFilters}>
              
              <div className={styles.parentCategories}>
                {categories.map((groupItem) => (
                  <div
                    key={groupItem.group.id}
                    className={`${styles.categoryItem} ${selectedParent === groupItem.group.id ? styles.selected : ''}`}
                    onClick={() => handleParentCategoryClick(groupItem.group.id)}
                  >
                    {groupItem.group.name}
                  </div>
                ))}
              </div>

              {/* Child Categories (only show for selected parent) */}
              {/* {selectedParent && (
                <div className={styles.childCategories}>
                  {categories
                    .find(group => group.group.id === selectedParent)
                    ?.categories.map(categoryItem => (
                      <div
                        key={categoryItem.category.id}
                        className={`${styles.categoryItem} ${selectedChild === categoryItem.category.id ? styles.selected : ''}`}
                        onClick={() => handleChildCategoryClick(categoryItem.category.id)}
                      >
                        {categoryItem.category.name}
                      </div>
                    ))}
                </div>
              )} */}
            </div>

            {/* Current filter status */}
            <div className={styles.filterStatus}>
              {getFilterStatus()}
              {filteredProducts.length > 0 && (
                <span className={styles.resultsCount}> ({filteredProducts.length})</span>
              )}
            </div>

            {/* Product Display */}
            {error ? (
              <div className={styles.error}>{error}</div>
            ) : (
              <div className={styles.cardsWrapper}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <RecentCard
  key={product.id || index}
  
  imgUrl={product.images}
  name={product.name}
  isAvailable={product.isAvailable}
  url={"/product/" + product.id}
/>
                  ))
                ) : (
                  <p className={styles.noProducts}>{t('noProducts')}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* <Image
      src={"/images/images/image.png"}
      alt="img"
      width={600}
      height={600}
      className={styles.discos}
      /> */}
    </div>)}


    </div>
  );
}