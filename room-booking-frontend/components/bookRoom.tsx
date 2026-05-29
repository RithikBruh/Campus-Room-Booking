"use client";

import { useEffect, useState } from "react";
import { submitBookingRequest } from "@/lib/api";
import { Venue } from "@/app/dashboard/page";

export default function BookRoom({ venues }: { venues: Venue[] }) {
  
  const [selectedvenueId, setSelectedvenueId] = useState<number>(0);

  const [reason, setReason] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time1, setTime1] = useState<string>("");
  const [time2, setTime2] = useState<string>("");

  function formatTimeTo12Hour(value: string) {
    if (!value) return "";

    const [hoursString, minutes] = value.split(":");
    const hours = Number(hoursString);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes} ${period}`;
  }

  function HandleNewRequest() {
    setReason("");
    setDate("");
    setTime1("");
    setTime2("");
  }

  async function handleSubmit() {
    console.log("Submitting booking request with details:");
    const timing = `${formatTimeTo12Hour(time1)}-${formatTimeTo12Hour(time2)}`;
    const data = await submitBookingRequest(selectedvenueId, reason, date, timing);
    console.log(data);
    if (data.statusCode == 201) {
        alert("Booking request submitted successfully!");
    }
    else {
      if (data.statusCode == 409) {
        alert("Booking conflict: Duplicate booking exists for the selected venue, date, and time.");
      } else {
        alert("Failed to submit booking request.");
      }
    }
  }
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl">
      <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Book a Room</h2>

            <p className="mt-2 text-sm text-zinc-400">
              Submit a new booking request for campus spaces.
            </p>
          </div>

          <div
            onClick={HandleNewRequest}
            className="
    rounded-2xl
    border border-cyan-500/20
    bg-cyan-500/10
    px-4 py-2
    text-sm text-cyan-300
    cursor-pointer
    transition
    hover:bg-cyan-500/20
    hover:border-cyan-400
    hover:text-cyan-200
  "
          >
            + New Request
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Venue */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">Venue</label>

            <select
              onChange={(e) => setSelectedvenueId(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition focus:border-cyan-500"
            >
              <option>Select Venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue["venue"]} - {venue.authUser}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Date</label>

            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 outline-none transition focus:border-cyan-500"
            />
          </div>

          {/* Time */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">Time</label>

            <div className="flex items-center gap-3">
              <input
                type="time"
                onChange={(e) => setTime1(e.target.value)}
                value={time1}
                aria-label="Time 1"
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
              />

              <div className="shrink-0 text-sm font-medium text-zinc-500">-</div>

              <input
                type="time"
                onChange={(e) => setTime2(e.target.value)}
                value={time2}
                aria-label="Time 2"
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Reason */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">Reason</label>

            <textarea
              rows={5}
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              placeholder="Describe the purpose of this booking..."
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
        onClick={handleSubmit}
          className="
                  mt-7 w-full overflow-hidden rounded-2xl
                  bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
                  py-4 text-sm font-semibold
                  shadow-lg shadow-blue-500/20
                  transition-all duration-300
                  hover:scale-[1.015]
                  hover:shadow-blue-500/40
                  active:scale-[0.99]
                "
        >
          Submit Booking Request
        </button>
      </div>
    </div>
  );
}
