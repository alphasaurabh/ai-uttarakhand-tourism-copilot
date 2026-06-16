import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-gray-900">
            Popular Destinations
          </h2>

          <p className="text-center text-gray-600 mt-4">
            Explore the most loved places in Uttarakhand.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            <Card
              title="Nainital"
              description="Famous lake city surrounded by scenic mountains."
              image="/images/nainital.jpg"
            />

            <Card
              title="Mussoorie"
              description="The Queen of Hills offering breathtaking views."
              image="/images/mussorie.jpg"
            />

            <Card
              title="Rishikesh"
              description="Adventure capital and yoga destination of India."
              image="/images/rishikesh.jpg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}