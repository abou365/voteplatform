"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import Link from 'next/link';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userName = "Marie Dubois";
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown au clic en dehors
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo et nom */}
        <div className={styles.logo}>
          <span className="text-blue-600">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><polyline points="9 12 12 15 17 10"/></svg>
          </span>
          <span className="font-bold text-xl text-gray-900">VotePlatform</span>
        </div>
        {/* Burger menu responsive */}
        <button className={styles.burgerMenu} aria-label="Ouvrir le menu" onClick={() => setDropdownOpen(v => !v)}>
          <svg width="28" height="28" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="5" y1="7" x2="19" y2="7" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="17" x2="19" y2="17" />
          </svg>
        </button>
        {/* Navigation centrée (desktop) */}
        <nav className={styles.centerNav}>
          <Link href="/" legacyBehavior><a className="px-4 py-2 rounded-lg text-base font-medium text-blue-700 bg-blue-50">Accueil</a></Link>
          <Link href="/events" legacyBehavior><a className="px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">Événements</a></Link>
          <Link href="/results" legacyBehavior><a className="px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">Résultats</a></Link>
        </nav>
        {/* Actions à droite (desktop) */}
        <div className={styles.rightActions}>
          {!isLoggedIn ? (
            <Link href="/auth/login" className={styles.connexionBtn}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
              Connexion
            </Link>
          ) : (
            <>
              <span className={styles.userName}>Bonjour, <span className="font-medium">{userName}</span></span>
              <a href="#" className={styles.dashboardBtn}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                Dashboard
              </a>
              <button type="button" className={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/><path d="M3 21V3a2 2 0 0 1 2-2h6"/></svg>
                Déconnexion
              </button>
            </>
          )}
        </div>
        {/* Dropdown menu mobile */}
        {dropdownOpen && (
          <div ref={dropdownRef} className={styles.dropdownMenu} role="menu" aria-label="Menu principal">
            <nav className={styles.dropdownNav}>
              <Link href="/" legacyBehavior><a onClick={() => setDropdownOpen(false)}>Accueil</a></Link>
              <Link href="/events/categories" legacyBehavior><a onClick={() => setDropdownOpen(false)}>Catégories</a></Link>
              <Link href="/events" legacyBehavior><a onClick={() => setDropdownOpen(false)}>Événements</a></Link>
              <Link href="/results" legacyBehavior><a onClick={() => setDropdownOpen(false)}>Résultats</a></Link>
            </nav>
            <div className={styles.dropdownActions}>
              {!isLoggedIn ? (
                <Link href="/auth/login" className={styles.connexionBtn} onClick={() => setDropdownOpen(false)}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
                  Connexion
                </Link>
              ) : (
                <>
                  <a href="#" className={styles.dashboardBtn} onClick={() => setDropdownOpen(false)}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                    Dashboard
                  </a>
                  <button type="button" className={styles.logoutBtn} onClick={() => { setIsLoggedIn(false); setDropdownOpen(false); }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/><path d="M3 21V3a2 2 0 0 1 2-2h6"/></svg>
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 