import Image from "next/image";

import LoginButton from "@/components/login_button";
export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6 text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow Effects */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-indigo-500/20 blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        {/* Top Gradient Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

        <div className="p-10">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-lg shadow-cyan-500/10">
              <Image src="/iithlogo.png" alt="Logo" width={50} height={50} />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-7 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              IITH Room Booking
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Reserve classrooms, conference halls, labs, and campus spaces with
              a seamless booking experience.
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium">⚡ Instant Booking</p>
              <p className="mt-1 text-xs text-zinc-500">
                Quick room reservations
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium">🛠️ Easy Room Setup</p>
              <p className="mt-1 text-xs text-zinc-500">
                Add new rooms anytime{" "}
              </p>
            </div>
          </div>

          {/* Login Button */}
          <LoginButton />

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Secure access for IIT Hyderabad students & faculty
          </div>
        </div>
      </div>
    </div>
  );
}
