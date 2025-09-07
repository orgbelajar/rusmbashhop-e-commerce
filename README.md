# 🛍️ Rusmbashop

Rusmbashop adalah *Capstone Project Student Developer Initiative bersama IBM SkillsBuild X Hacktiv8 X UPNVJ* berupa aplikasi web e-commerce *full-stack* yang modern dan responsif. Dibangun dengan React dan Firebase, aplikasi ini mendemonstrasikan fitur-fitur esensial seperti otentikasi pengguna, *account linking*, dan keranjang belanja persisten yang terikat pada akun.

---

## Fitur Utama ✨

* **Otentikasi Pengguna**: Registrasi dan login aman via Email/Password & Google.
* **Account Linking**: Menautkan login Google ke akun email yang sudah ada.
* **Katalog Produk**: Menampilkan produk secara dinamis dari database Firestore.
* **Keranjang Belanja Persisten**: Item keranjang tersimpan di akun pengguna.
* **Manajemen State Terpusat**: Menggunakan Redux Toolkit untuk state global.
* **Desain Responsif**: Tampilan optimal di berbagai perangkat dengan Tailwind CSS.

---

## Teknologi yang Digunakan 🚀

**React.js (Vite)**, **Firebase (Authentication, Firestore)**, **Redux Toolkit**, **React Router**, dan **Tailwind CSS**.

---

## Panduan Instalasi 🛠️

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/username-anda/rusmbasshop.git
    cd rusmbasshop
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Buat file `.env` di root proyek dan isi dengan kredensial Firebase Anda:
    
    ```env
    VITE_FIREBASE_API_KEY="YOUR_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
    VITE_FIREBASE_APP_ID="YOUR_APP_ID"
    VITE_FIREBASE_MEASUREMENT_ID="YOUT_MEASUREMENT_ID"

4.  **Jalankan secara lokal:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173`.

---

## Dukungan AI dalam Pengembangan 🤖

Pengembangan proyek ini dipercepat secara strategis dengan bantuan beberapa model AI. Pada tahap awal, **GPT-5** digunakan untuk memberikan insight tambahan mengenai struktur folder yang skalabel. Selama proses *coding*, **Gemini 2.5 Pro** berperan sebagai asisten utama untuk pembuatan *boilerplate* kode, implementasi fitur kompleks seperti *account linking* Firebase, dan *debugging* error spesifik. Terakhir, **granite-3-8b-instruct via IBM watsonx Prompt Lab** dimanfaatkan untuk menyederhanakan komentar teknis pada kode untuk kebutuhan dokumentasi. Penggunaan AI secara terintegrasi ini secara signifikan mengurangi waktu pengembangan, mempercepat pemecahan masalah, dan meningkatkan kualitas arsitektur kode.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
