import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { getFrontSlide } from "./apiHome";
import { API } from "../../config";
// install Swiper components
SwiperCore.use([Navigation]);

const Banner = () => {
  const [allSlides, setAllSlides] = useState([]);
  const [error, setError] = useState(false);

  // Loading Slides
  useEffect(() => {
    const abortCont = new AbortController();
    getFrontSlide(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllSlides(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const settings = {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  return (
    <Swiper
      tag="section"
      className="about-us-slider swiper-container p-relative"
      {...settings}
      navigation
    >
      {allSlides.map((s, i) => (
        <SwiperSlide key={i} className="swiper-slide slide-item">
          <img
            src={`${API}/mainSlide/photo/${s._id}`}
            className="img-fluid full-width"
            alt=""
          />
          <div className="transform-center">
            <div className="container">
              <div className={"row " + s.position + ""}>
                <div className="col-lg-8 align-self-center">
                  <div className={"right-side-content " + s.colPosition + ""}>
                    <h1 className="text-custom-white fw-600">{s.title}</h1>
                    <h3 className="text-custom-white fw-400">{s.subtitle}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay overlay-bg" />
        </SwiperSlide>
      ))}
      {showError()}
    </Swiper>
  );
};

export default Banner;
