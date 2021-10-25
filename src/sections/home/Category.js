import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { getHomeSaladCategory, getHomeFoodCategory,getAllCustom } from "./apiHome";
import { API } from "../../config";
import soup from "../../assets/images/home/soup.jpg";

// install Swiper components
SwiperCore.use([Navigation]);

const Category = () => {
  const [allSaladCategory, setAllSaladCategory] = useState([]);
  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [allCustom, setAllCustom] = useState([]);
  const [error, setError] = useState(false);

  // Loading Categories
  useEffect(() => {
    const abortCont = new AbortController();
    getHomeSaladCategory(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllSaladCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const abortCont = new AbortController();
    getHomeFoodCategory(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllFoodCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const abortCont = new AbortController();
    getAllCustom(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllCustom(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const settings = {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: false,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
    },
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
    <section className="browse-cat u-line section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header-left">
              {showError()}
              <h3 className="text-light-black header-title title">
                Our Tasty Categories
              </h3>
            </div>
          </div>
          <div className="col-12">
            <Swiper
              className="category-slider swiper-container"
              {...settings}
              navigation
            >
              {allCustom.map((c, i) => (
                <SwiperSlide key={i}>
                  <Link to={`/customCart/${c._id}`} className="categories">
                    <div className="icon text-custom-white bg-light-green ">
                      <img
                        src={`${API}/custom/photo/${c._id}`}
                        className="rounded-circle"
                        alt=""
                      />
                    </div>{" "}
                    <span className="text-light-black cat-name">
                      {c.title}{" "}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
              {allSaladCategory.map((c, i) => (
                <SwiperSlide key={i}>
                  <Link to={`/saladCategory/${c._id}`} className="categories">
                    <div className="icon text-custom-white bg-light-green ">
                      <img
                        src={`${API}/saladCategory/photo1/${c._id}`}
                        className="rounded-circle"
                        alt=""
                      />
                    </div>{" "}
                    <span className="text-light-black cat-name">
                      {c.title}{" "}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <Link to="/soupCategory" className="categories">
                  <div className="icon text-custom-white bg-light-green ">
                    <img src={soup} className="rounded-circle" alt="" />
                  </div>{" "}
                  <span className="text-light-black cat-name">Soups</span>
                </Link>
              </SwiperSlide>

              {allFoodCategory.map((c, i) => (
                <SwiperSlide key={i}>
                  <Link to={`/foodCategory/${c._id}`} className="categories">
                    <div className="icon text-custom-white bg-light-green ">
                      <img
                        src={`${API}/foodCategory/photo1/${c._id}`}
                        className="rounded-circle"
                        alt=""
                      />
                    </div>{" "}
                    <span className="text-light-black cat-name">
                      {c.title}{" "}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
