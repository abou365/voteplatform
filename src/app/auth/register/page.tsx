
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../authGlass.module.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <>
    <Header />
    <div className={styles.authBg} />
    <div className={styles.glassCard} style={{ margin: '60px auto', position: 'relative', zIndex: 1 }}>
      <h2>Créer un compte</h2>
      <form className={styles.authForm}>
        <label htmlFor="name">Nom</label>
        <div className={styles.inputWrap}>
          <FaUser className={styles.inputIcon} />
          <input id="name" type="text" placeholder="Nom" />
        </div>
        <label htmlFor="email">Email</label>
        <div className={styles.inputWrap}>
          <FaEnvelope className={styles.inputIcon} />
          <input id="email" type="email" placeholder="Email" />
        </div>
        <label htmlFor="password">Mot de passe</label>
        <div className={styles.inputWrap}>
          <FaLock className={styles.inputIcon} />
          <input id="password" type="password" placeholder="Mot de passe" />
        </div>
        <button type="submit">S&apos;inscrire</button>
      </form>
      <div className={styles.footer}>
        <a href="/auth/login">Déjà un compte ? Se connecter</a>
      </div>
    </div>
    <Footer />
    </>
  );
}
