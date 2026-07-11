import { Clock3, Smartphone, Sandwich } from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Save Time",
    description:
      "Pre-order your food and avoid long queues during breaks.",
  },
  {
    icon: Smartphone,
    title: "Live Order Tracking",
    description:
      "Know exactly when your order is ready for pickup.",
  },
  {
    icon: Sandwich,
    title: "Digital Menu",
    description:
      "Browse the complete canteen menu with prices and availability.",
  },
];

export default function Features() {
  return (
    <section className="py-32 px-8">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="text-green-400 font-semibold uppercase tracking-widest">
            Features
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            Built for Students.
          </h2>

          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto">
            Everything you need to order food faster and spend more
            time enjoying your college life.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-green-400/40"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/25 flex items-center justify-center">
                  <Icon className="text-green-400" size={28} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}