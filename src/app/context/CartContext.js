"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  

  const [isCartOpen, setIsCartOpen] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart)); // Keep cart in local storage
  // }, [cart]);
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.warn("Cart is empty, not updating localStorage.");
    }
  }, [cart]);
  

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  /** Add to Cart (Handles Both Local & User-Based) */
  const addToCart = async (item) => {
    if (!item || !item._id || !item.selectedSize) {
      console.error("Invalid item:", item);
      return;
    }
      // console.log(localStorage.getItem("token"))
    if (token) {
      // Logged in: Sync with backend
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/`,
          { product: item._id, productSlug: item.slug, quantity: item.quantity, selectedSize: item.selectedSize },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setCart(data.cart); // Update state
        localStorage.setItem("cart", JSON.stringify(data.cart));
        setIsCartOpen(true);
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data?.message || error.message);
      }
    } else {
      // Guest Mode: Store in local storage
      setCart((prev) => {
        const existingItem = prev.find(
          (i) => i.product === item._id && i.selectedSize._id === item.selectedSize._id
        );

        if (existingItem) {
          return prev.map((existedItem) =>
            existedItem.product === item._id && existedItem.selectedSize._id === item.selectedSize._id
              ? { ...existedItem, quantity: existedItem.quantity + item.quantity }
              : existedItem
          );
        }

        return [...prev, { product: item._id,  quantity: item.quantity || 1, selectedSize: item.selectedSize, productSlug: item.slug }];
      });

      setIsCartOpen(true);
    }
  };

  /** Remove from Cart */
  const removeFromCart = async (product, size) => {
    if (token) {
      // Logged in: Remove from backend cart
      try {
        const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { product, size },
        });
        setCart(data.cart);
        localStorage.setItem("cart", JSON.stringify(data.cart));
      } catch (error) {
        console.error("Error removing item:", error.response?.data?.message || error.message);
      }
    } else {
      // Guest Mode: Remove from local cart
      setCart((prev) =>
        prev.filter((item) => !(item.product === product && item.selectedSize._id === size))
      );
    }
  };

  /** Update Cart Quantity */
  const updateQuantity = async (product, selectedSize, quantity) => {
    if (token) {
      try {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
          { product, selectedSize, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(data.cart);
        localStorage.setItem("cart", JSON.stringify(data.cart));
      } catch (error) {
        console.error("Error updating quantity:", error.response?.data?.message || error.message);
      }
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product === product && item.selectedSize._id === selectedSize
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  /** Clear Cart */
  const clearCart = async () => {
    if (token) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/clear`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart([]);
      localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error clearing cart:", error.response?.data?.message || error.message);
      }
    } else {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
