"use client";

import { useState, useEffect, useCallback } from "react";
import { DateTime } from "luxon";
import { UploadButton } from "@/lib/uploadthing";
import { signOut } from "next-auth/react";

interface GalleryImage {
  url: string;
  key: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  registrationEndDate: string;
  venue: string;
  fee: number;
  coverImage?: string;
  upiQrCode?: string;
  galleryImages: GalleryImage[];
  status: "upcoming" | "past";
}

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  registrationEndDate: "",
  venue: "",
  fee: "",
  coverImage: "",
  upiQrCode: "",
};

// Inline spinner
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// Auto-dismiss toast for errors inside the modal
function ErrorToast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm shadow-sm animate-in slide-in-from-top-2">
      <span className="text-lg leading-none">⚠</span>
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-red-400 hover:text-red-700 font-bold leading-none cursor-pointer text-base"
      >
        ✕
      </button>
    </div>
  );
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch("/api/admin/events");
    const data = await res.json();
    setEvents(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setGalleryImages([]);
    setError("");
    setShowForm(true);
  };

  const openEdit = (ev: Event) => {
    setEditingId(ev._id);
    setForm({
      title: ev.title,
      description: ev.description,
      date: DateTime.fromISO(ev.date).toFormat("yyyy-MM-dd'T'HH:mm"),
      registrationEndDate: DateTime.fromISO(ev.registrationEndDate).toFormat("yyyy-MM-dd'T'HH:mm"),
      venue: ev.venue,
      fee: String(ev.fee),
      coverImage: ev.coverImage || "",
      upiQrCode: ev.upiQrCode || "",
    });
    setGalleryImages(ev.galleryImages || []);
    setError("");
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setIsDeleting(id);
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setIsDeleting(null);
    fetchEvents();
  };

  const removeGalleryImage = (key: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.key !== key));
  };

  // Auto-copy event date into registrationEndDate when user sets the event date
  const handleDateChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      date: value,
      // Only auto-fill reg close if user hasn't already set it manually
      registrationEndDate: prev.registrationEndDate ? prev.registrationEndDate : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/events/${editingId}` : "/api/events";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          fee: Number(form.fee),
          galleryImages,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save event");
      }
      setShowForm(false);
      fetchEvents();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent/10">
      {/* Admin Header */}
      <header className="bg-primary text-background px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-xl font-serif font-bold">Créer Club Admin</h1>
          <p className="text-xs text-secondary-light opacity-80">Event Management</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/admin/dashboard" className="text-sm text-secondary-light hover:text-secondary transition-colors cursor-pointer">
            Registrations
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-sm px-4 py-1.5 border border-secondary-light/40 rounded-md hover:bg-primary-light transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-primary">All Events</h2>
          <button
            onClick={openCreate}
            className="bg-primary text-background px-5 py-2.5 rounded-md font-medium hover:bg-primary-light transition-colors cursor-pointer"
          >
            + New Event
          </button>
        </div>

        {/* Event Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
              <h3 className="text-xl font-serif font-bold text-primary mb-6">
                {editingId ? "Edit Event" : "Create New Event"}
              </h3>

              {/* Error popup toast */}
              {error && <ErrorToast message={error} onClose={() => setError("")} />}

              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:border-primary cursor-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:border-primary resize-none cursor-text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Event Date & Time</label>
                    <input
                      required
                      type="datetime-local"
                      value={form.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:border-primary cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Registration Closes
                      <span className="text-foreground/40 font-normal text-xs ml-1">(auto-filled)</span>
                    </label>
                    <input
                      required
                      type="datetime-local"
                      value={form.registrationEndDate}
                      onChange={(e) => setForm({ ...form, registrationEndDate: e.target.value })}
                      className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:border-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Venue</label>
                  <input
                    required
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:border-primary cursor-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fee (₹)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.fee}
                    onChange={(e) => setForm({ ...form, fee: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:border-primary cursor-text"
                  />
                </div>

                {/* Cover Image — optional */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cover Image <span className="text-foreground/40 font-normal">(optional)</span>
                  </label>
                  {form.coverImage ? (
                    <div className="relative inline-block">
                      <img src={form.coverImage} alt="Cover" className="h-24 rounded-md border border-accent object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: "" })}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-accent p-3 rounded-md">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) setForm({ ...form, coverImage: (res[0] as any).ufsUrl || res[0].url });
                        }}
                        onUploadError={(err) => setError(err.message)}
                      />
                    </div>
                  )}
                </div>

                {/* UPI QR Code — shown on event page for payment */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    UPI Payment QR Code{" "}
                    <span className="text-foreground/40 font-normal">(shown to registrants for payment)</span>
                  </label>
                  {form.upiQrCode ? (
                    <div className="relative inline-block">
                      <img src={form.upiQrCode} alt="UPI QR" className="h-36 w-36 rounded-md border-2 border-primary/20 object-contain bg-white p-1" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, upiQrCode: "" })}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-primary/20 p-3 rounded-md bg-primary/5">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) setForm({ ...form, upiQrCode: (res[0] as any).ufsUrl || res[0].url });
                        }}
                        onUploadError={(err) => setError(err.message)}
                      />
                    </div>
                  )}
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Gallery Images{" "}
                    <span className="text-foreground/40 font-normal">(shown on Gallery page after event)</span>
                  </label>

                  {galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-3">
                      {galleryImages.map((img) => (
                        <div key={img.key} className="relative">
                          <img
                            src={img.url}
                            alt="Gallery"
                            className="w-20 h-20 object-cover rounded-md border border-accent"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(img.key)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-2 border-dashed border-accent p-3 rounded-md">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.length) {
                          const newImgs = res.map((f: any) => ({ url: f.ufsUrl || f.url, key: f.key }));
                          setGalleryImages((prev) => [...prev, ...newImgs]);
                        }
                      }}
                      onUploadError={(err) => setError(err.message)}
                    />
                  </div>
                  <p className="text-xs text-foreground/40 mt-1">Upload one at a time. Repeat to add more.</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-primary text-background py-2.5 rounded-md font-medium hover:bg-primary-light transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving && <Spinner size={16} />}
                    {isSaving ? "Saving…" : editingId ? "Save Changes" : "Create Event"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2.5 border border-accent rounded-md text-foreground hover:bg-accent/30 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-foreground/40">
            <Spinner size={22} />
            <span>Loading events…</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-foreground/40 bg-white rounded-xl border border-accent/30">
            No events yet. Create one!
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((ev) => {
              const isPast = DateTime.fromISO(ev.registrationEndDate) <= DateTime.now();
              return (
                <div key={ev._id} className="bg-white rounded-xl border border-accent/30 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Cover image */}
                  <div className="flex items-start gap-4 sm:contents">
                    {ev.coverImage ? (
                      <img
                        src={ev.coverImage}
                        alt={ev.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 border border-accent/30"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 border border-accent/30 bg-accent/20 flex items-center justify-center text-primary/30 text-xs font-serif">
                        No cover
                      </div>
                    )}

                    {/* Event info */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold mb-1 ${
                          isPast ? "bg-accent text-foreground/50" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {isPast ? "Past" : "Upcoming"}
                      </span>
                      <h3 className="font-serif font-bold text-primary text-base sm:text-lg leading-snug break-words">
                        {ev.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-0.5">
                        <span className="whitespace-nowrap">{DateTime.fromISO(ev.date).toFormat("ccc, LLL d yyyy, h:mm a")}</span>
                        {" · "}
                        <span>{ev.venue}</span>
                        {" · "}
                        <span className="whitespace-nowrap">₹{ev.fee}</span>
                      </p>
                      <p className="text-xs text-foreground/40 mt-0.5">
                        <span className="whitespace-nowrap">
                          Reg. closes: {DateTime.fromISO(ev.registrationEndDate).toFormat("LLL d, h:mm a")}
                        </span>
                        {ev.galleryImages?.length > 0 && (
                          <span className="ml-2 text-primary/60 whitespace-nowrap">
                            · {ev.galleryImages.length} gallery photo{ev.galleryImages.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 shrink-0 sm:ml-auto">
                    <button
                      onClick={() => openEdit(ev)}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm border border-accent text-foreground rounded-md hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ev._id)}
                      disabled={isDeleting === ev._id}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isDeleting === ev._id && <Spinner size={13} />}
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
