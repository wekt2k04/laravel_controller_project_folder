import { useState } from "react";
import { useNavigate } from "react-router-dom";
import schoolImg from "../assets/images/school.png";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/etudiant");
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

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2025 – Academic Platform
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
