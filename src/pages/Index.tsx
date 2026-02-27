import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EarbudsSection from "@/components/EarbudsSection";
import ExplodedSection from "@/components/ExplodedSection";
import SpecsSection from "@/components/SpecsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <EarbudsSection />
      <ExplodedSection />
      <SpecsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
