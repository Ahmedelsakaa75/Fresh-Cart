import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import { FallingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const fetchCategories = async () => {
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  return response.data.data;
};

function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("categories", fetchCategories);

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

  return (
    <div className="container my-5">
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="View Our Categories In Fresh Cart." />
      </Helmet>
      <h1 className="text-center mb-4">Categories</h1>
      <div className="row">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className=" col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="img-container">
                  <img
                    src={category.image}
                    className="card-img-top h-100"
                    alt={category.name}
                  />
                </div>
                <div className="card-body text-center d-flex justify-content-center align-items-end">
                  <div className="">
                    <h5 className="card-title">{category.name}</h5>
                    <Link
                      to={`/categories/${category._id}`}
                      className="btn bg-main text-white"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Alert variant="warning" className="w-100 text-center">
            No categories found.
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Categories;
