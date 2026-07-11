import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090B] overflow-x-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-green-500/15 blur-[140px]" />

        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-[160px]" />
      </div>

      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  );
}