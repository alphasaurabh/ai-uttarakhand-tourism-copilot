"use client";

import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/ui/Loader";

type PlannerResponse = {
  destination: string;
  durationDays: number;
  travellers: number;
  budgetInput: number;
  interests: string[];
  travelStyle: string | null;
  accommodationPreference: string | null;
  transportPreference: string | null;
  summary: string;
  days: {
    day: number;
    title: string;
    places: { name: string; description: string }[];
    activities: string[];
    food: string[];
    cost: number;
    notes: string[];
  }[];
  budget: {
    transport: number;
    stay: number;
    food: number;
    activities: number;
    misc: number;
    totalEstimated: number;
  };
  tips: string[];
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const defaultInterests = [
  "Adventure",
  "Nature",
  "Trekking",
  "Spiritual",
  "Wildlife",
  "Local Food",
  "Photography",
  "Family Travel",
];

export default function AIPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(4);
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState(15000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Adventure", "Nature"]);
  const [customInterests, setCustomInterests] = useState("");
  const [travelStyle, setTravelStyle] = useState("Balanced");
  const [accommodationPreference, setAccommodationPreference] = useState("");
  const [transportPreference, setTransportPreference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plan, setPlan] = useState<PlannerResponse | null>(null);

  const selectedInterestCount = useMemo(() => {
    const parsedCustom = customInterests
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    return new Set([...selectedInterests, ...parsedCustom]).size;
  }, [customInterests, selectedInterests]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((value) => value !== interest);
      }
      if (current.length >= 8) {
        toast.error("You can choose up to 8 interests.");
        return current;
      }
      return [...current, interest];
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const parsedCustom = customInterests
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const interests = Array.from(new Set([...selectedInterests, ...parsedCustom])).slice(0, 8);

    if (!destination.trim()) {
      toast.error("Destination is required.");
      return;
    }

    if (days < 1 || days > 14) {
      toast.error("Days must be between 1 and 14.");
      return;
    }

    if (travellers < 1 || travellers > 20) {
      toast.error("Travellers must be between 1 and 20.");
      return;
    }

    if (budget < 1000) {
      toast.error("Budget must be at least 1000 INR.");
      return;
    }

    if (interests.length < 1) {
      toast.error("Please choose at least one interest.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/ai/trip-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: destination.trim(),
          days,
          travellers,
          budget,
          interests,
          travelStyle: travelStyle || undefined,
          accommodationPreference: accommodationPreference.trim() || undefined,
          transportPreference: transportPreference.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "We couldn't generate your itinerary right now. Please try again.");
        return;
      }

      setPlan(data as PlannerResponse);
      toast.success("Your itinerary is ready.");
    } catch {
      toast.error("We couldn't generate your itinerary right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Plan your Uttarakhand trip in minutes.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Enter your destination, duration, budget, and interests. The planner creates a concise day-by-day route with cost breakdown and practical travel tips.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[32px] border border-border bg-surface/90 p-5 shadow-sm shadow-slate-950/5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 dark:text-white">
                    Trip requirements
                  </label>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Keep it specific for better results. Interest limit: 8.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {selectedInterestCount} interests
                </span>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    placeholder="Auli"
                    className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                    maxLength={80}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Days</label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={days}
                      onChange={(event) => setDays(Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Travellers</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={travellers}
                      onChange={(event) => setTravellers(Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Budget (INR)</label>
                    <input
                      type="number"
                      min={1000}
                      value={budget}
                      onChange={(event) => setBudget(Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {defaultInterests.map((interest) => {
                      const selected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          disabled={isSubmitting}
                          className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${selected ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300" : "border-border bg-background text-slate-700 hover:border-emerald-200 dark:text-slate-200"}`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="text"
                    value={customInterests}
                    onChange={(event) => setCustomInterests(event.target.value)}
                    placeholder="Optional custom interests, comma-separated"
                    className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                    disabled={isSubmitting}
                    maxLength={120}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Travel style</label>
                    <select
                      value={travelStyle}
                      onChange={(event) => setTravelStyle(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                      disabled={isSubmitting}
                    >
                      <option value="Balanced">Balanced</option>
                      <option value="Relaxed">Relaxed</option>
                      <option value="Adventure-Heavy">Adventure-Heavy</option>
                      <option value="Budget-Focused">Budget-Focused</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Stay preference</label>
                    <input
                      type="text"
                      value={accommodationPreference}
                      onChange={(event) => setAccommodationPreference(event.target.value)}
                      placeholder="Homestay, hotel"
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                      disabled={isSubmitting}
                      maxLength={50}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Transport preference</label>
                    <input
                      type="text"
                      value={transportPreference}
                      onChange={(event) => setTransportPreference(event.target.value)}
                      placeholder="Shared cab, self-drive"
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                      disabled={isSubmitting}
                      maxLength={50}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                {isSubmitting ? "Generating..." : "Generate Trip Plan"}
              </button>
            </form>

            <div className="rounded-[32px] border border-border bg-surface/90 p-5 shadow-sm shadow-slate-950/5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                    Generated itinerary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Trip overview and day plan
                  </h2>
                </div>
              </div>

              {isSubmitting ? (
                <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <Loader />
                    <div>
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">Planning your Uttarakhand trip...</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Building a concise day-by-day itinerary with budget split.</p>
                    </div>
                  </div>
                </div>
              ) : plan ? (
                <div className="mt-5 space-y-5">
                  <section className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trip overview</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{plan.destination} for {plan.durationDays} days</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{plan.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full border border-border bg-surface/90 px-3 py-1 text-slate-700 dark:text-slate-200">Travellers: {plan.travellers}</span>
                      <span className="rounded-full border border-border bg-surface/90 px-3 py-1 text-slate-700 dark:text-slate-200">Input Budget: INR {plan.budgetInput.toLocaleString()}</span>
                      <span className="rounded-full border border-border bg-surface/90 px-3 py-1 text-slate-700 dark:text-slate-200">Estimated Total: INR {plan.budget.totalEstimated.toLocaleString()}</span>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Daily itinerary</p>
                    {plan.days.map((day) => (
                      <article key={day.day} className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-950 dark:text-white">Day {day.day}: {day.title}</h4>
                          <span className="text-xs font-semibold text-slate-500">INR {day.cost.toLocaleString()}</span>
                        </div>

                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Places</p>
                          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {day.places.map((place) => (
                              <li key={`${day.day}-${place.name}`}>
                                <span className="font-semibold text-slate-950 dark:text-white">{place.name}:</span> {place.description}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Activities</p>
                            <ul className="mt-1 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                              {day.activities.map((activity) => (
                                <li key={`${day.day}-${activity}`}>- {activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Food</p>
                            <ul className="mt-1 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                              {day.food.map((item) => (
                                <li key={`${day.day}-${item}`}>- {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Notes</p>
                            <ul className="mt-1 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                              {day.notes.map((note) => (
                                <li key={`${day.day}-${note}`}>- {note}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </article>
                    ))}
                  </section>

                  <section className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Budget breakdown</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        <li>Transport: INR {plan.budget.transport.toLocaleString()}</li>
                        <li>Accommodation: INR {plan.budget.stay.toLocaleString()}</li>
                        <li>Food: INR {plan.budget.food.toLocaleString()}</li>
                        <li>Activities: INR {plan.budget.activities.toLocaleString()}</li>
                        <li>Misc: INR {plan.budget.misc.toLocaleString()}</li>
                      </ul>
                    </div>

                    <div className="rounded-[24px] border border-border bg-background p-4 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Travel tips</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {plan.tips.map((tip) => (
                          <li key={tip}>- {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">No itinerary generated yet.</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Submit your trip details to get a compact AI-generated plan.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}