import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error("Erreur déconnexion", error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const linkBase = "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition";

  return (
    <aside
      className={`bg-[#1f2937] text-gray-200 ${isOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}
      style={{ minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
        <span className="font-semibold text-lg">{isOpen ? "Academic App" : "🏫"}</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          ☰
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        
        {/* Dashboard Link (Dynamique selon le rôle) */}
        {user && (
            <NavLink
                to={user.role === 'admin' ? '/admin' : user.role === 'prof' ? '/enseignant' : '/etudiant'}
                className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
                }
            >
                <span className="text-lg">🏠</span>
                {isOpen && <span>Tableau de bord</span>}
            </NavLink>
        )}

        {/* Pages Communes */}
        <div className="pt-4 space-y-1">
          {[
            { icon: "📚", name: "Modules", path: "/modules" },
            { icon: "🕒", name: "Séances", path: "/seances" },
            { icon: "✅", name: "Présence", path: "/presence" },
            { icon: "📁", name: "Documents", path: "/documents" },
            { icon: "📢", name: "Annonces", path: "/annonces" },
            { icon: "📊", name: "Statistiques", path: "/statistiques" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="px-2 py-4 border-t border-gray-700">
        <button
            onClick={handleLogout}
            className={`${linkBase} w-full hover:bg-red-600 text-red-300 hover:text-white`}
        >
            <span className="text-lg">🚪</span>
            {isOpen && <span>Déconnexion</span>}
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 text-xs text-gray-400 text-center">
        {isOpen ? "© 2025 Academic Platform" : "© 2025"}
      </div>
    </aside>
  );
}

export default Sidebar;
