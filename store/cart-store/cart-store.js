import { createContext } from 'react';

const CartStore = createContext({
  open: false,
  setOpen: false,
  cartItems: [],
  shippingAddress: null,
  addToCart: (product) => {},
  removeFromCart: (product) => {},
  deleteFromCart: (product) => {},
  saveShippingAddress: (address) => {},
  userLogout: () => {},
  dispatch: () => {},
});

export default CartStore;
