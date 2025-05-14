import { createContext, useContext } from 'react';

export const CartItemContext = createContext(null);

export const useCartItemContext = () => useContext(CartItemContext);