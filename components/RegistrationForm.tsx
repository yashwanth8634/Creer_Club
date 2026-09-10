"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

export default function RegistrationForm({
  eventId,
  upiQrCode,
}: {
  eventId: string;
  upiQrCode?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    transactionId: "",
  });
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [screenshotKey, setScreenshotKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshotUrl || !screenshotKey) {
      setError("Please upload your payment screenshot before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          ...formData,
          screenshotUrl,
          screenshotKey,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong during registration.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-primary/10 border border-primary/40 text-primary p-6 rounded-xl text-center animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">
          ✓
        </div>
        <h3 className="text-xl font-serif font-bold mb-2">Registration Submitted!</h3>
        <p className="text-sm text-foreground/80 leading-relaxed max-w-md mx-auto">
          We received your registration and payment details. You will receive a confirmation email once your spot is verified.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 p-3.5 rounded-lg text-sm border border-red-200 flex items-start gap-2">
          <span className="font-bold">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
          Full Name <span className="text-primary">*</span>
        </label>
        <input
          required
          type="text"
          name="name"
          placeholder="e.g. Maya Sharma"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 text-sm border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background transition-all"
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="maya@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
            Phone Number <span className="text-primary">*</span>
          </label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background transition-all"
          />
        </div>
      </div>

      {/* Payment Instructions Box */}
      <div className="bg-accent/20 p-5 rounded-xl border border-accent/50 space-y-4">
        <div>
          <h3 className="font-serif font-bold text-base text-primary mb-1">
            Payment & Verification
          </h3>
          <p className="text-xs text-foreground/75 leading-relaxed">
            Scan the QR code with any UPI app (GPay, PhonePe, Paytm). After payment, paste your 12-digit UPI Transaction ID and upload the receipt screenshot.
          </p>
        </div>

        {/* QR Code */}
        {upiQrCode && (
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-accent/60 shadow-xs">
            <span className="text-xs font-semibold text-foreground/70 mb-2">Scan to Pay</span>
            <div className="relative w-44 h-44 rounded-lg overflow-hidden bg-white p-1 border border-accent/30">
              <Image
                src={upiQrCode}
                alt="UPI QR Code"
                fill
                sizes="176px"
                className="object-contain p-2"
              />
            </div>
            <span className="text-[11px] text-foreground/50 mt-2">Accepted on GPay, PhonePe, Paytm & BHIM</span>
          </div>
        )}

        {/* Transaction ID */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
            UPI Transaction / Ref ID <span className="text-primary">*</span>
          </label>
          <input
            required
            type="text"
            name="transactionId"
            placeholder="e.g. 423456789012"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background transition-all"
          />
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
            Payment Screenshot <span className="text-primary">*</span>
          </label>
          {screenshotUrl ? (
            <div className="relative inline-block mt-1">
              <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-accent shadow-xs bg-white">
                <Image
                  src={screenshotUrl}
                  alt="Payment Receipt"
                  fill
                  sizes="144px"
                  className="object-contain p-1"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setScreenshotUrl("");
                  setScreenshotKey("");
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                aria-label="Remove uploaded screenshot"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-accent/70 p-4 text-center rounded-xl bg-background hover:bg-white/60 transition-colors">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    const file = res[0] as { url?: string; ufsUrl?: string; key: string };
                    setScreenshotUrl(file.ufsUrl || file.url || "");
                    setScreenshotKey(file.key);
                    setError("");
                  }
                }}
                onUploadError={(err: Error) => {
                  setError(`Upload error: ${err.message}`);
                }}
              />
              <p className="text-[11px] text-foreground/50 mt-1">PNG, JPG or JPEG up to 4MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-background py-3 rounded-xl font-medium hover:bg-primary-light transition-all duration-200 disabled:opacity-60 shadow-xs cursor-pointer disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span>Submitting Registration...</span>
          </>
        ) : (
          "Complete & Confirm Booking"
        )}
      </button>
    </form>
  );
}
