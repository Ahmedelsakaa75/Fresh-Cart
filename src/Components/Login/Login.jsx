import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  let { setUserToken } = useContext(UserContext);

  // Login Formik
  async function loginRegister(values) {
    setisLoading(true);
    seterror("");

    let baseUrl = "https://ecommerce.routemisr.com";
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  // Forgot Password Handler
  async function handleForgotPassword() {
    try {
      let baseUrl = "https://ecommerce.routemisr.com";
      await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, {
        email: forgotPasswordEmail,
      });
      setForgotPasswordSent(true);
      seterror(""); // Clear any existing error
    } catch (error) {
      seterror("Unable to send reset email. Please try again.");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])[A-Za-z\d]{6,11}$/,
        "Password must start with an uppercase letter and be between 6 to 11 characters long"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginRegister,
  });

  return (
    <div className="w-75 mx-auto py-5">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      {error !== "" ? (
        <div className="alert mt-2 p-2 alert-danger">{error}</div>
      ) : (
        ""
      )}
      <h3 className="fw-bold">Login</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Login Form */}
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
          <>
            <div className="d-flex align-items-center-justify-content-center">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Login
              </button>
              <button type="button" className="btn">
                <Link className="btn btn-white" to={"/register"}>
                  Register
                </Link>
              </button>
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn link-underline-success"
                onClick={() => setForgotPasswordVisible(!forgotPasswordVisible)}
              >
                Forgot your password?
              </button>
            </div>
          </>
        )}
      </form>

      {/* Forgot Password Section */}
      {forgotPasswordVisible && (
        <div className="mt-3">
          <h5>Reset Your Password</h5>
          <label htmlFor="forgotPasswordEmail">Enter your email:</label>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Enter your email to reset"
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            value={forgotPasswordEmail}
          />
          <button
            className="btn bg-main text-white"
            onClick={handleForgotPassword}
            disabled={!forgotPasswordEmail}            >
            Send Reset Email
          </button>
          {forgotPasswordSent && (
            <div className="alert alert-success mt-2">
              Reset email sent! Please check your inbox.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
