import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            About Us
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Building Smarter Travel Experiences
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-4xl">
            Uttarakhand Copilot is an AI-powered tourism platform that helps
            travelers discover destinations, create personalized itineraries,
            find homestays, and plan unforgettable journeys across Uttarakhand.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">🤖</div>

              <h3 className="font-bold text-xl text-gray-900">
                AI Planning
              </h3>

              <p className="mt-3 text-gray-600">
                Smart travel itineraries powered by Gemini AI to make trip planning effortless.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">🏔️</div>

              <h3 className="font-bold text-xl text-gray-900">
                Destination Discovery
              </h3>

              <p className="mt-3 text-gray-600">
                Explore hidden gems, iconic landmarks, and unique experiences across Uttarakhand.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">🧭</div>

              <h3 className="font-bold text-xl text-gray-900">
                Travel Assistance
              </h3>

              <p className="mt-3 text-gray-600">
                Get personalized recommendations and guidance for every step of your journey.
              </p>
            </div>

          </div>

          <div className="mt-20 bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Mission
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
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