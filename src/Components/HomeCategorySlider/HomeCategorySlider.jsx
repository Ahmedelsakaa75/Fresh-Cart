import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "./HomeCategorySlider.module.css";

export default function HomeCategorySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    appendDots: (dots) => (
      <div
        style={{
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", display: "flex" }}>
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "25px",
          height: "5px",
          borderRadius: "5px",
          backgroundColor: i === currentSlide ? "green" : "lightgray",
          margin: "0 5px",
        }}
      ></div>
    ),
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("getCategories", getCategories);
  let categories = data?.data.data;

  return (
    <>
      {categories ? (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="p-2 text-center">
              <Link
                to={`/categories/${category._id}`}
                className="category-link"
              >
                <img
                  height={180}
                  className="w-100"
                  src={category.image}
                  alt={category.name}
                />
                <h2 className="h6">{category.name}</h2>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
