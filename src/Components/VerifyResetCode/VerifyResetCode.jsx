import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function VerifyResetCode() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";  // Get the email from the previous component

  async function verifyCode(values) {
    setIsLoading(true);
    setError("");
    let baseUrl = "https://ecommerce.routemisr.com";

    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, values);
      if (response.data.status === "Success") {
        setIsLoading(false);
        navigate("/reset-password", { state: { email: values.email } });
      }
    } catch (error) {
      setIsLoading(false);
      setError("Invalid reset code. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
      email: email  // Automatically fill the email from state
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: verifyCode,
  });

  return (
    <div className="w-50 mx-auto py-5">
      <Helmet>
        <title>Verify Reset Code</title>
      </Helmet>
      {error && <div className="alert alert-danger">{error}</div>}
      <h3 className="fw-bold">Verify Reset Code</h3>
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

        <label htmlFor="resetCode">Reset Code</label>
        <input
          className="form-control mb-2"
          id="resetCode"
          name="resetCode"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.resetCode}
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="alert alert-danger">{formik.errors.resetCode}</div>
        )}

        {isLoading ? (
          <button className="btn bg-main text-white mt-2" type="button" disabled>
            Verifying...
          </button>
        ) : (
          <button
            type="submit"
            className="btn bg-main text-white mt-2"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Verify Code
          </button>
        )}
      </form>
    </div>
  );
}
