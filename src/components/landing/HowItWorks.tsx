import { ShoppingCart, CreditCard, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    number: "01",
    title: "Choose Your Meal",
    description:
      "Browse the menu and select your favorite food in seconds.",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Place Your Order",
    description:
      "Confirm your order and let the canteen prepare it before you arrive.",
  },
  {
    icon: PackageCheck,
    number: "03",
    title: "Pick Up & Enjoy",
    description:
      "Skip the queue and collect your food instantly from the counter.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-8 max-h-full overflow-scroll">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-green-400 uppercase tracking-[0.3em] font-semibold">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            Three Simple Steps
          </h2>

          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto">
            Order food in seconds and never stand in long canteen queues again.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-green-400/40"
              >
                <p className="text-6xl font-black text-white/10">
                  {step.number}
                </p>

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/25">
                  <Icon className="text-green-400" size={28} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}