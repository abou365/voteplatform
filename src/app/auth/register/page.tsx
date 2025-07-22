
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../auth.module.css';
import { FaUserPlus } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <>
    <Header />
    <div className={styles.authContainer}>
      <div className={styles.authIconWrap}>
        <FaUserPlus className={styles.authIcon} />
      </div>
      <h1 className={styles.authTitle}>Créer un compte</h1>
      <p className={styles.authSubtitle}>Créer un compte promoteur</p>
      <form className={styles.authForm}>
        <label className={styles.authLabel} htmlFor="name">Nom</label>
        <input id="name" type="text" className={styles.authInput} />
        <label className={styles.authLabel} htmlFor="email">Email</label>
        <input id="email" type="email" className={styles.authInput} />
        <label className={styles.authLabel} htmlFor="password">Mot de passe</label>
        <input id="password" type="password" className={styles.authInput} />
        <button type="submit" className={styles.authButton}>S&apos;inscrire</button>
      </form>
      <div className={styles.authLinks}>
        <a href="/auth/login">Déjà un compte ? Se connecter</a>
      </div>
    </div>
    <Footer />
    </>
  );
}
