"use client";
import React, { useState } from 'react';
import styles from './VoteModule.module.css';
import { useRouter } from 'next/navigation';

interface Candidate {
    name: string;
    votes: number;
    bio: string;
    image: string;
    eventId: string;
    categoryId: string; // ajout de categoryId
}

interface VoteModuleProps {
  candidate: Candidate;
}

const VoteModule: React.FC<VoteModuleProps> = ({ candidate }) => {
  const [votes, setVotes] = useState(1);
  const router = useRouter();

  const increment = () => setVotes(v => v + 1);
  const decrement = () => setVotes(v => Math.max(v - 1, 1));

  const handleConfirmVote = () => {
    const params = new URLSearchParams({
        candidateName: candidate.name,
        candidateImage: candidate.image,
        candidateVotes: (candidate.votes + votes).toString(),
        candidateBio: candidate.bio,
        eventId: candidate.eventId,
        categoryId: candidate.categoryId, // on passe l'id de la catégorie
    });
    router.push(`/vote/success?${params.toString()}`);
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Votez pour {candidate.name}</h3>
      <div className={styles.counter}>
        <button onClick={decrement} disabled={votes <= 1} className={styles.counterButton}>-</button>
        <div className={styles.voteAmount}>
          <div>{votes}</div>
          <div className={styles.voteLabel}>vote{votes > 1 ? 's' : ''}</div>
        </div>
        <button onClick={increment} className={styles.counterButton}>+</button>
      </div>
      <button onClick={handleConfirmVote} className={styles.confirmButton}>
        Confirmer mon vote ({votes} vote{votes > 1 ? 's' : ''})
      </button>
    </div>
  );
};

export default VoteModule;
