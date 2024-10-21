import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [numCartItems, setNumCartItems] = useState(null);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.token = token;
      getLoggedUserCart();
    } else {
      setNumCartItems(0);
    }
  }, []);

  async function getLoggedUserCart() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setNumCartItems(response.data.numOfCartItems);
        return response.data;
      })
      .catch((err) => err);
  }

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers },
      )
      .then((response) => {
        getLoggedUserCart();
        return response;
      })
      .catch((err) => err);
  }

  async function deleteProduct(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response.data)
      .catch((err) => err);
  }

  async function updateProductQuantity(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers },
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);
  }

  async function clearCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, { headers })
      .then((response) => {
        getLoggedUserCart();
        return response;
      })
      .catch((err) => err);
  }

  async function onlinePayment(cartId, url, values) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: values },
        { headers },
      );
      if (response.data && response.data.session) {
        return response;
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      console.error("Failed to complete payment:", err);
      throw err;
    }
  }

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setCartId(data?._id);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartId,
        onlinePayment,
        clearCart,
        addToCart,
        getLoggedUserCart,
        deleteProduct,
        updateProductQuantity,
        setNumCartItems,
        numCartItems,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
