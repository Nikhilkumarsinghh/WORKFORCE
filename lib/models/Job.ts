import mongoose, { Schema, type Model } from "mongoose";

export type JobDocument = {
  title: string;
  company: string;
  category: string;
  location: string;
  salary: string;
  type: string;
  exp: string;
  urgent: boolean;
  qual: string;
  desc: string;
  verified: boolean;
  published: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const JobSchema = new Schema<JobDocument>({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  company: { type: String, required: true, trim: true, maxlength: 180 },
  category: { type: String, required: true, trim: true, maxlength: 100 },
  location: { type: String, required: true, trim: true, maxlength: 180 },
  salary: { type: String, required: true, trim: true, maxlength: 120 },
  type: { type: String, required: true, trim: true, maxlength: 80 },
  exp: { type: String, required: true, trim: true, maxlength: 100 },
  urgent: { type: Boolean, default: false },
  qual: { type: String, required: true, trim: true, maxlength: 180 },
  desc: { type: String, required: true, trim: true, maxlength: 3000 },
  verified: { type: Boolean, default: false, index: true },
  published: { type: Boolean, default: false, index: true },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });

export const Job: Model<JobDocument> = (mongoose.models.UniqueTooJob as Model<JobDocument>) || mongoose.model<JobDocument>("UniqueTooJob", JobSchema);
