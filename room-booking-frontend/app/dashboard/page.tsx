

import Image from "next/image";

import UserText from "@/components/userText";
import BookRoom from "@/components/bookRoom";

export default  function Dashboard() {


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

              <UserText />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          
          <BookRoom />

          {/* Booking List */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl">
            
            <div className="flex items-center justify-between">
              
              <div>
                <h2 className="text-3xl font-bold">
                  Your Bookings
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Recently submitted room requests.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                3 Active
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                refresh
              </div>
            </div>

            <div className="mt-8 space-y-5">
              
              {/* Card */}
              <div className="group rounded-3xl border border-white/10 bg-[#0b1220]/90 p-5 transition-all hover:border-cyan-500/30 hover:bg-[#10192b]">
                
                <div className="flex items-start justify-between">
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-cyan-500/10 p-3 text-lg">
                        🏫
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          Seminar Hall A
                        </h3>

                        <p className="text-sm text-zinc-500">
                          Club Meeting
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3 text-sm text-zinc-400">
                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        📅 26 May
                      </div>

                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        ⏰ 2:00 PM
                      </div>
                    </div>
                  </div>

                  <button className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20">
                    Delete
                  </button>
                </div>
              </div>

              {/* Card */}
              <div className="group rounded-3xl border border-white/10 bg-[#0b1220]/90 p-5 transition-all hover:border-purple-500/30 hover:bg-[#10192b]">
                
                <div className="flex items-start justify-between">
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-purple-500/10 p-3 text-lg">
                        💻
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          AI Lab
                        </h3>

                        <p className="text-sm text-zinc-500">
                          Workshop Session
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3 text-sm text-zinc-400">
                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        📅 28 May
                      </div>

                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        ⏰ 11:00 AM
                      </div>
                    </div>
                  </div>

                  <button className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20">
                    Delete
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}