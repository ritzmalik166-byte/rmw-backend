import { Schema, models, model } from "mongoose";

const Analytics = new Schema({
    
}, { timestamps: true });

const AnalyticModel = models.AnalyticModel || model("AnalyticModel", Analytics);

export default AnalyticModel;