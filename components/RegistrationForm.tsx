"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";

export default function RegistrationForm({ eventId }: { eventId: string }) {
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
      setError("Please upload a payment screenshot first.");
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
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-primary/10 border border-primary text-primary p-6 rounded-md text-center">
        <h3 className="text-xl font-serif font-bold mb-2">Registration Submitted!</h3>
        <p className="text-foreground/80">Your registration is pending verification. We will notify you via email once approved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
        <input 
          required 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-accent rounded-md focus:outline-none focus:border-primary bg-background cursor-text"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input 
            required 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-md focus:outline-none focus:border-primary bg-background cursor-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
          <input 
            required 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-md focus:outline-none focus:border-primary bg-background cursor-text"
          />
        </div>
      </div>

      <div className="bg-accent/20 p-5 rounded-md border border-accent">
        <h4 className="font-semibold text-primary mb-2">Payment Details</h4>
        <p className="text-sm text-foreground/80 mb-4">
          Please make the payment via UPI and upload the screenshot. 
          <br/><strong className="text-primary">While making payment don't forget to copy the transaction ID from your UPI app.</strong>
        </p>

        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-1">UPI Transaction ID</label>
          <input 
            required 
            type="text" 
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="e.g. 123456789012"
            className="w-full px-4 py-2 border border-accent rounded-md focus:outline-none focus:border-primary bg-background cursor-text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Payment Screenshot</label>
          {screenshotUrl ? (
            <div className="relative inline-block">
              <img src={screenshotUrl} alt="Screenshot" className="h-32 object-contain rounded-md border border-accent" />
              <button 
                type="button"
                onClick={() => { setScreenshotUrl(""); setScreenshotKey(""); }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-accent p-4 text-center rounded-md bg-background cursor-pointer">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setScreenshotUrl(res[0].url);
                    setScreenshotKey(res[0].key);
                  }
                }}
                onUploadError={(error: Error) => {
                  setError(`Upload error: ${error.message}`);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary text-background py-3 font-medium rounded-md hover:bg-primary-light transition-colors disabled:opacity-70 shadow-sm cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}
