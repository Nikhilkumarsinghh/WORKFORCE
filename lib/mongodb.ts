import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalForMongo = globalThis as typeof globalThis & { __uniqueTooMongo?: Cached };
const cached = globalForMongo.__uniqueTooMongo ?? { conn: null, promise: null };
globalForMongo.__uniqueTooMongo = cached;

export async function connectMongo() {
  if (!URI) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(URI, {
      dbName: process.env.MONGODB_DB || "uniquetoo",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection failed:", error);
    return null;
  }
}
