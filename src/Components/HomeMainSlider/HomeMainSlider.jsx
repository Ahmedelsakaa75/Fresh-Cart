import React from "react";
import styles from "./HomeMainSlider.module.css";
import Slider from "react-slick";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import blog1 from "../../Assets/images/blog-img-1.jpeg";
import blog2 from "../../Assets/images/blog-img-2.jpeg";

export default function HomeMainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
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
          backgroundColor: "lightgray",
          margin: "0 5px",
        }}
      ></div>
    ),
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <div className="p-2 text-center">
              <img
                height={400}
                className="img-fluid w-100"
                src={slide1}
                alt="Slide1"
              />
            </div>
            <div className="p-2 text-center">
              <img
                height={400}
                className="img-fluid w-100"
                src={slide2}
                alt="slide2"
              />
            </div>
            <div className="p-2 text-center">
              <img
                height={400}
                className="img-fluid w-100"
                src={slide3}
                alt="slide3"
              />
            </div>
          </Slider>
        </div>
        <div className="col-md-3">
          <img height={300} className=" w-100 mb-1" src={blog1} alt="" />
          <img height={300} className=" w-100 mt-1" src={blog2} alt="" />
        </div>
      </div>
    </>
  );
}
