import { createContext, useContext } from 'react';

// 1. Crear el Contexto
export const CartContext = createContext();

// 2. Hook personalizado
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};
