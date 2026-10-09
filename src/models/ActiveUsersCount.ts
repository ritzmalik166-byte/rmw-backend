import { Schema, model, models } from "mongoose";

const ACSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ACtiveUser =
  models.ACtiveUser || model("ACtiveUser", ACSchema);

export default ACtiveUser;
