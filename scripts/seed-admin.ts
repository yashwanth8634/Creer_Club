/**
 * One-time admin seed script.
 * Usage:
 *   MONGODB_URI=<your-uri> ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=yourpassword npx tsx scripts/seed-admin.ts
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD env vars.");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" },
});

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB.");

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log("Admin account already exists.");
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD!, 12);
  await Admin.create({ email: ADMIN_EMAIL, passwordHash, role: "admin" });
  console.log(`Admin created: ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
