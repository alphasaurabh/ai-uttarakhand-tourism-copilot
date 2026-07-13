import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <span className="inline-block rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
            About Us
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Building Smarter Travel Experiences
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[var(--muted)]">
            Uttarakhand Copilot is an AI-powered tourism platform that helps
            travelers discover destinations, create personalized itineraries,
            find homestays, and plan unforgettable journeys across Uttarakhand.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

            <div className="rounded-2xl border border-border bg-surface/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <div className="text-3xl mb-4">🤖</div>

              <h3 className="text-xl font-bold text-foreground">
                AI Planning
              </h3>

              <p className="mt-3 text-[var(--muted)]">
                Smart travel itineraries powered by Gemini AI to make trip planning effortless.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <div className="text-3xl mb-4">🏔️</div>

              <h3 className="text-xl font-bold text-foreground">
                Destination Discovery
              </h3>

              <p className="mt-3 text-[var(--muted)]">
                Explore hidden gems, iconic landmarks, and unique experiences across Uttarakhand.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <div className="text-3xl mb-4">🧭</div>

              <h3 className="text-xl font-bold text-foreground">
                Travel Assistance
              </h3>

              <p className="mt-3 text-[var(--muted)]">
                Get personalized recommendations and guidance for every step of your journey.
              </p>
            </div>

          </div>

          <div className="mt-20 rounded-3xl border border-border bg-surface/90 p-10 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-foreground">
              Our Mission
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--muted)]">
              To make exploring Uttarakhand easier, smarter, and more enjoyable
              through AI-powered travel planning and personalized recommendations.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}