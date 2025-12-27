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
import { FaBook, FaCalendarAlt, FaFileAlt, FaUsers, FaBullhorn, FaPlus, FaCheck } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardEtudiant() {
  const navigate = useNavigate();

  const progressionData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Progression (%)",
        data: [50, 55, 60, 65, 70, 75],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  const progressionOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  return (
    <div
      className="space-y-0 p-6 min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/school.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Étudiant</h1>

        {/* Cards principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={<FaBook size={30} className="text-yellow-500" />}
            title="Modules inscrits"
            value="6"
            onClick={() => navigate("/modules")}
          />
          <StatCard
            icon={<FaCalendarAlt size={30} className="text-green-500" />}
            title="Séances aujourd'hui"
            value="2"
            onClick={() => navigate("/seances")}
          />
          <StatCard
            icon={<FaUsers size={30} className="text-blue-500" />}
            title="Taux de présence"
            value="94%"
            onClick={() => navigate("/presence")}
          />
          <StatCard
            icon={<FaFileAlt size={30} className="text-red-500" />}
            title="Documents"
            value="18"
            onClick={() => navigate("/documents")}
          />
        </div>

        {/* Prochaines séances + Dernières annonces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tableau des séances */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4 text-xl">📅 Prochaines séances</h2>
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Matière</th>
                  <th className="px-4 py-2 border">Jour</th>
                  <th className="px-4 py-2 border">Heure</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">Mathématiques</td>
                  <td className="px-4 py-2 border">Lundi</td>
                  <td className="px-4 py-2 border">10:00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">Physique</td>
                  <td className="px-4 py-2 border">Mardi</td>
                  <td className="px-4 py-2 border">14:00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">Informatique</td>
                  <td className="px-4 py-2 border">Jeudi</td>
                  <td className="px-4 py-2 border">16:00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dernières annonces avec icônes */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4 text-xl">📢 Dernières annonces</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <FaPlus className="text-green-500" />
                <span>Nouveau document ajouté</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <FaCheck className="text-blue-500" />
                <span>Examen prévu le 28/12</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                <FaBullhorn className="text-yellow-500" />
                <span>Changement de salle</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Progression générale */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4 text-xl">📊 Progression générale</h2>
          <div className="w-full">
            <Line data={progressionData} options={progressionOptions} />
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
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default DashboardEtudiant;
