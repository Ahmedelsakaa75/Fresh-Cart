import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const wishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("userToken");

  let headers = { token: token };

  async function fetchWishlist() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers,
        },
      );
      setWishlist(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      return [];
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers },
      );
      setWishlist((prevWishlist) => [...prevWishlist, response.data.data]);
      return response;
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers },
      );

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId),
      );
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      throw error;
    }
  };

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
