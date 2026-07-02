import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedFundraisers from "@/components/FeaturedFundraisers";
import WhyPollacle from "@/components/WhyPollacle";
import TrustedBy from "@/components/TrustedBy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <Hero />

      <HowItWorks />

      <FeaturedFundraisers />

      <WhyPollacle />

      <TrustedBy />

      <Footer />
    </main>
  );
}