"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Merge local cart when logging in
  // const mergeCartOnLogin = async (token) => {
  //   const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   if (localCart.length === 0) return;

  //   try {
  //     await axios.post(
  //       "`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/merge",
  //       { cart: localCart },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     localStorage.removeItem("cart"); // Remove local cart after merging
  //   } catch (error) {
  //     console.error("Cart merge failed:", error.response?.data?.message || error.message);
  //   }
  // };

  const mergeCartOnLogin = async (token) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (localCart.length === 0) return;
  
    // console.log("Merging cart:", { cart: localCart });
  
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/merge`,
        { cart: localCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // console.log("Merged cart response:", data.cart);
      if (data.cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(data.cart));
      }
  
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Cart merge failed:", error.response?.data?.message || error.message);
    }
  };
  
  

  // Fetch user cart after login
  // const fetchUserCart = async (token) => {
  //   try {
  //     const { data } = await axios.get("`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log(data);
  //     localStorage.setItem("cart", JSON.stringify(data.cart)); // Sync cart with backend
  //   } catch (error) {
  //     console.error("Fetching cart failed:", error.response?.data?.message || error.message);
  //   }
  // };
  const fetchUserCart = async (token) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (data.cart && data.cart.length > 0) {
        // console.log("Fetched user cart:", data.cart);
        localStorage.setItem("cart", JSON.stringify(data.cart));
      } else {
        console.warn("Fetched cart is empty, keeping local cart");
      }
    } catch (error) {
      console.error("Fetching cart failed:", error.response?.data?.message || error.message);
    }
  };
  
  

  // Login Function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, { email, password });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);

      await mergeCartOnLogin(data.token); // Merge local cart
      await fetchUserCart(data.token); // Fetch updated cart
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Clear local cart
    setUser(null);
    window.location.href = "/";

  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
