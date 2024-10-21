import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  async function resetPassword(values) {
    setIsLoading(true);
    setError("");
    let baseUrl = "https://ecommerce.routemisr.com";

    try {
      const response = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, values);
      if (response.data.token) {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Unable to reset password. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: email,
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: resetPassword,
  });

  return (
    <div className="w-50 mx-auto py-5">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      {error && <div className="alert alert-danger">{error}</div>}
      <h3 className="fw-bold">Reset Password</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="form-control mb-2"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          disabled
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          className="form-control mb-2"
          id="newPassword"
          name="newPassword"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="alert alert-danger">{formik.errors.newPassword}</div>
        )}

        {isLoading ? (
          <button className="btn bg-main text-white mt-2" type="button" disabled>
            Resetting...
          </button>
        ) : (
          <button
            type="submit"
            className="btn bg-main text-white mt-2"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Reset Password
          </button>
        )}
      </form>
    </div>
  );
}
