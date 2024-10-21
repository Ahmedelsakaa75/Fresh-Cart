import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";
import toast from "react-hot-toast";
import { Alert } from "react-bootstrap";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandId = queryParams.get("brandId");

  const { addToCart, numCartItems, setNumCartItems } = useContext(cartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let response;
        if (brandId) {
          response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products",
            {
              params: { brand: brandId },
            },
          );

          if (response.data.data.length > 0) {
            setBrandName(response.data.data[0].brand.name);
          } else {
            setBrandName("");
          }
        } else {
          response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products",
          );
          setBrandName("All Products");
        }
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [brandId]);

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId);
      setNumCartItems(numCartItems);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        {brandName ? brandName : "Products by Brand"}
      </h2>
      <Helmet>
        <title>{brandName ? brandName : "Products by Brand"}</title>
        <meta name="description" content="View Our Categories In Fresh Cart." />
      </Helmet>
      <div className="row">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center w-100">
            <Alert variant="warning">
              No products available for this brand.
            </Alert>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="col-6 col-md-4 col-lg-3 mb-4">
              <Link to={`/productdetails/${product._id}`}>
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
                        }}
                        className="btn p-0"
                      >
                        {" "}
                        <i className="fa-regular fa-heart"></i>{" "}
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
};

export default Products;
