import { createContext, useContext } from 'react';

export const ModalContext = createContext(null);

export const useModalContext = () => useContext(ModalContext);