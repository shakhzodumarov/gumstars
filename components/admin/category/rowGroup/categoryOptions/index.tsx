"use client";
import styles from "./categoryOptions.module.scss";

import { useEffect, useState } from "react";

import AddSpecGroup from "./addSpecGroup";
import SpecGroup from "./specGroup";

// -------- ACTIONS --------
import {
  getSpecGroupByCatID,
} from "@/actions/category/categoryOptions";
import { TSpecGroup } from "@/types/common";

interface IProps {
  categoryName: string;
  categoryID: string;
}

const CategoryOptions = ({ categoryName, categoryID }: IProps) => {
  const [specGroupList, setSpecGroupList] = useState<TSpecGroup[]>([]);

  const getCategorySpecGroup = async () => {
    if (categoryID) {
      const response = await getSpecGroupByCatID(categoryID);
      if (response.res) {
        setSpecGroupList(response.res);
      }
    }
  };

  useEffect(() => {
    const getSpecs = async () => {
      if (categoryID) {
        const specResponse = await getSpecGroupByCatID(categoryID);
        if (specResponse.res) {
          setSpecGroupList(specResponse.res);
        }
      }
    };
    getSpecs();
  }, [categoryID]);

  const handleReloadSpecs = async () => {
    getCategorySpecGroup();
  };

  return (
    <div className={styles.optionsWindow}>
      <div className={styles.header}>
        <h2>{categoryName}</h2>
      </div>

      {/* ------------------ SPECIFICATION SECTION ------------------ */}
      <div className={styles.tabContainer}>
        <AddSpecGroup
          categorySpecGroupID={categoryID}
          reloadRequest={handleReloadSpecs}
        />
        <div className={styles.specGroupList}>
          {specGroupList.length > 0 ? (
            <>
              {specGroupList.map((specGroup) => (
                <SpecGroup
                  key={specGroup.id}
                  data={specGroup}
                  reloadRequest={handleReloadSpecs}
                />
              ))}
            </>
          ) : (
            <div className={styles.addCategoryOption}>
              <span>Спецификации для этой категории нет</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryOptions;
