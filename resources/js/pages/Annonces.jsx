import React, { useState, useEffect } from "react";
import axios from "axios";

function Annonces() {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/annonces')
      .then(response => {
        setAnnonces(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur chargement annonces:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Chargement...</div>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/images/seances.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative z-10 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📢 Annonces
        </h1>

        {annonces.length === 0 ? (
            <p className="text-gray-600">Aucune annonce pour le moment.</p>
        ) : (
            annonces.map((annonce) => (
            <div
                key={annonce.id}
                className="p-4 bg-gray-50 rounded shadow-sm hover:shadow-md transition"
            >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                {annonce.titre}
                </h2>
                <p className="text-gray-600 mt-2">{annonce.contenu}</p>
                <p className="text-xs text-gray-400 mt-2">
                    {new Date(annonce.created_at).toLocaleDateString()}
                </p>
            </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Annonces;
