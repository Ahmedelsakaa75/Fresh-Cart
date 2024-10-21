import React, { useContext } from "react";
import styles from "./WishList.module.css";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function Wishlist() {
  const { wishlist = [], removeFromWishlist } = useContext(wishlistContext);
  const { addToCart, numCartItems, setNumCartItems } = useContext(cartContext);

  async function handleAddToCart(productId) {
    try {
      let response = await addToCart(productId);
      if (response.data.status === "success") {
        toast.success("Product Added to Cart");
        setNumCartItems(numCartItems + 1);
      } else {
        toast.error("Product not added to Cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Wishlist</h2>

      {wishlist?.length > 0 ? (
        <div className="row">
          {wishlist.map((item) => (
            <div key={item._id} className="col-md-2">
              <div className="card mb-4">
                <Link to={`/productdetails/${item.id}`}>
                  <img
                    src={item.imageCover}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="h6  card-title">{item.title}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <div className="d-flex justify-content-between align-items-center"></div>
                  </div>
                </Link>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="btn bg-main m-2 text-white"
                >
                  Add to cart
                </button>
                <button
                  className="m-2 btn btn-danger"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>Your wishlist is currently empty.</p>
          <Link to="/products" className="text-white btn bg-main">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
