import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_25%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10 w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl shadow-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-rose-400">
          403
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Not authorized
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          You do not have permission to access this page with the current account.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-r from-rose-400 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            Go home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
          >
            Try dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
