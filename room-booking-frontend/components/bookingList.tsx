"use client";

import { useEffect, useState } from "react";
import { fetchBookings, deleteBookingFromID } from "@/lib/api";
import { Venue } from "@/app/dashboard/page";
import formatDate from "@/lib/dateFormat";

type Booking = {
  id: number;
  email: string;
  venueId: number;
  reason: string;
  date: string;
  timing: string;
  status: "pending" | "approved" | "rejected";
};


export default function BookingList({ venues }: { venues: Venue[] }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  async function handleDelete(bookingId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?",
    );
    if (!confirmDelete) return;

    const statusCode = await deleteBookingFromID(bookingId);
    if (statusCode === 200) {
      alert("Booking deleted successfully!");
      // refresh the list after successful deletion
      await getBookings();
    } else {
      alert("Failed to delete booking.");
    }
  }

  function getVenueName(venueId: number) {
    const venue = venues.find((v) => v.id === venueId);
    return venue ? venue.venue : "Unknown Venue";
  }

  async function getBookings() {
    const bookings = await fetchBookings();
    // Process the bookings data as needed
    setBookings(bookings);
    console.log("Fetched bookings:", bookings);
  }
  useEffect(() => {
    getBookings();
    // Fetch booking data from the API and update state
  }, []);

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Your Bookings</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Recently submitted room requests.
          </p>
        </div>

        <div
          onClick={getBookings}
          className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/20 cursor-pointer"
        >
          Refresh
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {bookings.map((booking) => (
          <Card
            id={booking.id}
            key={booking.id}
            status={booking.status}
            venueName={getVenueName(booking.venueId)}
            date={booking.date}
            time={booking.timing}
            reason={booking.reason}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

type Props = {
  id: number;
  status: "pending" | "approved" | "rejected";
  venueName: string;
  date: string;
  time: string;
  reason: string;
  onDelete: (id: number) => Promise<void> | void;
};

function Card({ id, status, venueName, date, time, reason, onDelete }: Props) {
  const statusStyles = {
    pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",

    approved: "border-green-500/20 bg-green-500/10 text-green-300",

    rejected: "border-red-500/20 bg-red-500/10 text-red-300",
  };

  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0b1220]/90 p-5 transition-all hover:border-cyan-500/30 hover:bg-[#10192b]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-3 text-lg"># {id}</div>

            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{venueName}</h3>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
                >
                  {status}
                </span>
              </div>

              <p className="text-sm text-zinc-500">{reason}</p>
            </div>
          </div>

          <div className="mt-5 flex gap-3 text-sm text-zinc-400">
            <div className="rounded-xl bg-white/5 px-3 py-2">
              📅 {formatDate(date)}
            </div>

            <div className="rounded-xl bg-white/5 px-3 py-2">⏰ {time}</div>
          </div>
        </div>

        <button onClick={() => onDelete(id)} className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20">
          Delete
        </button>
      </div>
    </div>
  );
}
