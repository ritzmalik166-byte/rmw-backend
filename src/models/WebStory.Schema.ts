import mongoose, { Schema, model, models } from "mongoose";

const WebStorySchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    titleAlign: {
      type: String,
      enum: ["top", "center", "bottom"],
      default: "top",
    },
    buttonCTA: {
      btnTxt: {
        type: String,
      },
      btnLink: {
        type: String,
      },
      btnColor: {
        type: String,
      },
      btnTxtColor: {
        type: String,
      },
    },
    img: {
      type: String,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    metaKeyWords: {
      type: String,
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TopicModel",
      required: true,
    },
    descAlign :{
        type: String,
      enum: ["top", "center", "bottom"],
      default: "bottom",
    }
  },
  { timestamps: true }
);

const WebStoryModel =
  models.WebStoryModel || model("WebStoryModel", WebStorySchema);

export default WebStoryModel;