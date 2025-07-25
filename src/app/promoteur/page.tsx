"use client";
import styles from "./promoteur.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCalendarAlt, FaChartLine, FaUserFriends } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import { useRouter } from "next/navigation";

const stats = [
  {
    icon: <FaCalendarAlt className={styles.dashboardCardIcon} style={{ color: '#2563eb' }} />,
    title: "Mes événements",
    value: "2",
    sub: "1 actif",
    desc: "",
    color: "",
  },
  {
    icon: <FaChartLine className={styles.dashboardCardIcon} style={{ color: '#059669' }} />,
    title: "Total votes",
    value: "530",
    sub: "+8% aujourd'hui",
    desc: "",
    color: styles.dashboardCardGreen,
  },
  {
    icon: <FaUserFriends className={styles.dashboardCardIcon} style={{ color: '#f59e42' }} />,
    title: "Participants",
    value: "200",
    sub: "",
    desc: "",
    color: styles.dashboardCardOrange,
  },
];

const events = [
  { name: "Gala Musique", votes: 320, participants: 120 },
  { name: "Challenge Innovation", votes: 210, participants: 80 },
];

const activity24h = [
  { hour: "00:00", value: 8 },
  { hour: "04:00", value: 12 },
  { hour: "08:00", value: 18 },
  { hour: "12:00", value: 30 },
  { hour: "16:00", value: 25 },
  { hour: "20:00", value: 40 },
];

const tabs = [
  { label: "Vue d'ensemble" },
  { label: "Événements" },
  { label: "Statistiques" },
];

export default function PromoteurDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <PageHeader
        title="Espace Promoteur"
        subtitle="Gérez vos événements, suivez les statistiques et l'engagement."
        image="/img-slide3.jpeg"
      />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 0 2rem 0' }}>
        {/* Header + actions */}
        <div className={styles.dashboardHeader}>
          <div>
            <div className={styles.dashboardTitle}>Dashboard Promoteur</div>
            <div className={styles.dashboardSubtitle}>Bienvenue, Promoteur</div>
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
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Votes par événement</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={events}>
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
            {/* Stats par événement */}
            <div style={{ fontWeight: 700, fontSize: '1.13rem', margin: '2.2rem 0 1.2rem 0' }}>Statistiques par Événement</div>
            <div className={styles.dashboardStatsCatRow}>
              {events.map((ev) => (
                <div key={ev.name} className={styles.dashboardStatsCatCard}>
                  <div className={styles.dashboardStatsCatTitle}>{ev.name}</div>
                  <div className={styles.dashboardStatsCatVotes}>Votes<br />{ev.votes}</div>
                  <div className={styles.dashboardStatsCatParticipation}>Participants<br />{ev.participants}</div>
                  <div className={styles.dashboardStatsCatBar}>
                    <div className={styles.dashboardStatsCatBarFill} style={{ width: `${Math.min(ev.participants/2,100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === 1 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Mes Événements</h3>
              <button className={styles.dashboardExportBtn} onClick={() => router.push('/promoteur/evenements')}>+ Créer un événement</button>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th>Nom</th>
                  <th>Votes</th>
                  <th>Participants</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Gala Musique</td><td>320</td><td>120</td><td><button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer'}} onClick={() => router.push('/promoteur/evenements')}>Voir</button></td></tr>
                <tr><td>Challenge Innovation</td><td>210</td><td>80</td><td><button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer'}} onClick={() => router.push('/promoteur/evenements')}>Voir</button></td></tr>
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total événements : <b>2</b></div>
          </div>
        )}
        {activeTab === 2 && (
          <div style={{marginTop: 32}}>
            <h3 style={{fontSize:'1.35rem', fontWeight:800, marginBottom:20}}>Statistiques détaillées</h3>
            <div style={{background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', padding:'1.5rem 2rem', fontSize:'1.08rem', color:'#374151', marginBottom:18}}>
              <div>Votes totaux : <b>530</b></div>
              <div>Participants uniques : <b>200</b></div>
              <div>Événement le plus populaire : <b>Gala Musique</b></div>
            </div>
            <button className={styles.dashboardExportBtn} onClick={() => router.push('/promoteur/statistiques')}>Voir toutes les statistiques</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 