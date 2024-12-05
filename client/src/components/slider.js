import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "../slider.css";

const Sliding = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
       
        <div>
          <img className="slider-image" src={require("../sources/image2.jpg")} alt="slide2" width="50%" height="400" />
        </div>
        <div>
          <img className="slider-image" src={require("../sources/image1.png")} width="50%" height="400" alt="slide3" />
        </div>
      </Slider>
    </div>
  );
};

export default Sliding;