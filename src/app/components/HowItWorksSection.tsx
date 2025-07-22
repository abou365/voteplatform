import React from "react";
import styles from "./InfographicSection.module.css";

export default function HowItWorksSection() {
  return (
    <section className={styles.infographicSection}>
      <h2 className={styles.infographicTitle}>Comment ça marche&nbsp;?</h2>
      <div className={styles.infographicGrid} style={{maxWidth: '1100px', gap: '2.2rem'}}>
        {/* Ligne de connexion décorative (desktop) - ajustée */}
        <svg className={styles.infographicLine} width="100%" height="60" viewBox="0 0 1100 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M 120 30 Q 320 60 500 30 Q 650 0 800 30 Q 980 60 980 30" stroke="#e5e7eb" strokeWidth="3" fill="none" />
        </svg>
        {/* Étape 1 */}
        <div className={`${styles.infographicStep} ${styles.fadeIn}`} style={{animationDelay: '0.1s'}}>
          <div className={styles.infographicCircle} style={{background: '#f59e42', color: '#fff'}}>
            {/* Icône calendrier stylisé */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 9h18"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="12" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Choisissez un événement</div>
            <div className={styles.infographicCardText}>Sélectionnez la catégorie qui vous intéresse</div>
          </div>
        </div>
        {/* Étape 2 */}
        <div className={`${styles.infographicStep} ${styles.fadeIn}`} style={{animationDelay: '0.2s'}}>
          <div className={styles.infographicCircle} style={{background: '#3b82f6', color: '#fff'}}>
            {/* Icône loupe/profil stylisé */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Consultez les profils</div>
            <div className={styles.infographicCardText}>Découvrez les candidats et leurs réalisations</div>
          </div>
        </div>
        {/* Étape 3 */}
        <div className={`${styles.infographicStep} ${styles.fadeIn}`} style={{animationDelay: '0.3s'}}>
          <div className={styles.infographicCircle} style={{background: '#10b981', color: '#fff'}}>
            {/* Icône urne de vote */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="10" width="18" height="10" rx="2"/>
              <path d="M8 10V6a4 4 0 0 1 8 0v4"/>
              <path d="M12 14v2"/>
            </svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Votez simplement</div>
            <div className={styles.infographicCardText}>Cliquez pour voter pour votre candidat préféré</div>
          </div>
        </div>
        {/* Étape 4 */}
        <div className={`${styles.infographicStep} ${styles.fadeIn}`} style={{animationDelay: '0.4s'}}>
          <div className={styles.infographicCircle} style={{background: '#a855f7', color: '#fff'}}>
            {/* Icône partage stylisé */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v-2a4 4 0 0 1 4-4h2"/><path d="M20 12v-2a4 4 0 0 0-4-4h-2"/><path d="M12 20v-6"/><path d="M8 16l4-4 4 4"/></svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Partagez vos votes</div>
            <div className={styles.infographicCardText}>Partagez sur les réseaux sociaux</div>
          </div>
        </div>
      </div>
    </section>
  );
} 