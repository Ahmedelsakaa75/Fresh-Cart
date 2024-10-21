import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import amazonPayLogo from '../../Assets/images/amazon-pay-logo-19613.png'

export default function Footer() {
  return (
    <footer className="bg-light py-5">
      <div className="container ">
        <h4 className="mb-3">Get the FreshCart app</h4>
        <p className="text-muted mb-4">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div
          className="w-100 input-group justify-content-center"
          style={{ margin: "0 auto" }}
        >
          <input
            type="email"
            className="rounded-3 form-control"
            placeholder="Email .."
            aria-label="Email for app link"
          />
          <button
            className="btn bg-main text-white ms-3 rounded-3"
            type="button"
          >
            Share App Link
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center border-top pt-4">
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">Payment Partners</span>
            <Image
              src={amazonPayLogo}
              alt="Amazon Pay"
              className="me-3"
              style={{ width: "70px", height: "auto" }}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg"
              alt="American Express"
              className="me-3"
              style={{ width: "70px", height: "auto" }}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
              alt="Mastercard"
              className="me-3"
              style={{ width: "50px", height: "auto" }}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="me-3"
              style={{ width: "70px", height: "auto" }}
            />
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">
              Get deliveries with FreshCart
            </span>
            <Link to="#" className="me-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Apple_App_Store_logo.svg"
                alt="App Store"
                style={{ width: "120px", height: "auto" }}
              />
            </Link>
            <Link to="#">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ width: "135px", height: "auto" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
