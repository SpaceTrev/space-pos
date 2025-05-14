import { createContext, useContext } from 'react';

export const ButtonContext = createContext(null);

export const useButtonContext = () => useContext(ButtonContext);