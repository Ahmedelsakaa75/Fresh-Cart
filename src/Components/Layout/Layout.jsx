import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Offline, Online } from "react-detect-offline";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Outlet></Outlet>
      </div>
      <div>
        <Offline>
          <div className="network">
            <i className="fas fa-wifi"></i>
            <span> Internet is not connected</span>
          </div>{" "}
        </Offline>
      </div>
      <Footer />
    </>
  );
}
