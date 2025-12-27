import React, { useState, useEffect } from "react";
import axios from "axios";

function Seances() {
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les filières avec leurs modules et séances
    // Note: Pour l'instant, on récupère les filières et on devra peut-être adapter l'API
    // pour inclure les séances imbriquées via les modules.
    // Une meilleure approche serait de récupérer les séances et de les grouper par filière côté front
    // ou d'avoir un endpoint dédié.
    // Pour simplifier ici, on va supposer qu'on récupère les séances et on les groupe.
    
    axios.get('/api/seances')
      .then(response => {
        const seances = response.data;
        
        // Grouper les séances par filière
        const grouped = {};
        seances.forEach(seance => {
          const filiereNom = seance.module?.filiere?.nom || "Autre";
          if (!grouped[filiereNom]) {
            grouped[filiereNom] = { nom: filiereNom, seances: [] };
          }
          
          // Formater la date et l'heure
          const dateDebut = new Date(seance.date_debut);
          const dateFin = seance.date_fin ? new Date(seance.date_fin) : new Date(dateDebut.getTime() + 2 * 60 * 60 * 1000);
          
          const jour = dateDebut.toLocaleDateString('fr-FR', { weekday: 'long' });
          const heure = `${dateDebut.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${dateFin.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
          
          grouped[filiereNom].seances.push({
            id: seance.id,
            jour: jour.charAt(0).toUpperCase() + jour.slice(1),
            heure: heure,
            matiere: seance.module?.titre || seance.titre
          });
        });
        
        setFilieres(Object.values(grouped));
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des séances:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Chargement...</div>;

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
        {filieres.length === 0 ? (
            <p className="text-gray-600">Aucune séance programmée.</p>
        ) : (
            filieres.map((filiere) => (
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
            ))
        )}
      </div>
    </div>
  );
}

export default Seances;
