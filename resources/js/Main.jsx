import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardEtudiant from "./pages/DashboardEtudiant";
import DashboardEnseignant from "./pages/DashboardEnseignant";
import DashboardAdmin from "./pages/DashboardAdmin";
import Modules from "./pages/Modules";
import Seances from "./pages/Seances";
import Presence from "./pages/Presence";
import Documents from "./pages/Documents";
import Annonces from "./pages/Annonces";
import Statistiques from "./pages/Statistiques";

// Composant de protection des routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirection vers le dashboard approprié si le rôle ne correspond pas
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'prof') return <Navigate to="/enseignant" replace />;
    return <Navigate to="/etudiant" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Pages Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Toutes les pages avec le Layout */}
        <Route element={<Layout />}>
          <Route 
            path="/etudiant" 
            element={
              <ProtectedRoute allowedRoles={['etudiant']}>
                <DashboardEtudiant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/enseignant" 
            element={
              <ProtectedRoute allowedRoles={['prof']}>
                <DashboardEnseignant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardAdmin />
              </ProtectedRoute>
            } 
          />
          
          {/* Pages accessibles à tous les connectés (ou à filtrer selon besoin) */}
          <Route path="/modules" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
          <Route path="/seances" element={<ProtectedRoute><Seances /></ProtectedRoute>} />
          <Route path="/presence" element={<ProtectedRoute><Presence /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/annonces" element={<ProtectedRoute><Annonces /></ProtectedRoute>} />
          <Route path="/statistiques" element={<ProtectedRoute><Statistiques /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





