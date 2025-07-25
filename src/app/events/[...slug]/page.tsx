import { Suspense } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import VoteCategory from "@/app/components/VoteCategory";
import Loading from "@/app/loading";

const eventImages: Record<string, string> = {
  "festival des arts 2024": "/img-slide1.jpeg",
  "gala sportif 2024": "/img-slide2.jpeg",
  "innovation day": "/img-slide3.jpeg",
  // Ajoutez d'autres correspondances ici si besoin
};

async function getEventData(slug: string[]) {
  // Simuler un délai pour démontrer le loading
  await new Promise(resolve => setTimeout(resolve, 1000));
  return decodeURIComponent(slug.join(' '));
}

export default async function EventCategoriesPage({ params }: { params: { slug: string[] } }) {
  const eventName = await getEventData(params.slug);
  const eventKey = eventName.trim().toLowerCase();
  const eventImage = eventImages[eventKey] || "/img-slide1.jpeg";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<Loading />}>
        <VoteCategory eventName={eventName} eventImage={eventImage} />
      </Suspense>
      <Footer />
    </div>
  );
}
