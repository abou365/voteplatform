"use client";
import React from 'react';
import Image from 'next/image';
import styles from './CandidatesSection.module.css';
import Link from 'next/link';
import ScrollEffect from './ScrollEffect';

const candidates = [
  {
    name: 'Marie Dubois',
    description: 'Artiste talentueuse avec plus de 10 ans d\'expérience dans la musique contemporaine.',
    votes: 245,
    avatar: '/img-slide1.jpeg',
  },
  {
    name: 'Jean Martin',
    description: 'Musicien et compositeur reconnu dans le monde entier.',
    votes: 189,
    avatar: '/img-slide2.jpeg',
  },
  {
    name: 'Sophie Laurent',
    description: 'Chanteuse et auteure-compositrice avec une voix unique.',
    votes: 156,
    avatar: '/img-slide3.jpeg',
  },
  {
    name: 'Alexandre Petit',
    description: 'Producteur musical et DJ renommé.',
    votes: 203,
    avatar: '/img-slide1.jpeg',
  },
];

interface CandidatesSectionProps {
  categoryName: string;
  onClose: () => void;
}

const CandidatesSection: React.FC<CandidatesSectionProps> = ({ categoryName, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Candidats - {categoryName}</h2>
        <button onClick={onClose} className={styles.closeButton}>×</button>
      </div>
      <div className={styles.grid}>
        {candidates.map((candidate, index) => (
          <ScrollEffect key={index} className="scroll-from-bottom" delay={index * 100}>
            <div className={styles.card}>
              <Image src={candidate.avatar} alt={candidate.name} width={80} height={80} className={styles.avatar} />
              <h3 className={styles.cardTitle}>{candidate.name}</h3>
              <p className={styles.cardDescription}>{candidate.description}</p>
              <div className={styles.cardFooter}>
                <span>{candidate.votes} votes</span>
                <Link href={`/candidates/1`}>
                  <button className={styles.voteButton}>Voter</button>
                </Link>
              </div>
            </div>
          </ScrollEffect>
        ))}
      </div>
    </div>
  );
};

export default CandidatesSection;
