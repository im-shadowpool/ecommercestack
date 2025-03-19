"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (user) {
      syncGuestCartToUserCart();
    } else {
      loadGuestCart();
    }
  }, [user]);

  const loadGuestCart = () => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  };

  const syncGuestCartToUserCart = async () => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) {
      fetchCart();
      return;
    }

    const guestCart = JSON.parse(storedCart);

    try {
      const { data } = await axios.post(
        `/api/cart/sync`,
        { items: guestCart },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setCart(data.cart);
      localStorage.removeItem("cart"); // Clear guest cart after syncing
    } catch (error) {
      console.error("Failed to sync cart:", error.message);
    }
  };

  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(`/api/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(data.cart);
    } catch (error) {
      console.error("Failed to fetch cart:", error.message);
    }
  };

  const addToCart = async (item) => {
    if (!item || !item.slug || !item.selectedSize) {
      console.error("Invalid item:", item);
      return;
    }

    if (user) {
      try {
        const { data } = await axios.post(
          `/api/cart/add`,
          { productId: item._id, quantity: item.quantity, selectedSize: item.selectedSize },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setCart(data.cart);
      } catch (error) {
        console.error("Failed to add to cart:", error.message);
      }
    } else {
      // Guest user logic
      setCart((prev) => {
        const existingItem = prev.find(
          (i) => i.slug === item.slug && i.selectedSize.size === item.selectedSize.size
        );

        if (existingItem) {
          return prev.map((existing) =>
            existing.slug === item.slug && existing.selectedSize.size === item.selectedSize.size
              ? { ...existing, quantity: existing.quantity + item.quantity }
              : existing
          );
        }
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      });

      setIsCartOpen(true);
    }
  };

  const removeFromCart = async (productId, size) => {
    if (user) {
      try {
        const { data } = await axios.delete(`/api/cart/remove/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCart(data.cart);
      } catch (error) {
        console.error("Failed to remove item:", error.message);
      }
    } else {
      setCart((prev) =>
        prev.filter((item) => !(item.slug === productId && item.selectedSize.size === size))
      );
    }
  };

  const updateQuantity = (slug, selectedSize, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug && item.selectedSize.size === selectedSize.size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    if (user) {
      // Server-side clearing logic can be added if required
      setCart([]);
    } else {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
