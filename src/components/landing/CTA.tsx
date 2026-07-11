export default function CTA() {
  return (
    <section className="px-8 pb-32">

      <div className="mx-auto max-w-6xl rounded-[40px] border border-white/10 bg-gradient-to-br from-green-500/20 to-transparent p-16 text-center">

        <h2 className="text-5xl font-black text-white">
          Ready to Skip the Queue?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
          Order your food before reaching the canteen and enjoy a faster,
          smarter campus experience.
        </p>

        <button className="mt-10 rounded-2xl bg-green-500 px-10 py-5 font-bold text-black transition hover:scale-105">
          Start Ordering
        </button>

      </div>

    </section>
  );
}