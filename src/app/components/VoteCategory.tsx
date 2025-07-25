"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './VoteCategory.module.css';
import CandidatesSection from './CandidatesSection';
import ScrollEffect from './ScrollEffect';
import PageHeader from "@/app/components/PageHeader";

const categories = [
  {
    name: 'Meilleur Artiste',
    description: 'Votez pour votre artiste préféré',
    candidates: 4,
    image: '/img-slide1.jpeg',
  },
  {
    name: 'Meilleur Athlète',
    description: 'Votez pour votre athlète préféré',
    candidates: 3,
    image: '/img-slide2.jpeg',
  },
  {
    name: 'Meilleur Innovateur',
    description: 'Votez pour votre innovateur préféré',
    candidates: 3,
    image: '/img-slide3.jpeg',
  },
];

interface VoteCategoryProps {
  eventName: string;
  eventImage: string;
}

const VoteCategory: React.FC<VoteCategoryProps> = ({ eventName, eventImage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Header visuel avec image de l'événement
  // Affiché en haut de la page catégories
  // (on peut ajuster le titre/sous-titre si besoin)
  //
  // On place ce header avant le reste du contenu

  return (
    <>
      <PageHeader
        title={`Catégories de Vote - ${eventName}`}
        subtitle="Découvrez toutes les catégories et votez pour vos candidats préférés"
        image={eventImage}
      />
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.grid}>
          {filteredCategories.map((category, index) => (
            <ScrollEffect key={index} className="scroll-from-bottom" delay={index * 100}>
              <div 
                className={`${styles.card} ${selectedCategory === category.name ? styles.cardSelected : ''}`}
              >
                <Image src={category.image} alt={category.name} width={400} height={200} className={styles.image} />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{category.name}</h2>
                  <p className={styles.cardDescription}>{category.description}</p>
                  <div className={styles.cardFooter}>
                    <span>{category.candidates} candidats</span>
                    <button onClick={() => setSelectedCategory(category.name)} className={styles.button}>Voir les candidats</button>
                  </div>
                </div>
              </div>
            </ScrollEffect>
          ))}
        </div>

        {selectedCategory && (
          <ScrollEffect className="scroll-scale">
            <CandidatesSection 
              categoryName={selectedCategory} 
              onClose={() => setSelectedCategory(null)} 
            />
          </ScrollEffect>
        )}
      </div>
    </>
  );
};

export default VoteCategory;
