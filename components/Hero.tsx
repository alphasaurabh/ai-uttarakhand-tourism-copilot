export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 text-center">
        <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          AI Powered Travel Planning
        </span>

        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Explore Uttarakhand
          <br />
          Smarter with AI
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Discover hidden gems, create personalized itineraries,
          find unique homestays, and plan unforgettable journeys.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Start Planning
          </button>

          <button className="bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
            Explore Destinations
          </button>
        </div>
      </div>
    </section>
  );
}