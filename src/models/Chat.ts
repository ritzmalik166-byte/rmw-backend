import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
    user_id: { type: String, required: true },
    conversation_history: [
        {
            user_message: {
                type: String,
                required: true,
            },
            bot_reply: {
                type: String,
                required: true,
            },
            conversation_time: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true });