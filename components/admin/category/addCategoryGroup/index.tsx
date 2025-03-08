"use client";
import { ElementRef, useRef, useState } from "react";
import styles from "./addCategory.module.scss";
import Button from "@/components/UI/button";
import { TGetAllCategories, addCategory } from "@/actions/category/category";
import Popup from "@/components/UI/popup";
import GroupCategory from "../../forms/groupCategory";

interface IProps {
  onReset: () => void;
}

const AddCategoryGroup = ({ onReset }: IProps) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const defaultGroupData: TGetAllCategories = {
    id: "",
    parentID: null,
    name: "",
    url: "",
  };
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [groupCategoryData, setGroupCategory] =
    useState<TGetAllCategories>(defaultGroupData);

  const handleAddGroup = async () => {
    const { name, url } = groupCategoryData;
    if (!name || !url) return;
    if (name === "") {
      setErrorMsg("Имя пусто!");
      return;
    }
    if (url === "") {
      setErrorMsg("URL пуст!");
      return;
    }

    setButtonDisabled(true);
    const result = await addCategory(groupCategoryData);

    if (result.res) {
      setGroupCategory(defaultGroupData);
      setButtonDisabled(false);
      setErrorMsg("");
      setShowWindow(false);
      onReset();
    } else {
      setButtonDisabled(false);
      setErrorMsg("Не удается вставить его в базу данных!");
    }
  };

  return (
    <div className={styles.addCategoryGroup}>
      <Button onClick={() => setShowWindow(true)} text="Добавить группу категорий" />
      {showWindow && (
        <Popup
          content={
            <GroupCategory
              errorMsg={errorMsg}
              data={groupCategoryData}
              onChange={setGroupCategory}
            />
          }
          isLoading={buttonDisabled}
          onCancel={() => setShowWindow(false)}
          onClose={() => setShowWindow(false)}
          onSubmit={() => handleAddGroup()}
          title="Добавить группу категорий"
        />
      )}
    </div>
  );
};

export default AddCategoryGroup;
