"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";

const initialEvents = [
  { id: 1, titre: "Gala de la Musique", date: "2024-08-20", statut: "Ouvert" },
  { id: 2, titre: "Challenge Innovation", date: "2024-10-05", statut: "Fermé" },
];

const statuts = ["Ouvert", "Fermé"];

export default function PromoteurEventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);
  const [form, setForm] = useState({ titre: "", date: "", statut: statuts[0] });

  // Ouvre la modal pour ajouter
  const openAddModal = () => {
    setEditId(null);
    setForm({ titre: "", date: "", statut: statuts[0] });
    setModalOpen(true);
  };
  // Ouvre la modal pour éditer
  const openEditModal = (event: { id: number; titre: string; date: string; statut: string }) => {
    setEditId(event.id);
    setForm({ titre: event.titre, date: event.date, statut: event.statut });
    setModalOpen(true);
  };
  // Ferme la modal
  const closeModal = () => {
    setModalOpen(false);
    setForm({ titre: "", date: "", statut: statuts[0] });
    setEditId(null);
  };
  // Gère la saisie du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Ajoute ou édite un événement
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      setEvents(events.map(ev => ev.id === editId ? { ...ev, ...form } : ev));
    } else {
      setEvents([...events, { id: Date.now(), ...form }]);
    }
    closeModal();
  };
  // Suppression fictive
  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen authBg">
      <Header />
      <main style={{ flex: 1, width: '100%', maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: '1.2rem', boxShadow: '0 4px 24px rgba(30,41,59,0.08)', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb' }}>Mes événements</h2>
          <button onClick={openAddModal} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.7rem', fontWeight: 700, fontSize: '1rem', padding: '0.7rem 1.5rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
            + Créer
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f1f5ff' }}>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Titre</th>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Date</th>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Statut</th>
              <th style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 700, color: '#1a2233' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.7rem' }}>{event.titre}</td>
                <td style={{ padding: '0.7rem' }}>{event.date}</td>
                <td style={{ padding: '0.7rem' }}>{event.statut}</td>
                <td style={{ padding: '0.7rem', textAlign: 'center' }}>
                  <button onClick={() => openEditModal(event)} style={{ background: '#f1f5ff', color: '#2563eb', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.98rem', padding: '0.4rem 1rem', marginRight: '0.5rem', cursor: 'pointer' }}>
                    Éditer
                  </button>
                  <button onClick={() => handleDelete(event.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.98rem', padding: '0.4rem 1rem', cursor: 'pointer' }}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal d'ajout/édition */}
        {modalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '1.2rem', boxShadow: '0 4px 24px rgba(30,41,59,0.18)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>{editId ? "Éditer l'événement" : "Créer un événement"}</h3>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Titre
                <input name="titre" value={form.titre} onChange={handleChange} required style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }} />
              </label>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Date
                <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }} />
              </label>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Statut
                <select name="statut" value={form.statut} onChange={handleChange} style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }}>
                  {statuts.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={closeModal} style={{ background: '#f1f5ff', color: '#2563eb', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', padding: '0.6rem 1.2rem', cursor: 'pointer' }}>Annuler</button>
                <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', padding: '0.6rem 1.2rem', cursor: 'pointer' }}>{editId ? "Enregistrer" : "Créer"}</button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 