"use client" ;

import {useEffect, useState} from "react";
import {fetchVenues} from "@/lib/api";

type Venue = {
  id: number;
  venue: string;
  authUser : string;
};

export default function BookRoom() {

    const [venues, setVenues] = useState<Venue[]>([]);
    const [selectedVenueID, setSelectedVenueID] = useState<number>(0);

    const [reason , setReason] = useState<string>("");
    
    function HandleNewRequest() {

    }
    useEffect(() => {
        fetchVenues().then((venues) => {
            setVenues(venues);
        });
    }, []);

    return (
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl">
            
            <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    Book a Room
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Submit a new booking request for campus spaces.
                  </p>
                </div>

                <div onClick = {HandleNewRequest} className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                  + New Request
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                
                {/* Venue */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-300">
                    Venue
                  </label>

                  <select onChange={(e) => setSelectedVenueID(Number(e.target.value))} className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition focus:border-cyan-500">
                    <option>Select Venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue["venue"]}     - {venue.authUser}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Date
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 outline-none transition focus:border-cyan-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Time
                  </label>

                  <input
                    type="time"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 outline-none transition focus:border-cyan-500"
                  />
                </div>

                {/* Reason */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-300">
                    Reason
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Describe the purpose of this booking..."
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 outline-none transition focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
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