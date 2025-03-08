export type TCategory = {
  id: string;
  parentID: string | null;
  name: string;
  url: string;
};

export type TGroupJSON = {
  group: TCategory;
  categories: categoryJSON[];
};
type categoryJSON = {
  category: TCategory;
  subCategories: TCategory[];
};
