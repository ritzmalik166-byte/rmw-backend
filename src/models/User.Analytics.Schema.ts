import { Schema, models, model } from "mongoose";

const UserAnalytics = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    userAddress: {
      userCity: {
        type: String,
      },
      userCountry: {
        type: String,
      },
      userPincode: {
        type: String,
      },
      userArea: {
        type: String,
      },
    },
    isUserBounce: {
      type: Boolean,
      required: true,
      default: true,
    },
    userTotalVisitTime: {
      type: Number,
      required: true,
      default: 0,
    },
    userVisitTimePerPage: [
      {
        pageLink: {
          type: String,
        },
        timeCount: {
          type: Number,
        },
      },
    ],
    userRevisitCount: {
      type: Number,
      default: 0,
    },
    userDevice: {
      type: String,
    },
    trafficSource: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserAnalyticModel =
  models.UserAnalyticModel || model("UserAnalyticModel", UserAnalytics);

export default UserAnalyticModel;
