import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedFundraisers from "@/components/FeaturedFundraisers";
import VignetteAds from "@/components/VignetteAds";
import WhyPollacle from "@/components/WhyPollacle";
import TrustedBy from "@/components/TrustedBy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <Hero />

      {/* Vignette-only setup: request page-level (vignette/anchor) ads only */}
      <VignetteAds />

      <HowItWorks />

      <FeaturedFundraisers />

      <WhyPollacle />

      <TrustedBy />

      <Footer />
    </main>
  );
}