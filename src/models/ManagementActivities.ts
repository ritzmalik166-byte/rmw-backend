import { Schema, model, models } from "mongoose";

const ManagementActivitiesSchema = new Schema({
    managementId: {
        type: Schema.Types.ObjectId,
        ref: "ManagementModel",
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    activityTime: {
        type: Date,
        required: true,
    },
    
}, { timestamps: true });

const ManagementActivitiesModel = models.ManagementActivitiesModel || model("ManagementActivitiesModel", ManagementActivitiesSchema);

export default ManagementActivitiesModel;