"use client";
import styles from "./productForm.module.scss";

import ImageUploader from '@/components/services/ImageUploader';
import { TDropDown } from "@/types/uiElements";
import DropDownList from "@/components/UI/dropDown";
import Button from "@/components/UI/button";
import { useEffect, useState } from "react";
import { getAllCategoriesJSON } from "@/actions/category/category";
import { TGroupJSON } from "@/types/categories";
import { getCategorySpecs } from "@/actions/category/specifications";
import { ProductSpec, SpecGroup } from "@prisma/client";
import { TAddProductFormValues } from "@/types/product";

const categoryListFirstItem: TDropDown = {
  text: "Select A Category....",
  value: "",
};

interface IProps {
  formValues: TAddProductFormValues;
  onChange: (props: TAddProductFormValues) => void;
}

const ProductForm = ({ formValues: props, onChange }: IProps) => {
  const [categoryList, setCategoryList] = useState<TDropDown[]>([categoryListFirstItem]);
  const [selectedCategoryListIndex, setSelectedCategoryListIndex] = useState(0);
  const [categorySpecs, setCategorySpecs] = useState<SpecGroup[]>([]);
  
  // Console log initial props to see what we're working with
  useEffect(() => {
    console.log("Form values on mount:", props);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategoriesJSON();
      if (result.res) {
        setCategoryList(convertJSONtoDropdownList(result.res));
      }
    };

    fetchCategories();
  }, []);

  // Convert category data into dropdown list format
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

  // Handle category change
  const handleCategoryChange = (index: number) => {
    setSelectedCategoryListIndex(index);
    if (index === 0) {
      onChange({
        ...props,
        specifications: JSON.parse(JSON.stringify(props.specifications)),
        categoryID: "",
      });
      setCategorySpecs([]);
    } else {
      getSpecGroup(categoryList[index].value);
    }
  };

  // Fetch specifications for the selected category
  const getSpecGroup = async (categoryID: string) => {
    const response = await getCategorySpecs(categoryID);
    if (response.res) {
      const specArray: ProductSpec[] = [];
      response.res.forEach((item) => {
        specArray.push({
          specGroupID: item.id,
          specValues: item.specs.map(() => ""),
        });
      });
      onChange({
        ...props,
        specifications: JSON.parse(JSON.stringify(specArray)),
        categoryID: categoryID,
      });
      setCategorySpecs(response.res);
    }
  };

  // Handle image change from ImageUploader - THIS IS THE CRITICAL PART
  const handleImageChange = (updatedProps: { images: string | null }) => {
    console.log("Image received from uploader:", updatedProps.images);
    
    // Update the form values with the new image string
    const updatedFormValues = {
      ...props,
      images: updatedProps.images || "" // Convert null to empty string if needed
    };
    
    console.log("Updating form with new values:", updatedFormValues);
    onChange(updatedFormValues);
  };

  return (
    <div className={styles.productForm}>
      <div className={styles.nameAndCat}>
        <div>
          <span>название:</span>
          <input
            type="text"
            value={props.name}
            placeholder="название ..."
            onChange={(e) =>
              onChange({
                ...props,
                name: e.currentTarget.value,
              })
            }
          />
        </div>
        <div>
          <span>Описания:</span>
          <input
            type="text"
            value={props.desc}
            onChange={(e) =>
              onChange({
                ...props,
                desc: e.currentTarget.value,
              })
            }
            placeholder="Описания..."
          />
        </div>
        <div>
          <span>Есть в наличии:</span>
          <div className={styles.inStockSwitch}>
            <span
              className={props.isAvailable ? styles.available : ""}
              onClick={() => onChange({ ...props, isAvailable: true })}
            >
              В наличии
            </span>
            <span
              className={!props.isAvailable ? styles.notAvailable : ""}
              onClick={() => onChange({ ...props, isAvailable: false })}
            >
              Нет в наличии
            </span>
          </div>
        </div>
        <div>
          <span>Изображения:</span>
          <ImageUploader
            images={props.images || null} // Pass the current image from form values
            onChange={handleImageChange} // Handle image change
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            Current image URL: {props.images || "(none)"}
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
                        value={props.specifications[groupIndex]?.specValues[specIndex]}
                        onChange={(e) => {
                          const newSpecifications = [...props.specifications];
                          newSpecifications[groupIndex].specValues[specIndex] = e.currentTarget.value;
                          onChange({
                            ...props,
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
            <span>Не могу найти! </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;