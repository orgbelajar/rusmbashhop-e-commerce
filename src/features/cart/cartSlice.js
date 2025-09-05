import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { id, name, price, imageUrl, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    // Action untuk menambah item ke keranjang
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Action untuk menghapus item dari keranjang
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    // Action untuk mengurangi kuantitas item
    decrementItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        // Jika kuantitas 1 lalu dikurangi, hapus item dari keranjang
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
    // Action untuk mengosongkan keranjang
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { setCart, addItem, removeItem, decrementItem, clearCart } = cartSlice.actions;

// Selector untuk mengambil total item di keranjang
export const selectTotalItems = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector untuk mengambil total harga
export const selectTotalPrice = state => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);


export default cartSlice.reducer;