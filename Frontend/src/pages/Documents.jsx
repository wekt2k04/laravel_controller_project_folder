import React from "react";

function Documents() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/school.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Contenu */}
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          📁 Documents
        </h1>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          Aucun cours disponible pour l'instant <span>👀</span>
        </p>
        <p className="text-gray-500">
          Patientez ou revenez plus tard pour voir les documents mis à jour.
        </p>
      </div>
    </div>
  );
}

export default Documents;
