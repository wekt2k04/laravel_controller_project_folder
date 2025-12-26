import React, { useState } from "react";

// Exemple de données
const etudiants = [
  { id: 1, nom: "Ahmed", absences: 3, justifie: 2 },
  { id: 2, nom: "Sara", absences: 5, justifie: 4 },
  { id: 3, nom: "Youssef", absences: 2, justifie: 1 },
];

const profs = [
  { id: 1, nom: "Mme Leila", conventions: ["Cours Info", "TP Math"] },
  { id: 2, nom: "M. Karim", conventions: ["Cours Physique"] },
];

function Presence() {
  const [searchEtudiant, setSearchEtudiant] = useState("");
  const [searchProf, setSearchProf] = useState("");

  // Filtrage seulement si l'utilisateur tape quelque chose
  const filteredEtudiants = searchEtudiant
    ? etudiants.filter((e) =>
        e.nom.toLowerCase().includes(searchEtudiant.toLowerCase())
      )
    : [];

  const filteredProfs = searchProf
    ? profs.filter((p) =>
        p.nom.toLowerCase().includes(searchProf.toLowerCase())
      )
    : [];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/images/image.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Contenu */}
      <div className="relative z-10 space-y-6">

        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          ✅ Présence
        </h1>

        {/* Recherche étudiant */}
        <div>
          <h2 className="text-xl font-semibold">Recherche par étudiant</h2>
          <input
            type="text"
            placeholder="Nom de l'étudiant..."
            value={searchEtudiant}
            onChange={(e) => setSearchEtudiant(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />

          {/* Résultats seulement si quelque chose est tapé */}
          {searchEtudiant && (
            filteredEtudiants.length === 0 ? (
              <p className="text-gray-500 mt-2">Aucun étudiant trouvé.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {filteredEtudiants.map((e) => (
                  <li
                    key={e.id}
                    className="p-3 bg-gray-50 rounded shadow-sm flex justify-between"
                  >
                    <span>{e.nom}</span>
                    <span>
                      Absences: {e.absences} | Justifiées: {e.justifie} |{" "}
                      {e.absences === e.justifie ? "✅ Tout justifié" : "❌ Non justifié"}
                    </span>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        {/* Recherche professeur */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Recherche par professeur</h2>
          <input
            type="text"
            placeholder="Nom du professeur..."
            value={searchProf}
            onChange={(e) => setSearchProf(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />

          {/* Résultats seulement si quelque chose est tapé */}
          {searchProf && (
            filteredProfs.length === 0 ? (
              <p className="text-gray-500 mt-2">Aucun professeur trouvé.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {filteredProfs.map((p) => (
                  <li
                    key={p.id}
                    className="p-3 bg-gray-50 rounded shadow-sm"
                  >
                    <p className="font-semibold">{p.nom}</p>
                    <p className="text-sm text-gray-600">
                      Conventions: {p.conventions.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

      </div>
    </div>
  );
}

export default Presence;
