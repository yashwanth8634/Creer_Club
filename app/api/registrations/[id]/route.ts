import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import { Registration } from "@/models/Registration";
import { UTApi } from "uploadthing/server";
import nodemailer from "nodemailer";

const utapi = new UTApi();

async function sendVerificationEmail(to: string, name: string, status: "verified" | "rejected", reason?: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const subject =
    status === "verified"
      ? "Your Créer Club Registration is Confirmed! 🎨"
      : "Update on Your Créer Club Registration";

  const html =
    status === "verified"
      ? `<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px;background:#FDFBF7;border-radius:12px;">
           <h2 style="color:#800000;font-size:24px;margin-bottom:8px;">Hello ${name}! 🎨</h2>
           <p style="color:#3E2723;">Your registration for the Créer Club workshop has been <strong>verified</strong>. We can't wait to see you!</p>
           <p style="color:#3E2723;">Please arrive a few minutes early. See you at the workshop!</p>
           <p style="color:#888;font-size:13px;margin-top:24px;">— Créer Club Team</p>
         </div>`
      : `<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px;background:#FDFBF7;border-radius:12px;">
           <h2 style="color:#800000;font-size:24px;margin-bottom:8px;">Hello ${name},</h2>
           <p style="color:#3E2723;">Unfortunately, we were unable to verify your registration.</p>
           ${reason ? `<p style="color:#3E2723;"><strong>Reason:</strong> ${reason}</p>` : ""}
           <p style="color:#3E2723;">Please reach out to us on Instagram if you have any questions.</p>
           <p style="color:#888;font-size:13px;margin-top:24px;">— Créer Club Team</p>
         </div>`;

  await transporter.sendMail({
    from: `"Créer Club" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { action, rejectionReason } = body;

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await connectDB();
    const registration = await Registration.findById(id);

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Delete screenshot from UploadThing after approval
      if (registration.screenshotKey) {
        await utapi.deleteFiles(registration.screenshotKey);
      }

      registration.status = "verified";
      registration.screenshotUrl = undefined as any;
      registration.screenshotKey = undefined as any;
      await registration.save();

      // Send confirmation email (non-blocking)
      sendVerificationEmail(registration.email, registration.name, "verified").catch(
        (err) => console.error("Email send error:", err)
      );
    } else {
      registration.status = "rejected";
      registration.rejectionReason = rejectionReason || null;
      await registration.save();

      // Send rejection email (non-blocking)
      sendVerificationEmail(registration.email, registration.name, "rejected", rejectionReason).catch(
        (err) => console.error("Email send error:", err)
      );
    }

    return NextResponse.json({ success: true, status: registration.status });
  } catch (error) {
    console.error("PATCH /api/registrations/[id] error:", error);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}
