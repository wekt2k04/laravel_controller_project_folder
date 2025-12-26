import React, { useState } from "react";

// Exemple de données
const filieres = [
  {
    nom: "G.INF",
    modules: [
      { nom: "Algorithmique", description: "Introduction aux algorithmes de base." },
      { nom: "Bases de données", description: "Apprentissage SQL et gestion des données." },
      { nom: "Programmation Web", description: "HTML, CSS, JS et frameworks front-end." },
    ],
  },
  {
    nom: "GTR",
    modules: [
      { nom: "Analyse", description: "Fonctions, limites, dérivées et intégrales." },
      { nom: "Algèbre", description: "Matrices, vecteurs et systèmes d'équations." },
      { nom: "Statistiques", description: "Probabilités et statistiques descriptives." },
    ],
  },
  {
    nom: "G.Industrielle",
    modules: [
      { nom: "Mécanique", description: "Loi de Newton et dynamique des corps." },
      { nom: "Électricité", description: "Circuits électriques et électromagnétisme." },
    ],
  },
];

function Modules() {
  const [search, setSearch] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState(null);

  const filteredFilieres = filieres.filter((f) =>
    f.nom.toLowerCase().includes(search.toLowerCase())
  );

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
            <div key={filiere.nom} className="mt-4 relative z-10">
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
                  {filiere.modules.map((module) => (
                    <li key={module.nom} className="p-3 bg-gray-50 rounded shadow-sm">
                      <p className="font-semibold">{module.nom}</p>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </li>
                  ))}
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


