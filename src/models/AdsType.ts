import mongoose, { Schema, model, models } from "mongoose";

const AdsTypeSchema = new Schema(
  {
    adtype: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    adDesc: {
      type: String,
      required: true,
    },
    imgs: [
      {
        type: String,
        required: true,
      },
    ],
    baseRate: {
      type: Number,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    adLabel: {
      type: String,
    },
    adTiming: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Top Choice", "Other Ad Options"],
    },
    parentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewsPaperModel",
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDesc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdsTypeModel =
  models.AdsTypeModel || model("AdsTypeModel", AdsTypeSchema);

export default AdsTypeModel;
