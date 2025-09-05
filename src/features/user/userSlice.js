import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // Menyimpan data pengguna yang login
  isLoading: true, // Status loading untuk pengecekan awal
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action untuk menetapkan pengguna saat login
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    // Action untuk membersihkan data pengguna saat logout
    clearUser: (state) => {
      state.currentUser = null;
    },
    // Action untuk menandai bahwa pengecekan otentikasi selesai
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
