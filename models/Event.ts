import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  registrationEndDate: Date;
  venue: string;
  fee: number;
  coverImage: string;
  galleryImages: { url: string; key: string }[];
  status: "upcoming" | "past";
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },
    venue: { type: String, required: true },
    fee: { type: Number, required: true },
    coverImage: { type: String, required: true },
    galleryImages: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
      },
    ],
    status: { type: String, enum: ["upcoming", "past"], default: "upcoming" },
  },
  { timestamps: true }
);

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
