import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import HowItWorks from "../components/HowItWorks";
import WhyPollacle from "../components/WhyPollacle";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white">
      <Navbar />

      <Hero />

      <TrustedBy />

      <HowItWorks />

      <WhyPollacle />

      <Footer />
    </main>
  );
}