import mongoose, { Schema, type Model } from "mongoose";

export type LeadDocument = {
  leadId: string;
  kind: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
  source?: string;
  ipHash?: string;
  createdAt: Date;
};

const LeadSchema = new Schema<LeadDocument>({
  leadId: { type: String, required: true, unique: true, index: true },
  kind: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  phone: { type: String, required: true, trim: true, maxlength: 20 },
  company: { type: String, trim: true, maxlength: 160 },
  subject: { type: String, trim: true, maxlength: 180 },
  message: { type: String, required: true, maxlength: 5000 },
  source: { type: String, trim: true, maxlength: 180 },
  ipHash: { type: String, maxlength: 128 },
  createdAt: { type: Date, default: Date.now, index: true },
}, { versionKey: false });

export const Lead: Model<LeadDocument> = (mongoose.models.UniqueTooLead as Model<LeadDocument>) || mongoose.model<LeadDocument>("UniqueTooLead", LeadSchema);
