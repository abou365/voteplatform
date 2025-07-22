import styles from '../auth.module.css';

export default function ResetPage() {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Réinitialiser le mot de passe</h1>
      <form className={styles.authForm}>
        <input type="password" placeholder="Nouveau mot de passe" className={styles.authInput} />
        <input type="password" placeholder="Confirmer le mot de passe" className={styles.authInput} />
        <button type="submit" className={styles.authButton}>Réinitialiser</button>
      </form>
      <div className={styles.authLinks}>
        <a href="/auth/login">Retour à la connexion</a>
      </div>
    </div>
  );
}
