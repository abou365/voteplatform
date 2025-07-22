"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Colonne 1 : Logo, description, réseaux */}
        <div>
          <div className={styles.footerTitle}>VotePlatform</div>
          <div className={styles.footerDesc}>
            La plateforme de référence pour les événements en Côte d&apos;ivoire.
          </div>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.94 12.94 0 0 1 3.1 1.67a4.48 4.48 0 0 0-.61 2.27c0 1.56.8 2.94 2.02 3.75A4.48 4.48 0 0 1 2 6.13v.06c0 2.18 1.55 4 3.8 4.42a4.52 4.52 0 0 1-2.04.08c.58 1.8 2.26 3.12 4.25 3.16A9.05 9.05 0 0 1 1 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/></svg></a>
          </div>
        </div>
        {/* Colonne 2 : Liens rapides */}
        <div>
          <div className={styles.footerTitle}>Liens rapides</div>
          <div className={styles.footerLinks}>
            <a href="#">Resultats</a>
            <a href="#">Devenir promoteur</a>
            <a href="#">Aide & Support</a>
            <a href="#">À propos de nous</a>
          </div>
        </div>
        {/* Colonne 3 : Ressources */}
        <div>
          <div className={styles.footerTitle}>Ressources</div>
          <div className={styles.footerResources}>
            <a href="#">Guide du promoteur</a>
            <a href="#">Centre de ressources</a>
          </div>
        </div>
        {/* Colonne 4 : Contact + newsletter */}
        <div>
          <div className={styles.footerTitle}>Contact</div>
          <div className={styles.footerContact}>
            <div className={styles.contactItem}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>Abidjan, Cote d&apos;ivoire</div>
            <div className={styles.contactItem}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08"/><path d="M6.16 10.66a6 6 0 0 1 11.68 0"/><path d="M12 14v2"/></svg>+225 00 80 80 80</div>
            <div className={styles.contactItem}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>supportci@voteplatform.ci</div>
          </div>
          <label className={styles.newsletterLabel}>Inscrivez-vous à notre newsletter</label>
          <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
            <input className={styles.newsletterInput} type="email" placeholder="Votre email" required />
            <button className={styles.newsletterBtn} type="submit" aria-label="Envoyer">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div>© 2025 VotePlatform. Tous droits réservés.</div>
        <div className={styles.legalLinks}>
          <a href="#">Conditions générales</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Politique de cookies</a>
        </div>
      </div>
    </footer>
  );
} 