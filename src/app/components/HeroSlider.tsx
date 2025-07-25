"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSlider.module.css";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/img-slide1.jpeg",
    title: (
      <>
        Votez pour vos <br />
        <span className={styles.heroTitleYellow}>Personnalités Préférées</span>
      </>
    ),
    subtitle: "Découvrez et soutenez les talents exceptionnels dans toutes les catégories. Votre voix compte !",
    btn1: "Je vote maintenant",
    btn2: "Je propose un candidat",
  },
  {
    image: "/img-slide2.jpeg",
    title: (
      <>
        Découvrez les <br />
        <span className={styles.heroTitleYellow}>Talents de Demain</span>
      </>
    ),
    subtitle: "Participez à la reconnaissance des innovateurs, artistes et leaders qui façonnent notre avenir.",
    btn1: "Je vote maintenant",
    btn2: "Je propose un candidat",
  },
  {
    image: "/img-slide3.jpeg",
    title: (
      <>
        Célébrons les <br />
        <span className={styles.heroTitleYellow}>Champions d&apos;Aujourd&apos;hui</span>
      </>
    ),
    subtitle: "Votez pour les athlètes, entrepreneurs et créateurs qui inspirent et marquent leur époque.",
    btn1: "Je vote maintenant",
    btn2: "Je propose un candidat",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const next = () => setIndex(i => (i === slides.length - 1 ? 0 : i + 1));
  const prev = () => setIndex(i => (i === 0 ? slides.length - 1 : i - 1));

  // Autoplay effect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex(i => (i === slides.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearTimeout(timeoutRef.current!);
  }, [index]);

  return (
    <section className={styles.heroSlider}>
      {/* Image de fond avec transition d'opacité */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={
            i === index
              ? styles.heroBg
              : `${styles.heroBg} ${styles.heroBgHidden}`
          }
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden="true"
        />
      ))}
      {/* Overlay dégradé */}
      <div className={styles.heroOverlay} />
      {/* Content animé */}
      <div className={styles.heroContent} key={index}>
        <h1 className={`${styles.heroTitle} ${styles.heroFadeIn}`}>{slides[index].title}</h1>
        <p className={`${styles.heroSubtitle} ${styles.heroFadeIn}`}>{slides[index].subtitle}</p>
        <div className={`${styles.heroActions} ${styles.heroFadeIn}`}>
          <button
            className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}
            onClick={() => router.push("/events")}
          >
            {slides[index].btn1} <span style={{marginLeft:8}}>&#8594;</span>
          </button>
          <button
            className={`${styles.heroBtn} ${styles.heroBtnOutline}`}
            onClick={() => router.push("/auth/login")}
          >
            {slides[index].btn2} <span style={{marginLeft:8}}>&#9654;</span>
          </button>
        </div>
        <div className={`${styles.heroPagination} ${styles.heroFadeIn}`}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.heroDot} ${i === index ? styles.heroDotActive : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Aller au slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Flèches navigation */}
      <button onClick={prev} aria-label="Précédent" className={`${styles.heroArrow} ${styles.heroArrowLeft}`}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>
      <button onClick={next} aria-label="Suivant" className={`${styles.heroArrow} ${styles.heroArrowRight}`}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </section>
  );
} 