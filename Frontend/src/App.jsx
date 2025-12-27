import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import DashboardEtudiant from "./pages/DashboardEtudiant";
import DashboardEnseignant from "./pages/DashboardEnseignant";
import DashboardAdmin from "./pages/DashboardAdmin";
import Modules from "./pages/Modules";
import Seances from "./pages/Seances";
import Presence from "./pages/Presence";
import Documents from "./pages/Documents";
import Annonces from "./pages/Annonces";
import Statistiques from "./pages/Statistiques";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Page login */}
        <Route path="/login" element={<Login />} />

        {/* Toutes les pages avec le Layout */}
        <Route element={<Layout />}>
          <Route path="/etudiant" element={<DashboardEtudiant />} />
          <Route path="/enseignant" element={<DashboardEnseignant />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/seances" element={<Seances />} />
          <Route path="/presence" element={<Presence />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/statistiques" element={<Statistiques />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





