import React from "react";
import Image from "next/image";
import styles from "./ComingSoonSection.module.css";

export default function ComingSoonSection() {
  return (
    <section className={styles.comingSoonSection}>
      <div className={styles.comingSoonContent}>
        {/* Colonne gauche : texte + logos */}
        <div className={styles.comingSoonLeft}>
          <div className={styles.comingSoonBadge}>Bientôt</div>
          <h2 className={styles.comingSoonTitle}>Bientôt disponible</h2>
          <p className={styles.comingSoonText}>Notre application mobile arrive très bientôt sur Play Store et App Store. Restez connectés pour profiter d&apos;une expérience de vote encore plus simple et rapide&nbsp;!</p>
          <div className={styles.comingSoonStores}>
            <a href="#" className="block">
              <Image src="/Google_Play_Store_badge_FR.svg" alt="Disponible sur Play Store" width={300} height={56} className={styles.comingSoonStoreImg} />
            </a>
            <a href="#" className="block">
              <Image src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Disponible sur App Store" width={300} height={56} className={styles.comingSoonStoreImg} />
            </a>
          </div>
        </div>
        {/* Mockup avec halo */}
        <div className={styles.comingSoonMockupWrap}>
          <div className={styles.comingSoonMockupHalo}></div>
          <Image src="/capture-ecran-voteplatform.png" alt="Aperçu application" width={320} height={600} className={styles.comingSoonMockup} />
        </div>
      </div>
    </section>
  );
} 