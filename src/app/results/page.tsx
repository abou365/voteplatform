"use client";
import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from './[event]/results.module.css';
import { FaUserFriends, FaChartBar, FaTrophy, FaShareAlt, FaFileCsv } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Image from 'next/image';
import PageHeader from "@/app/components/PageHeader";

const categories = ['Toutes les catégories', 'Meilleur Artiste', 'Meilleur Athlète', 'Meilleur Innovateur'];
const podium = [
  { name: 'Thomas Wilson', votes: 321, img: '/img-slide2.jpeg', place: 1 },
  { name: 'Pierre Durand', votes: 298, img: '/img-slide2.jpeg', place: 2 },
  { name: 'Emma Rodriguez', votes: 268, img: '/img-slide1.jpeg', place: 3 },
];

const barData = [
  { name: 'Thomas', votes: 340 },
  { name: 'Pierre', votes: 310 },
  { name: 'Emma', votes: 270 },
  { name: 'Marie', votes: 240 },
  { name: 'Sarah', votes: 220 },
  { name: 'Alexandre', votes: 180 },
];

const pieData = [
  { name: 'Meilleur Artiste', value: 35, color: '#3b82f6' },
  { name: 'Meilleur Athlète', value: 39, color: '#8b5cf6' },
  { name: 'Meilleur Innovateur', value: 26, color: '#10b981' },
];

const classement = [
  { name: 'Thomas Wilson', category: 'Meilleur Athlète', votes: 321, percent: '14.2%', img: '/img-slide2.jpeg', place: 1 },
  { name: 'Pierre Durand', category: 'Meilleur Athlète', votes: 298, percent: '13.2%', img: '/img-slide2.jpeg', place: 2 },
  { name: 'Emma Rodriguez', category: 'Meilleur Athlète', votes: 268, percent: '11.9%', img: '/img-slide1.jpeg', place: 3 },
  { name: 'Marie Dubois', category: 'Meilleur Artiste', votes: 246, percent: '10.9%', img: '/img-slide1.jpeg', place: 4 },
  { name: 'Sarah Johnson', category: 'Meilleur Innovateur', votes: 234, percent: '10.4%', img: '/img-slide3.jpeg', place: 5 },
  { name: 'Alexandre Petit', category: 'Meilleur Artiste', votes: 203, percent: '9.0%', img: '/img-slide1.jpeg', place: 6 },
  { name: 'Jean Martin', category: 'Meilleur Artiste', votes: 189, percent: '8.4%', img: '/img-slide2.jpeg', place: 7 },
  { name: 'Dr. Lisa Chen', category: 'Meilleur Innovateur', votes: 187, percent: '8.3%', img: '/img-slide3.jpeg', place: 8 },
  { name: 'Sophie Laurent', category: 'Meilleur Artiste', votes: 156, percent: '6.9%', img: '/img-slide1.jpeg', place: 9 },
  { name: 'Marc Gonzalez', category: 'Meilleur Innovateur', votes: 156, percent: '6.9%', img: '/img-slide3.jpeg', place: 10 },
];

export default function ResultsPage() {
  const [activeCategory, setActiveCategory] = useState('Toutes les catégories');

  return (
    <>
      <Header />
      <PageHeader
        title="Résultats généraux"
        subtitle="Classements, podiums et statistiques globales."
        image="/img-slide2.jpeg"
      />
      <div className={styles.page}>
        <h1 className={styles.title}>Résultats en Temps Réel</h1>
        <p className={styles.subtitle}>Découvrez les candidats en tête dans chaque catégorie</p>
        <div className={styles.actions}>
          <button className={styles.shareBtn}><FaShareAlt /> Partager</button>
          <button className={styles.exportBtn}><FaFileCsv /> Export CSV</button>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.votes}`}><FaChartBar /></div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Total Votes</div>
              <div className={styles.statValue}>2 258</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.candidats}`}><FaUserFriends /></div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Candidats</div>
              <div className={styles.statValue}>10</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.categories}`}><FaTrophy /></div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Catégories</div>
              <div className={styles.statValue}>3</div>
            </div>
          </div>
        </div>
        <div className={styles.filterBlock}>
          <div className={styles.filterLabel}>Filtrer par Catégorie</div>
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? styles.tabActive : styles.tab}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.podiumBlock}>
          <h2 className={styles.podiumTitle}>Podium Général</h2>
          <div className={styles.podiumRow}>
            {/* 2e */}
            <div className={styles.podiumItem + ' ' + styles.podiumPlace2}>
              <div className={styles.podiumAvatarWrap}>
                <Image src={podium[1].img} alt={podium[1].name} width={90} height={90} className={styles.podiumAvatar} />
                <span className={styles.podiumBadge}>2</span>
              </div>
              <div className={styles.podiumName}>{podium[1].name}</div>
              <div className={styles.podiumScoreCard + ' ' + styles.podiumScore2}>
                <div className={styles.podiumScore}>{podium[1].votes}</div>
                <div className={styles.podiumVotesLabel}>votes</div>
              </div>
            </div>
            {/* 1er */}
            <div className={styles.podiumItem + ' ' + styles.podiumPlace1}>
              <div className={styles.podiumAvatarWrap}>
                <Image src={podium[0].img} alt={podium[0].name} width={120} height={120} className={styles.podiumAvatar} />
                <span className={styles.podiumBadge + ' ' + styles.podiumBadge1}>1</span>
                <span className={styles.podiumCrown}>👑</span>
              </div>
              <div className={styles.podiumName}>{podium[0].name}</div>
              <div className={styles.podiumScoreCard + ' ' + styles.podiumScore1}>
                <div className={styles.podiumScore}>{podium[0].votes}</div>
                <div className={styles.podiumVotesLabel}>votes</div>
              </div>
            </div>
            {/* 3e */}
            <div className={styles.podiumItem + ' ' + styles.podiumPlace3}>
              <div className={styles.podiumAvatarWrap}>
                <Image src={podium[2].img} alt={podium[2].name} width={90} height={90} className={styles.podiumAvatar} />
                <span className={styles.podiumBadge}>3</span>
              </div>
              <div className={styles.podiumName}>{podium[2].name}</div>
              <div className={styles.podiumScoreCard + ' ' + styles.podiumScore3}>
                <div className={styles.podiumScore}>{podium[2].votes}</div>
                <div className={styles.podiumVotesLabel}>votes</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.graphsRow}>
          <div className={styles.graphCard}>
            <div className={styles.graphTitle}>Classement des Votes</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} barSize={40} style={{ fontFamily: 'inherit' }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={16} />
                <YAxis axisLine={false} tickLine={false} fontSize={14} />
                <Tooltip />
                <Bar dataKey="votes" fill="#3b82f6" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.graphCard}>
            <div className={styles.graphTitle}>Répartition par Catégorie</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={false}>
                  {pieData.map((entry, i) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" formatter={(value) => <span style={{color:'#6366f1',fontWeight:600}}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.classementBlock}>
          <div className={styles.classementTitle}>Classement Détaillé</div>
          <div className={styles.classementList}>
            {classement.map((c) => (
              <div key={c.place} className={styles.classementItem}>
                <div className={styles.classementRank}>{c.place}</div>
                <Image src={c.img} alt={c.name} width={48} height={48} className={styles.classementAvatar} />
                <div className={styles.classementInfo}>
                  <div className={styles.classementName}>{c.name}</div>
                  <div className={styles.classementCat}>{c.category}</div>
                </div>
                <div className={styles.classementVotes}><b>{c.votes} votes</b><span>{c.percent}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 