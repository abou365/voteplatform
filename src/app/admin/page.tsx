"use client";
import styles from "./admin.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrophy, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

const stats = [
  {
    icon: <FaChartLine className={styles.dashboardCardIcon} style={{ color: '#2563eb' }} />,
    title: "Total Votes",
    value: "2 258",
    sub: "+12% aujourd'hui",
    desc: "",
    color: "",
  },
  {
    icon: <FaTrophy className={styles.dashboardCardIcon} style={{ color: '#a21caf' }} />,
    title: "Candidats",
    value: "10",
    sub: "Dans 3 catégories",
    desc: "",
    color: styles.dashboardCardPurple,
  },
  {
    icon: <FaCalendarAlt className={styles.dashboardCardIcon} style={{ color: '#059669' }} />,
    title: "Événements",
    value: "6",
    sub: "1 actif",
    desc: "",
    color: styles.dashboardCardGreen,
  },
  {
    icon: <FaChartLine className={styles.dashboardCardIcon} style={{ color: '#f59e42' }} />,
    title: "Participation",
    value: "94%",
    sub: "Taux d'engagement",
    desc: "",
    color: styles.dashboardCardOrange,
  },
];

const topCandidates = [
  { name: "Thomas", votes: 340 },
  { name: "Pierre", votes: 310 },
  { name: "Emma", votes: 270 },
  { name: "Marie", votes: 240 },
  { name: "Sarah", votes: 220 },
];

const activity24h = [
  { hour: "00:00", value: 12 },
  { hour: "04:00", value: 15 },
  { hour: "08:00", value: 28 },
  { hour: "12:00", value: 45 },
  { hour: "16:00", value: 38 },
  { hour: "20:00", value: 55 },
];

const categories = [
  { name: "Meilleur Artiste", votes: 794, participation: 35.2 },
  { name: "Meilleur Athlète", votes: 887, participation: 39.3 },
  { name: "Meilleur Innovateur", votes: 577, participation: 25.6 },
];

const tabs = [
  { label: "Vue d'ensemble" },
  { label: "Candidats" },
  { label: "Événements" },
  { label: "Sécurité" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <PageHeader
        title="Dashboard Admin"
        subtitle="Vue d'ensemble de la plateforme, statistiques et gestion."
        image="/img-slide2.jpeg"
      />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 0 2rem 0' }}>
        {/* Header + actions */}
        <div className={styles.dashboardHeader}>
          <div>
            <div className={styles.dashboardTitle}>Dashboard Admin</div>
            <div className={styles.dashboardSubtitle}>Bienvenue, Admin</div>
          </div>
          <div className={styles.dashboardActions}>
            <button className={styles.dashboardExportBtn}><MdDownload style={{ fontSize: 20 }} /> Export CSV</button>
            <span className={styles.dashboardBadge}>Système actif</span>
          </div>
        </div>
        {/* Stat cards */}
        <div className={styles.dashboardCardRow}>
          {stats.map((s, i) => (
            <div key={i} className={`${styles.dashboardCard} ${s.color || ''}`}>
              {s.icon}
              <div className={styles.dashboardCardTitle}>{s.title}</div>
              <div className={styles.dashboardCardValue}>{s.value}</div>
              {s.sub && <div className={styles.dashboardCardSub}>{s.sub}</div>}
              {s.desc && <div className={styles.dashboardCardDesc}>{s.desc}</div>}
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div className={styles.dashboardTabs}>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              className={
                i === activeTab
                  ? `${styles.dashboardTab} ${styles.dashboardTabActive}`
                  : styles.dashboardTab
              }
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Content: only Vue d'ensemble pour l'instant */}
        {activeTab === 0 && (
          <>
            {/* Charts */}
            <div className={styles.dashboardChartsRow}>
              <div className={styles.dashboardChartBox} style={{ flex: 1.2 }}>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Top Candidates</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topCandidates}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#2563eb" radius={[8,8,0,0]} barSize={38} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.dashboardChartBox} style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Activité 24h</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={activity24h}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Stats par catégorie */}
            <div style={{ fontWeight: 700, fontSize: '1.13rem', margin: '2.2rem 0 1.2rem 0' }}>Statistiques par Catégorie</div>
            <div className={styles.dashboardStatsCatRow}>
              {categories.map((cat) => (
                <div key={cat.name} className={styles.dashboardStatsCatCard}>
                  <div className={styles.dashboardStatsCatTitle}>{cat.name}</div>
                  <div className={styles.dashboardStatsCatVotes}>Votes<br />{cat.votes}</div>
                  <div className={styles.dashboardStatsCatParticipation}>Participation<br />{cat.participation}%</div>
                  <div className={styles.dashboardStatsCatBar}>
                    <div className={styles.dashboardStatsCatBarFill} style={{ width: `${cat.participation}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}