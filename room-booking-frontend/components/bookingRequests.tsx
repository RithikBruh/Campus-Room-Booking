"use client";

import { useEffect, useState } from "react";
import {
  fetchBookingRequests,
  updateBookingRequestStatus,
} from "@/lib/api";
import { Venue } from "@/app/dashboard/page";
import formatDate from "@/lib/dateFormat";
import formatTime24To12 from "@/lib/timeFormat";

type BookingRequest = {
  id: number;
  email: string;
  venueId: number;
  venue: Venue;
  reason: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "approved" | "rejected";
  statusCode : number;
};

export default function BookingRequests({ role }: { role: string | undefined }) {
  const [requests, setRequests] = useState<BookingRequest[]>([]);

  async function getRequests() {
    const data = await fetchBookingRequests();
    setRequests(data);
  }

  useEffect(() => {
    if (!role?.toLowerCase().includes("admin")) {
      return;
    }
    getRequests();
  }, [role]);

  async function handleStatusChange(
    bookingId: number,
    newStatus: "approved" | "rejected",
  ) {
    const confirmed = window.confirm(`You are about to ${newStatus} this booking request. Proceed?`);
    if (!confirmed) return;
    try {
    const result = await updateBookingRequestStatus(bookingId, newStatus);
    alert("Booking request status updated successfully.");
    await getRequests(); // Refresh the list after updating status
    }
    catch (error) {
      alert("Error updating booking request status." + JSON.stringify(error));
    }
  }

  if (!role?.toLowerCase().includes("admin")) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Booking Requests</h2>

          <p className="mt-1 text-sm text-zinc-400">
            Review pending room booking requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            {requests.filter((request) => request.status === "pending").length} Pending
          </div>

          <button
            onClick={getRequests}
            className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-300 transform transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:bg-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onUpdate={handleStatusChange}
          />
        ))}

        {requests.length === 0 ? (
          <p className="text-sm text-zinc-500">No booking requests found.</p>
        ) : null}
      </div>
    </div>
  );
}

function RequestCard({
  request,
  onUpdate,
}: {
  request: BookingRequest;
  onUpdate: (bookingId: number, newStatus: "approved" | "rejected") => Promise<void>;
}) {
  const statusStyles = {
    pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    approved: "border-green-500/20 bg-green-500/10 text-green-300",
    rejected: "border-red-500/20 bg-red-500/10 text-red-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">
              {request.venue.venue ?? `Venue #${request.venueId}`}
            </h3>

            <span
              className={`rounded-full border px-3 py-1 text-xs capitalize ${statusStyles[request.status]}`}
            >
              {request.status}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-sm text-zinc-400">
            <p>👤 {request.email ?? "Unknown user"}</p>
            <p>📅 {formatDate(request.date)}</p>
            <p>⏰ {formatTime24To12(request.startTime)} - {formatTime24To12(request.endTime)}</p>
            <p>📝 {request.reason}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(request.id, "rejected")}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
          >
            Reject
          </button>

          <button
            onClick={() => onUpdate(request.id, "approved")}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.03]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}