import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import VoteModule from '@/app/components/VoteModule';
import ShareSection from '@/app/components/ShareSection';
import styles from './candidate.module.css';
import ScrollEffect from '@/app/components/ScrollEffect';

const candidate = {
  name: 'Emma Rodriguez',
  votes: 267,
  bio: 'Athlète professionnelle spécialisée dans le tennis.',
  image: '/img-slide1.jpeg',
  eventId: 'festival-arts-2024',
  categoryId: 'meilleur-artiste',
};

export default function Page({ params }: { params: { id: string } }) {
  const voteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/candidates/${params.id}`;

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.banner}>
            <Image src={candidate.image} alt={candidate.name} fill style={{ objectFit: 'cover' }} />
            <div className={styles.bannerOverlay}></div>
            <div className={styles.bannerContent}>
              <h1 className={styles.candidateName}>{candidate.name}</h1>
              <div className={styles.voteCount}>
                <span>&hearts;</span> {candidate.votes} votes
              </div>
            </div>
            <button className={styles.shareButton}>
              <span>&#x21E7;</span>
            </button>
          </div>
          <div className={styles.content}>
            <ScrollEffect className="scroll-from-left">
              <div className={styles.bioSection}>
                <h2>Biographie</h2>
                <p>{candidate.bio}</p>
              </div>
            </ScrollEffect>
            <ScrollEffect className="scroll-from-right" delay={200}>
              <ShareSection url={voteUrl} />
            </ScrollEffect>
            <ScrollEffect className="scroll-scale" delay={400}>
              <VoteModule candidate={candidate} />
            </ScrollEffect>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
