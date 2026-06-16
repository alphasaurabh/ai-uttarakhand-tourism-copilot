import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            Dashboard
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-gray-900">
            Your Travel Dashboard
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-4xl">
            Keep track of your saved trips, personalized recommendations,
            and travel history from one centralized dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">🧳</div>

              <h2 className="font-bold text-xl text-gray-900">
                Saved Trips
              </h2>

              <p className="mt-3 text-gray-600">
                Access and manage all your saved travel itineraries in one place.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">✨</div>

              <h2 className="font-bold text-xl text-gray-900">
                Recommendations
              </h2>

              <p className="mt-3 text-gray-600">
                Discover AI-powered destination suggestions tailored to your interests.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">📍</div>

              <h2 className="font-bold text-xl text-gray-900">
                Travel History
              </h2>

              <p className="mt-3 text-gray-600">
                Review previously planned journeys and revisit favorite destinations.
              </p>
            </div>

          </div>

          <div className="mt-20 bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready for Your Next Adventure?
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Use AI-powered recommendations to discover new destinations
              and create your next personalized travel itinerary.
            </p>

            <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300">
              Plan a New Trip
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}