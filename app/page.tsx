"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              Popular destinations
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Places travelers return to again and again.
            </h2>

            <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
              A focused selection of Uttarakhand destinations to help you move
              from inspiration to a realistic plan.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-border bg-surface/90 shadow-sm shadow-slate-950/5"
                >
                  <div className="aspect-[4/3] animate-pulse bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="space-y-4 p-5">
                    <div className="space-y-3">
                      <div className="h-3 w-24 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
                      <div className="h-6 w-4/5 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
                      <div className="h-4 w-full rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
                      <div className="h-4 w-5/6 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-4 w-32 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
                      <div className="h-4 w-16 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : destinations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {destinations.map((destination) => (
                <Card
                  key={destination.id}
                  title={destination.name}
                  description={destination.description}
                  location={destination.location}
                  image={
                    destination.imageUrl || "/images/default-destination.jpg"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-dashed border-border bg-surface/90 px-6 py-10 text-center shadow-sm shadow-slate-950/5 sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
                No destinations yet
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Destination results will appear here.
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Once the destination feed loads, curated Uttarakhand places will
                populate this section automatically.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              Why choose us
            </p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              Travel-first planning
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Designed to make discovery feel practical, calm, and easy to
              navigate.
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              Trusted guidance
            </p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              Clear recommendations
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Find destinations, itineraries, and trip ideas with a clean,
              readable flow.
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              Simple next step
            </p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              Start planning faster
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Move from browsing to planning without extra noise or friction.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-border bg-surface/90 px-6 py-8 text-center shadow-sm shadow-slate-950/5 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Ready to build your next Uttarakhand trip?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            Use the AI planner to turn a destination idea into a clear, personal
            itinerary.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}