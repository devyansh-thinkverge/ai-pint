import { ReactLenis } from "lenis/react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Concept from "@/components/landing/Concept";
import Timeline from "@/components/landing/Timeline";
import Comparison from "@/components/landing/Comparison";
import Platform from "@/components/landing/Platform";
import Events from "@/components/landing/Events";
import Retreats from "@/components/landing/Retreats";
import MarqueeStrip from "@/components/landing/MarqueeStrip";
import Cities from "@/components/landing/Cities";
import Waitlist from "@/components/landing/Waitlist";
import PintScroll from "@/components/landing/PintScroll";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <div className="relative min-h-screen bg-brew-foam text-brew-ink font-body">
        <div className="grain-overlay" aria-hidden="true" />
        <PintScroll />
        <Navbar />
        <main>
          <Hero />
          <Concept />
          <Timeline />
          <Retreats />
          <Comparison />
          <Platform />
          <MarqueeStrip />
          <Events />
          <Cities />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
