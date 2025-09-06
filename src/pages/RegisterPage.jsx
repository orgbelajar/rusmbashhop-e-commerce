import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Brand from "../components/Brand";

// Impor hook dan komponen
import { useAuth } from "../hooks/useAuth";
import PasswordInput from "../components/PasswordInput";

function RegisterPage() {
  // Gunakan custom hook untuk mendapatkan semua state dan logika
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    handleGoogleSignIn,
  } = useAuth(createUserWithEmailAndPassword, "/login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Daftar Sekarang
        </h2>

        <div className="text-center mb-4">
          <Brand />
        </div>

        {error && (
          <p className="bg-red-500 text-white text-center p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
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
            {/* Gunakan komponen PasswordInput */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
          >
            Daftar
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600" />
          <div className="mx-4 text-gray-400 select-none">or</div>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full text-white border-2 border-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {/* icon dan teks tombol login dengan google) */}
            <span className="flex items-center justify-center gap-3">
              <img
                src="src/assets/google-icon.svg"
                alt=""
                className="w-5 h-5"
                aria-hidden="true"
              />
              <span>Daftar dengan Google</span>
            </span>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-400 font-bold"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
