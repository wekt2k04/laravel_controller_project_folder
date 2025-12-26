import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openDashboard, setOpenDashboard] = useState(false);

  const linkBase = "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition";

  return (
    <aside
      className={`bg-[#1f2937] text-gray-200 ${isOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}
      style={{ minHeight: "100vh" }} // garde au moins la hauteur de l'écran
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
        <span className="font-semibold text-lg">{isOpen ? "Academic App" : "🏫"}</span>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setOpenDashboard(false);
          }}
          className="text-gray-400 hover:text-white"
        >
          ☰
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {/* Dashboard */}
        <button
          onClick={() => isOpen && setOpenDashboard(!openDashboard)}
          className={`${linkBase} w-full hover:bg-gray-700 justify-between`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🏠</span>
            {isOpen && <span>Dashboard</span>}
          </div>
          {isOpen && <span className="text-xs">{openDashboard ? "▲" : "▼"}</span>}
        </button>

        {/* Submenu Dashboard */}
        {openDashboard && isOpen && (
          <div className="ml-6 mt-2 space-y-1 border-l border-gray-600 pl-4">
            {[
              { name: "Étudiant", path: "/etudiant" },
              { name: "Enseignant", path: "/enseignant" },
              { name: "Admin", path: "/admin" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* Pages */}
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

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700 text-xs text-gray-400 text-center">
        {isOpen ? "© 2025 Academic Platform" : "© 2025"}
      </div>
    </aside>
  );
}

export default Sidebar;

