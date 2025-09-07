// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Tambahkan state untuk error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err); // Simpan error di state
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Dependency array kosong agar hanya berjalan sekali

  // Kembalikan state yang dibutuhkan oleh komponen
  return { products, loading, error };
};