type CardProps = {
  title: string;
  description: string;
};

export default function Card({
  title,
  description,
}: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">

      <div className="h-48 bg-gradient-to-br from-emerald-200 to-blue-200"></div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {description}
        </p>

        <button className="mt-5 text-emerald-600 font-semibold">
          Learn More →
        </button>
      </div>
    </div>
  );
}