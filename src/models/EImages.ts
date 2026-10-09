import { Schema, model, models } from "mongoose";

const EImages = new Schema(
  {
    imgPath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EImagesModels = models.EImagesModel || model("EImagesModel", EImages);
export default EImagesModels;
