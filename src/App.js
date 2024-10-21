import { useContext, useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import NotFound from "./Components/NotFound/NotFound";
import { UserContext } from "./Context/UserContext";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { WishlistContextProvider } from "./Context/WishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import { ProductProvider } from "./Context/ProductContext.js";
import Address from "./Components/Address/Address.jsx";
import Orders from "./Components/Orders/Orders";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";

let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      {
        path: "profilePage",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories/:categoryId",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands/:brandId",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },

      {
        path: "Address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:productId",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, [setUserToken]);

  return (
    <>
      <WishlistContextProvider>
        <CartContextProvider>
          <ProductProvider>
            <RouterProvider router={routes} />
            <Toaster />
          </ProductProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </>
  );
}

export default App;
