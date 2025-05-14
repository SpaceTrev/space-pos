import { createContext, useContext } from 'react';

export const InputContext = createContext(null);

export const useInputContext = () => useContext(InputContext);