import React, { useContext } from "react";

import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";

export default function Address() {
  let { onlinePayment, cartId } = useContext(cartContext);

  async function handleAddressSubmit(values) {
    try {
      let { data } = await onlinePayment(
        cartId,
        "http://localhost:3000",
        values,
      );
      if (data.session && data.session.url) {
        window.location.href = data.session.url;
      } else {
        console.error("Session details are missing in the response");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleAddressSubmit,
  });
  return (
    <>
      <div className="container">
        <form className="p-3 form-control" onSubmit={formik.handleSubmit}>
          <div className="input m-2">
            {" "}
            <label htmlFor="details">Details: </label>
            <input
              className="form-control mb-2"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="details"
              type="text"
            />
          </div>

          <div className="input m-2">
            <label f htmlFor="phone">
              Phone:{" "}
            </label>
            <input
              className="form-control mb-2"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="text"
              name="phone"
            />
          </div>

          <div className="input m-2">
            <label htmlFor="city">City: </label>
            <input
              className="form-control mb-2"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="city"
              type="text"
            />
          </div>

          <button
            className="btn bg-main text-white"
            type="submit"
            onClick={formik.submitForm}
          >
            Check Out
          </button>
        </form>
      </div>
    </>
  );
}
