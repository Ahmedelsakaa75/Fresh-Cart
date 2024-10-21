import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function submitRegister(values) {
    setisLoading(true);
    seterror("");
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
  }

  const phoneRegex = /^01\d{9}$/;

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name minimum length is 3")
      .max(15, "Name maximum length is 15")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegex, "Phone number is invalid")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])[A-Za-z\d]{6,11}$/,
        "Password must start with an uppercase letter and be between 6 to 11 characters long",
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and rePassword should match")
      .required("Repassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register Now</title>
        <meta name="description" content="Register Now in Fresh Cart." />
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error !== "" ? (
          <div className="alert mt-2 p-2 alert-danger">{error}</div>
        ) : (
          ""
        )}
        <h3 className="fw-bold">Register Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="text"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">Repeat Password</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {isLoading ? (
            <button className="btn bg-main text-white mt-2" type="button">
              <ThreeDots
                visible={true}
                height="14"
                width="35"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  padding: "5px 15px",
                }}
                wrapperClass=""
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white mt-2"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
