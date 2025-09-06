import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./config/firebase"; // Pastikan path ini benar
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faEye, faEyeSlash)

// Import actions dari userSlice
import { setUser, clearUser, setLoading } from "./features/user/userSlice";
import { setCart, clearCart } from "./features/cart/cartSlice";

import Navbar from "./components/Navbar"; // Komponen Navbar Anda
import Footer from "./components/Footer"; // Opsional: jika Anda punya Footer

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    // onAuthStateChanged adalah listener dari Firebase.
    // Ia akan berjalan saat komponen pertama kali dimuat,
    // dan setiap kali status login pengguna berubah (login/logout).
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User sedang login
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );

        // Ambil keranjang dari Firestore
        const cartRef = collection(db, "users", user.uid, "cart");
        const cartSnapshot = await getDocs(cartRef);
        const cartData = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setCart(cartData)); // Isi Redux cart dengan data dari Firestore
      } else {
        // Jika tidak ada pengguna (logout), bersihkan state pengguna.
        dispatch(clearUser());
        dispatch(clearCart());
      }
      // Setelah pengecekan selesai, set loading menjadi false
      dispatch(setLoading(false));
    });

    // Cleanup function: listener akan berhenti saat komponen di-unmount.
    // Ini penting untuk mencegah memory leak.
    return () => unsubscribe();
  }, [dispatch]); // Dependency array

  // Selama Firebase memeriksa status otentikasi, tampilkan loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <h1 className="text-white text-2xl font-bold">Memuat Aplikasi...</h1>
      </div>
    );
  }

  // Setelah selesai loading, tampilkan layout utama aplikasi
  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow">
        <Outlet /> {/* Halaman (HomePage, dll) akan dirender di sini */}
      </main>
      <Footer /> {/* Opsional */}
    </div>
  );
}

export default App;
