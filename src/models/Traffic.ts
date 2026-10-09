import { Schema, model, models } from "mongoose";

const TrafficSchema = new Schema({
    url: { type: String, required: true },
  
    userIP: { type: String },
  
    userAgent: { type: String }, 
    referrer: { type: String }, 
  
    sessionId: { type: String }, 
  
    visitDate: { type: Date, default: Date.now },
  
    country: { type: String }, 
  
    device: { type: String }, 
  
  }, { timestamps: true });
const TrafficModel = models.TrafficModel || model("TrafficModel", TrafficSchema);

export default TrafficModel;