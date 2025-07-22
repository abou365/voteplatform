import React from "react";
import styles from "./InfographicSection.module.css";

export default function InfographicSection() {
  return (
    <section className={styles.infographicSection}>
      <h2 className={styles.infographicTitle}>Infographie</h2>
      <div className={styles.infographicGrid}>
        {/* Ligne de connexion décorative (desktop) */}
        <svg className={styles.infographicLine} width="100%" height="60" viewBox="0 0 900 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M 120 30 Q 225 60 330 30 Q 450 0 570 30 Q 675 60 780 30" stroke="#e5e7eb" strokeWidth="3" fill="none" />
        </svg>
        {/* Étape 1 */}
        <div className={`${styles.infographicStep} ${styles.fadeIn}`} style={{animationDelay: '0.1s'}}>
          <div className={`${styles.infographicCircle} ${styles.circleViolet}`}>
            {/* Icône poignée de main */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v-2a4 4 0 0 1 4-4h2"/><path d="M20 12v-2a4 4 0 0 0-4-4h-2"/><path d="M12 20v-6"/><path d="M8 16l4-4 4 4"/></svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Étape 1</div>
            <div className={styles.infographicCardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
        </div>
        {/* Étape 2 (centrale, mise en avant) */}
        <div className={`${styles.infographicStep} ${styles.infographicStepCenter} ${styles.fadeIn}`} style={{animationDelay: '0.3s'}}>
          <div className={`${styles.infographicCircle} ${styles.circleBlue}`}>
            {/* Icône graphique */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 17v-6"/><path d="M15 17v-2"/></svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Étape 2</div>
            <div className={styles.infographicCardText}>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </div>
        </div>
        {/* Étape 3 */}
        <div className={`${styles.infographicStep} ${styles.fadeIn}`} style={{animationDelay: '0.5s'}}>
          <div className={`${styles.infographicCircle} ${styles.circlePink}`}>
            {/* Icône fusée */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16l2-2h3l2 2 2-2h3l2 2 2-2"/><path d="M12 2v14"/></svg>
          </div>
          <div className={styles.infographicCard}>
            <div className={styles.infographicCardTitle}>Étape 3</div>
            <div className={styles.infographicCardText}>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</div>
          </div>
        </div>
      </div>
    </section>
  );
} 