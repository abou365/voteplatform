"use client";
import styles from "./promoteur.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCalendarAlt, FaChartLine, FaUserFriends } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useState } from "react";
import Image from 'next/image';
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
  { label: "Catégories" },
  { label: "Candidats" },
  { label: "Statistiques" },
];

export default function PromoteurDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  
  // États pour la gestion des événements
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showEventEdit, setShowEventEdit] = useState(false);
  const [showEventDelete, setShowEventDelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; votes: number; participants: number; image: string; status: string; dates: string } | null>(null);
  const [editingEvent, setEditingEvent] = useState({ name: '', votes: 0, participants: 0, image: '', status: 'Actif', dates: '' });
  const [newEvent, setNewEvent] = useState({ name: '', votes: 0, participants: 0, image: '', status: 'Actif', dates: '' });
  
  // États pour la gestion des catégories
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const [showCategoryDelete, setShowCategoryDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; event: string; description: string; maxCandidates: number; image: string } | null>(null);
  const [editingCategory, setEditingCategory] = useState({ name: '', event: '', description: '', maxCandidates: 0, image: '' });
  const [newCategory, setNewCategory] = useState({ name: '', event: '', description: '', maxCandidates: 0, image: '' });
  
  // États pour la gestion des candidats
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showCandidateDetails, setShowCandidateDetails] = useState(false);
  const [showCandidateEdit, setShowCandidateEdit] = useState(false);
  const [showCandidateDelete, setShowCandidateDelete] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{ name: string; category: string; event: string; votes: number; status: string; image: string } | null>(null);
  const [editingCandidate, setEditingCandidate] = useState({ name: '', category: '', event: '', votes: 0, status: '', image: '' });
  const [newCandidate, setNewCandidate] = useState({ name: '', category: '', event: '', votes: 0, status: 'En attente', image: '' });
  
  // États pour les filtres
  const [filterEvent, setFilterEvent] = useState('');
  const [filterEventStatus, setFilterEventStatus] = useState('');
  
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCategoryEvent, setFilterCategoryEvent] = useState('');
  
  const [filterCandidate, setFilterCandidate] = useState('');
  const [filterCandidateCategory, setFilterCandidateCategory] = useState('');
  const [filterCandidateEvent, setFilterCandidateEvent] = useState('');
  const [filterCandidateStatus, setFilterCandidateStatus] = useState('');
  
  // État pour les événements avec images
  const [promoteurEvents, setPromoteurEvents] = useState([
    { name: 'Gala Musique', votes: 320, participants: 120, image: '/img-slide1.jpeg', status: 'Actif', dates: '01/01/24 - 30/06/24' },
    { name: 'Challenge Innovation', votes: 210, participants: 80, image: '/img-slide2.jpeg', status: 'Actif', dates: '15/02/24 - 15/08/24' },
  ]);
  
  // État pour les catégories
  const [promoteurCategories, setPromoteurCategories] = useState([
    { name: 'Meilleur Artiste', event: 'Gala Musique', description: 'Récompense le meilleur artiste de l\'année', maxCandidates: 10, image: '/img-slide1.jpeg' },
    { name: 'Meilleur Innovateur', event: 'Challenge Innovation', description: 'Récompense le meilleur innovateur de l\'année', maxCandidates: 12, image: '/img-slide2.jpeg' },
  ]);
  
  // État pour les candidats
  const [promoteurCandidates, setPromoteurCandidates] = useState([
    { name: 'Marie Dubois', category: 'Meilleur Artiste', event: 'Gala Musique', votes: 156, status: 'Validé', image: '/img-slide1.jpeg' },
    { name: 'Jean Martin', category: 'Meilleur Innovateur', event: 'Challenge Innovation', votes: 89, status: 'En attente', image: '/img-slide1.jpeg' },
  ]);
  
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
  const filteredPromoteurEvents = promoteurEvents.filter(event => {
    const matchesName = event.name.toLowerCase().includes(filterEvent.toLowerCase());
    const matchesStatus = !filterEventStatus || event.status === filterEventStatus;
    return matchesName && matchesStatus;
  });
  
  const filteredPromoteurCategories = promoteurCategories.filter(category => {
    const matchesName = category.name.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesEvent = !filterCategoryEvent || category.event === filterCategoryEvent;
    return matchesName && matchesEvent;
  });
  
  const filteredPromoteurCandidates = promoteurCandidates.filter(candidate => {
    const matchesName = candidate.name.toLowerCase().includes(filterCandidate.toLowerCase());
    const matchesCategory = !filterCandidateCategory || candidate.category === filterCandidateCategory;
    const matchesEvent = !filterCandidateEvent || candidate.event === filterCandidateEvent;
    const matchesStatus = !filterCandidateStatus || candidate.status === filterCandidateStatus;
    return matchesName && matchesCategory && matchesEvent && matchesStatus;
  });
  
  // Fonctions pour les actions événements
  function handleAddEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newEvent.name || !newEvent.dates) return;
    setPromoteurEvents(prev => [...prev, { ...newEvent, votes: 0 }]);
    setShowAddEvent(false);
    setNewEvent({ name: '', votes: 0, participants: 0, image: '', status: 'Actif', dates: '' });
  }
  
  function handleEventAction(action: string, event: { name: string; votes: number; participants: number; image: string; status: string; dates: string }) {
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
    if (!editingEvent.name || !editingEvent.dates) return;
    setPromoteurEvents(prev => prev.map(ev => ev.name === selectedEvent?.name ? editingEvent : ev));
    setShowEventEdit(false);
    setSelectedEvent(null);
  }
  
  function handleDeleteEvent() {
    if (selectedEvent) {
      setPromoteurEvents(prev => prev.filter(ev => ev.name !== selectedEvent.name));
      setShowEventDelete(false);
      setSelectedEvent(null);
    }
  }
  
  // Fonctions pour les actions catégories
  function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newCategory.name || !newCategory.event) return;
    setPromoteurCategories(prev => [...prev, { ...newCategory, maxCandidates: Number(newCategory.maxCandidates) || 0 }]);
    setShowAddCategory(false);
    setNewCategory({ name: '', event: '', description: '', maxCandidates: 0, image: '' });
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
    setPromoteurCategories(prev => prev.map(cat => cat.name === selectedCategory?.name ? { ...editingCategory, image: editingCategory.image } : cat));
    setShowCategoryEdit(false);
    setSelectedCategory(null);
  }
  
  function handleDeleteCategory() {
    if (selectedCategory) {
      setPromoteurCategories(prev => prev.filter(cat => cat.name !== selectedCategory.name));
      setShowCategoryDelete(false);
      setSelectedCategory(null);
    }
  }
  
  // Fonctions pour les actions candidats
  function handleAddCandidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.category || !newCandidate.event) return;
    setPromoteurCandidates(prev => [...prev, { ...newCandidate, votes: 0 }]);
    setShowAddCandidate(false);
    setNewCandidate({ name: '', category: '', event: '', votes: 0, status: 'En attente', image: '' });
  }
  
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
    setPromoteurCandidates(prev => prev.map(c => c.name === selectedCandidate?.name ? editingCandidate : c));
    setShowCandidateEdit(false);
    setSelectedCandidate(null);
  }
  
  function handleDeleteCandidate() {
    if (selectedCandidate) {
      setPromoteurCandidates(prev => prev.filter(c => c.name !== selectedCandidate.name));
      setShowCandidateDelete(false);
      setSelectedCandidate(null);
    }
  }
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
              <button className={styles.dashboardExportBtn} onClick={() => setShowAddEvent(true)}>+ Créer un événement</button>
            </div>
            {/* Filtres pour les événements */}
            <div style={{background:'#fff', borderRadius:12, padding:'1.5rem', marginBottom:20, boxShadow:'0 2px 12px rgba(30,41,59,0.07)'}}>
              <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:16, color:'#374151'}}>Filtres</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16}}>
                <div>
                  <label style={{display:'block', marginBottom:6, fontWeight:600, color:'#64748b', fontSize:'0.9rem'}}>Rechercher par nom</label>
                  <input 
                    type="text" 
                    placeholder="Nom de l'événement..."
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
                  <th>Nom</th>
                  <th>Dates</th>
                  <th>Statut</th>
                  <th>Votes</th>
                  <th>Participants</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromoteurEvents.length === 0 ? (
                  <tr><td colSpan={7} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun événement trouvé.</td></tr>
                ) : filteredPromoteurEvents.map((ev, i) => (
                  <tr key={i}>
                    <td className="image-col">
                      <Image 
                        src={ev.image} 
                        alt={ev.name}
                        width={50}
                        height={35}
                        style={{
                          borderRadius: '6px',
                          objectFit: 'cover',
                          border: '1px solid #e5e7eb'
                        }}
                      />
                    </td>
                    <td>{ev.name}</td>
                    <td>{ev.dates}</td>
                    <td><span style={{color: ev.status === 'Actif' ? '#22c55e' : '#f59e42'}}>{ev.status}</span></td>
                    <td>{ev.votes}</td>
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
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total événements : <b>{filteredPromoteurEvents.length}</b></div>
            
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
                  <input type="text" placeholder="Nom de l'événement" value={newEvent.name} onChange={e=>setNewEvent(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
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
            
            {/* Modal détails événement */}
            {showEventDetails && selectedEvent && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Détails de l&apos;événement</h3>
                  <div style={{marginBottom:12}}><strong>Nom :</strong> {selectedEvent.name}</div>
                  <div style={{marginBottom:12}}><strong>Dates :</strong> {selectedEvent.dates}</div>
                  <div style={{marginBottom:12}}><strong>Statut :</strong> <span style={{color: selectedEvent.status === 'Actif' ? '#22c55e' : '#f59e42'}}>{selectedEvent.status}</span></div>
                  <div style={{marginBottom:12}}><strong>Votes :</strong> {selectedEvent.votes}</div>
                  <div style={{marginBottom:18}}><strong>Participants :</strong> {selectedEvent.participants}</div>
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <button onClick={()=>setShowEventDetails(false)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Fermer</button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Modal modification événement */}
            {showEventEdit && selectedEvent && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}} onSubmit={handleEditEvent}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Modifier l&apos;événement</h3>
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',marginBottom:6,fontWeight:600,color:'#374151'}}>Image de l&apos;événement</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (value) => setEditingEvent(n => ({...n, image: value})))}
                      style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
                    />
                    {editingEvent.image && (
                      <Image 
                        src={editingEvent.image} 
                        alt="Preview" 
                        width={80}
                        height={50}
                        style={{borderRadius:8,marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                      />
                    )}
                  </div>
                  <input type="text" placeholder="Nom de l'événement" value={editingEvent.name} onChange={e=>setEditingEvent(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
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
            
            {/* Modal suppression événement */}
            {showEventDelete && selectedEvent && (
              <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{background:'#fff',borderRadius:16,padding:'2.2rem 2.5rem',boxShadow:'0 8px 32px rgba(30,41,59,0.18)',minWidth:320,maxWidth:400}}>
                  <h3 style={{fontWeight:800,fontSize:'1.2rem',marginBottom:18,color:'#18181b'}}>Supprimer l&apos;événement</h3>
                  <p style={{marginBottom:18,color:'#64748b'}}>Êtes-vous sûr de vouloir supprimer l&apos;événement <strong>{selectedEvent.name}</strong> ?</p>
                  <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                    <button onClick={()=>setShowEventDelete(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                    <button onClick={handleDeleteEvent} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Supprimer</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 2 && (
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
                    {promoteurEvents.map(ev => (
                      <option key={ev.name} value={ev.name}>{ev.name}</option>
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
                {filteredPromoteurCategories.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucune catégorie trouvée.</td></tr>
                ) : filteredPromoteurCategories.map((cat, i) => (
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
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total catégories : <b>{filteredPromoteurCategories.length}</b></div>
            
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
                      onChange={(e) => handleImageUpload(e, (value) => setNewCategory(n => ({...n, image: value})))}
                      style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
                    />
                    {newCategory.image && (
                      <Image 
                        src={newCategory.image} 
                        alt="Preview" 
                        width={60}
                        height={60}
                        style={{borderRadius:8,marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                      />
                    )}
                  </div>
                  <input type="text" placeholder="Nom de la catégorie" value={newCategory.name} onChange={e=>setNewCategory(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <select value={newCategory.event} onChange={e=>setNewCategory(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="">Sélectionner un événement</option>
                    {promoteurEvents.map(ev=>(<option key={ev.name} value={ev.name}>{ev.name}</option>))}
                  </select>
                  <textarea placeholder="Description" value={newCategory.description} onChange={e=>setNewCategory(n=>({...n,description:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem',minHeight:80,resize:'vertical'}} />
                  <input type="number" placeholder="Nombre max de candidats" value={newCategory.maxCandidates} onChange={e=>setNewCategory(n=>({...n,maxCandidates:Number(e.target.value)}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
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
                    {promoteurEvents.map(ev=>(<option key={ev.name} value={ev.name}>{ev.name}</option>))}
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
        )}
        {activeTab === 3 && (
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
                    {promoteurCategories.map(cat => (
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
                    {promoteurEvents.map(ev => (
                      <option key={ev.name} value={ev.name}>{ev.name}</option>
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
                {filteredPromoteurCandidates.length === 0 ? (
                  <tr><td colSpan={7} style={{textAlign:'center', color:'#64748b', padding:'2rem'}}>Aucun candidat trouvé.</td></tr>
                ) : filteredPromoteurCandidates.map((c, i) => (
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
            <div style={{marginTop:18, fontSize:'1rem', color:'#64748b'}}>Total candidats : <b>{filteredPromoteurCandidates.length}</b></div>
            
            {/* Modals pour les actions candidats */}
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
                    <option value="">Sélectionner une catégorie</option>
                    {promoteurCategories.map(cat=>(<option key={cat.name} value={cat.name}>{cat.name}</option>))}
                  </select>
                  <select value={newCandidate.event} onChange={e=>setNewCandidate(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="">Sélectionner un événement</option>
                    {promoteurEvents.map(ev=>(<option key={ev.name} value={ev.name}>{ev.name}</option>))}
                  </select>
                  <select value={newCandidate.status} onChange={e=>setNewCandidate(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="En attente">En attente</option>
                    <option value="Validé">Validé</option>
                    <option value="Rejeté">Rejeté</option>
                  </select>
                  <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
                    <button type="button" onClick={()=>setShowAddCandidate(false)} style={{background:'#f3f4f6',color:'#374151',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Annuler</button>
                    <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.3rem',fontWeight:600}}>Ajouter</button>
                  </div>
                </form>
              </div>
            )}
            
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
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',marginBottom:6,fontWeight:600,color:'#374151'}}>Photo du candidat</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (value) => setEditingCandidate(n => ({...n, image: value})))}
                      style={{width:'100%',padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}
                    />
                    {editingCandidate.image && (
                      <Image 
                        src={editingCandidate.image} 
                        alt="Preview" 
                        width={60}
                        height={60}
                        style={{borderRadius:'50%',marginTop:8,objectFit:'cover',border:'2px solid #e5e7eb'}}
                      />
                    )}
                  </div>
                  <input type="text" placeholder="Nom" value={editingCandidate.name} onChange={e=>setEditingCandidate(n=>({...n,name:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}} />
                  <select value={editingCandidate.category} onChange={e=>setEditingCandidate(n=>({...n,category:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="">Sélectionner une catégorie</option>
                    {promoteurCategories.map(cat=>(<option key={cat.name} value={cat.name}>{cat.name}</option>))}
                  </select>
                  <select value={editingCandidate.event} onChange={e=>setEditingCandidate(n=>({...n,event:e.target.value}))} style={{width:'100%',marginBottom:12,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="">Sélectionner un événement</option>
                    {promoteurEvents.map(ev=>(<option key={ev.name} value={ev.name}>{ev.name}</option>))}
                  </select>
                  <select value={editingCandidate.status} onChange={e=>setEditingCandidate(n=>({...n,status:e.target.value}))} style={{width:'100%',marginBottom:18,padding:'0.7rem',borderRadius:8,border:'1.5px solid #e5e7eb',fontSize:'1rem'}}>
                    <option value="En attente">En attente</option>
                    <option value="Validé">Validé</option>
                    <option value="Rejeté">Rejeté</option>
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
          </div>
        )}
        {activeTab === 4 && (
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