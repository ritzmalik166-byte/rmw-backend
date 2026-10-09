// src/types/newspaper.ts

export type LocationType = {
  city: string;
  area: string;
  state: string;
  country: string;
};

export type FrequencyEnum = "Daily" | "Weekly" | "Monday - Friday" | "Fortnightly" | "Bi-Weekly" | "Monthly";
export type PositionEnum = "Main" | "Supplement";

export interface INewspaper {
  paperName: string;
  slug: string;
  language: string;
  logoImg: string; // URL string
  price: number;
  spendType: string;
  location: LocationType;
  areaCovered: string;
  category: string;
  publications: string;
  frequency: FrequencyEnum;
  position: PositionEnum;
  circulation: string;
  readership: string;
  title: string;
  desc: string;
  metaTitle: string;
  metaDesc: string;
}

// Initial state for the form (for useForm hook or component state)
export const initialNewspaperState: INewspaper = {
  paperName: "",
  slug: "",
  language: "",
  logoImg: "",
  price: 0,
  spendType: "",
  location: { city: "", area: "", state: "", country: "" },
  areaCovered: "",
  category: "",
  publications: "",
  frequency: "Daily", // Default value
  position: "Main",   // Default value
  circulation: "",
  readership: "",
  title: "",
  desc: "",
  metaTitle: "",
  metaDesc: "",
};