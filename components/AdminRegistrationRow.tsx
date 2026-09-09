"use client";

import { useState } from "react";
import { DateTime } from "luxon";

interface Registration {
  _id: string;
  name: string;
  phone: string;
  email: string;
  transactionId: string;
  screenshotUrl?: string;
  status: "pending" | "verified" | "rejected";
  rejectionReason?: string;
  createdAt: string;
  eventId: { _id: string; title: string; date: string };
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminRegistrationRow({
  reg,
  onUpdate,
}: {
  reg: Registration;
  onUpdate: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [screenshotOpen, setScreenshotOpen] = useState(false);

  const handleAction = async (action: "approve" | "reject") => {
    if (action === "reject" && !rejectionReason.trim()) return;
    setIsLoading(true);
    try {
      await fetch(`/api/registrations/${reg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason }),
      });
      setShowModal(false);
      setShowRejectInput(false);
      setRejectionReason("");
      onUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <tr className="border-b border-accent/30 hover:bg-accent/10 transition-colors">
        <td className="py-3 px-4 font-medium text-foreground">{reg.name}</td>
        <td className="py-3 px-4 text-foreground/70 text-sm">{reg.eventId?.title || "—"}</td>
        <td className="py-3 px-4 text-foreground/70 text-sm">{reg.email}</td>
        <td className="py-3 px-4 text-foreground/70 text-sm font-mono">{reg.transactionId}</td>
        <td className="py-3 px-4 text-foreground/70 text-sm">
          {DateTime.fromISO(reg.createdAt).toFormat("dd LLL yyyy, h:mm a")}
        </td>
        <td className="py-3 px-4">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[reg.status]}`}>
            {reg.status.toUpperCase()}
          </span>
        </td>
        <td className="py-3 px-4">
          {reg.screenshotUrl ? (
            <button
              onClick={() => setScreenshotOpen(true)}
              className="w-12 h-12 rounded-sm overflow-hidden border border-accent hover:border-primary transition-colors block"
            >
              <img src={reg.screenshotUrl} alt="Screenshot" className="w-full h-full object-cover" />
            </button>
          ) : (
            <span className="text-xs text-foreground/40 italic">Deleted</span>
          )}
        </td>
        <td className="py-3 px-4">
          {reg.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleAction("approve")}
                disabled={isLoading}
                className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => setShowRejectInput(true)}
                disabled={isLoading}
                className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}
          {reg.status === "rejected" && reg.rejectionReason && (
            <span className="text-xs text-foreground/50 italic">"{reg.rejectionReason}"</span>
          )}
        </td>
      </tr>

      {/* Reject reason inline row */}
      {showRejectInput && (
        <tr className="bg-red-50 border-b border-red-100">
          <td colSpan={8} className="px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Reason for rejection (required)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="flex-1 px-3 py-2 border border-red-200 rounded-sm text-sm focus:outline-none focus:border-red-400 bg-white"
              />
              <button
                onClick={() => handleAction("reject")}
                disabled={isLoading || !rejectionReason.trim()}
                className="px-4 py-2 bg-red-500 text-white text-xs font-medium rounded-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => { setShowRejectInput(false); setRejectionReason(""); }}
                className="px-4 py-2 bg-accent text-foreground text-xs font-medium rounded-sm hover:bg-accent/70 transition-colors"
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      )}

      {/* Full-size screenshot modal */}
      {screenshotOpen && reg.screenshotUrl && (
        <tr>
          <td colSpan={8}>
            <div
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
              onClick={() => setScreenshotOpen(false)}
            >
              <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <img src={reg.screenshotUrl} alt="Payment Screenshot" className="w-full rounded-xl shadow-2xl" />
                <button
                  onClick={() => setScreenshotOpen(false)}
                  className="absolute top-2 right-2 bg-white text-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm shadow"
                >
                  ✕
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
