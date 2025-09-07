import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItem,
  addItem,
  decrementItem,
  selectTotalPrice,
} from "../features/cart/cartSlice";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  // Handler untuk menghapus item
  const handleRemoveItem = async (item) => {
    if (!currentUser) return; // Jaga-jaga jika user tidak ada
    dispatch(removeItem(item)); // Update Redux
    const cartItemRef = doc(db, "users", currentUser.uid, "cart", item.id);
    await deleteDoc(cartItemRef); // Hapus dari Firestore
  };

  // Handler untuk menambah kuantitas
  const handleIncrement = async (item) => {
    if (!currentUser) return;
    dispatch(addItem(item)); // Update Redux
    const cartItemRef = doc(db, "users", currentUser.uid, "cart", item.id);
    // Gunakan setDoc dengan merge:true atau updateDoc
    await updateDoc(cartItemRef, { quantity: item.quantity + 1 });
  };

  // Handler untuk mengurangi kuantitas
  const handleDecrement = async (item) => {
    if (!currentUser) return;
    dispatch(decrementItem(item)); // Update Redux
    const cartItemRef = doc(db, "users", currentUser.uid, "cart", item.id);
    if (item.quantity > 1) {
      await updateDoc(cartItemRef, { quantity: item.quantity - 1 }); // Kurangi di Firestore
    } else {
      await deleteDoc(cartItemRef); // Jika kuantitas jadi 0, hapus dari Firestore
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-900 min-h-screen text-white">
        <h2 className="text-3xl font-bold mb-4">
          Keranjang Belanja Anda Kosong
        </h2>
        <p className="text-gray-400 mb-8">
          Sepertinya Anda belum menambahkan produk apapun.
        </p>
        <Link
          to="/"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-8">
      <div className="container mx-auto">
        <Link
          to="/"
          role="button"
          aria-label="Kembali ke Home"
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 mb-4"
        >
          <svg
            className="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              d="M13 5H1m0 0l4-4m-4 4l4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          Kembali ke Home
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-orange-500">
          Keranjang Belanja
        </h1>

        {/* Cart Items List */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 py-4 last:border-b-0"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-400">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-700 rounded-lg">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="px-3 py-1 font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="px-3 py-1 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <p className="w-24 text-center font-semibold">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-400 font-bold"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <p className="text-2xl font-bold">Total Harga:</p>
            <p className="text-3xl font-extrabold text-orange-500">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <button className="w-full sm:w-auto mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200">
            Lanjutkan ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
