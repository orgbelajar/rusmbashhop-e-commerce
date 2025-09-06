import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { selectTotalItems } from "../features/cart/cartSlice";
import Brand from "./Brand";

// Impor ikon sederhana (Anda bisa menggantinya dengan library ikon seperti react-icons)
const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

function Navbar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const totalItems = useSelector(selectTotalItems);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect ke halaman utama setelah logout
      navigate("/");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name */}
          <Brand />

          {/* Navigasi Kanan */}
          <div className="flex items-center space-x-6">
            {/* Link Keranjang Belanja */}
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingCartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Tampilan Kondisional: Logged In vs Logged Out */}
            {currentUser ? (
              // Jika pengguna sudah login
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Halo, {currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Jika pengguna belum login
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
