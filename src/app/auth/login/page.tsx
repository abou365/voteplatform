"use client";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../auth.module.css';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import React, { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.authBg}>
      <Header />
      <div className={styles.authContainer}>
        <div className={styles.authIconWrap}>
          <FaSignInAlt className={styles.authIcon} />
        </div>
        <h1 className={styles.authTitle}>Connexion Admin</h1>
        <p className={styles.authSubtitle}>Accédez à votre espace de gestion</p>
        <form className={styles.authForm}>
          <label className={styles.authLabel} htmlFor="email">Email</label>
          <div className={styles.authInputWrap}>
            <FaUser className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              placeholder="admin@vote.com"
              className={styles.authInput}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <label className={styles.authLabel} htmlFor="password">Mot de passe</label>
          <div className={styles.authInputWrap}>
            <FaLock className={styles.inputIcon} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={styles.authInput}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className={styles.authButton}>Se connecter</button>
        </form>
        <div className={styles.authLinks}>
          <a href="/auth/forgot">Mot de passe oublié ?</a>
          <a href="/auth/register">Créer un compte</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
