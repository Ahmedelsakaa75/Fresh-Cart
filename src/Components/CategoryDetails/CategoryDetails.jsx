import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import { FallingLines } from "react-loader-spinner";
import styles from "./CategoryDetails.module.css";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const fetchProductsByCategory = async (categoryId) => {
  const response = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
  );
  return response.data.data;
};

function CategoryDetails() {
  const { categoryId } = useParams();

  const { addToCart, numCartItems, setNumCartItems } = useContext(cartContext);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery(["categoryProducts", categoryId], () =>
    fetchProductsByCategory(categoryId),
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className=" d-flex justify-content-center align-items-center">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">Something went wrong: {error.message}</Alert>
    );
  }

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
      <h2 className="text-center mb-4">Products</h2>

      <div className="row">
        {products.length > 0 ? (
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
                        <i className="fa-regular fa-heart"></i>
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
        ) : (
          <Alert variant="warning" className="w-100 text-center">
            No products found for this category.
          </Alert>
        )}
      </div>
    </div>
  );
}

export default CategoryDetails;
