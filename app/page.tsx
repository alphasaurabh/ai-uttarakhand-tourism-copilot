"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

interface Destination {
  id: number;
  name: string;
  location: string;
}

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error(err));
  }, []);

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
            {destinations.map((destination) => (
              <Card
                key={destination.id}
                title={destination.name}
                description={`Beautiful place in ${destination.location}`}
                image="/images/nainital.jpg"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}