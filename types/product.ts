import { ProductSpec } from "@prisma/client";

export type TUserReview = {
  userName: string;
  userImage: string;
  isVerified: boolean;
  date: Date;
  likeNumber: number;
  dislikeNumber: number;
  text: string;
  advantages?: string[];
  disAdvantages?: string[];
};

export type TProductSpec = {
  groupName: string;
  specs: {
    label: string;
    data: string[];
  }[];
};

export type TProductOption = {
  optionName: string;
  options: { value: string; label?: string }[];
  optionSelectedId: number;
  type: "text" | "color";
};

export type TProductBoard = {
  id: string;
  name: string;
  isAvailable: boolean;
  shortDesc: string;
  shortDescrus: string;
  shortDescuzb: string;
  dealDate?: Date;
  options?: TProductOption[];
  defaultQuantity: number;
};

export type TProductPath = {
  label: string;
  url: string;
};

export type TProduct = {
  path: TProductPath[];
  board: TProductBoard;
  gallery: string[];
  specification: TProductSpec[];
  reviews: TUserReview[];
};

export type TAddProductFormValues = {
  name: string;
  isAvailable: boolean;
  desc?: string;
  descrus?: string;
  descuzb?: string;
  images: string;
  categoryID: string;
  specifications: ProductSpec[];
};

export type TProductListItem = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
};
export type TCartListItemDB = {
  id: string;
  name: string;
  images: string;
};


export type TSpecification = {
  groupName: string;
  specs: {
    name: string;
    value: string;
  }[];
};

export type TPath = {
  id: string | null;
  parentID: string | null;
  name: string;
  url: string;
};

export type TProductPageInfo = {
  id: string;
  name: string;
  isAvailable: boolean;
  desc: string | null;
  descrus: string | null;
  descuzb: string | null;
  images: string[];
  optionSets: string[];
  specifications: TSpecification[];
  path: TPath[];
  category: {
    id: string;}
};

export type TProductRecentItem = {
  id: string;
  name: string;
  isAvailable: boolean;
  images: string;
  // url: string;
  category: {
    id: string;
    name: string;
  };
};

export type TProductRelatedItem = {
  id: string;
  name: string;
  isAvailable: boolean;
  images: string;
  categoryID: string;
  // url: string;
  category: {
    id: string;
    name: string;
  };
};
