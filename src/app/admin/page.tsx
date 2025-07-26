"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./admin.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrophy, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
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

const categoryStats = [
  { name: "Meilleur Artiste", votes: 794, participation: 35.2 },
  { name: "Meilleur Athlète", votes: 887, participation: 39.3 },
  { name: "Meilleur Innovateur", votes: 577, participation: 25.6 },
];

const tabs = [
  { label: "Vue d'ensemble" },
  { label: "Utilisateurs" },
  { label: "Événements" },
  { label: "Catégories" },
  { label: "Candidats" },
  { label: "Sécurité" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  // États pour les modals de détails, modification et suppression
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string; email: string; role: string; status: string; image: string } | null>(null);
  
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showEventEdit, setShowEventEdit] = useState(false);
  const [showEventDelete, setShowEventDelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; dates: string; status: string; participants: number; image: string } | null>(null);
  
  const [showCandidateDetails, setShowCandidateDetails] = useState(false);
  const [showCandidateEdit, setShowCandidateEdit] = useState(false);
  const [showCandidateDelete, setShowCandidateDelete] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{ name: string; category: string; event: string; votes: number; status: string; image: string } | null>(null);
  
  const [editingUser, setEditingUser] = useState({ name: '', email: '', role: '', status: '', image: '' });
  const [editingEvent, setEditingEvent] = useState({ title: '', dates: '', status: '', participants: 0, image: '' });
  const [editingCandidate, setEditingCandidate] = useState({ name: '', category: '', event: '', votes: 0, status: '', image: '' });
  const [editingCategory, setEditingCategory] = useState({ name: '', event: '', description: '', maxCandidates: 0, image: '' });
  
  // États pour les modals de catégories
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const [showCategoryDelete, setShowCategoryDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; event: string; description: string; maxCandidates: number; image: string } | null>(null);
  
  // États pour les filtres
  const [filterUser, setFilterUser] = useState('');
  const [filterUserRole, setFilterUserRole] = useState('');
  const [filterUserStatus, setFilterUserStatus] = useState('');
  
  const [filterEvent, setFilterEvent] = useState('');
  const [filterEventStatus, setFilterEventStatus] = useState('');
  
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCategoryEvent, setFilterCategoryEvent] = useState('');
  
  const [filterCandidate, setFilterCandidate] = useState('');
  const [filterCandidateCategory, setFilterCandidateCategory] = useState('');
  const [filterCandidateEvent, setFilterCandidateEvent] = useState('');
  const [filterCandidateStatus, setFilterCandidateStatus] = useState('');
  
  // État pour les catégories
  const [categories, setCategories] = useState([
    { name: 'Meilleur Artiste', event: 'Festival des Arts 2024', description: 'Récompense le meilleur artiste de l\'année', maxCandidates: 10, image: '/img-slide1.jpeg' },
    { name: 'Meilleur Athlète', event: 'Gala Sportif 2024', description: 'Récompense le meilleur athlète de l\'année', maxCandidates: 8, image: '/img-slide2.jpeg' },
    { name: 'Meilleur Innovateur', event: 'Innovation Day', description: 'Récompense le meilleur innovateur de l\'année', maxCandidates: 12, image: '/img-slide3.jpeg' },
  ]);
  
  // État pour les candidats
  const [candidates, setCandidates] = useState([
    { name: 'Marie Dubois', category: 'Meilleur Artiste', event: 'Festival des Arts 2024', votes: 156, status: 'Validé', image: '/img-slide1.jpeg' },
    { name: 'Jean Martin', category: 'Meilleur Athlète', event: 'Gala Sportif 2024', votes: 89, status: 'En attente', image: '/img-slide1.jpeg' },
    { name: 'Sophie Bernard', category: 'Meilleur Innovateur', event: 'Innovation Day', votes: 234, status: 'Validé', image: '/img-slide1.jpeg' },
  ]);
  
  const [users, setUsers] = useState([
    { name: 'Admin Principal', email: 'admin@vote.com', role: 'Admin', status: 'Actif', image: '/img-slide1.jpeg' },
    { name: 'Marie Dubois', email: 'marie@vote.com', role: 'Promoteur', status: 'Actif', image: '/img-slide1.jpeg' },
    { name: 'Jean Martin', email: 'jean@vote.com', role: 'Utilisateur', status: 'Inactif', image: '/img-slide1.jpeg' },
  ]);
  const eventOptions = ['Festival des Arts 2024', 'Gala Sportif 2024'];
  const categoryOptions = ['Meilleur Athlète', 'Meilleur Artiste'];

  // Ajout de candidat
  const [newCandidate, setNewCandidate] = useState({ name: '', category: '', event: '', votes: 0, status: 'En attente', image: '' });
  function handleAddCandidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.category || !newCandidate.event) return;
    setCandidates(prev => [...prev, { ...newCandidate, votes: 0 }]);
    setShowAddCandidate(false);
    setNewCandidate({ name: '', category: '', event: '', votes: 0, status: 'En attente', image: '' });
  }
  // Ajout d'utilisateur
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Utilisateur', status: 'Actif', image: '' });
  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers(prev => [...prev, { ...newUser }]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'Utilisateur', status: 'Actif', image: '' });
  }
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([
    { title: 'Festival des Arts 2024', dates: '01/01/24 - 30/06/24', status: 'Actif', participants: 120, image: '/img-slide1.jpeg' },
    { title: 'Gala Sportif 2024', dates: '15/02/24 - 15/08/24', status: 'À venir', participants: 80, image: '/img-slide2.jpeg' },
    { title: 'Innovation Day', dates: '01/03/24 - 30/09/24', status: 'Terminé', participants: 200, image: '/img-slide3.jpeg' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', dates: '', status: 'Actif', participants: 0, image: '' });
  function handleAddEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dates) return;
    setEvents(prev => [...prev, { ...newEvent, participants: Number(newEvent.participants) || 0 }]);
    setShowAddEvent(false);
    setNewEvent({ title: '', dates: '', status: 'Actif', participants: 0, image: '' });
  }
  
  // Fonctions pour les actions utilisateurs
  function handleUserAction(action: string, user: { name: string; email: string; role: string; status: string; image: string }) {
    setSelectedUser(user);
    if (action === 'voir') setShowUserDetails(true);
    if (action === 'modifier') {
      setEditingUser(user);
      setShowUserEdit(true);
    }
    if (action === 'supprimer') setShowUserDelete(true);
  }
  
  function handleEditUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email) return;
    setUsers(prev => prev.map(u => u.name === selectedUser?.name ? editingUser : u));
    setShowUserEdit(false);
    setSelectedUser(null);
  }
  
  function handleDeleteUser() {
    if (selectedUser) {
      setUsers(prev => prev.filter(u => u.name !== selectedUser.name));
      setShowUserDelete(false);
      setSelectedUser(null);
    }
  }
  
  // Fonctions pour les actions événements
  function handleEventAction(action: string, event: { title: string; dates: string; status: string; participants: number; image: string }) {
    setSelectedEvent(event);
    if (action === 'voir') setShowEventDetails(true);
    if (action === 'modifier') {
      setEditingEvent(event);
      setShowEventEdit(true);
    }
    if (action === 'supprimer') setShowEventDelete(true);
  }
  
  function handleEditEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingEvent.title || !editingEvent.dates) return;
    setEvents(prev => prev.map(ev => ev.title === selectedEvent?.title ? editingEvent : ev));
    setShowEventEdit(false);
    setSelectedEvent(null);
  }
  
  function handleDeleteEvent() {
    if (selectedEvent) {
      setEvents(prev => prev.filter(ev => ev.title !== selectedEvent.title));
      setShowEventDelete(false);
      setSelectedEvent(null);
    }
  }
  
  // Fonctions pour les actions candidats
  function handleCandidateAction(action: string, candidate: { name: string; category: string; event: string; votes: number; status: string; image: string }) {
    setSelectedCandidate(candidate);
    if (action === 'voir') setShowCandidateDetails(true);
    if (action === 'modifier') {
      setEditingCandidate(candidate);
      setShowCandidateEdit(true);
    }
    if (action === 'supprimer') setShowCandidateDelete(true);
  }
  
  function handleEditCandidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCandidate.name || !editingCandidate.category || !editingCandidate.event) return;
    setCandidates(prev => prev.map(c => c.name === selectedCandidate?.name ? editingCandidate : c));
    setShowCandidateEdit(false);
    setSelectedCandidate(null);
  }
  
  function handleDeleteCandidate() {
    if (selectedCandidate) {
      setCandidates(prev => prev.filter(c => c.name !== selectedCandidate.name));
      setShowCandidateDelete(false);
      setSelectedCandidate(null);
    }
  }
  
  // Fonctions pour les actions catégories
  function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCategory.name || !editingCategory.event) return;
    setCategories(prev => [...prev, { ...editingCategory, maxCandidates: Number(editingCategory.maxCandidates) || 0, image: editingCategory.image }]);
    setShowAddCategory(false);
    setEditingCategory({ name: '', event: '', description: '', maxCandidates: 0, image: '' });
  }
  
  function handleCategoryAction(action: string, category: { name: string; event: string; description: string; maxCandidates: number; image: string }) {
    setSelectedCategory(category);
    if (action === 'voir') setShowCategoryDetails(true);
    if (action === 'modifier') {
      setEditingCategory(category);
      setShowCategoryEdit(true);
    }
    if (action === 'supprimer') setShowCategoryDelete(true);
  }
  
  function handleEditCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCategory.name || !editingCategory.event) return;
    setCategories(prev => prev.map(cat => cat.name === selectedCategory?.name ? { ...editingCategory, image: editingCategory.image } : cat));
    setShowCategoryEdit(false);
    setSelectedCategory(null);
  }
  
  function handleDeleteCategory() {
    if (selectedCategory) {
      setCategories(prev => prev.filter(cat => cat.name !== selectedCategory.name));
      setShowCategoryDelete(false);
      setSelectedCategory(null);
    }
  }
  
  // Fonction pour convertir une image en base64
  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>, setImageFunction: (value: string) => void) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageFunction(result);
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Fonctions de filtrage
  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(filterUser.toLowerCase());
    const matchesRole = !filterUserRole || user.role === filterUserRole;
    const matchesStatus = !filterUserStatus || user.status === filterUserStatus;
    return matchesName && matchesRole && matchesStatus;
  });
  
  const filteredEvents = events.filter(event => {
    const matchesTitle = event.title.toLowerCase().includes(filterEvent.toLowerCase());
    const matchesStatus = !filterEventStatus || event.status === filterEventStatus;
    return matchesTitle && matchesStatus;
  });
  
  const filteredCategories = categories.filter(category => {
    const matchesName = category.name.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesEvent = !filterCategoryEvent || category.event === filterCategoryEvent;
    return matchesName && matchesEvent;
  });
  
  const filteredCandidates = candidates.filter(candidate => {
    const matchesName = candidate.name.toLowerCase().includes(filterCandidate.toLowerCase());
    const matchesCategory = !filterCandidateCategory || candidate.category === filterCandidateCategory;
    const matchesEvent = !filterCandidateEvent || candidate.event === filterCandidateEvent;
    const matchesStatus = !filterCandidateStatus || candidate.status === filterCandidateStatus;
    return matchesName && matchesCategory && matchesEvent && matchesStatus;
  });
  
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
            <div className={styles.categoryStatsSection}>
              <h3 className={styles.categoryStatsTitle}>Statistiques par Catégorie</h3>
              <div className={styles.categoryStatsGrid}>
                {categoryStats.map((cat, i) => (
                  <div key={i} className={styles.categoryStatsCard}>
                    <div className={styles.categoryStatsHeader}>
                      <div>
                        <div className={styles.categoryStatsName}>{cat.name}</div>
                        <div className={styles.categoryStatsVotes}>{cat.votes} votes</div>
                      </div>
                      <div className={styles.categoryStatsParticipation}>
                        <div className={styles.categoryStatsPercentage}>{cat.participation}%</div>
                        <div className={styles.categoryStatsLabel}>Participation</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {activeTab === 1 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Utilisateurs</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddUser(true)}>+ Ajouter un utilisateur</button>
            </div>
            {/* Filtres pour les utilisateurs */}
            <div style={{background:'#fff', borderRadius:12, padding:'1.5rem', marginBottom:20, boxShadow:'0 2px 12px rgba(30,41,59,0.07)'}}>
              <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:16, color:'#374151'}}>Filtres</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16}}>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Rechercher par nom</label>
                  <input 
                    type="text" 
                    placeholder="Nom de l'utilisateur..."
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Rôle</label>
                  <select 
                    value={filterUserRole}
                    onChange={(e) => setFilterUserRole(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Tous les rôles</option>
                    <option value="Admin">Admin</option>
                    <option value="Promoteur">Promoteur</option>
                    <option value="Utilisateur">Utilisateur</option>
                  </select>
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Statut</label>
                  <select 
                    value={filterUserStatus}
                    onChange={(e) => setFilterUserStatus(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Tous les statuts</option>
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
                <div style={{display:'flex', alignItems:'end'}}>
                  <button 
                    onClick={() => {setFilterUser(''); setFilterUserRole(''); setFilterUserStatus('');}}
                    style={{background:'#f3f4f6', color:'#374151', border:'none', borderRadius:8, padding:'0.7rem 1.2rem', fontWeight:600, fontSize:'0.9rem'}}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th className="image-col">Image</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun utilisateur trouvé.</td></tr>
                ) : filteredUsers.map((u, i) => (
                  <tr key={i}>
                    <td className="image-col">
                      <Image 
                        src={u.image} 
                        alt={u.name}
                        width={40}
                        height={40}
                        style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #e5e7eb'
                        }}
                      />
                    </td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td><span style={{color: u.status === 'Actif' ? '#22c55e' : '#f59e42'}}>{u.status}</span></td>
                    <td className="actions-col" style={{display:'flex', gap:8}}>
                      <button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleUserAction('voir', u)}>Voir</button>
                      <button style={{color:'#f59e42',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleUserAction('modifier', u)}>Modifier</button>
                      <button style={{color:'#ef4444',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleUserAction('supprimer', u)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total utilisateurs : <b>{filteredUsers.length}</b></div>
            {/* Modal ajout utilisateur */}
            {showAddUser && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddUser}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Ajouter un utilisateur</h3>
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',marginBottom:6,fontWeight:600,color:'#374151'}}>Photo de profil</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (value) => setNewUser(n => ({...n, image: value})))}
                      style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
                    />
                    {newUser.image && (
                      <Image 
                        src={newUser.image} 
                        alt="Preview" 
                        width={60}
                        height={60}
                        style={{borderRadius:'50%',marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                      />
                    )}
                  </div>
                  <input type="text" placeholder="Nom" value={newUser.name} onChange={e=>setNewUser(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <input type="email" placeholder="Email" value={newUser.email} onChange={e=>setNewUser(n=>({...n,email:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <select value={newUser.role} onChange={e=>setNewUser(n=>({...n,role:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="Utilisateur">Utilisateur</option>
                    <option value="Promoteur">Promoteur</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <select value={newUser.status} onChange={e=>setNewUser(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                  <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                    <button type="button" onClick={()=>setShowAddUser(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                    <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Ajouter</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Gestion des Événements</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddEvent(true)}>+ Créer un événement</button>
            </div>
            {/* Filtres pour les événements */}
            <div style={{background:'#fff', borderRadius:12, padding:'1.5rem', marginBottom:20, boxShadow:'0 2px 12px rgba(30,41,59,0.07)'}}>
              <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:16, color:'#374151'}}>Filtres</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16}}>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Rechercher par titre</label>
                  <input 
                    type="text" 
                    placeholder="Titre de l'événement..."
                    value={filterEvent}
                    onChange={(e) => setFilterEvent(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Statut</label>
                  <select 
                    value={filterEventStatus}
                    onChange={(e) => setFilterEventStatus(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Tous les statuts</option>
                    <option value="Actif">Actif</option>
                    <option value="À venir">À venir</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>
                <div style={{display:'flex', alignItems:'end'}}>
                  <button 
                    onClick={() => {setFilterEvent(''); setFilterEventStatus('');}}
                    style={{background:'#f3f4f6', color:'#374151', border:'none', borderRadius:8, padding:'0.7rem 1.2rem', fontWeight:600, fontSize:'0.9rem'}}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th className="image-col">Image</th>
                  <th>Titre</th>
                  <th>Dates</th>
                  <th>Statut</th>
                  <th>Participants</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun événement trouvé.</td></tr>
                ) : filteredEvents.map((ev, i) => (
                  <tr key={i}>
                    <td className="image-col">
                      <Image 
                        src={ev.image} 
                        alt={ev.title}
                        width={50}
                        height={35}
                        style={{
                          borderRadius: '6px',
                          objectFit: 'cover',
                          border: '1px solid #e5e7eb'
                        }}
                      />
                    </td>
                    <td>{ev.title}</td>
                    <td>{ev.dates}</td>
                    <td><span style={{color: ev.status === 'Actif' ? '#22c55e' : ev.status === 'À venir' ? '#f59e42' : '#64748b'}}>{ev.status}</span></td>
                    <td>{ev.participants}</td>
                    <td className="actions-col" style={{display:'flex', gap:8}}>
                      <button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleEventAction('voir', ev)}>Voir</button>
                      <button style={{color:'#f59e42',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleEventAction('modifier', ev)}>Modifier</button>
                      <button style={{color:'#ef4444',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleEventAction('supprimer', ev)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total événements : <b>{filteredEvents.length}</b> | Actifs : <b>{filteredEvents.filter(ev=>ev.status==='Actif').length}</b> | À venir : <b>{filteredEvents.filter(ev=>ev.status==='À venir').length}</b></div>
            {/* Modal ajout événement */}
            {showAddEvent && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddEvent}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Créer un événement</h3>
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',marginBottom:6,fontWeight:600,color:'#374151'}}>Image de l&apos;événement</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (value) => setNewEvent(n => ({...n, image: value})))}
                      style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
                    />
                    {newEvent.image && (
                      <Image 
                        src={newEvent.image} 
                        alt="Preview" 
                        width={80}
                        height={50}
                        style={{borderRadius:8,marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                      />
                    )}
                  </div>
                  <input type="text" placeholder="Titre de l'événement" value={newEvent.title} onChange={e=>setNewEvent(n=>({...n,title:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <input type="text" placeholder="Dates (ex: 01/01/24 - 30/06/24)" value={newEvent.dates} onChange={e=>setNewEvent(n=>({...n,dates:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <select value={newEvent.status} onChange={e=>setNewEvent(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="Actif">Actif</option>
                    <option value="À venir">À venir</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                  <input type="number" placeholder="Participants" value={newEvent.participants} onChange={e=>setNewEvent(n=>({...n,participants:Number(e.target.value)}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                    <button type="button" onClick={()=>setShowAddEvent(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                    <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Ajouter</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
        {activeTab === 3 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Gestion des Catégories</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddCategory(true)}>+ Ajouter une catégorie</button>
            </div>
            {/* Filtres pour les catégories */}
            <div style={{background:'#fff', borderRadius:12, padding:'1.5rem', marginBottom:20, boxShadow:'0 2px 12px rgba(30,41,59,0.07)'}}>
              <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:16, color:'#374151'}}>Filtres</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16}}>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Rechercher par nom</label>
                  <input 
                    type="text" 
                    placeholder="Nom de la catégorie..."
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Événement</label>
                  <select 
                    value={filterCategoryEvent}
                    onChange={(e) => setFilterCategoryEvent(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Tous les événements</option>
                    {events.map(ev => (
                      <option key={ev.title} value={ev.title}>{ev.title}</option>
                    ))}
                  </select>
                </div>
                <div style={{display:'flex', alignItems:'end'}}>
                  <button 
                    onClick={() => {setFilterCategory(''); setFilterCategoryEvent('');}}
                    style={{background:'#f3f4f6', color:'#374151', border:'none', borderRadius:8, padding:'0.7rem 1.2rem', fontWeight:600, fontSize:'0.9rem'}}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th className="image-col">Image</th>
                  <th>Nom</th>
                  <th>Événement</th>
                  <th>Description</th>
                  <th>Max Candidats</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucune catégorie trouvée.</td></tr>
                ) : filteredCategories.map((cat, i) => (
                  <tr key={i}>
                    <td className="image-col">
                      <Image 
                        src={cat.image} 
                        alt={cat.name}
                        width={45}
                        height={45}
                        style={{
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '2px solid #e5e7eb'
                        }}
                      />
                    </td>
                    <td>{cat.name}</td>
                    <td>{cat.event}</td>
                    <td style={{maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{cat.description}</td>
                    <td>{cat.maxCandidates}</td>
                    <td className="actions-col" style={{display:'flex', gap:8}}>
                      <button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleCategoryAction('voir', cat)}>Voir</button>
                      <button style={{color:'#f59e42',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleCategoryAction('modifier', cat)}>Modifier</button>
                      <button style={{color:'#ef4444',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleCategoryAction('supprimer', cat)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total catégories : <b>{filteredCategories.length}</b></div>
          </div>
        )}
        {activeTab === 4 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Liste des Candidats</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddCandidate(true)}>+ Ajouter un candidat</button>
            </div>
            {/* Filtres pour les candidats */}
            <div style={{background:'#fff', borderRadius:12, padding:'1.5rem', marginBottom:20, boxShadow:'0 2px 12px rgba(30,41,59,0.07)'}}>
              <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:16, color:'#374151'}}>Filtres</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16}}>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Rechercher par nom</label>
                  <input 
                    type="text" 
                    placeholder="Nom du candidat..."
                    value={filterCandidate}
                    onChange={(e) => setFilterCandidate(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Catégorie</label>
                  <select 
                    value={filterCandidateCategory}
                    onChange={(e) => setFilterCandidateCategory(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Événement</label>
                  <select 
                    value={filterCandidateEvent}
                    onChange={(e) => setFilterCandidateEvent(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Tous les événements</option>
                    {events.map(ev => (
                      <option key={ev.title} value={ev.title}>{ev.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Statut</label>
                  <select 
                    value={filterCandidateStatus}
                    onChange={(e) => setFilterCandidateStatus(e.target.value)}
                    style={{width:'100%', padding:'0.7rem', borderRadius:8, border:'1.5px solid #e5e7eb', fontSize:'1rem'}}
                  >
                    <option value="">Tous les statuts</option>
                    <option value="Validé">Validé</option>
                    <option value="En attente">En attente</option>
                    <option value="Rejeté">Rejeté</option>
                  </select>
                </div>
                <div style={{display:'flex', alignItems:'end'}}>
                  <button 
                    onClick={() => {setFilterCandidate(''); setFilterCandidateCategory(''); setFilterCandidateEvent(''); setFilterCandidateStatus('');}}
                    style={{background:'#f3f4f6', color:'#374151', border:'none', borderRadius:8, padding:'0.7rem 1.2rem', fontWeight:600, fontSize:'0.9rem'}}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th className="image-col">Image</th>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Événement</th>
                  <th>Votes</th>
                  <th>Statut</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length === 0 ? (
                  <tr><td colSpan={7} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun candidat trouvé.</td></tr>
                ) : filteredCandidates.map((c, i) => (
                  <tr key={i}>
                    <td className="image-col">
                      <Image 
                        src={c.image} 
                        alt={c.name}
                        width={40}
                        height={40}
                        style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #e5e7eb'
                        }}
                      />
                    </td>
                    <td>{c.name}</td>
                    <td>{c.category}</td>
                    <td>{c.event}</td>
                    <td>{c.votes}</td>
                    <td><span style={{color: c.status === 'Validé' ? '#22c55e' : '#f59e42'}}>{c.status}</span></td>
                    <td className="actions-col" style={{display:'flex', gap:8}}>
                      <button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleCandidateAction('voir', c)}>Voir</button>
                      <button style={{color:'#f59e42',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleCandidateAction('modifier', c)}>Modifier</button>
                      <button style={{color:'#ef4444',background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => handleCandidateAction('supprimer', c)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total candidats : <b>{filteredCandidates.length}</b></div>
            {/* Modal ajout candidat */}
            {showAddCandidate && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddCandidate}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Ajouter un candidat</h3>
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',marginBottom:6,fontWeight:600,color:'#374151'}}>Photo du candidat</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (value) => setNewCandidate(n => ({...n, image: value})))}
                      style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
                    />
                    {newCandidate.image && (
                      <Image 
                        src={newCandidate.image} 
                        alt="Preview" 
                        width={60}
                        height={60}
                        style={{borderRadius:'50%',marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                      />
                    )}
                  </div>
                  <input type="text" placeholder="Nom" value={newCandidate.name} onChange={e=>setNewCandidate(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <select value={newCandidate.category} onChange={e=>setNewCandidate(n=>({...n,category:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="">Catégorie</option>
                    {categoryOptions.map(cat=>(<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                  <select value={newCandidate.event} onChange={e=>setNewCandidate(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="">Événement</option>
                    {eventOptions.map(ev=>(<option key={ev} value={ev}>{ev}</option>))}
                  </select>
                  <select value={newCandidate.status} onChange={e=>setNewCandidate(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="En attente">En attente</option>
                    <option value="Validé">Validé</option>
                  </select>
                  <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                    <button type="button" onClick={()=>setShowAddCandidate(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                    <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Ajouter</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
        {activeTab === 5 && (
          <div style={{marginTop: 32}}>
            <h3 style={{fontSize:'1.35rem', fontWeight:800, marginBottom:20}}>Sécurité & Accès</h3>
            <ul style={{background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', padding:'1.5rem 2rem', fontSize:'1.08rem', color:'#374151', marginBottom:18}}>
              <li>Dernière connexion admin : <b>24/07/2024 14:12</b></li>
              <li>2 tentatives de connexion échouées cette semaine</li>
              <li>Dernière modification du mot de passe : <b>il y a 12 jours</b></li>
              <li>2FA activée : <span style={{color:'#22c55e'}}>Oui</span></li>
            </ul>
            <div style={{display:'flex', gap:16}}>
              <button className={styles.dashboardExportBtn} onClick={() => router.push('/admin/utilisateurs')}>Forcer la déconnexion</button>
              <button className={styles.dashboardExportBtn} onClick={() => router.push('/admin/utilisateurs')}>Réinitialiser un mot de passe</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      {/* Modals pour les actions utilisateurs */}
      {showUserDetails && selectedUser && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Détails de l&apos;utilisateur</h3>
            <div style={{marginBottom:12}}><strong>Nom :</strong> {selectedUser.name}</div>
            <div style={{marginBottom:12}}><strong>Email :</strong> {selectedUser.email}</div>
            <div style={{marginBottom:12}}><strong>Rôle :</strong> {selectedUser.role}</div>
            <div style={{marginBottom:18}}><strong>Statut :</strong> <span style={{color: selectedUser.status === 'Actif' ? '#22c55e' : '#f59e42'}}>{selectedUser.status}</span></div>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <button onClick={()=>setShowUserDetails(false)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Fermer</button>
            </div>
          </div>
        </div>
      )}
      
      {showUserEdit && selectedUser && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleEditUser}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Modifier l&apos;utilisateur</h3>
            <input type="text" placeholder="Nom" value={editingUser.name} onChange={e=>setEditingUser(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
            <input type="email" placeholder="Email" value={editingUser.email} onChange={e=>setEditingUser(n=>({...n,email:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
            <select value={editingUser.role} onChange={e=>setEditingUser(n=>({...n,role:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
              <option value="Utilisateur">Utilisateur</option>
              <option value="Promoteur">Promoteur</option>
              <option value="Admin">Admin</option>
            </select>
            <select value={editingUser.status} onChange={e=>setEditingUser(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
            <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
              <button type="button" onClick={()=>setShowUserEdit(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
              <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Modifier</button>
            </div>
          </form>
        </div>
      )}
      
      {showUserDelete && selectedUser && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Supprimer l&apos;utilisateur</h3>
            <p style={{marginBottom:18,color:'#64748b'}}>Êtes-vous sûr de vouloir supprimer l&apos;utilisateur <strong>{selectedUser.name}</strong> ?</p>
            <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
              <button onClick={()=>setShowUserDelete(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
              <button onClick={handleDeleteUser} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
        {/* Modals pour les actions événements */}
        {showEventDetails && selectedEvent && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
              <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Détails de l&apos;événement</h3>
              <div style={{marginBottom:12}}><strong>Titre :</strong> {selectedEvent.title}</div>
              <div style={{marginBottom:12}}><strong>Dates :</strong> {selectedEvent.dates}</div>
              <div style={{marginBottom:12}}><strong>Statut :</strong> <span style={{color: selectedEvent.status === 'Actif' ? '#22c55e' : selectedEvent.status === 'À venir' ? '#f59e42' : '#64748b'}}>{selectedEvent.status}</span></div>
              <div style={{marginBottom:18}}><strong>Participants :</strong> {selectedEvent.participants}</div>
              <div style={{display:'flex',justifyContent:'flex-end'}}>
                <button onClick={()=>setShowEventDetails(false)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Fermer</button>
              </div>
            </div>
          </div>
        )}
        
        {showEventEdit && selectedEvent && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleEditEvent}>
              <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Modifier l&apos;événement</h3>
              <input type="text" placeholder="Titre" value={editingEvent.title} onChange={e=>setEditingEvent(n=>({...n,title:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
              <input type="text" placeholder="Dates (ex: 01/01/24 - 30/06/24)" value={editingEvent.dates} onChange={e=>setEditingEvent(n=>({...n,dates:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
              <select value={editingEvent.status} onChange={e=>setEditingEvent(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                <option value="Actif">Actif</option>
                <option value="À venir">À venir</option>
                <option value="Terminé">Terminé</option>
              </select>
              <input type="number" placeholder="Participants" value={editingEvent.participants} onChange={e=>setEditingEvent(n=>({...n,participants:Number(e.target.value)}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
              <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                <button type="button" onClick={()=>setShowEventEdit(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Modifier</button>
              </div>
            </form>
          </div>
        )}
        
        {showEventDelete && selectedEvent && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
              <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Supprimer l&apos;événement</h3>
              <p style={{marginBottom:18,color:'#64748b'}}>Êtes-vous sûr de vouloir supprimer l&apos;événement <strong>{selectedEvent.title}</strong> ?</p>
              <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                <button onClick={()=>setShowEventDelete(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                <button onClick={handleDeleteEvent} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Supprimer</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modals pour les actions candidats */}
        {showCandidateDetails && selectedCandidate && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
              <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Détails du candidat</h3>
              <div style={{marginBottom:12}}><strong>Nom :</strong> {selectedCandidate.name}</div>
              <div style={{marginBottom:12}}><strong>Catégorie :</strong> {selectedCandidate.category}</div>
              <div style={{marginBottom:12}}><strong>Événement :</strong> {selectedCandidate.event}</div>
              <div style={{marginBottom:12}}><strong>Votes :</strong> {selectedCandidate.votes}</div>
              <div style={{marginBottom:18}}><strong>Statut :</strong> <span style={{color: selectedCandidate.status === 'Validé' ? '#22c55e' : '#f59e42'}}>{selectedCandidate.status}</span></div>
              <div style={{display:'flex',justifyContent:'flex-end'}}>
                <button onClick={()=>setShowCandidateDetails(false)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Fermer</button>
              </div>
            </div>
          </div>
        )}
        
        {showCandidateEdit && selectedCandidate && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleEditCandidate}>
              <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Modifier le candidat</h3>
              <input type="text" placeholder="Nom" value={editingCandidate.name} onChange={e=>setEditingCandidate(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
              <select value={editingCandidate.category} onChange={e=>setEditingCandidate(n=>({...n,category:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                <option value="">Catégorie</option>
                {categoryOptions.map(cat=>(<option key={cat} value={cat}>{cat}</option>))}
              </select>
              <select value={editingCandidate.event} onChange={e=>setEditingCandidate(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                <option value="">Événement</option>
                {eventOptions.map(ev=>(<option key={ev} value={ev}>{ev}</option>))}
              </select>
              <select value={editingCandidate.status} onChange={e=>setEditingCandidate(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                <option value="En attente">En attente</option>
                <option value="Validé">Validé</option>
              </select>
              <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                <button type="button" onClick={()=>setShowCandidateEdit(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Modifier</button>
              </div>
            </form>
          </div>
        )}
        
        {showCandidateDelete && selectedCandidate && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
              <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Supprimer le candidat</h3>
              <p style={{marginBottom:18,color:'#64748b'}}>Êtes-vous sûr de vouloir supprimer le candidat <strong>{selectedCandidate.name}</strong> ?</p>
              <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                <button onClick={()=>setShowCandidateDelete(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                <button onClick={handleDeleteCandidate} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Supprimer</button>
              </div>
            </div>
          </div>
        )}
      {/* Modals pour les actions catégories */}
      {showAddCategory && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddCategory}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Ajouter une catégorie</h3>
            <div style={{marginBottom:12}}>
              <label style={{display:'block',marginBottom:6,fontWeight:600,color:'#374151'}}>Image de la catégorie</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, (value) => setEditingCategory(n => ({...n, image: value})))}
                style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
              />
              {editingCategory.image && (
                <Image 
                  src={editingCategory.image} 
                  alt="Preview" 
                  width={60}
                  height={60}
                  style={{borderRadius:8,marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                />
              )}
            </div>
            <input type="text" placeholder="Nom de la catégorie" value={editingCategory.name} onChange={e=>setEditingCategory(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
            <select value={editingCategory.event} onChange={e=>setEditingCategory(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
              <option value="">Sélectionner un événement</option>
              {events.map(ev=>(<option key={ev.title} value={ev.title}>{ev.title}</option>))}
            </select>
            <textarea placeholder="Description" value={editingCategory.description} onChange={e=>setEditingCategory(n=>({...n,description:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem',minHeight:80,resize:'vertical'}} />
            <input type="number" placeholder="Nombre max de candidats" value={editingCategory.maxCandidates} onChange={e=>setEditingCategory(n=>({...n,maxCandidates:Number(e.target.value)}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
            <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
              <button type="button" onClick={()=>setShowAddCategory(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
              <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Ajouter</button>
            </div>
          </form>
        </div>
      )}
      
      {showCategoryDetails && selectedCategory && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Détails de la catégorie</h3>
            <div style={{marginBottom:12}}><strong>Nom :</strong> {selectedCategory.name}</div>
            <div style={{marginBottom:12}}><strong>Événement :</strong> {selectedCategory.event}</div>
            <div style={{marginBottom:12}}><strong>Description :</strong> {selectedCategory.description}</div>
            <div style={{marginBottom:18}}><strong>Max Candidats :</strong> {selectedCategory.maxCandidates}</div>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <button onClick={()=>setShowCategoryDetails(false)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Fermer</button>
            </div>
          </div>
        </div>
      )}
      
      {showCategoryEdit && selectedCategory && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleEditCategory}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Modifier la catégorie</h3>
            <input type="text" placeholder="Nom de la catégorie" value={editingCategory.name} onChange={e=>setEditingCategory(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
            <select value={editingCategory.event} onChange={e=>setEditingCategory(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
              <option value="">Sélectionner un événement</option>
              {events.map(ev=>(<option key={ev.title} value={ev.title}>{ev.title}</option>))}
            </select>
            <textarea placeholder="Description" value={editingCategory.description} onChange={e=>setEditingCategory(n=>({...n,description:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem',minHeight:80,resize:'vertical'}} />
            <input type="number" placeholder="Nombre max de candidats" value={editingCategory.maxCandidates} onChange={e=>setEditingCategory(n=>({...n,maxCandidates:Number(e.target.value)}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
            <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
              <button type="button" onClick={()=>setShowCategoryEdit(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
              <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Modifier</button>
            </div>
          </form>
        </div>
      )}
      
      {showCategoryDelete && selectedCategory && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
            <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Supprimer la catégorie</h3>
            <p style={{marginBottom:18,color:'#64748b'}}>Êtes-vous sûr de vouloir supprimer la catégorie <strong>{selectedCategory.name}</strong> ?</p>
            <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
              <button onClick={()=>setShowCategoryDelete(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
              <button onClick={handleDeleteCategory} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}