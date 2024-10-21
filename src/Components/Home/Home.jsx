import React, { useContext } from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeauturedProducts";
import HomeCategorySlider from "./../HomeCategorySlider/HomeCategorySlider";
import HomeMainSlider from "./../HomeMainSlider/HomeMainSlider";

export default function Home() {
  return (
    <>
      <HomeMainSlider />
      <HomeCategorySlider />
      <FeaturedProducts />
    </>
  );
}
