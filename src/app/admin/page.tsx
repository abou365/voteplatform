"use client";
import styles from "./admin.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrophy, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import { useRouter } from "next/navigation";

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
  { label: "Utilisateurs" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  // Filtres pour les candidats
  const [filterEvent, setFilterEvent] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [candidates, setCandidates] = useState([
    { name: 'Emma Rodriguez', category: 'Meilleur Athlète', event: 'Festival des Arts 2024', votes: 268, status: 'Validé' },
    { name: 'Thomas Wilson', category: 'Meilleur Athlète', event: 'Gala Sportif 2024', votes: 321, status: 'En attente' },
    { name: 'Marie Dubois', category: 'Meilleur Artiste', event: 'Festival des Arts 2024', votes: 246, status: 'Validé' },
  ]);
  const [users, setUsers] = useState([
    { name: 'Admin Principal', email: 'admin@vote.com', role: 'Admin', status: 'Actif' },
    { name: 'Marie Dubois', email: 'marie@vote.com', role: 'Promoteur', status: 'Actif' },
    { name: 'Jean Martin', email: 'jean@vote.com', role: 'Utilisateur', status: 'Inactif' },
  ]);
  const eventOptions = ['Festival des Arts 2024', 'Gala Sportif 2024'];
  const categoryOptions = ['Meilleur Athlète', 'Meilleur Artiste'];
  const statusOptions = ['Validé', 'En attente'];
  const filteredCandidates = candidates.filter(c =>
    (!filterEvent || c.event === filterEvent) &&
    (!filterCategory || c.category === filterCategory) &&
    (!filterStatus || c.status === filterStatus) &&
    (!filterName || c.name.toLowerCase().includes(filterName.toLowerCase()))
  );

  // Ajout de candidat
  const [newCandidate, setNewCandidate] = useState({ name: '', category: '', event: '', votes: 0, status: 'En attente' });
  function handleAddCandidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.category || !newCandidate.event) return;
    setCandidates(prev => [...prev, { ...newCandidate, votes: 0 }]);
    setShowAddCandidate(false);
    setNewCandidate({ name: '', category: '', event: '', votes: 0, status: 'En attente' });
  }
  // Ajout d'utilisateur
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Utilisateur', status: 'Actif' });
  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers(prev => [...prev, { ...newUser }]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'Utilisateur', status: 'Actif' });
  }
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([
    { title: 'Festival des Arts 2024', dates: '01/01/24 - 30/06/24', status: 'Actif', participants: 120 },
    { title: 'Gala Sportif 2024', dates: '15/02/24 - 15/08/24', status: 'À venir', participants: 80 },
    { title: 'Innovation Day', dates: '01/03/24 - 30/09/24', status: 'Terminé', participants: 200 },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', dates: '', status: 'À venir', participants: 0 });
  function handleAddEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dates) return;
    setEvents(prev => [...prev, { ...newEvent, participants: Number(newEvent.participants) || 0 }]);
    setShowAddEvent(false);
    setNewEvent({ title: '', dates: '', status: 'À venir', participants: 0 });
  }
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
        {activeTab === 1 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Liste des Candidats</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddCandidate(true)}>+ Ajouter un candidat</button>
            </div>
            {/* Filtres */}
            <div className={styles.adminFilters}>
              <input type="text" placeholder="Rechercher par nom..." value={filterName} onChange={e => setFilterName(e.target.value)} className={styles.adminFilterSelect} style={{minWidth:180}} />
              <select value={filterEvent} onChange={e => setFilterEvent(e.target.value)} className={styles.adminFilterSelect}>
                <option value="">Tous les événements</option>
                {eventOptions.map(ev => <option key={ev} value={ev}>{ev}</option>)}
              </select>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className={styles.adminFilterSelect}>
                <option value="">Toutes les catégories</option>
                {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={styles.adminFilterSelect}>
                <option value="">Tous les statuts</option>
                {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Événement</th>
                  <th>Votes</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun candidat trouvé.</td></tr>
                ) : filteredCandidates.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.category}</td>
                    <td>{c.event}</td>
                    <td>{c.votes}</td>
                    <td><span style={{color: c.status === 'Validé' ? '#22c55e' : '#f59e42'}}>{c.status}</span></td>
                    <td><button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer'}} onClick={() => router.push('/admin/utilisateurs')}>Voir</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total candidats : <b>{filteredCandidates.length}</b> | Nouveaux cette semaine : <b>2</b></div>
            {/* Modal ajout candidat */}
            {showAddCandidate && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddCandidate}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Ajouter un candidat</h3>
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
        {activeTab === 2 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Gestion des Événements</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddEvent(true)}>+ Créer un événement</button>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th>Titre</th>
                  <th>Dates</th>
                  <th>Statut</th>
                  <th>Participants</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr><td colSpan={5} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun événement trouvé.</td></tr>
                ) : events.map((ev, i) => (
                  <tr key={i}>
                    <td>{ev.title}</td>
                    <td>{ev.dates}</td>
                    <td><span style={{color: ev.status === 'Actif' ? '#22c55e' : ev.status === 'À venir' ? '#f59e42' : '#64748b'}}>{ev.status}</span></td>
                    <td>{ev.participants}</td>
                    <td><button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer'}} onClick={() => router.push('/admin/evenements')}>Voir</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total événements : <b>{events.length}</b> | Actifs : <b>{events.filter(ev=>ev.status==='Actif').length}</b> | À venir : <b>{events.filter(ev=>ev.status==='À venir').length}</b></div>
            {/* Modal ajout événement */}
            {showAddEvent && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddEvent}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Créer un événement</h3>
                  <input type="text" placeholder="Titre" value={newEvent.title} onChange={e=>setNewEvent(n=>({...n,title:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <input type="text" placeholder="Dates (ex: 01/01/24 - 30/06/24)" value={newEvent.dates} onChange={e=>setNewEvent(n=>({...n,dates:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <select value={newEvent.status} onChange={e=>setNewEvent(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="À venir">À venir</option>
                    <option value="Actif">Actif</option>
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
        {activeTab === 4 && (
          <div style={{marginTop: 32}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <h3 style={{fontSize:'1.35rem', fontWeight:800}}>Utilisateurs</h3>
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddUser(true)}>+ Ajouter un utilisateur</button>
            </div>
            <table className={styles.adminTable} style={{width:'100%', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(30,41,59,0.07)', overflow:'hidden'}}>
              <thead>
                <tr style={{background:'#f3f4f6'}}>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan={5} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun utilisateur trouvé.</td></tr>
                ) : users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td><span style={{color: u.status === 'Actif' ? '#22c55e' : '#f59e42'}}>{u.status}</span></td>
                    <td><button style={{color:'#2563eb',background:'none',border:'none',cursor:'pointer'}}>Voir</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total utilisateurs : <b>{users.length}</b></div>
            {/* Modal ajout utilisateur */}
            {showAddUser && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleAddUser}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Ajouter un utilisateur</h3>
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
      </main>
      <Footer />
    </div>
  );
}