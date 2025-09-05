import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../features/cart/cartSlice";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil data pengguna saat ini dari state Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleAddToCart = async () => {
    // Langkah 1: Cek apakah pengguna sudah login
    if (currentUser) {
      // Jika sudah login, jalankan logika seperti biasa
      dispatch(addItem(product));

      // Simpan/Update keranjang di Firestore
      const cartItemRef = doc(db, "users", currentUser.uid, "cart", product.id);
      const docSnap = await getDoc(cartItemRef);

      if (docSnap.exists()) {
        // Jika item sudah ada, update quantity-nya
        await setDoc(
          cartItemRef,
          { quantity: docSnap.data().quantity + 1 },
          { merge: true }
        );
      } else {
        // Jika item baru, buat dokumen baru
        await setDoc(cartItemRef, { ...product, quantity: 1 });
      }
      // ----------------------------------------------------

      alert(`${product.name} telah ditambahkan ke keranjang!`);
    } else {
      alert("Anda harus login untuk menambahkan item ke keranjang.");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        src={product.imageUrl || "https://via.placeholder.com/400"} // Gambar placeholder jika tidak ada
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{product.name}</h3>
        <p className="text-gray-400 mt-1">{product.category}</p>
        <p className="text-2xl font-semibold text-orange-500 mt-2">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
