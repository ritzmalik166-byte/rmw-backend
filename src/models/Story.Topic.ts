import { Schema, model, models } from "mongoose";

const TopicSchema = new Schema(
  {
    topicTitle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    metaKeyWords: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    topicImg: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TopicModel = models.TopicModel || model("TopicModel", TopicSchema);

export default TopicModel;
