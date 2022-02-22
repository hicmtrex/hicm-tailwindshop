import { useRouter } from 'next/router';
import React, { useReducer, useState, useEffect } from 'react';
import CartStore from './cart-store';

export const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SAVE_SHIPPING_ADDRESS: 'SAVE_SHIPPING_ADDRESS',
  USER_LOGOUT: 'USER_LOGOUT',
};

export const LOCAL_STORAGE = {
  TAILWIND_NEXT_CART: 'TAILWIND_NEXT_CART',
  TAILWIND_NEXT_ADDRESS: 'TAILWIND_NEXT_ADDRESS',
};

const initialState = {
  cartItems:
    typeof window !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE.TAILWIND_NEXT_CART)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.TAILWIND_NEXT_CART))
        : []
      : [],
  shippingAddress:
    typeof window !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE.TAILWIND_NEXT_ADDRESS)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.TAILWIND_NEXT_ADDRESS))
        : null
      : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const product = action.payload;
      const exist = state.cartItems.find((item) => item._id === product._id);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === product._id ? { ...exist, qty: item.qty + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, qty: 1 }],
        };
      }
    case ACTIONS.REMOVE_FROM_CART:
      const productt = action.payload;
      const existt = state.cartItems.find((item) => item._id === productt._id);

      if (existt.qty === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item._id !== productt._id
          ),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === productt._id ? { ...existt, qty: item.qty - 1 } : item
          ),
        };
      }

    case ACTIONS.DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case ACTIONS.CLEAR_CART:
      return { ...state, cartItems: [] };
    case ACTIONS.SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    default:
      return state;
  }
};

const CartContext = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product, color, size) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: product.qty,
        color,
        size,
        product: product._id,
      },
    });
  };

  const removeFromCart = (product) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: product });
  };

  const deleteFromCart = (product) => {
    dispatch({ type: ACTIONS.DELETE_FROM_CART, payload: product });
  };

  const saveShippingAddress = (address, cb) => {
    dispatch({ type: ACTIONS.SAVE_SHIPPING_ADDRESS, payload: address });
    if (cb) cb();
  };

  const userLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.TAILWIND_NEXT_CART);
    localStorage.removeItem(LOCAL_STORAGE.TAILWIND_NEXT_ADDRESS);
    dispatch({ type: ACTIONS.USER_LOGOUT });
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.TAILWIND_NEXT_CART,
      JSON.stringify(state.cartItems)
    );
  }, [state.cartItems, state.shippingAddress]);

  const values = {
    setOpen,
    open,
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    saveShippingAddress,
    shippingAddress: state.shippingAddress,
    userLogout,
    dispatch,
  };
  return <CartStore.Provider value={values}>{children}</CartStore.Provider>;
};

export default CartContext;
