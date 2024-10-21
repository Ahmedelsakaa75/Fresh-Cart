import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FallingLines } from "react-loader-spinner";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
  let { productId } = useParams();

  const { addToCart, updateProductQuantity, numCartItems, setNumCartItems } =
    useContext(cartContext);
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } =
    useContext(wishlistContext);

  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [localWishlist, setLocalWishlist] = useState(wishlist);

  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);

  const isInWishlist = (productId) => {
    return localWishlist.some((item) => item._id === productId);
  };

  async function handleWishlistToggle(productId) {
    if (isInWishlist(productId)) {
      toast.success("Product removed from Wishlist");
      await removeFromWishlist(productId);
    } else {
      toast.success("Product added to Wishlist");
      await addToWishlist(productId);
    }
    const updatedWishlist = await fetchWishlist();
    setLocalWishlist(updatedWishlist);
  }

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId);
      await updateProductQuantity(productId, quantity);
      setNumCartItems(numCartItems + quantity);
      setInCart(true);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  }

  function getProductDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );
  }

  let { data, isLoading, isError } = useQuery(
    ["productDetails", productId],
    getProductDetails,
  );

  let product = data?.data.data;

  useEffect(() => {
    setLocalWishlist(wishlist);
  }, [wishlist]);

  const mainSliderSettings = {
    asNavFor: thumbnailSlider,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const thumbnailSettings = {
    asNavFor: mainSlider,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      {product ? (
        <div className="row">
          <Helmet>
            <title>{product.title}</title>
          </Helmet>
          <div className="col-md-4">
            <Slider
              {...mainSliderSettings}
              ref={setMainSlider}
              className={styles.mainSlider}
            >
              <div>
                <img
                  className="w-100 img-fluid m-2"
                  src={product.imageCover}
                  alt="Product Cover"
                />
              </div>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    className="w-100 img-fluid m-2"
                    src={image}
                    alt={`${product.title} ${index}`}
                  />
                </div>
              ))}
            </Slider>

            <Slider
              {...thumbnailSettings}
              ref={setThumbnailSlider}
              className={styles.thumbnailSlider}
            >
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    className={styles.thumbnailImage}
                    src={image}
                    alt={`${product.title} thumbnail ${index}`}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="col-md-8">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h2 className="h5 fw-bold">{product.title}</h2>
              <p className="text-black-50">{product.description}</p>
              <h6 className="text-main me-auto">{product.category?.name}</h6>
              <div className="d-flex justify-items-between">
                <h3 className="me-auto h4">{product.price} EGP</h3>
                <span>
                  <i className="fas fa-star rating-color"></i>{" "}
                  {product.ratingsAverage}
                </span>
              </div>

              <button
                onClick={() => handleWishlistToggle(product._id)}
                className="btn p-0 mt-3"
              >
                <i
                  className={`fa-heart ${isInWishlist(product._id) ? "fa-solid text-danger" : "fa-regular"}`}
                ></i>
                {isInWishlist(product._id)
                  ? " Remove from Wishlist"
                  : " Add to Wishlist"}
              </button>

              <div className="d-flex align-items-center mt-4">
                <button
                  className="btn brdr-main py-1 px-2"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  -
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  className="btn brdr-main py-1 px-2"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product._id)}
                className="btn bg-main text-white w-100 btn-sm mt-3"
              >
                {inCart ? "Update Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" d-flex justify-content-center align-items-center">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      )}
    </>
  );
}
