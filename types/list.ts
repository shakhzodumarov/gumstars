export type TListSort = {
  sortName: "id" | "name";
  sortType: "asc" | "desc";
};

export type TPageStatus =
  | "pageLoading"
  | "filterLoading"
  | "filledProductList"
  | "filterHasNoProduct"
  | "categoryHasNoProduct";
