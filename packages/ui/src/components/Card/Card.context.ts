import { createContext, useContext } from 'react';

export const CardContext = createContext(null);

export const useCardContext = () => useContext(CardContext);