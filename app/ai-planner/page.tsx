import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AIPlanner() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="max-w-3xl space-y-4 pt-2 sm:pt-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70 dark:text-emerald-300">
              AI travel planner
            </span>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Plan your perfect Uttarakhand trip.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Describe your travel preferences and let AI create a personalized itinerary tailored to your interests, budget, and duration.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Nature",
                "Trekking",
                "Family travel",
                "Budget stays",
                "Local food",
              ].map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center rounded-full border border-border bg-surface/90 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm dark:text-slate-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-border bg-surface/90 p-5 shadow-sm shadow-slate-950/5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 dark:text-white">
                    Describe your trip
                  </label>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Include number of days, budget, pace, and the kind of experiences you want.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  1 step
                </span>
              </div>

              <textarea
                placeholder="Example: I want a 5-day budget-friendly Uttarakhand trip focused on nature, trekking, and local food, with a calm pace and a mix of lakes, mountains, and heritage stays."
                className="mt-4 h-44 w-full resize-none rounded-[24px] border border-border bg-background p-4 text-sm leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Duration
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-950 dark:text-white">
                    3 to 7 days
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Budget
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-950 dark:text-white">
                    Flexible
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Trip style
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-950 dark:text-white">
                    Balanced
                  </p>
                </div>
              </div>

              <button className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm shadow-slate-950/10 transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
                Generate trip
              </button>
            </div>

            <div className="rounded-[32px] border border-border bg-surface/90 p-5 shadow-sm shadow-slate-950/5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                    Itinerary preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Day-wise travel flow
                  </h2>
                </div>

                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Ready to personalize
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      1
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                          Arrival and lake-side check-in
                        </h3>
                        <span className="text-xs font-medium text-slate-500">
                          Nainital
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Settle in, enjoy a relaxed lake walk, and keep the first day light.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l border-dashed border-emerald-200 pl-4 dark:border-emerald-500/20">
                  <div className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        2
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                            Scenic transfer and local food stop
                          </h3>
                          <span className="text-xs font-medium text-slate-500">
                            Mussoorie
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          Move at a comfortable pace with one or two high-value stops.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l border-dashed border-emerald-200 pl-4 dark:border-emerald-500/20">
                  <div className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        3
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                            Return with a final experience block
                          </h3>
                          <span className="text-xs font-medium text-slate-500">
                            Rishikesh
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          Finish with a simple, well-paced activity before heading home.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">
                        Generating itinerary
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Building a day-wise route based on your preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}