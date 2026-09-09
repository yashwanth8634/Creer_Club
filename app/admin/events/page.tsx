"use client";

import { useState, useEffect, useCallback } from "react";
import { DateTime } from "luxon";
import { UploadButton } from "@/lib/uploadthing";
import { signOut } from "next-auth/react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  registrationEndDate: string;
  venue: string;
  fee: number;
  coverImage: string;
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
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    // Fetch ALL events (including past) for admin
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
      coverImage: ev.coverImage,
    });
    setError("");
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    fetchEvents();
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
        body: JSON.stringify({ ...form, fee: Number(form.fee) }),
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
          <a href="/admin/dashboard" className="text-sm text-secondary-light hover:text-secondary transition-colors">
            Registrations
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-sm px-4 py-1.5 border border-secondary-light/40 rounded-sm hover:bg-primary-light transition-colors"
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
            className="bg-primary text-background px-5 py-2.5 rounded-sm font-medium hover:bg-primary-light transition-colors"
          >
            + New Event
          </button>
        </div>

        {/* Event Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8">
              <h3 className="text-xl font-serif font-bold text-primary mb-6">
                {editingId ? "Edit Event" : "Create New Event"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">{error}</div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-sm focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-sm focus:outline-none focus:border-primary resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Event Date & Time</label>
                    <input required type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3 py-2 border border-accent rounded-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Registration Closes</label>
                    <input required type="datetime-local" value={form.registrationEndDate} onChange={e => setForm({ ...form, registrationEndDate: e.target.value })}
                      className="w-full px-3 py-2 border border-accent rounded-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Venue</label>
                  <input required type="text" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-sm focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fee (₹)</label>
                  <input required type="number" min="0" value={form.fee} onChange={e => setForm({ ...form, fee: e.target.value })}
                    className="w-full px-3 py-2 border border-accent rounded-sm focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Image</label>
                  {form.coverImage ? (
                    <div className="relative inline-block">
                      <img src={form.coverImage} alt="Cover" className="h-24 rounded-sm border border-accent object-cover" />
                      <button type="button" onClick={() => setForm({ ...form, coverImage: "" })}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-accent p-3 rounded-sm">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) setForm({ ...form, coverImage: res[0].url });
                        }}
                        onUploadError={(err) => setError(err.message)}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={isSaving}
                    className="flex-1 bg-primary text-background py-2.5 rounded-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-60">
                    {isSaving ? "Saving…" : editingId ? "Save Changes" : "Create Event"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 py-2.5 border border-accent rounded-sm text-foreground hover:bg-accent/30 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List */}
        {isLoading ? (
          <div className="text-center py-16 text-foreground/40">Loading…</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-foreground/40 bg-white rounded-xl border border-accent/30">
            No events yet. Create one!
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((ev) => {
              const isPast = DateTime.fromISO(ev.registrationEndDate) <= DateTime.now();
              return (
                <div key={ev._id} className="bg-white rounded-xl border border-accent/30 shadow-sm p-5 flex items-center gap-5">
                  {ev.coverImage && (
                    <img src={ev.coverImage} alt={ev.title} className="w-20 h-20 rounded-lg object-cover shrink-0 border border-accent/30" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif font-bold text-primary text-lg truncate">{ev.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${isPast ? "bg-accent text-foreground/50" : "bg-primary/10 text-primary"}`}>
                        {isPast ? "Past" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60">
                      {DateTime.fromISO(ev.date).toFormat("ccc, LLL d yyyy, h:mm a")} · {ev.venue} · ₹{ev.fee}
                    </p>
                    <p className="text-xs text-foreground/40 mt-0.5">
                      Reg. closes: {DateTime.fromISO(ev.registrationEndDate).toFormat("LLL d, h:mm a")}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(ev)}
                      className="px-4 py-2 text-sm border border-accent text-foreground rounded-sm hover:bg-accent/30 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(ev._id)}
                      className="px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-600 rounded-sm hover:bg-red-100 transition-colors">
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
