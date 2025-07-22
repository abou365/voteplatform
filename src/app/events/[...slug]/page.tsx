import { Suspense } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import VoteCategory from "@/app/components/VoteCategory";
import Loading from "@/app/loading";

async function getEventData(slug: string[]) {
  // Simuler un délai pour démontrer le loading
  await new Promise(resolve => setTimeout(resolve, 1000));
  return decodeURIComponent(slug.join(' '));
}

export default async function EventCategoriesPage({ params }: { params: { slug: string[] } }) {
  const eventName = await getEventData(params.slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<Loading />}>
        <VoteCategory eventName={eventName} />
      </Suspense>
      <Footer />
    </div>
  );
}
