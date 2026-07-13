import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
      <video
        className="absolute inset-0 h-full w-full scale-125 object-cover object-[center_40%]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/Video%20Project%203.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-slate-950/35" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e] shadow-sm backdrop-blur-sm dark:border-[#2dd4bf]/20 dark:bg-slate-900/60 dark:text-[#2dd4bf]">
            AI-powered travel planning
          </span>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Plan Uttarakhand with clarity, trust, and local insight.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-100/90 sm:text-lg">
              Discover destinations, build thoughtful itineraries, and move from inspiration to a trip you can actually make.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ai-planner"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#0f766e] px-6 text-sm font-semibold text-white transition hover:bg-[#0d665f] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              Start planning
            </Link>

            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/70 px-6 text-sm font-semibold text-slate-800 transition hover:border-[#0ea5e9]/30 hover:text-[#0f766e] dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-[#0ea5e9]/30"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/15 bg-white/15 p-5 shadow-sm shadow-slate-950/5 backdrop-blur-sm dark:bg-slate-950/20">
          <div className="rounded-3xl border border-white/15 bg-white/80 p-5 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0ea5e9] dark:text-[#38bdf8]">
              Trip preview
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/15 bg-white/70 p-4 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  Nainital, Mussoorie, Rishikesh
                </p>
                  <p className="mt-1 text-sm leading-6 text-(--muted-foreground)">
                  A balanced route with lake views, mountain stays, and a calm pace.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/70 p-4 dark:bg-slate-900/60">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Focus</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">Simple planning</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/70 p-4 dark:bg-slate-900/60">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Style</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">Travel-first</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}