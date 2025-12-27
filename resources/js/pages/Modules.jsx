import React, { useState, useEffect } from "react";
import axios from "axios";

function Modules() {
  const [filieres, setFilieres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/filieres')
      .then(response => {
        setFilieres(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur chargement modules:", error);
        setLoading(false);
      });
  }, []);

  const filteredFilieres = filieres.filter((f) =>
    f.nom.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6 text-center">Chargement...</div>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/image.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay léger très transparent */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Contenu principal */}
      <div className="relative p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 relative z-10">📚 Modules par filière</h1>

        {/* Recherche */}
        <input
          type="text"
          placeholder="Rechercher une filière..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-10"
        />

        {/* Liste des filières filtrées */}
        {filteredFilieres.length === 0 ? (
          <p className="text-gray-500 mt-4 relative z-10">Aucune filière trouvée.</p>
        ) : (
          filteredFilieres.map((filiere) => (
            <div key={filiere.id} className="mt-4 relative z-10">
              <h2
                className="text-xl font-semibold cursor-pointer hover:text-blue-600"
                onClick={() =>
                  setSelectedFiliere(selectedFiliere === filiere.nom ? null : filiere.nom)
                }
              >
                {filiere.nom}
              </h2>

              {/* Modules de la filière */}
              {selectedFiliere === filiere.nom && (
                <ul className="mt-2 space-y-2">
                  {filiere.modules && filiere.modules.length > 0 ? (
                    filiere.modules.map((module) => (
                        <li key={module.id} className="p-3 bg-gray-50 rounded shadow-sm">
                        <p className="font-semibold">{module.titre}</p>
                        <p className="text-sm text-gray-600">{module.description}</p>
                        </li>
                    ))
                  ) : (
                    <li className="p-3 text-gray-500 italic">Aucun module pour cette filière.</li>
                  )}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Modules;

