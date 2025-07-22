"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";

// Données fictives pour la démonstration
const events = [
  { id: 1, titre: "Gala de la Musique", votes: 320, participants: 120 },
  { id: 2, titre: "Challenge Innovation", votes: 210, participants: 80 },
];

export default function PromoteurStatsPage() {
  const [selectedEvent, setSelectedEvent] = useState<number|null>(null);
  const event = events.find(e => e.id === selectedEvent) || null;

  return (
    <div className="flex flex-col min-h-screen authBg">
      <Header />
      <main style={{ flex: 1, width: '100%', maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: '1.2rem', boxShadow: '0 4px 24px rgba(30,41,59,0.08)', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb', marginBottom: '2rem' }}>Statistiques de mes événements</h2>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {events.map(e => (
            <button
              key={e.id}
              onClick={() => setSelectedEvent(e.id)}
              style={{
                background: selectedEvent === e.id ? '#2563eb' : '#f1f5ff',
                color: selectedEvent === e.id ? '#fff' : '#2563eb',
                border: 'none',
                borderRadius: '0.7rem',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.7rem 1.5rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)'
              }}
            >
              {e.titre}
            </button>
          ))}
        </div>
        {event ? (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ flex: 1, minWidth: 220, background: '#f1f5ff', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2563eb' }}>{event.votes}</div>
              <div style={{ color: '#64748b', fontWeight: 600 }}>Votes</div>
            </div>
            <div style={{ flex: 1, minWidth: 220, background: '#f1f5ff', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2563eb' }}>{event.participants}</div>
              <div style={{ color: '#64748b', fontWeight: 600 }}>Participants</div>
            </div>
          </div>
        ) : (
          <div style={{ color: '#64748b', fontWeight: 500, fontSize: '1.1rem', marginBottom: '2rem' }}>
            Sélectionnez un événement pour voir ses statistiques.
          </div>
        )}
        {/* Placeholder pour graphique ou autres stats */}
        {event && (
          <div style={{ background: '#f8fafc', borderRadius: '1rem', padding: '2rem', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
            <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>Graphique à venir…</div>
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
              [Zone graphique]
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 