import { TDropDown } from "@/types/uiElements";
import {useTranslations} from 'next-intl';

const t = useTranslations('HomePage');

export const sortDropdownData: TDropDown[] = [
  {
    text: "Новейший",
    value: "0",
  },
  {
    text: "Старейший",
    value: "1",
  },
  {
    text: "Самый дорогой",
    value: "2",
  },
  {
    text: "Дешевый",
    value: "3",
  },
  {
    text: "Имя",
    value: "4",
  },
];
