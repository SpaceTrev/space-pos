import { createContext, useContext } from 'react';

export const ProductCardContext = createContext(null);

export const useProductCardContext = () => useContext(ProductCardContext);