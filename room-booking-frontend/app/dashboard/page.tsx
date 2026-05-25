
"use client" ;
import Image from "next/image";

import UserText from "@/components/userText";
import BookRoom from "@/components/bookRoom";
import BookingList from "@/components/bookingList";
import BookingRequests from "@/components/bookingRequests";

import {fetchRole,fetchVenues} from "@/lib/api";
import { useEffect, useState } from "react";

export type Venue = {
  id: number;
  venue: string;
  authUser: string;
};

export default  function Dashboard() {

    const [role ,setRole] = useState<string | undefined>(undefined);
    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
        async function getRole() {
              const role = await fetchRole();
                setRole(role);
        }
        getRole();

        async function getVenues() {
            const venues = await fetchVenues();
            setVenues(venues);
        }
        getVenues();
    }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_25%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10 p-6 lg:p-10">
        
        {/* Navbar */}
        <div className="mb-10 flex flex-col gap-5 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
          
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              IIT Hyderabad
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Room Booking Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              Seamlessly manage classroom reservations, club meetings,
              workshops, and campus spaces.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/iithlogo.png" alt="Logo" width={50} height={50} />
            

            <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3">
              <p className="text-xs text-zinc-500">
                Logged in as
              </p>

              <UserText role = {role}/>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <BookingRequests role={role} />
          <BookRoom venues={venues} />

          {/* Booking List */}
         <BookingList venues={venues}/>
        

        </div>

      </div>
    </div>
  );
}