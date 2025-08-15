import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PreviewSection from "@/components/sections/PreviewSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PreviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
