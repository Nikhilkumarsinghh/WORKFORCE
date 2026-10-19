import mongoose, { Schema, type Model } from "mongoose";

export type UserDocument = {
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  provider: "credentials" | "google" | "facebook";
  providerId?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
    passwordHash: { type: String },
    image: { type: String },
    provider: { type: String, enum: ["credentials", "google", "facebook"], default: "credentials" },
    providerId: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> = (mongoose.models.User as Model<UserDocument>) || mongoose.model<UserDocument>("User", UserSchema);
