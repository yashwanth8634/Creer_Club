import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  registrationEndDate: Date;
  venue: string;
  fee: number;
  coverImage?: string;
  upiQrCode?: string;
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
    coverImage: { type: String, default: "" },
    upiQrCode: { type: String, default: "" },
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

// In development, always re-register so HMR schema changes are applied immediately.
// In production, use the cached model to avoid re-compilation overhead.
if (process.env.NODE_ENV !== "production") {
  delete (mongoose.models as any).Event;
}

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
