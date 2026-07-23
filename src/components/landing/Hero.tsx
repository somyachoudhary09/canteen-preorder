"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PhonePreview from "./PhonePreview";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-8 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm text-green-400">
            🚀 Smart College Canteen
          </div>

          <h1 className="mt-8 text-6xl font-black leading-[1.05] text-white lg:text-8xl">
            Skip
            <br />
            The Queue.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
            Order food before reaching the canteen.
            Pick it up instantly.
            Spend more time with friends instead of standing in long queues.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link href="#pre-order" className="rounded-2xl bg-green-500 px-8 py-4 font-bold text-black transition hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.35)]">
              Order Now
            </Link>

            <Link href="/admin" className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-8 py-4 text-emerald-300 backdrop-blur transition hover:bg-emerald-500/20">
              Owner Login
            </Link>

            <a href="#pre-order" className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white backdrop-blur transition hover:bg-white/10">
              View Demo
            </a>
          </div>

          <div className="mt-14 flex gap-12">
            <div>
              <h2 className="text-4xl font-black text-white">2000+</h2>
              <p className="text-zinc-500">Orders</p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">15+</h2>
              <p className="text-zinc-500">Food Stalls</p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">5 min</h2>
              <p className="text-zinc-500">Avg Pickup</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PhonePreview />
        </motion.div>

      </div>
    </section>
  );
}