import { Schema, model, models } from "mongoose";

const ManagementSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["super_admin", "editor"],
    },
    isActive: {
        type: Boolean,
        default: false, 
    },
}, { timestamps: true });

const ManagementModel = models.ManagementModel || model("ManagementModel", ManagementSchema);

export default ManagementModel;