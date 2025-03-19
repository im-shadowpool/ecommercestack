"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/context/UserContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ACTIONS = {
  SET_WISHLIST: "SET_WISHLIST",
  TOGGLE_ITEM: "TOGGLE_ITEM",
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_WISHLIST:
      return action.payload;

    case ACTIONS.TOGGLE_ITEM:
      const exists = state.some((item) => item._id === action.payload._id);
      return exists
        ? state.filter((item) => item._id !== action.payload._id)
        : [...state, action.payload];

    default:
      return state;
  }
};

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlistFromServer();
    }
  }, [user]);

  const fetchWishlistFromServer = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      dispatch({ type: ACTIONS.SET_WISHLIST, payload: data.wishlist });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  //   // Fetch wishlist from backend API
//   const fetchWishlistFromServer = async () => {
//     try {
//       const res = await fetch("`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist", { headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       }, });
//       if (!res.ok) throw new Error("Failed to fetch wishlist");
//       const data = await res.json();
//       dispatch({ type: ACTIONS.SET_WISHLIST, payload: data.wishlist });
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   };

  // Optimistic UI Toggle with Debounce
  const toggleWishlist = async (product) => {
    if (!user) {
      return toast.custom(
        (t) => (
          <div className="flex items-center gap-4 shadow-lg rounded-lg px-4 py-3 border font-normal min-w-80
            bg-gradient-to-br from-black to-egray-900 border-egray-500 text-egray-50">
            <span className="">
              To get started, please log in.
            </span>
            <button
              onClick={() => {
                toast.dismiss(t);
                window.location.href = "/login";
              }}
              className="px-2 py-0.5 bg-egreen-800 text-white rounded-md hover:bg-egray-50 hover:text-black transition"
            >
              Login
            </button>
          </div>
        ),
        { duration: 4000 }
      );
      // return toast.error("Please login to use wishlist");
    }

    if (isLoading) return; // Prevent multiple rapid clicks
    setIsLoading(true);

    const isWishlisted = wishlist.some((item) => item._id === product._id);
    dispatch({ type: ACTIONS.TOGGLE_ITEM, payload: product }); // Optimistic UI update

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${isWishlisted ? product._id : ""}`,
        {
          method: isWishlisted ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: isWishlisted
            ? null
            : JSON.stringify({ productId: product._id }),
        }
      );

      if (!res.ok) throw new Error("Failed to update wishlist");
      toast.custom(
        (t) => (
          <div
            className="flex items-center gap-3 shadow-lg rounded-lg px-4 py-3 border text-egray-50 font-normal min-w-80 bg-gradient-to-br from-black to-egray-900 border-egray-500"
          >
            {isWishlisted ? (
              <FaRegHeart className="text-egray-50 text-lg" />
            ) : (
              <FaHeart className="fill-egray-50 text-lg" />
            )}
            <span>
              {isWishlisted ? "Removed from Wishlist!" : "Added to Wishlist!"}
            </span>
          </div>
        ),
        { duration: 4000 }
      );
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      dispatch({ type: ACTIONS.TOGGLE_ITEM, payload: product }); // Revert on failure
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => setIsLoading(false), 500); // Prevent excessive requests
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
