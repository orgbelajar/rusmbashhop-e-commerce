import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuthListener } from "./hooks/useAuthListener";

import Navbar from "./components/Navbar"; // Komponen Navbar Anda
import Footer from "./components/Footer"; // Opsional: jika Anda punya Footer


function App() {
  useAuthListener();

  // isLoading di sini untuk menampilkan UI yang sesuai
  const isLoading = useSelector((state) => state.user.isLoading);

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
      <Footer />
    </div>
  );
}

export default App;
