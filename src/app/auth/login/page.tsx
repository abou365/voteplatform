"use client";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../authGlass.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className={styles.authBg} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <div className={styles.glassCard} style={{ margin: '60px auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.7rem' }}>Connexion Admin</h2>
          <p className={styles.authSubtitle}>Accédez à votre espace de gestion</p>
          <form className={styles.authForm}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrap}>
              <FaUser className={styles.inputIcon} />
              <input id="email" type="email" placeholder="admin@vote.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <label htmlFor="password">Mot de passe</label>
            <div className={styles.inputWrap} style={{ position: 'relative' }}>
              <FaLock className={styles.inputIcon} />
              <input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          <div className={styles.footer}>
            <a href="/auth/forgot">Mot de passe oublié ?</a>
            <span style={{margin: '0 8px'}}>|</span>
            <a href="/auth/register">Créer un compte</a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
