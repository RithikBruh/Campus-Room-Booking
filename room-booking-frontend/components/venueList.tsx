"use client";

import { useEffect, useState } from "react";
import { addVenue, deleteVenue, fetchYourVenues } from "@/lib/api";

type VenueItem = {
  id: number;
  venue: string;
  authUser?: string;
};

export default function YourVenues({ role }: { role: string | undefined }) {
  if (!role?.toLowerCase().includes("admin@")) {
    return null;
  }

  return <YourVenuesAdmin />;
}

function YourVenuesAdmin() {
  const [venues, setVenues] = useState<VenueItem[]>([]);
  const [venueName, setVenueName] = useState<string>("");

  async function getVenues() {
    const data = await fetchYourVenues();
    setVenues(data);
  }

  useEffect(() => {
    getVenues();
  }, []);

  async function handleAddVenue() {
    const trimmedName = venueName.trim();
    if (!trimmedName) {
      alert("Please enter a venue name.");
      return;
    }

    try {
      await addVenue(trimmedName);
      alert("Venue added successfully.");
      setVenueName("");
      await getVenues(); // updating venue list
    } catch (error) {
      alert("Failed to add venue.");
    }
  }

  async function handleDeleteVenue(venueId: number) {
    const confirmDelete = window.confirm("Delete this venue?");
    if (!confirmDelete) return;

    try {
      const statusCode = await deleteVenue(venueId);
      alert("Venue deleted successfully.");

    }  
    catch (error) {
      alert("Failed to delete venue.");
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Your Venues</h2>

          <p className="mt-1 text-sm text-zinc-400">
            Manage rooms and venues available for booking.
          </p>
        </div>

        <button
          onClick={getVenues}
          className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-300 transition-all duration-150 hover:scale-105 hover:border-blue-400 hover:bg-blue-500/25 hover:shadow-lg"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1220]/80 p-5">
        <h3 className="text-lg font-semibold text-white">Add New Venue</h3>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Venue Name
            </label>

            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="Enter venue name..."
              className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none transition focus:border-cyan-500"
            />
          </div>

          <button
            onClick={handleAddVenue}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.03]"
          >
            Create Venue
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {venue.venue}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  Added by {venue.authUser ?? "unknown user"}
                </p>
              </div>

              <button
                onClick={() => handleDeleteVenue(venue.id)}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {venues.length === 0 ? (
          <p className="text-sm text-zinc-500">No venues found.</p>
        ) : null}
      </div>
    </div>
  );
}
