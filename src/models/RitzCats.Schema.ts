import { Schema, model, models, Document, Model } from "mongoose";

interface IRitzCat extends Document {
  categoryName: string;
  categoryMetaTitle: string;
  categoryMetaDescription: string;
  categoryMetaKeywords: string;
  categorySlug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RitzCatsSchema = new Schema<IRitzCat>(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryMetaDescription: {
      type: String,
      required: true,
    },
    categoryMetaTitle: {
      type: String,
      required: true,
    },
    categoryMetaKeywords: {
      type: String,
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const RitzCats: Model<IRitzCat> =
  models.RitzCats || model<IRitzCat>("RitzCats", RitzCatsSchema);

export default RitzCats;
