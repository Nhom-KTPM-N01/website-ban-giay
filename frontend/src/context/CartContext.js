import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const refreshCart = async () => {
    if (!user) { setCartCount(0); return; }
    try {
      const res = await getCart();
      setCartCount(res.data.cart.reduce((sum, i) => sum + i.quantity, 0));
    } catch { setCartCount(0); }
  };

  useEffect(() => { refreshCart(); }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
