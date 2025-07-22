import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import EventsSection from "./components/EventsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ComingSoonSection from "./components/ComingSoonSection";
import ScrollEffect from "./components/ScrollEffect";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroSlider />
      <ScrollEffect className="scroll-bounce" delay={200}>
        <EventsSection />
      </ScrollEffect>
      <ScrollEffect className="scroll-from-bottom" delay={400}>
        <HowItWorksSection />
      </ScrollEffect>
      <ScrollEffect className="scroll-from-left" delay={600}>
        <ComingSoonSection />
      </ScrollEffect>
      <Footer />
    </div>
  );
}
