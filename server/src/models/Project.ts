import mongoose, { Schema, Document } from "mongoose";

export interface IProjectDoc extends Document {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  screenshots: string[];
  image: string;
  apkFile: string;
  version: string;
  size: string;
  date: string;
  category: string;
}

const ProjectSchema = new Schema<IProjectDoc>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    features: [{ type: String }],
    technologies: [{ type: String }],
    screenshots: [{ type: String }],
    image: { type: String, default: "" },
    apkFile: { type: String, default: "" },
    version: { type: String, required: true },
    size: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProjectDoc>("Project", ProjectSchema);
