import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import { auth, db } from '../config/firebase';
import { setUser, clearUser, setLoading } from '../features/user/userSlice';
import { setCart, clearCart } from '../features/cart/cartSlice';

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // onAuthStateChanged adalah listener dari Firebase.
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
        const cartRef = collection(db, 'users', user.uid, 'cart');
        const cartSnapshot = await getDocs(cartRef);
        const cartData = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setCart(cartData));
      } else {
        // Jika tidak ada pengguna (logout), bersihkan state pengguna.
        dispatch(clearUser());
        dispatch(clearCart());
      }
      // Setelah pengecekan selesai, set loading menjadi false
      dispatch(setLoading(false));
    });

    // Cleanup function
    return () => unsubscribe();
  }, [dispatch]);
};