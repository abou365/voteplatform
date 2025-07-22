import styles from '../auth.module.css';

export default function ForgotPage() {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Mot de passe oublié</h1>
      <form className={styles.authForm}>
        <input type="email" placeholder="Email" className={styles.authInput} />
        <button type="submit" className={styles.authButton}>Envoyer le lien de réinitialisation</button>
      </form>
      <div className={styles.authLinks}>
        <a href="/auth/login">Retour à la connexion</a>
      </div>
    </div>
  );
}
