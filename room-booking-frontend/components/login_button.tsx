"use client";

import {supabase} from "@/lib/supabaseClient";

async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  
}


export default function LoginButton() {
  return (
    <button
      className="
              mt-8 group relative w-full overflow-hidden rounded-2xl
              bg-gradient-to-r from-cyan-400 to-blue-600
              py-4 text-sm font-semibold text-white
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
              shadow-lg shadow-blue-500/30
            "
      onClick={handleLogin}
    >
      <span className="relative z-10">Continue with Institute Login</span>

      <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
    </button>
  );
}
