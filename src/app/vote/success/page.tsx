"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './success.module.css';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaInstagram, FaLink, FaShareAlt, FaQrcode } from 'react-icons/fa';
import Link from 'next/link';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const candidateName = searchParams.get('candidateName') || 'le candidat';
  const candidateImage = searchParams.get('candidateImage') || '/img-slide1.jpeg';
  const candidateVotes = searchParams.get('candidateVotes') || '268';
  const candidateBio = searchParams.get('candidateBio') || 'Athlète professionnelle spécialisée dans le tennis.';
  const eventId = searchParams.get('eventId') || '';
  const categoryId = searchParams.get('categoryId') || '';

  // Debug : afficher l'eventId et l'URL complète
  if (typeof window !== 'undefined') {
    console.log('eventId transmis à la page de succès :', eventId);
    console.log('URL complète :', window.location.href);
  }

  // Générer dynamiquement l'URL à partager
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Je viens de voter pour ${candidateName} !`);
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,'_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,'_blank');
    } else if (platform === 'instagram') {
      window.open('https://www.instagram.com/', '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoToResults = () => {
    if (eventId) {
      router.push(`/results/${eventId}`);
    } else {
      alert("Aucun événement associé à ce vote.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BsCheckCircleFill className={styles.checkIcon} />
        <h1 className={styles.title}>Merci d&apos;avoir voté !</h1>
        <p className={styles.subtitle}>
          Votre vote pour <span className={styles.candidateName}>{candidateName}</span> a bien été enregistré.
        </p>

        <div className={styles.candidateCard}>
          <div className={styles.cardTop}>
            <Image src={candidateImage} alt={candidateName} width={64} height={64} className={styles.candidateAvatar} />
            <div className={styles.cardInfo}>
              <div className={styles.cardName}>{candidateName}</div>
              <div className={styles.cardVotes}>{candidateVotes} votes</div>
            </div>
          </div>
          <div className={styles.cardBio}>{candidateBio}</div>
        </div>

        <div className={styles.shareCard}>
            <FaShareAlt className={styles.shareIcon}/>
            <h2 className={styles.shareTitle}>Partagez votre vote</h2>
            <p className={styles.shareSubtitle}>Encouragez vos amis à voter aussi !</p>
            <div className={styles.shareButtons}>
                <button onClick={() => handleShare('facebook')} className={`${styles.shareButton} ${styles.facebook}`}><FaFacebookF/> Facebook</button>
                <button onClick={() => handleShare('twitter')} className={`${styles.shareButton} ${styles.twitter}`}><FaTwitter/> Twitter</button>
                <button onClick={() => handleShare('instagram')} className={`${styles.shareButton} ${styles.instagram}`}><FaInstagram/> Instagram</button>
                <button onClick={() => handleShare('copy')} className={`${styles.shareButton} ${styles.copy}`}>{copied ? 'Copié !' : <><FaLink/> Copier</>}</button>
            </div>
            <div className={styles.qrCode}><FaQrcode /> QR Code disponible prochainement</div>
        </div>

        <div className={styles.actionButtons}>
            <button
              onClick={handleGoToResults}
              className={styles.primaryButton}
              disabled={!eventId}
              style={{ opacity: eventId ? 1 : 0.5, cursor: eventId ? 'pointer' : 'not-allowed' }}
            >
              Voir les résultats
            </button>
            <Link
              href={eventId && categoryId ? `/events/${eventId}/${categoryId}` : '/events/categories'}
              className={styles.secondaryButton}
            >
              Voter pour d&apos;autres candidats
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
