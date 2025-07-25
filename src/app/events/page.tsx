import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EventsSection from "@/app/components/EventsSection";
import PageHeader from "@/app/components/PageHeader";

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      <Header />
      <PageHeader
        title="Tous les Événements"
        subtitle="Découvrez et participez aux événements de vote en cours et à venir."
        image="/img-slide1.jpeg"
      />
      <main className="flex-1 max-w-6xl mx-auto py-12 px-4">
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
} 