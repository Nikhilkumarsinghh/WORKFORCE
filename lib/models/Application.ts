import mongoose, { Schema, type Model } from "mongoose";

export type ApplicationDocument = {
  applicationId: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  jobId?: string;
  experience: string;
  education?: string;
  location: string;
  message?: string;
  resumeFile?: string;
  ipHash?: string;
  createdAt: Date;
};

const ApplicationSchema = new Schema<ApplicationDocument>({
  applicationId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, default: "", trim: true, lowercase: true, maxlength: 180 },
  phone: { type: String, required: true, trim: true, maxlength: 20 },
  jobTitle: { type: String, required: true, trim: true, maxlength: 180 },
  jobId: { type: String, trim: true, maxlength: 120 },
  experience: { type: String, required: true, trim: true, maxlength: 120 },
  education: { type: String, trim: true, maxlength: 180 },
  location: { type: String, required: true, trim: true, maxlength: 160 },
  message: { type: String, trim: true, maxlength: 5000 },
  resumeFile: { type: String, trim: true, maxlength: 240 },
  ipHash: { type: String, maxlength: 128 },
  createdAt: { type: Date, default: Date.now, index: true },
}, { versionKey: false });

export const Application: Model<ApplicationDocument> = (mongoose.models.UniqueTooApplication as Model<ApplicationDocument>) || mongoose.model<ApplicationDocument>("UniqueTooApplication", ApplicationSchema);
