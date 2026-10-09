import { Schema, model, models } from "mongoose";

const NewsPaperSchema = new Schema(
  {
    paperName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    logoImg: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    spendType: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    areaCovered: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publications: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: [
        "Daily",
        "Weekly",
        "Monday - Friday",
        "Fortnightly",
        "Bi-Weekly",
        "Monthly",
      ],
      required: true,
    },
    position: {
      type: String,
      enum: ["Main", "Supplement"],
      required: true,
    },
    circulation: {
      type: String,
      required: true,
    },
    readership: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
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

const NewsPaperModel =
  models.NewsPaperModel || model("NewsPaperModel", NewsPaperSchema);

export default NewsPaperModel;
