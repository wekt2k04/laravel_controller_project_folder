
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaBook, FaChalkboardTeacher, FaCalendarAlt, FaUsers } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardEnseignant() {
  const navigate = useNavigate();

  // Données pour le graphique de présence par mois
  const presenceData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Présence moyenne (%)",
        data: [85, 88, 90, 87, 92, 89],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  const presenceOptions = { responsive: true, plugins: { legend: { display: true } } };

  return (
    <div
      className="space-y-0 p-6 min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/school.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Enseignant</h1>

        {/* Cartes principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={<FaBook size={30} className="text-yellow-500" />}
            title="Modules enseignés"
            value="4"
            onClick={() => navigate("/modules")}
          />
          <StatCard
            icon={<FaUsers size={30} className="text-blue-500" />}
            title="Étudiants"
            value="120"
            onClick={() => navigate("/etudiant")}
          />
          <StatCard
            icon={<FaCalendarAlt size={30} className="text-green-500" />}
            title="Séances prévues"
            value="5"
            onClick={() => navigate("/seances")}
          />
          <StatCard
            icon={<FaChalkboardTeacher size={30} className="text-red-500" />}
            title="Présence aujourd'hui"
            value="96%"
            onClick={() => navigate("/presence")}
          />
        </div>

        {/* Tableau des séances + Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tableau des séances */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4 text-xl">📅 Séances par mois</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Mois</th>
                  <th className="p-2 border">Filière</th>
                  <th className="p-2 border">Heure</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 border">Janvier</td>
                  <td className="p-2 border">G.INF</td>
                  <td className="p-2 border">Lundi 10:00</td>
                  <td className="p-2 border">semaine 1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 border">Février</td>
                  <td className="p-2 border">G.IDIA</td>
                  <td className="p-2 border">Mardi 14:00</td>
                  <td className="p-2 border">semaine 2</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4 text-xl">📝 Actions rapides</h2>
            <div className="flex flex-col gap-3">
              <ActionButton label="➕ Ajouter une séance" onClick={() => navigate("/seances")} />
              <ActionButton label="✅ Marquer la présence" onClick={() => navigate("/presence")} />
              <ActionButton label="📢 Publier une annonce" onClick={() => navigate("/annonces")} />
            </div>
          </div>
        </div>

        {/* Statistiques de présence */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4 text-xl">📊 Présence par mois</h2>
          <Line data={presenceData} options={presenceOptions} />
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
      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition shadow-sm flex items-center gap-2"
    >
      {label}
    </button>
  );
}

export default DashboardEnseignant;
