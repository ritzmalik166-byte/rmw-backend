// src/types/advertisement.ts

export type CategoryEnum = "Top Choice" | "Other Ad Options";

export interface IAdvertisement {
  adtype: string;
  slug: string;
  adDesc: string;
  imgs: string[];
  baseRate: number;
  quantity: string;
  adLabel: string;
  adTiming: string;
  details: string;
  category: CategoryEnum;
  parentID: string;
  metaTitle: string;
  metaDesc: string;
}

export interface IAdvertisementWithId extends IAdvertisement {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface INewspaperOption {
  _id: string;
  paperName: string;
  language: string;
}

export const initialAdvertisementState: Omit<IAdvertisement, "slug"> = {
  adtype: "",
  adDesc: "",
  imgs: [],
  baseRate: 0,
  quantity: "",
  adLabel: "",
  adTiming: "",
  details: "",
  category: "Top Choice",
  parentID: "",
  metaTitle: "",
  metaDesc: "",
};


