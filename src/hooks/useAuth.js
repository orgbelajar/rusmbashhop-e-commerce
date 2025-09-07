import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

// Hook ini akan menerima fungsi otentikasi utama (misal: register atau login)
export const useAuth = (authFunction, successRedirect = '/login') => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handler untuk submit form email & password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi password sesuai policy
    if (password.length < 12 || password.length > 16) {
      setError('Password harus memiliki panjang 12-16 karakter.');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password harus mengandung huruf besar.');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password harus mengandung huruf kecil.');
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError('Password harus mengandung angka.');
      return;
    }

    try {
      await authFunction(auth, email, password);
      navigate(successRedirect);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email ini sudah terdaftar. Silakan login.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Email atau password salah, Silakan coba lagi atau Sign In menggunakan Google.');
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
      console.error("Firebase auth error:", err.message);
    }
  };

  // Handler untuk login dengan Google
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Setelah login Google, langsung ke halaman utama
    } catch (err) {
      setError('Gagal login dengan Google. Silakan coba lagi.');
      console.error("Error login Google", err);
    }
  };

  // Kembalikan semua state dan handler yang dibutuhkan oleh komponen
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    handleGoogleSignIn,
  };
};