import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData) {
    redirect("/login?next=/dashboard");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="max-w-3xl space-y-4 pt-2 sm:pt-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70 dark:text-emerald-300">
              Dashboard
            </span>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Your travel workspace.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Keep track of saved trips, tailored recommendations, and recent travel activity from one calm, organized view.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-3xl">🧳</div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                Saved Trips
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Access and manage all your saved travel itineraries in one place.
              </p>
            </div>

            <div className="rounded-[28px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-3xl">✨</div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                Recommendations
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Discover AI-powered destination suggestions tailored to your interests.
              </p>
            </div>

            <div className="rounded-[28px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-3xl">📍</div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                Recent Activity
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Review previously planned journeys and revisit favorite destinations.
              </p>
            </div>
          </section>

          <section className="rounded-[32px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
                  Workspace overview
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                  Ready for your next adventure?
                </h2>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                  Use AI-powered recommendations to discover new destinations and create your next personalized travel itinerary.
                </p>
              </div>

              <button className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm shadow-emerald-950/10 transition hover:bg-emerald-700">
                Plan a New Trip
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
