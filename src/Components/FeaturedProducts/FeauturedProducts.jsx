import React, { useContext } from "react";
import styles from "./FeaturedProducts.module.css";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";
import { useProductContext } from "../../Context/ProductContext";

export default function FeaturedProducts() {
  const { wishlist, addToWishlist, removeFromWishlist, setWishlist } =
    useContext(wishlistContext);
  const { addToCart, numCartItems, setNumCartItems } = useContext(cartContext);
  const { isLoading, data } = useProductContext();

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  async function handleWishlistToggle(productId) {
    if (isInWishlist(productId)) {
      toast.success("Product removed from Wishlist");
      await removeFromWishlist(productId);
    } else {
      toast.success("Product added to Wishlist");
      const fakeNewItem = { _id: productId };
      setWishlist((prevWishlist) => [...prevWishlist, fakeNewItem]);

      await addToWishlist(productId);
    }
  }

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
    <div className="container p-5">
      <div className="row">
        {isLoading ? (
          <div className=" d-flex justify-content-center align-items-center">
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        ) : (
          data?.data.data.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <Link to={`/productdetails/${product.id}`}>
                <div
                  className={`product cursor-pointer py-1 my-2 px-2 ${styles.productCard}`}
                >
                  <div className="position-relative">
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <div className="position-absolute top-0 end-0 p-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishlistToggle(product._id);
                        }}
                        className="btn p-0"
                      >
                        <i
                          className={`fa-heart ${
                            isInWishlist(product._id)
                              ? "fa-solid text-danger"
                              : "fa-regular"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <span className="text-main font-sm fw-bolder">
                    {product.category.name}
                  </span>
                  <h3 className="h6">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between mt-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="btn bg-main text-white w-100 btn-sm mt-2"
              >
                Add to cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
