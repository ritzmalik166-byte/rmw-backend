// models/Blog.ts

import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      unique: true,
    },
    blogBanner: {
      type: String,
      default: "",
    },
    blogBody: [
      {
        metaTitle: {
          type: String,
          default: "",
        },
        metaDescription: {
          type: String,
          default: "",
        },
        innerImg: {
          type: String,
        },
      },
    ],
    metaKeywords: {
      type: String,
    },
    blogCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "RitzCats",
      required: true,
    },
    blogStatus: {
      type: Boolean,
      default: true,
    },
    publishStatus: {
      type: String,
      enum: ["draft", "scheduled", "published"],
      default: "published",
    },
    scheduledAt: {
      type: Date,
    },
    publishedAt: {
      type: Date,
    },
    blogSlug: {
      type: String,
      required: true,
      unique: true,
    },
    blogDescription: {
      type: String,
      default: "",
    },
    mtDesc: {
      type: String,
    },
    blogAuthor: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

if (models.RitzBlogModel) {
  delete models.RitzBlogModel;
}

const RitzBlogModel = model("RitzBlogModel", BlogSchema);

export default RitzBlogModel;
