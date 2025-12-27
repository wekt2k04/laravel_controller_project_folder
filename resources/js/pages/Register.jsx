import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import schoolImg from "../assets/images/school.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "etudiant",
    filiere_id: ""
  });
  const [filieres, setFilieres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger les filières pour le formulaire
    axios.get('/api/filieres')
      .then(res => setFilieres(res.data))
      .catch(err => console.error("Erreur chargement filières", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/register', formData);
      const { access_token, user } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      if (user.role === 'admin') navigate("/admin");
      else if (user.role === 'prof') navigate("/enseignant");
      else navigate("/etudiant");

    } catch (err) {
      console.error("Erreur inscription", err);
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <img src={schoolImg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="bg-white/90 w-full max-w-md p-8 rounded-xl shadow-lg backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Créer un compte</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required minLength="8" />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Rôle</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                <option value="etudiant">Étudiant</option>
                <option value="prof">Enseignant</option>
                {/* Admin peut être caché ou protégé en prod */}
              </select>
            </div>

            {formData.role === 'etudiant' && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Filière</label>
                <select name="filiere_id" value={formData.filiere_id} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required>
                  <option value="">Sélectionner une filière</option>
                  {filieres.map(f => (
                    <option key={f.id} value={f.id}>{f.nom}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              {loading ? 'Création...' : "S'inscrire"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600 hover:underline text-sm">Déjà un compte ? Se connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
