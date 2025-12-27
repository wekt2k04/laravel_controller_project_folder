import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import schoolImg from "../assets/images/school.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      const { access_token, user } = response.data;

      // Stocker le token et l'utilisateur
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Configurer le header Authorization par défaut pour les futures requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Redirection selon le rôle
      if (user.role === 'admin') {
        navigate("/admin");
      } else if (user.role === 'prof') {
        navigate("/enseignant");
      } else {
        navigate("/etudiant");
      }

    } catch (err) {
      console.error("Erreur de connexion", err);
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <img
        src={schoolImg}
        alt="Background école"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login form container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/90 w-full max-w-md p-8 rounded-xl shadow-lg backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Plateforme Académique
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ensa.ma"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/10 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-600 hover:underline text-sm">
              Créer un compte
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2025 – Academic Platform
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
