import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaLayerGroup } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardAdmin() {
  const navigate = useNavigate();

  const data = {
    labels: ["Présence", "Modules", "Étudiants actifs", "Enseignants"],
    datasets: [
      {
        label: "Statistiques",
        data: [91, 36, 480, 42],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  return (
    // Container principal avec image de fond
    <div
  className="space-y-0 p-6 min-h-screen bg-cover bg-center relative"
  style={{
    backgroundImage: "url('/school.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}
>
  {/* Overlay léger très transparent pour que l'image soit discrète */}
  <div className="absolute inset-0 bg-white/80"></div>

  {/* Contenu principal */}
  <div className="relative space-y-8">
    <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>

    {/* Cards principales, statistiques, activités, etc. */}
    {/* ... ton contenu actuel reste identique ... */}
  

        {/* Cards principales avec icônes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={<FaUserGraduate size={30} className="text-blue-500" />}
            title="Total étudiants"
            value="520"
            onClick={() => navigate()}
          />
          <StatCard
            icon={<FaChalkboardTeacher size={30} className="text-green-500" />}
            title="Total enseignants"
            value="42"
            onClick={() => navigate()}
          />
          <StatCard
            icon={<FaBook size={30} className="text-yellow-500" />}
            title="Modules"
            value="36"
            onClick={() => navigate("/modules")}
          />
          <StatCard
            icon={<FaLayerGroup size={30} className="text-red-500" />}
            title="Filières / Classes"
            value="12"
            onClick={() => navigate()}
          />
        </div>

        {/* Statistiques globales */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center"> 
        <h2 className="font-semibold mb-4 text-xl">📊 Statistiques globales</h2> 
        <div className="w-full"> <Bar data={data} options={options} /> 
        </div>
         <button onClick={() => navigate("/statistiques")} 
         className="mt-4 text-sm text-blue-600 hover:underline" > 
         Voir détails → </button>
          </div>

          {/* Dernières activités */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4 text-xl">📢 Dernières activités</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <span className="text-blue-500 text-lg">✏️</span>
                <span>Séance modifiée</span>
                <span className="ml-auto text-xs text-gray-400">10:30 AM</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <span className="text-green-500 text-lg">➕</span>
                <span>Nouvel enseignant ajouté</span>
                <span className="ml-auto text-xs text-gray-400">09:15 AM</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <span className="text-yellow-500 text-lg">📢</span>
                <span>Annonce publiée</span>
                <span className="ml-auto text-xs text-gray-400">Hier</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <span className="text-red-500 text-lg">📚</span>
                <span>Module supprimé</span>
                <span className="ml-auto text-xs text-gray-400">Hier</span>
              </li>
            </ul>
            <button
              onClick={() => navigate("/annonces")}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Voir toutes →
            </button>
          </div>
        </div>

        {/* Gestion rapide */}
        <div className="bg-white rounded-xl shadow p-6 mt-4">
          <h2 className="font-semibold mb-4 text-xl">⚙️ Gestion rapide</h2>
          <div className="flex flex-wrap gap-4 justify-start">
            <ActionButton
              label="➕ Ajouter utilisateur"
              onClick={() => navigate("/admin/utilisateurs/add")}
            />
            <ActionButton
              label="📚 Gérer modules"
              onClick={() => navigate("/admin/modules")}
            />
            <ActionButton
              label="🔧 Paramètres système"
              onClick={() => navigate("/admin/settings")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow p-5 flex flex-col justify-between cursor-pointer hover:shadow-lg transition relative overflow-hidden"
    >
      <div className="absolute top-2 right-2 opacity-20">{icon}</div>
      <div className="relative">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition shadow-sm"
    >
      {label}
    </button>
  );
}

export default DashboardAdmin;

