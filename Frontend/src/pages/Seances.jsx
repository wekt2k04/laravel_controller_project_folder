import React, { useState } from "react";

// Exemple de données : séances par filière
const filieres = [
  {
    nom: "G.INF",
    seances: [
      { jour: "Lundi", heure: "08:00 - 10:00", matiere: "Algorithmique" },
      { jour: "Mercredi", heure: "10:00 - 12:00", matiere: "Bases de données" },
      { jour: "Vendredi", heure: "14:00 - 16:00", matiere: "Programmation Web" },
    ],
  },
  {
    nom: "GTR",
    seances: [
      { jour: "Mardi", heure: "08:00 - 10:00", matiere: "Analyse" },
      { jour: "Jeudi", heure: "10:00 - 12:00", matiere: "Algèbre" },
      { jour: "Vendredi", heure: "08:00 - 10:00", matiere: "Statistiques" },
    ],
  },
];

function Seances() {
  const [selectedFiliere, setSelectedFiliere] = useState(null);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/seances.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative z-10 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🕒 Emploi du temps par filière
        </h1>

        {/* Liste des filières */}
        {filieres.map((filiere) => (
          <div key={filiere.nom} className="mt-4">
            <h2
              className="text-xl font-semibold cursor-pointer hover:text-blue-600 flex items-center gap-2"
              onClick={() =>
                setSelectedFiliere(selectedFiliere === filiere.nom ? null : filiere.nom)
              }
            >
              📚 {filiere.nom}
            </h2>

            {/* Emploi du temps */}
            {selectedFiliere === filiere.nom && (
              <table className="mt-2 w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-4 py-2">Jour</th>
                    <th className="border px-4 py-2">Heure</th>
                    <th className="border px-4 py-2">Matière</th>
                  </tr>
                </thead>
                <tbody>
                  {filiere.seances.map((seance, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{seance.jour}</td>
                      <td className="border px-4 py-2">{seance.heure}</td>
                      <td className="border px-4 py-2">{seance.matiere}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seances;
