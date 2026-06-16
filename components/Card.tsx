import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  image: string;
};

export default function Card({
  title,
  description,
  image,
}: CardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-60 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-black/20"></div>

        <h3 className="absolute bottom-4 left-4 text-white text-3xl font-bold">
          {title}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-gray-600">
          {description}
        </p>

        <button className="mt-5 text-emerald-600 font-semibold hover:text-emerald-700">
          Explore →
        </button>
      </div>
    </div>
  );
}