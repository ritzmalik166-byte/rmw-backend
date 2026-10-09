import { Schema, model, models } from 'mongoose';

const RLMSchema = new Schema({
    ip: { type: String, required: true },
    count: { type: Number, default: 0 },
    lastAccess: { type: Date, default: Date.now },
}, { timestamps: true });

const IpRateLimiting = models.IpRateLimiting || model('IpRateLimiting', RLMSchema);

export default IpRateLimiting;