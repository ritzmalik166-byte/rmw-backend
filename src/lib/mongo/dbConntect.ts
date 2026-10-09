// src/lib/mongo/dbConnect.ts
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URL environment variable in your .env.local file");
}

// ✅ Extend globalThis directly (no namespace)
interface GlobalWithMongooseCache {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// ✅ Add type to globalThis
const globalWithMongoose = globalThis as typeof globalThis & GlobalWithMongooseCache;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}
export const connectMongoDB = async () => {
  if (globalWithMongoose.mongoose.conn) {
    console.log("✅ MongoDB connected successfully (cached)");
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    globalWithMongoose.mongoose.promise = mongoose.connect(MONGO_URL).then((mongooseInstance) => {
      console.log("✅ MongoDB connected successfully (new)");
      return mongooseInstance;
    });
  }

  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    return globalWithMongoose.mongoose.conn;
  } catch (error) {
    globalWithMongoose.mongoose.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};