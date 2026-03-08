import Navbar from "@/components/pawcare/Navbar";
import HeroSection from "@/components/pawcare/HeroSection";
import ServicesSection from "@/components/pawcare/ServicesSection";
import WhyUsSection from "@/components/pawcare/WhyUsSection";
import DoctorSection from "@/components/pawcare/DoctorSection";
import TestimonialsSection from "@/components/pawcare/TestimonialsSection";
import ContactSection from "@/components/pawcare/ContactSection";
import Footer from "@/components/pawcare/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <DoctorSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
