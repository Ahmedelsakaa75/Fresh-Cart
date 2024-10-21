import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let {
    setNumCartItems,
    numCartItems,
    getLoggedUserCart,
    deleteProduct,
    updateProductQuantity,
    clearCart,
  } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [response, setResponse] = useState(null);

  async function getCart() {
    const response = await getLoggedUserCart();
    setCartDetails(response.data);
    setResponse(response);

    setNumCartItems(response.numOfCartItems);
  }

  async function updateProductsQuantity(productId, count) {
    updateProductQuantity(productId, count);
    setNumCartItems(response.numOfCartItems);
    return getCart();
  }

  async function removeProduct(productId) {
    let { data } = await deleteProduct(productId);
    setNumCartItems(data.numOfCartItems);
    setCartDetails(data);
  }

  async function clear() {
    await clearCart();
    return getCart();
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cartDetails ? (
        <div className="w-100 my-2 mx-auto p-3 bg-main-light">
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <h3>Shopping Cart</h3>
              <h4 className="h6 text-main fw-bolder">
                Cart Items: {response.numOfCartItems}
              </h4>
              <h4 className="h6 text-main fw-bolder">
                Total Price: {cartDetails.totalCartPrice} EGP
              </h4>
            </div>
            <div className="bg-main rounded-3">
              <button onClick={() => clear()} className="btn text-white">
                Clear Cart
              </button>
            </div>
          </div>

          {cartDetails.products.map(function (products) {
            return (
              <div
                className="row border-bottom py-2 px-2"
                key={products.product.id}
              >
                <Helmet>
                  <title>Fresh Cart - Your Shopping Cart</title>
                  <meta
                    name="description"
                    content="View and manage your shopping cart items on Fresh Cart."
                  />
                </Helmet>
                <div className="col-md-1">
                  <img
                    className="w-75"
                    src={products.product.imageCover}
                    alt={products.product.title}
                  />
                </div>
                <div className="col-md-11 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h6">
                        {products.product.title
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}
                      </h3>
                      <h3 className="h6 text-main">{products.price} EGP</h3>
                      <button
                        onClick={() => {
                          removeProduct(products.product._id);
                        }}
                        className="btn btn-sm  p-0"
                      >
                        <i className="text-danger sm fas fa-trash-can"></i>{" "}
                        Remove
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          updateProductsQuantity(
                            products.product._id,
                            products.count + 1,
                          );
                        }}
                        className="btn brdr-main py-1 px-2"
                      >
                        +
                      </button>
                      <span className="mx-2">{products.count}</span>
                      <button
                        onClick={() => {
                          updateProductsQuantity(
                            products.product._id,
                            products.count - 1,
                          );
                        }}
                        className="btn brdr-main py-1 px-2"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {numCartItems ? (
            <>
              <Link to={"/Address"} className="btn m-2 bg-main w-25 text-white">
                Pay Online
              </Link>
              <Link to={"/"} className="btn m-2 bg-main w-25 text-white">
                Cash On Delivery
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <section
          id="loading"
          className="vh-100v   d-flex justify-content-center align-items-center"
        >
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </section>
      )}
    </>
  );
}
