"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";

const initialCategories = [
  { id: 1, nom: "Meilleur Artiste", description: "Récompense l'artiste le plus talentueux." },
  { id: 2, nom: "Meilleur Athlète", description: "Récompense l'athlète le plus performant." },
  { id: 3, nom: "Meilleur Innovateur", description: "Récompense l'innovation la plus marquante." },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);
  const [form, setForm] = useState({ nom: "", description: "" });

  // Ouvre la modal pour ajouter
  const openAddModal = () => {
    setEditId(null);
    setForm({ nom: "", description: "" });
    setModalOpen(true);
  };
  // Ouvre la modal pour éditer
  const openEditModal = (cat: { id: number; nom: string; description: string }) => {
    setEditId(cat.id);
    setForm({ nom: cat.nom, description: cat.description });
    setModalOpen(true);
  };
  // Ferme la modal
  const closeModal = () => {
    setModalOpen(false);
    setForm({ nom: "", description: "" });
    setEditId(null);
  };
  // Gère la saisie du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Ajoute ou édite une catégorie
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      setCategories(categories.map(cat => cat.id === editId ? { ...cat, ...form } : cat));
    } else {
      setCategories([...categories, { id: Date.now(), ...form }]);
    }
    closeModal();
  };
  // Suppression fictive
  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen authBg">
      <Header />
      <main style={{ flex: 1, width: '100%', maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: '1.2rem', boxShadow: '0 4px 24px rgba(30,41,59,0.08)', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb' }}>Gestion des catégories</h2>
          <button onClick={openAddModal} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.7rem', fontWeight: 700, fontSize: '1rem', padding: '0.7rem 1.5rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
            + Ajouter
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f1f5ff' }}>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Nom</th>
              <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700, color: '#1a2233' }}>Description</th>
              <th style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 700, color: '#1a2233' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.7rem' }}>{cat.nom}</td>
                <td style={{ padding: '0.7rem' }}>{cat.description}</td>
                <td style={{ padding: '0.7rem', textAlign: 'center' }}>
                  <button onClick={() => openEditModal(cat)} style={{ background: '#f1f5ff', color: '#2563eb', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.98rem', padding: '0.4rem 1rem', marginRight: '0.5rem', cursor: 'pointer' }}>
                    Éditer
                  </button>
                  <button onClick={() => handleDelete(cat.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.98rem', padding: '0.4rem 1rem', cursor: 'pointer' }}>
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>{editId ? "Éditer la catégorie" : "Ajouter une catégorie"}</h3>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Nom
                <input name="nom" value={form.nom} onChange={handleChange} required style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8 }} />
              </label>
              <label style={{ fontWeight: 600, color: '#1a2233' }}>Description
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} style={{ width: '100%', marginTop: 4, padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '1.05rem', marginBottom: 8, resize: 'vertical' }} />
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