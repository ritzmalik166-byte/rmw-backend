import { Schema, model, models } from "mongoose";

const enquiryTrackerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    etype: { type: String, default: "contact" },
    mobile: { type: String, default: null },

    ip: { type: String, required: true },
    country: { type: String, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
    timezone: { type: String, default: null },
    isp: { type: String, default: null },
    /** mobile | broadband | hosting | VPN | unknown */
    connectionType: { type: String, default: null },
    organisation: { type: String, default: null },
    asn: { type: String, default: null },
    ipv4: { type: String, default: null },
    ipv6: { type: String, default: null },
  },
  { timestamps: true }
);

const EnquiryTrackerModel =
  models.EnquiryTracker || model("EnquiryTracker", enquiryTrackerSchema);

export default EnquiryTrackerModel;
