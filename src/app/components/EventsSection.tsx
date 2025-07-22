"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./EventsSection.module.css";
import Link from 'next/link';

const events = [
  {
    title: "Festival des Arts 2024",
    author: "Marie Dubois",
    desc: "Célébrons les talents artistiques de notre région",
    date: "2024-01-01 - 2024-06-30",
    candidates: 10,
    votes: 2256,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Concours Innovation Tech",
    author: "Marie Dubois",
    desc: "Récompensons les innovateurs technologiques",
    date: "2024-03-01 - 2024-09-30",
    candidates: 10,
    votes: 2256,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Championnat Sportif Régional",
    author: "Jean Martin",
    desc: "Votez pour les meilleurs athlètes de la région",
    date: "2024-02-15 - 2024-08-15",
    candidates: 10,
    votes: 2256,
    img: "/img-slide3.jpeg",
    active: true,
  },
  {
    title: "Gala des Entrepreneurs",
    author: "Jean Martin",
    desc: "Reconnaissons les entrepreneurs qui font la différence",
    date: "2024-04-01 - 2024-10-31",
    candidates: 10,
    votes: 2256,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Prix de la Créativité",
    author: "Sophie Laurent",
    desc: "Célébrons la créativité sous toutes ses formes",
    date: "2024-05-01 - 2024-11-30",
    candidates: 10,
    votes: 2256,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Concours Jeunes Talents",
    author: "Sophie Laurent",
    desc: "Soutenons la nouvelle génération de talents",
    date: "2024-06-01 - 2024-12-31",
    candidates: 10,
    votes: 2256,
    img: "/img-slide3.jpeg",
    active: true,
  },
  // Ajout de 14 événements supplémentaires
  {
    title: "Trophée Musique 2024",
    author: "Lucas Bernard",
    desc: "Votez pour les meilleurs musiciens de l'année",
    date: "2024-02-01 - 2024-07-31",
    candidates: 8,
    votes: 1200,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Festival du Film Jeunesse",
    author: "Emma Petit",
    desc: "Découvrez les jeunes talents du cinéma",
    date: "2024-03-10 - 2024-08-20",
    candidates: 12,
    votes: 980,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Prix Innovation Santé",
    author: "Dr. Alain Roche",
    desc: "Récompensons les avancées médicales",
    date: "2024-04-15 - 2024-09-15",
    candidates: 6,
    votes: 1500,
    img: "/img-slide3.jpeg",
    active: true,
  },
  {
    title: "Challenge Startups",
    author: "Julie Morel",
    desc: "Votez pour la startup la plus prometteuse",
    date: "2024-05-05 - 2024-10-05",
    candidates: 15,
    votes: 2100,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Tournoi E-sport Été",
    author: "Maxime Lefevre",
    desc: "Compétition de jeux vidéo régionale",
    date: "2024-06-20 - 2024-09-10",
    candidates: 20,
    votes: 3200,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Festival de la Photographie",
    author: "Claire Dubois",
    desc: "Exposez et votez pour les plus beaux clichés",
    date: "2024-07-01 - 2024-12-01",
    candidates: 18,
    votes: 1750,
    img: "/img-slide3.jpeg",
    active: true,
  },
  {
    title: "Prix du Roman Jeunesse",
    author: "Paul Girard",
    desc: "Votez pour le meilleur roman jeunesse de l'année",
    date: "2024-08-01 - 2024-12-31",
    candidates: 7,
    votes: 900,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Concours Peinture Moderne",
    author: "Isabelle Martin",
    desc: "Célébrons la peinture contemporaine",
    date: "2024-01-15 - 2024-06-15",
    candidates: 11,
    votes: 1100,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Trophée Danse Urbaine",
    author: "Nina Leroy",
    desc: "Votez pour les meilleures performances de danse urbaine",
    date: "2024-02-20 - 2024-07-20",
    candidates: 9,
    votes: 1300,
    img: "/img-slide3.jpeg",
    active: true,
  },
  {
    title: "Prix de l'Innovation Digitale",
    author: "Antoine Caron",
    desc: "Récompensons les projets digitaux innovants",
    date: "2024-03-25 - 2024-09-25",
    candidates: 13,
    votes: 1600,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Festival Théâtre Amateur",
    author: "Sophie Bernard",
    desc: "Votez pour les meilleures troupes de théâtre amateur",
    date: "2024-04-10 - 2024-10-10",
    candidates: 10,
    votes: 1400,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Challenge Robotique Scolaire",
    author: "Lucas Petit",
    desc: "Les écoles s'affrontent en robotique",
    date: "2024-05-15 - 2024-11-15",
    candidates: 16,
    votes: 2000,
    img: "/img-slide3.jpeg",
    active: true,
  },
  {
    title: "Prix du Court-Métrage",
    author: "Emma Laurent",
    desc: "Votez pour le meilleur court-métrage",
    date: "2024-06-10 - 2024-12-10",
    candidates: 14,
    votes: 1550,
    img: "/img-slide2.jpeg",
    active: true,
  },
  {
    title: "Tournoi d'Échecs Junior",
    author: "Paul Lefevre",
    desc: "Compétition d'échecs pour les jeunes",
    date: "2024-07-15 - 2024-11-15",
    candidates: 12,
    votes: 950,
    img: "/img-slide1.jpeg",
    active: true,
  },
  {
    title: "Festival des Sciences",
    author: "Julie Martin",
    desc: "Célébrons la science et l'innovation",
    date: "2024-08-20 - 2024-12-20",
    candidates: 17,
    votes: 1800,
    img: "/img-slide3.jpeg",
    active: true,
  },
];

export default function EventsSection() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const EVENTS_PER_PAGE = 6;

  // On utilise directement events

  // Fonction utilitaire pour parser les dates d'un événement
  function getEventDateRange(ev: typeof events[0]) {
    const match = ev.date.match(/(\d{4}-\d{2}-\d{2})/g);
    if (!match) return [null, null];
    return [match[0], match[1] || match[0]];
  }

  // Filtrage appliqué uniquement à la soumission du formulaire
  const filteredEvents = events.filter((ev: typeof events[0]) => {
    if (!submitted) return true;
    const matchSearch =
      search === "" ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.author.toLowerCase().includes(search.toLowerCase()) ||
      ev.desc.toLowerCase().includes(search.toLowerCase());
    // Filtre par date unique (doit être dans l'intervalle de l'événement)
    const [evStart, evEnd] = getEventDateRange(ev);
    let matchDate = true;
    if (date) {
      matchDate = (!evStart || !evEnd) ? false : (evStart <= date && evEnd >= date);
    }
    return matchSearch && matchDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);
  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // Remettre à la page 1 si le filtre change
  React.useEffect(() => { setPage(1); }, [search, date, submitted]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className={styles.eventsSection}>
      <h2 className={styles.eventsTitle}>Tous les Événements</h2>
      <p className={styles.eventsSubtitle}>Découvrez tous les événements de vote en cours et à venir</p>
      <form className={styles.eventsSearchForm} onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.eventsSearchField}>
          <label htmlFor="search">Recherche</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Événement, promoteur, candidat..."
            autoComplete="off"
          />
        </div>
        <div className={styles.eventsSearchField}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="jj/mm/aaaa"
          />
        </div>
        <button type="submit" className={styles.eventsSearchBtn}>
          <span style={{marginRight: 6}}>🔍</span> Rechercher
        </button>
      </form>
      {/* Grille d'événements */}
      <div className={styles.eventsGrid}>
        {filteredEvents.length === 0 ? (
          <div className={styles.noEvents}>Aucun événement trouvé.</div>
        ) : (
          paginatedEvents.map((ev, i) => (
            <div
              key={i + (page-1)*EVENTS_PER_PAGE}
              className={styles.eventCard}
            >
              <div className={styles.eventImgWrap}>
                <Image src={ev.img} alt={ev.title} className={styles.eventImg} fill style={{objectFit: 'cover'}} />
                <div className={styles.eventOverlay} />
                {ev.active && (
                  <span className={styles.eventBadge}>Actif</span>
                )}
                <div className={styles.eventImgText}>
                  <div className={styles.eventTitle}>{ev.title}</div>
                  <div className={styles.eventAuthor}>Par {ev.author}</div>
                </div>
              </div>
              <div className={styles.eventContent}>
                <div className={styles.eventDesc}>{ev.desc}</div>
                <div className={styles.eventMeta}>
                  <div className={styles.eventMetaRow}>
                    <span className={styles.eventMetaIcon}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 9h18"/>
                      </svg>
                    </span>
                    {ev.date}
                  </div>
                  <div className={styles.eventMetaRow}>
                    <span className={styles.eventMetaIcon}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="9" cy="7" r="4"/><path d="M17 11v-1a4 4 0 0 0-4-4h0"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      </svg>
                    </span>
                    {ev.candidates} candidats
                  </div>
                  <div className={styles.eventMetaRow}>
                    <span className={styles.eventMetaIcon}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M4 4v2a8 8 0 0 0 16 0V4"/>
                      </svg>
                    </span>
                    {ev.votes} votes
                  </div>
                </div>
                <div className={styles.eventActions}>
                  <Link href={`/events/${encodeURIComponent(ev.title)}`}>
                  <button className={styles.eventBtn}>Je vote</button>
                  </Link>
                  <button className={`${styles.eventBtn} ${styles.eventBtnOutline}`}>Résultats</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.eventsPagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={i + 1 === page ? styles.eventsPageBtnActive : styles.eventsPageBtn}
              onClick={() => handlePageChange(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
} 