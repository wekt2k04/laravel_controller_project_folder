import React, { useState, useEffect } from "react";
import axios from "axios";

function Statistiques() {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/statistiques')
      .then(response => {
        setFilieres(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur chargement statistiques:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Chargement des statistiques...</div>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/images/image copy.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative z-10 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📊 Statistiques
        </h1>

        {filieres.length === 0 ? (
            <p className="text-gray-600">Aucune donnée statistique disponible.</p>
        ) : (
            filieres.map((filiere, index) => (
            <div
                key={index}
                className="p-4 bg-gray-50 rounded shadow-sm space-y-3"
            >
                <h2 className="text-xl font-semibold">{filiere.nom}</h2>

                {/* Statistiques d'absences */}
                <div className="space-y-1">
                <p className="text-gray-600 font-medium">Absences Totales</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: `${Math.min((filiere.absences / 50) * 100, 100)}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">
                    {filiere.absences} absences enregistrées (dont {filiere.justifiees} justifiées)
                </p>
                </div>

                {/* Avancement */}
                <div className="space-y-1">
                <p className="text-gray-600 font-medium">Avancement des modules</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${filiere.avancement}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">{filiere.avancement}% complété</p>
                </div>

                {/* Statistique bonus */}
                <div className="space-y-1">
                <p className="text-gray-600 font-medium">Présence moyenne des profs</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${95}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">95% de présence en moyenne</p>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Statistiques;
