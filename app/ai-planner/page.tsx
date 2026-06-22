import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AIPlanner() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            AI Travel Planner
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-gray-900">
            Plan Your Perfect Uttarakhand Trip
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-4xl">
            Describe your travel preferences and let AI create a personalized itinerary
            tailored to your interests, budget, and duration.
          </p>

          <div className="mt-14 bg-white rounded-3xl shadow-xl p-8">

            <label className="block text-gray-900 font-semibold mb-3">
              Describe Your Trip
            </label>

            <textarea
              placeholder="Example: I want a 5-day budget-friendly trip to Uttarakhand focused on nature, trekking, and local food..."
              className="w-full h-40 border border-gray-300 rounded-2xl p-4 text-black placeholder:text-gray-500 resize-none"
            />

            <button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300">
              Generate Itinerary
            </button>

          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">🤖</div>

              <h3 className="text-xl font-bold text-gray-900">
                Smart Planning
              </h3>

              <p className="mt-3 text-gray-600">
                AI generates personalized itineraries based on your preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">💰</div>

              <h3 className="text-xl font-bold text-gray-900">
                Budget Friendly
              </h3>

              <p className="mt-3 text-gray-600">
                Get travel plans that match your budget constraints.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">🗺️</div>

              <h3 className="text-xl font-bold text-gray-900">
                Personalized Routes
              </h3>

              <p className="mt-3 text-gray-600">
                Discover destinations and routes tailored specifically for you.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}