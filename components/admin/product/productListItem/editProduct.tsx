"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "../productForm/productForm.module.scss"; // Using the same styles as productForm
import { TAddProductFormValues } from "@/types/product";
import { getAllCategoriesJSON } from "@/actions/category/category";
import { TGroupJSON } from "@/types/categories";
import { getCategorySpecs } from "@/actions/category/specifications";
import { SpecGroup } from "@prisma/client";
import { TDropDown } from "@/types/uiElements";
import DropDownList from "@/components/UI/dropDown";
import ImageUploader from '@/components/services/ImageUploader';

const categoryListFirstItem: TDropDown = {
  text: "Select A Category....",
  value: "",
};

interface IProps {
  data: TAddProductFormValues;
  errorMsg: string;
  // FIXED: Accept both direct values and functional updates
  onChange: (data: TAddProductFormValues | ((prev: TAddProductFormValues) => TAddProductFormValues)) => void;
}

const EditProduct = ({ data, errorMsg, onChange }: IProps) => {
  const [categoryList, setCategoryList] = useState<TDropDown[]>([categoryListFirstItem]);
  const [selectedCategoryListIndex, setSelectedCategoryListIndex] = useState(0);
  const [categorySpecs, setCategorySpecs] = useState<SpecGroup[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategoriesJSON();
      if (result.res) {
        const dropdownList = convertJSONtoDropdownList(result.res);
        setCategoryList(dropdownList);
        
        // Find the index of the current category
        if (data.categoryID) {
          const index = dropdownList.findIndex(item => item.value === data.categoryID);
          if (index !== -1) {
            setSelectedCategoryListIndex(index);
            // Load specs for the current category
            getSpecGroup(data.categoryID);
          }
        }
      }
      setIsLoadingCategories(false);
    };

    fetchCategories();
  }, []);

  const convertJSONtoDropdownList = (json: TGroupJSON[]): TDropDown[] => {
    const dropDownData: TDropDown[] = [categoryListFirstItem];
    json.forEach((group) => {
      dropDownData.push({
        text: group.group.name,
        value: group.group.id,
      });
      group.categories.forEach((category) => {
        dropDownData.push({
          text: `${group.group.name} - ${category.category.name}`,
          value: category.category.id,
        });
        category.subCategories.forEach((sub) => {
          dropDownData.push({
            text: `${group.group.name} - ${category.category.name} - ${sub.name}`,
            value: sub.id,
          });
        });
      });
    });
    return dropDownData;
  };

  const handleCategoryChange = (index: number) => {
    setSelectedCategoryListIndex(index);
    if (index === 0) {
      onChange({
        ...data,
        specifications: [],
        categoryID: "",
      });
      setCategorySpecs([]);
    } else {
      getSpecGroup(categoryList[index].value);
    }
  };

  const getSpecGroup = async (categoryID: string) => {
    const response = await getCategorySpecs(categoryID);
    if (response.res) {
      setCategorySpecs(response.res);
      
      // If specifications already exist, keep them; otherwise initialize empty
      if (!data.specifications || data.specifications.length === 0) {
        const specArray = response.res.map((item) => ({
          specGroupID: item.id,
          specValues: item.specs.map(() => ""),
        }));
        
        onChange({
          ...data,
          specifications: specArray,
          categoryID: categoryID,
        });
      } else {
        // Update categoryID but keep existing specifications
        onChange({
          ...data,
          categoryID: categoryID,
        });
      }
    }
  };

  // FIXED: Now TypeScript won't complain about functional updates
  const handleImageChange = useCallback((updatedProps: { images: string | null }) => {
    console.log("Image change in EditProduct:", updatedProps.images);
    
    // Using functional update to ensure we get the latest state
    onChange((prevValues: TAddProductFormValues) => {
      const updatedFormValues = {
        ...prevValues,
        images: updatedProps.images || ""
      };
      console.log("Updated form values in EditProduct:", updatedFormValues);
      return updatedFormValues;
    });
  }, [onChange]);

  if (isLoadingCategories) {
    return <div style={{ padding: '20px' }}>Загрузка...</div>;
  }

  return (
    <div className={styles.productForm}>
      {errorMsg && (
        <div style={{ 
          color: '#dc2626', 
          marginBottom: '16px', 
          padding: '12px', 
          backgroundColor: '#fee2e2', 
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          {errorMsg}
        </div>
      )}

      <div className={styles.nameAndCat}>
        <div>
          <span>название:</span>
          <input
            type="text"
            value={data.name}
            placeholder="название ..."
            onChange={(e) =>
              onChange({
                ...data,
                name: e.currentTarget.value,
              })
            }
          />
        </div>

        <div>
          <span>Описания:</span>
          <input
            type="text"
            value={data.desc || ""}
            onChange={(e) =>
              onChange({
                ...data,
                desc: e.currentTarget.value,
              })
            }
            placeholder="Описания..."
          />
        </div>

        <div>
          <span>Описания (RUS):</span>
          <input
            type="text"
            value={data.descrus || ""}
            onChange={(e) =>
              onChange({
                ...data,
                descrus: e.currentTarget.value,
              })
            }
            placeholder="Описания rus..."
          />
        </div>

        <div>
          <span>Описания (UZB):</span>
          <input
            type="text"
            value={data.descuzb || ""}
            onChange={(e) =>
              onChange({
                ...data,
                descuzb: e.currentTarget.value,
              })
            }
            placeholder="Описания uzb..."
          />
        </div>

        <div>
          <span>Есть в наличии:</span>
          <div className={styles.inStockSwitch}>
            <span
              className={data.isAvailable ? styles.available : ""}
              onClick={() => onChange({ ...data, isAvailable: true })}
            >
              В наличии
            </span>
            <span
              className={!data.isAvailable ? styles.notAvailable : ""}
              onClick={() => onChange({ ...data, isAvailable: false })}
            >
              Нет в наличии
            </span>
          </div>
        </div>

        <div>
          <span>Изображения:</span>
          <ImageUploader
            images={data.images || null}
            onChange={handleImageChange}
          />
          <div style={{ 
            marginTop: '8px', 
            fontSize: '12px', 
            color: data.images ? '#059669' : '#dc2626',
            fontWeight: '500' 
          }}>
            {data.images ? `✓ Image saved: ${data.images.substring(0, 50)}...` : "⚠ No image uploaded"}
          </div>
        </div>

        <div>
          <span>Категория</span>
          {categoryList.length > 1 ? (
            <DropDownList
              data={categoryList}
              width="430px"
              selectedIndex={selectedCategoryListIndex}
              onChange={handleCategoryChange}
            />
          ) : (
            <span>Loading categories...</span>
          )}
        </div>
      </div>

      <div className={styles.specs}>
        <span>Спецификации:</span>
        <div className={styles.specGroups}>
          {categorySpecs.length > 0 ? (
            <>
              {categorySpecs.map((specGroup, groupIndex) => (
                <div className={styles.specGroupRow} key={specGroup.id}>
                  <span className={styles.header}>{specGroup.title}</span>
                  {specGroup.specs.map((spec, specIndex) => (
                    <div className={styles.specRow} key={specIndex}>
                      <span>{spec}</span>
                      <input
                        type="text"
                        value={data.specifications[groupIndex]?.specValues[specIndex] || ""}
                        onChange={(e) => {
                          const newSpecifications = [...data.specifications];
                          
                          // Ensure the specification group exists
                          if (!newSpecifications[groupIndex]) {
                            newSpecifications[groupIndex] = {
                              specGroupID: specGroup.id,
                              specValues: specGroup.specs.map(() => "")
                            };
                          }
                          
                          newSpecifications[groupIndex].specValues[specIndex] = e.currentTarget.value;
                          
                          onChange({
                            ...data,
                            specifications: newSpecifications
                          });
                        }}
                        placeholder="..."
                      />
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <span>Выберите категорию чтобы увидеть спецификации</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;