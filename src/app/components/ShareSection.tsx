"use client";
import React, { useState, useEffect } from 'react';
import styles from './ShareSection.module.css';
import { FaFacebook, FaWhatsapp, FaLink, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface ShareSectionProps {
  url: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent("Votez pour votre favori !");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className={styles.shareSection}>
      <h2>Partager</h2>
      <div className={styles.shareButtons}>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.shareButtonSocial}><FaFacebook /></a>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles.shareButtonSocial}><FaXTwitter /></a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.shareButtonSocial}><FaWhatsapp /></a>
        <button onClick={copyToClipboard} className={styles.shareButtonSocial}><FaTiktok /></button>
        <button onClick={copyToClipboard} className={styles.shareButtonSocial}>
          {copied ? 'Copié!' : <FaLink />}
        </button>
      </div>
    </div>
  );
};

export default ShareSection;
