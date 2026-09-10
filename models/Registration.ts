import mongoose, { Schema, Document, Model } from "mongoose";
import "./Event";

export interface IRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  transactionId: string;
  screenshotUrl: string;
  screenshotKey: string;
  status: "pending" | "verified" | "rejected";
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema<IRegistration> = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    transactionId: { type: String, required: true },
    screenshotUrl: { type: String }, // optional because it gets cleared after verification
    screenshotKey: { type: String }, // optional because it gets cleared after verification
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    rejectionReason: { type: String, default: null },
  },
  { timestamps: true }
);

export const Registration: Model<IRegistration> =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>("Registration", RegistrationSchema);
