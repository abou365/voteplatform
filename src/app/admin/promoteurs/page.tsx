"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";

const initialPromoteurs = [
  { id: 1, nom: "Agence Culturelle", email: "contact@agenceculturelle.com", telephone: "0601020304" },
  { id: 2, nom: "Sport Events Pro", email: "info@sporteventspro.com", telephone: "0605060708" },
  { id: 3, nom: "InnovAction", email: "hello@innovaction.com", telephone: "0611223344" },
];

export default function AdminPromoteursPage() {
  const [promoteurs, setPromoteurs] = useState(initialPromoteurs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);
  const [form, setForm] = useState({ nom: "", email: "", telephone: "" });

  // Ouvre la modal pour ajouter
  const openAddModal = () => {
    setEditId(null);
    setForm({ nom: "", email: "", telephone: "" });
    setModalOpen(true);
  };
  // Ouvre la modal pour éditer
  const openEditModal = (pro: { id: number; nom: string; email: string; telephone: string }) => {
    setEditId(pro.id);
    setForm({ nom: pro.nom, email: pro.email, telephone: pro.telephone });
    setModalOpen(true);
  };
  // Ferme la modal
  const closeModal = () => {
    setModalOpen(false);
    setForm({ nom: "", email: "", telephone: "" });
    setEditId(null);
  };
  // Gère la saisie du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Ajoute ou édite un promoteur
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      setPromoteurs(promoteurs.map(pro => pro.id === editId ? { ...pro, ...form } : pro));
    } else {
      setPromoteurs([...promoteurs, { id: Date.now(), ...form }]);
    }
    closeModal();
  };
  // Suppression fictive
  const handleDelete = (id: number) => {
    setPromoteurs(promoteurs.filter(pro => pro.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen authBg">
      <Header />
      <main style={{ flex: 1, width: '100%', maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: '1.2rem', boxShadow: '0 4px 24px rgba(30,41,59,0.08)', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb' }}>Gestion des promoteurs</h2>
          <button onClick={openAddModal} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.7rem', fontWeight: 700, fontSize: '1rem', padding: '0.7rem 1.5rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
            + Ajouter
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f1f5ff' }}>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Nom</th>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Email</th>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Téléphone</th>
              <th style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 700, color: '#1a2233' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promoteurs.map(pro => (
              <tr key={pro.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.7rem' }}>{pro.nom}</td>
                <td style={{ padding: '0.7rem' }}>{pro.email}</td>
                <td style={{ padding: '0.7rem' }}>{pro.telephone}</td>
                <td style={{ padding: '0.7rem', textAlign: 'center' }}>
                  <button onClick={() => openEditModal(pro)} style={{ background: '#f1f5ff', color: '#2563eb', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.98rem', padding: '0.4rem 1rem', marginRight: '0.5rem', cursor: 'pointer' }}>
                    Éditer
                  </button>
                  <button onClick={() => handleDelete(pro.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.98rem', padding: '0.4rem 1rem', cursor: 'pointer' }}>
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>{editId ? "Éditer le promoteur" : "Ajouter un promoteur"}</h3>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Nom
                <input name="nom" value={form.nom} onChange={handleChange} required style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }} />
              </label>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }} />
              </label>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Téléphone
                <input name="telephone" value={form.telephone} onChange={handleChange} required style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }} />
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={closeModal} style={{ background: '#f1f5ff', color: '#2563eb', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', padding: '0.6rem 1.2rem', cursor: 'pointer' }}>Annuler</button>
                <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', padding: '0.6rem 1.2rem', cursor: 'pointer' }}>{editId ? "Enregistrer" : "Ajouter"}</button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 