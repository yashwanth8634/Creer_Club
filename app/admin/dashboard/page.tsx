"use client";

import { useEffect, useState, useCallback } from "react";
import AdminRegistrationRow from "@/components/AdminRegistrationRow";
import { signOut } from "next-auth/react";

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

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterEvent, setFilterEvent] = useState("");

  const fetchRegistrations = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);
      if (filterEvent) params.set("eventId", filterEvent);

      const res = await fetch(`/api/registrations?${params.toString()}`);
      
      if (!res.ok) {
        console.error("Failed to fetch registrations:", res.status, res.statusText);
        setRegistrations([]);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      
      if (Array.isArray(data)) {
        setRegistrations(data);
      } else {
        console.error("Expected array but got:", data);
        setRegistrations([]);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistrations([]);
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus, filterEvent]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Get unique events for filter dropdown
  const events = Array.from(
    new Map(
      registrations
        .filter((r) => r.eventId)
        .map((r) => [r.eventId._id, r.eventId])
    ).values()
  );

  const counts = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "pending").length,
    verified: registrations.filter((r) => r.status === "verified").length,
    rejected: registrations.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-accent/10">
      {/* Admin Header */}
      <header className="bg-primary text-background px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-xl font-serif font-bold">Créer Club Admin</h1>
          <p className="text-xs text-secondary-light opacity-80">Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/admin/events" className="text-sm text-secondary-light hover:text-secondary transition-colors">
            Manage Events
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
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: counts.total, color: "bg-white text-foreground" },
            { label: "Pending", value: counts.pending, color: "bg-yellow-50 text-yellow-800" },
            { label: "Verified", value: counts.verified, color: "bg-green-50 text-green-800" },
            { label: "Rejected", value: counts.rejected, color: "bg-red-50 text-red-700" },
          ].map(({ label, value, color }) => (
            <div key={label} className={`${color} rounded-xl p-5 border border-accent/30 shadow-sm text-center`}>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-accent/30 shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-accent rounded-md text-sm focus:outline-none focus:border-primary bg-background cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
            className="px-3 py-2 border border-accent rounded-md text-sm focus:outline-none focus:border-primary bg-background cursor-pointer"
          >
            <option value="">All Events</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>{ev.title}</option>
            ))}
          </select>

          <button
            onClick={() => { setFilterStatus(""); setFilterEvent(""); }}
            className="px-4 py-2 text-sm text-primary border border-primary/30 rounded-md hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl border border-accent/30 shadow-sm overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-foreground/40">Loading…</div>
          ) : registrations.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-foreground/40">No registrations found.</div>
          ) : (
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-accent/20 border-b border-accent/30 text-left text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Screenshot</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <AdminRegistrationRow key={reg._id} reg={reg} onUpdate={fetchRegistrations} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
