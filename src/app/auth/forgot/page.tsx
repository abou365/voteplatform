import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../authGlass.module.css';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPage() {
  return (
    <>
      <Header />
      <div className={styles.authBg} />
      <div className={styles.glassCard} style={{ margin: '60px auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.7rem' }}>Mot de passe oublié</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.7rem', opacity: 0.85 }}>
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
        <form className={styles.authForm}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrap}>
            <FaEnvelope className={styles.inputIcon} />
            <input id="email" type="email" placeholder="Email" />
          </div>
          <button type="submit">Envoyer le lien de réinitialisation</button>
        </form>
        <div className={styles.footer}>
          <a href="/auth/login">Retour à la connexion</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
