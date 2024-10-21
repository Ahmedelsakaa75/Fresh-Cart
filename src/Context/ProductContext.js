import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { isLoading, data, error } = useQuery(
    "featuredProducts",
    getFeaturedProducts,
    {
      cacheTime: 3000,
      refetchInterval: 5000,
    },
  );

  return (
    <ProductContext.Provider value={{ isLoading, data, error }}>
      {children}
    </ProductContext.Provider>
  );
}
