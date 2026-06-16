import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-white via-slate-50 to-emerald-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            Dashboard
          </span>

          <h1 className="mt-6 text-5xl font-bold text-gray-900">
            Travel Dashboard
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Manage your saved trips, AI recommendations, and travel history all in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h2 className="font-bold text-xl text-gray-900">
                Saved Trips
              </h2>

              <p className="mt-3 text-gray-600">
                Access and manage your saved travel itineraries.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h2 className="font-bold text-xl text-gray-900">
                Recommendations
              </h2>

              <p className="mt-3 text-gray-600">
                Discover AI-powered suggestions for your next adventure.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h2 className="font-bold text-xl text-gray-900">
                Travel History
              </h2>

              <p className="mt-3 text-gray-600">
                Review previously planned journeys and destinations.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}