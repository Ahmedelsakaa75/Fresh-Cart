import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cartContext } from '../../Context/CartContext';
import { jwtDecode } from 'jwt-decode'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function ProfilePage() {
  const token = localStorage.getItem("userToken");
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token); 
      setUsername(decoded.name);
    }
  }, [token]);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Z])[A-Za-z\d]{6,11}$/,
        'Password must start with an uppercase letter and be between 6 to 11 characters long',
      )
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handlePasswordChange,
  });

  async function handlePasswordChange(values) {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        {
          currentPassword: values.currentPassword,
          password: values.newPassword,
          rePassword: values.confirmPassword,
        },
        {
          headers: {
            token, 
          },}
      );
      setIsLoading(false); 

      if (response.data.message === "success") {

        toast.success('Password updated successfully.');
      } else {
   
        toast.error(response.data.message || 'Failed to update password.');
      }
    } catch (error) {
      setIsLoading(false)

      toast.error(error.response?.data?.message || 'Error updating password.');
    }
  }

  return (
    <div className="container py-5">
      <h3>Hello, {username}</h3>

      <ToastContainer />

      <div className="mt-4">
        <h4>Change Password</h4>
        <form onSubmit={formik.handleSubmit}>
    
          <label htmlFor="currentPassword">Current Password</label>
          <input
            className="form-control mb-2"
            type="password"
            name="currentPassword"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.currentPassword && formik.touched.currentPassword && (
            <div className="alert alert-danger">{formik.errors.currentPassword}</div>
          )}

          <label htmlFor="newPassword">New Password</label>
          <input
            className="form-control mb-2"
            type="password"
            name="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="alert alert-danger">{formik.errors.newPassword}</div>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-control mb-2"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="alert alert-danger">{formik.errors.confirmPassword}</div>
          )}

          {isLoading ? (
            <button className="btn bg-main text-white" disabled>
              Updating...
            </button>
          ) : (
            <button className="btn bg-main text-white" type="submit">
              Change Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
