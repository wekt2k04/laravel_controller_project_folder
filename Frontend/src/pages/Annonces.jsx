import React from "react";

// Exemple d'annonces
const annonces = [
  {
    titre: "Vacances de l'AID 🎄",
    contenu:
      "Les vacances de Noël débuteront le 24 décembre et se termineront le 2 janvier. Profitez bien de cette pause pour vous reposer et revoir vos cours.",
  },
  {
    titre: "Absence d'un professeur 👩‍🏫",
    contenu:
      "Le professeur de Mathématiques, Mme Leila, sera absente cette semaine. Les séances prévues seront reportées à une date ultérieure.",
  },
  {
    titre: "Modification du planning 📅",
    contenu:
      "Le planning des séances de Physique a été mis à jour. Veuillez consulter l'emploi du temps pour vérifier les changements et ajuster vos horaires.",
  },
  {
    titre: "Événement spécial 🎉",
    contenu:
      "Un atelier sur la programmation Web aura lieu le vendredi après-midi. Tous les étudiants sont invités à participer et découvrir de nouvelles technologies.",
  },
];

function Annonces() {
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

        {annonces.map((annonce, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {annonce.titre}
            </h2>
            <p className="text-gray-600 mt-2">{annonce.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Annonces;

