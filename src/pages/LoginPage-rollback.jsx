import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase"; // Pastikan path ini benar

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect ke halaman utama setelah login berhasil
      navigate("/");
    } catch (err) {
      // Menampilkan pesan error yang lebih ramah
      if (err.code === "auth/invalid-credential") {
        setError("Email atau password salah. Silakan coba lagi.");
      } else {
        setError("Gagal login. Silakan coba lagi.");
      }
      console.error("Firebase login error:", err.message);
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError("Gagal login dengan Google. Silakan coba lagi.");
      console.error("Error login Google", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Selamat Datang Kembali
        </h2>
        {error && (
          <p className="bg-red-500 text-white text-center p-2 rounded mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Alamat Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="contoh@email.com"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Separator antara tombol Login dan Sign in with Google */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600" />
          <div className="mx-4 text-gray-400 select-none">or</div>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        {/* Tombol login dengan Google */}
        <div>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full text-white border-2 border-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="flex items-center justify-center gap-3">
              <img
                src="src/assets/google-icon.svg"
                alt=""
                className="w-5 h-5"
                aria-hidden="true"
              />
              <span>Masuk dengan Google</span>
            </span>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-orange-500 hover:text-orange-400 font-bold"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
