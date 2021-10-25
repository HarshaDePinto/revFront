import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHomeSalad, getAllSoups,getHomeFood } from "./apiHome";
import { API } from "../../config";
import { getSelectedRestaurant } from "../../auth";
import ReactTooltip from "react-tooltip";

//svg
import smile from "../../assets/images/icon/smile.svg";
import smile1 from "../../assets/images/icon/smile1.svg";
import cheese from "../../assets/images/icon/cheese.svg";
import chef from "../../assets/images/icon/chef.svg";
import egg from "../../assets/images/icon/egg.svg";
import meat from "../../assets/images/icon/meat.svg";
import nut from "../../assets/images/icon/nut.svg";
import spicy from "../../assets/images/icon/spicy.svg";
import vegetable from "../../assets/images/icon/vegetable.svg";
import straight from "../../assets/images/icon/straight.svg";

// Extra
import largeimg1 from "../../assets/images/home/side1.jpg";
import largeimg2 from "../../assets/images/home/side2.jpg";
import unlimited1 from "../../assets/images/home/ads1.jpg";
import logo from "../../assets/img/tag.jpg";
// Top collection
import tpcl1 from "../../assets/images/home/top1.jpg";
import tpcl2 from "../../assets/images/home/new1.jpg";
import tpcl3 from "../../assets/images/home/top2.jpg";
import tpcl4 from "../../assets/images/home/new2.jpg";

const topcollection = [
  { img: tpcl1, cat: "Top rated" },
  { img: tpcl2, cat: "Top rated" },
];
const bottomcollection = [
  { img: tpcl3, cat: "Top rated" },
  { img: tpcl4, cat: "Top rated" },
];

const CollectionBox = ({ selectedRestaurantId }) => {
  const selectedRestaurant = getSelectedRestaurant();
  const [allSalads, setAllSalads] = useState([]);
  const [allSoups, setAllSoups] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [error, setError] = useState(false);

  //Loading Salads
  useEffect(() => {
    const abortCont = new AbortController();
    getHomeSalad(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllSalads(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [selectedRestaurantId]);

  //Loading Salad images
  const getImage = (s) => {
    return (
      <img
        src={`${API}/salad/photo/${s}`}
        className="img-fluid full-width"
        alt="product-img"
      />
    );
  };

  // Show Salad Add Cart
  const showAddCart = (r, id) => {
    if (JSON.stringify(r).includes(selectedRestaurant._id)) {
      return (
        <Link
          to={`/saladCart/${id}`}
          className="btn-first white-btn full-width text-light-green fw-600"
        >
          Add To Cart
        </Link>
      );
    } else {
      return (
        <button className="btn-first white-btn full-width text-light-red fw-600">
          Unavailable
        </button>
      );
    }
  };

    //Loading Foods
    useEffect(() => {
      const abortCont = new AbortController();
      getHomeFood(abortCont).then((data) => {
       if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllFoods(data);
        }
       }
      });
      return () => abortCont.abort();
    }, [selectedRestaurantId]);
  
    //Loading Food images
    const getFoodImage = (s) => {
      return (
        <img
          src={`${API}/food/photo/${s}`}
          className="img-fluid full-width"
          alt="product-img"
        />
      );
    };
  
    // Show Food Add Cart
    const showFoodAddCart = (r, id) => {
      if (JSON.stringify(r).includes(selectedRestaurant._id)) {
        return (
          <Link
            to={`/foodCart/${id}`}
            className="btn-first white-btn full-width text-light-green fw-600"
          >
            Add To Cart
          </Link>
        );
      } else {
        return (
          <button className="btn-first white-btn full-width text-light-red fw-600">
            Unavailable
          </button>
        );
      }
    };

  // Loading Soups
  useEffect(() => {
    const abortCont = new AbortController();
    getAllSoups(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllSoups(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [selectedRestaurantId]);

  //Loading Soup Images
  const getSoupImage = (s) => {
    return (
      <img
        src={`${API}/soup/photo/${s}`}
        className="img-fluid full-width"
        alt="product-img"
      />
    );
  };

  //Show Soup Add Cart
  const showAddCartSoup = (r, id) => {
    if (JSON.stringify(r).includes(selectedRestaurant._id)) {
      return (
        <Link
          to={`/soupCart/${id}`}
          className="btn-first white-btn full-width text-light-green fw-600"
        >
          Add To Cart
        </Link>
      );
    } else {
      return (
        <button className="btn-first white-btn full-width text-light-red fw-600">
          Unavailable
        </button>
      );
    }
  };

  //Common functions
  const showRatingImage = (rat) => {
    const rating = parseInt(rat, 10);
    if (rating <= 2) {
      return <img data-tip="Good" src={straight} alt="tag" />;
    }
    if (rating <= 5 && rating > 2) {
      return <img data-tip="Very Good" src={smile} alt="tag" />;
    }
    if (rating > 5) {
      return <img data-tip="Amazing" src={smile1} alt="tag" />;
    }
  };

  const showRating = (rat) => {
    const rating = parseInt(rat, 10);
    if (rating <= 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-red">{rat}</span>
      );
    }
    if (rating <= 5 && rating > 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-yellow">{rat}</span>
      );
    }
    if (rating > 5) {
      return (
        <span className="text-custom-white rectangle-tag bg-green">{rat}</span>
      );
    }
  };

  const showAvailable = (r) => {
    if (JSON.stringify(r).includes(selectedRestaurant._id)) {
      return (
        <span className="type-tag bg-gradient-green text-custom-white">
          Available
        </span>
      );
    } else {
      return (
        <span className="type-tag bg-gradient-red text-custom-white">
          Unavailable
        </span>
      );
    }
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
    <section className="ex-collection section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header-left">
              <h3 className="text-light-black header-title title">
                Explore our collections
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {topcollection.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="ex-collection-box mb-xl-20">
                <img src={item.img} className="img-fluid full-width" alt="" />
                <div className="category-type overlay padding-15">
                  {" "}
                  <Link to="/" className="category-btn">
                    {item.cat}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="large-product-box mb-xl-20 p-relative">
              <img src={largeimg1} className="img-fluid full-width" alt="" />
              <div className="category-type overlay padding-15">
                <button className="category-btn">Most popular near you</button>{" "}
                <Link
                  to="/"
                  className="btn-first white-btn text-light-black fw-600 full-width"
                >
                  See all
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row">
              {showError()}
              {allSalads.map((c, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                  <ReactTooltip type="warning" />
                  <div className="product-box mb-xl-20">
                    <div className="product-img">
                      {getImage(c._id)}

                      <div className="overlay">
                        <div className="product-tags padding-10">
                          <span data-tip="hello world" className="circle-tag">
                            {showRatingImage(c.rating)}
                          </span>
                          {showAvailable(c.restaurants)}

                          {c.discount > 0 ? (
                            <div className="custom-tag">
                              {" "}
                              <span className="text-custom-white rectangle-tag bg-gradient-red">
                                {" "}
                                {c.discount}%{" "}
                              </span>{" "}
                            </div>
                          ) : (
                            ""
                          )}
                          {c.discount > 0 || c.discount !== "" ? (
                            <Fragment />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="product-caption">
                      <div className="title-box">
                        <h6 className="product-title">
                          <span className="text-light-black "> {c.title}</span>
                        </h6>

                        <div className="tags">{showRating(c.rating)}</div>
                      </div>

                      <p className="text-light-white">{c.subtitle}</p>
                      <div className="product-details">
                        <div className="price-time">
                          {" "}
                          <span className="text-light-black price fw-500">
                            Junior: {c.price_junior} LKR
                          </span>
                          <span className="text-light-black  fw-500 price">
                            Jumbo: {c.price_jumbo} LKR
                          </span>
                        </div>
                        <div className="rating">
                          <span className="text-light-white text-right">
                            {c.ratingNumber} ratings
                          </span>
                          <span className="text-light-white text-right">
                            {c.calorie} cal
                          </span>
                        </div>
                      </div>
                      <div className="product-footer">
                        {c.vegetable && (
                          <span data-tip="vegetable" className="text-custom-white square-tag">
                            <img src={vegetable} alt="tag" />
                          </span>
                        )}
                        {c.cheese && (
                          <span data-tip="cheese" className="text-custom-white square-tag">
                            <img src={cheese} alt="tag" />
                          </span>
                        )}
                        {c.nut && (
                          <span data-tip="nut" className="text-custom-white square-tag">
                            <img src={nut} alt="tag" />
                          </span>
                        )}
                        {c.egg && (
                          <span data-tip="egg" className="text-custom-white square-tag">
                            <img src={egg} alt="tag" />
                          </span>
                        )}
                        {c.spicy && (
                          <span data-tip="spicy" className="text-custom-white square-tag">
                            <img src={spicy} alt="tag" />
                          </span>
                        )}
                        {c.meat && (
                          <span data-tip="meat" className="text-custom-white square-tag">
                            <img src={meat} alt="tag" />
                          </span>
                        )}
                        {c.chef && (
                          <span data-tip="Chef Recommended" className="text-custom-white square-tag">
                            <img src={chef} alt="tag" />
                          </span>
                        )}
                      </div>
                    
                      <div className="product-btn">
                        {showAddCart(c.restaurants, c._id)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="banner-adv2 mb-xl-20">
              <img src={unlimited1} className="img-fluid full-width" alt="" />
              <span className="text">
                Unlimited Free Delivery with.
                <img src={logo} alt="" />
                <Link to="/" className="btn-second btn-submit">
                  Try 30 Days FREE
                </Link>
              </span>
              <span className="close-banner" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9 col-md-8">
            <div className="row">
              {showError()}
              {allSoups.map((c, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                  <ReactTooltip type="warning" />
                  <div className="product-box mb-xl-20">
                    <div className="product-img">
                      {getSoupImage(c._id)}

                      <div className="overlay">
                        <div className="product-tags padding-10">
                          <span className="circle-tag">
                            {showRatingImage(c.rating)}
                          </span>
                          {showAvailable(c.restaurants)}

                          {c.discount > 0 ? (
                            <div className="custom-tag">
                              {" "}
                              <span className="text-custom-white rectangle-tag bg-gradient-red">
                                {" "}
                                {c.discount}%{" "}
                              </span>{" "}
                            </div>
                          ) : (
                            ""
                          )}
                          {c.discount > 0 || c.discount !== "" ? (
                            <Fragment />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="product-caption">
                      <div className="title-box">
                        <h6 className="product-title">
                          <span className="text-light-black "> {c.title}</span>
                        </h6>

                        <div className="tags">{showRating(c.rating)}</div>
                      </div>

                      <p className="text-light-white">{c.subtitle}</p>
                      <div className="product-details">
                        <div className="price-time">
                          {" "}
                          <span className="text-light-black price fw-500">
                            Junior: {c.price_junior} LKR
                          </span>
                          <span className="text-light-black  fw-500 price">
                            Jumbo: {c.price_jumbo} LKR
                          </span>
                        </div>
                        <div className="rating">
                          <span className="text-light-white text-right">
                            {c.ratingNumber} ratings
                          </span>
                          <span className="text-light-white text-right">
                            {c.calorie} cal
                          </span>
                        </div>
                      </div>
                      <div className="product-footer">
                        {c.vegetable && (
                          <span data-tip="vegetable" className="text-custom-white square-tag">
                            <img src={vegetable} alt="tag" />
                          </span>
                        )}
                        {c.cheese && (
                          <span data-tip="cheese" className="text-custom-white square-tag">
                            <img src={cheese} alt="tag" />
                          </span>
                        )}
                        {c.nut && (
                          <span data-tip="nut" className="text-custom-white square-tag">
                            <img src={nut} alt="tag" />
                          </span>
                        )}
                        {c.egg && (
                          <span data-tip="egg" className="text-custom-white square-tag">
                            <img src={egg} alt="tag" />
                          </span>
                        )}
                        {c.spicy && (
                          <span data-tip="spicy" className="text-custom-white square-tag">
                            <img src={spicy} alt="tag" />
                          </span>
                        )}
                        {c.meat && (
                          <span data-tip="meat" className="text-custom-white square-tag">
                            <img src={meat} alt="tag" />
                          </span>
                        )}
                        {c.chef && (
                          <span data-tip="Chef Recommended" className="text-custom-white square-tag">
                            <img src={chef} alt="tag" />
                          </span>
                        )}
                      </div>
                      
                      <div className="product-btn">
                        {showAddCartSoup(c.restaurants, c._id)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="large-product-box mb-xl-20 p-relative">
              <img src={largeimg2} className="img-fluid full-width" alt="" />
              <div className="category-type overlay padding-15">
                <button className="category-btn">Most popular near you</button>{" "}
                <Link
                  to="/"
                  className="btn-first white-btn text-light-black fw-600 full-width"
                >
                  See all
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="large-product-box mb-xl-20 p-relative">
              <img src={largeimg1} className="img-fluid full-width" alt="" />
              <div className="category-type overlay padding-15">
                <button className="category-btn">Most popular near you</button>{" "}
                <Link
                  to="/"
                  className="btn-first white-btn text-light-black fw-600 full-width"
                >
                  See all
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row">
              {showError()}
              {allFoods && allFoods.map((c, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                  <ReactTooltip type="warning" />
                  <div className="product-box mb-xl-20">
                    <div className="product-img">
                      {getFoodImage(c._id)}

                      <div className="overlay">
                        <div className="product-tags padding-10">
                          <span data-tip="hello world" className="circle-tag">
                            {showRatingImage(c.rating)}
                          </span>
                          {showAvailable(c.restaurants)}

                          {c.discount > 0 ? (
                            <div className="custom-tag">
                              {" "}
                              <span className="text-custom-white rectangle-tag bg-gradient-red">
                                {" "}
                                {c.discount}%{" "}
                              </span>{" "}
                            </div>
                          ) : (
                            ""
                          )}
                          {c.discount > 0 || c.discount !== "" ? (
                            <Fragment />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="product-caption">
                      <div className="title-box">
                        <h6 className="product-title">
                          <span className="text-light-black "> {c.title}</span>
                        </h6>

                        <div className="tags">{showRating(c.rating)}</div>
                      </div>

                      <p className="text-light-white">{c.subtitle}</p>
                      <div className="product-details">
                        <div className="price-time">
                          {" "}
                          <span className="text-light-black price fw-500">
                            Junior: {c.price_junior} LKR
                          </span>
                          <span className="text-light-black  fw-500 price">
                            Jumbo: {c.price_jumbo} LKR
                          </span>
                        </div>
                        <div className="rating">
                          <span className="text-light-white text-right">
                            {c.ratingNumber} ratings
                          </span>
                          <span className="text-light-white text-right">
                            {c.calorie} cal
                          </span>
                        </div>
                      </div>
                      <div className="product-footer">
                        {c.vegetable && (
                          <span data-tip="vegetable" className="text-custom-white square-tag">
                            <img src={vegetable} alt="tag" />
                          </span>
                        )}
                        {c.cheese && (
                          <span data-tip="cheese" className="text-custom-white square-tag">
                            <img src={cheese} alt="tag" />
                          </span>
                        )}
                        {c.nut && (
                          <span data-tip="nut" className="text-custom-white square-tag">
                            <img src={nut} alt="tag" />
                          </span>
                        )}
                        {c.egg && (
                          <span data-tip="egg" className="text-custom-white square-tag">
                            <img src={egg} alt="tag" />
                          </span>
                        )}
                        {c.spicy && (
                          <span data-tip="spicy" className="text-custom-white square-tag">
                            <img src={spicy} alt="tag" />
                          </span>
                        )}
                        {c.meat && (
                          <span data-tip="meat" className="text-custom-white square-tag">
                            <img src={meat} alt="tag" />
                          </span>
                        )}
                        {c.chef && (
                          <span data-tip="Chef Recommended" className="text-custom-white square-tag">
                            <img src={chef} alt="tag" />
                          </span>
                        )}
                      </div>
                    
                      <div className="product-btn">
                        {showFoodAddCart(c.restaurants, c._id)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          {bottomcollection.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="ex-collection-box mb-sm-20">
                <img src={item.img} className="img-fluid full-width" alt="" />
                <div className="category-type overlay padding-15">
                  {" "}
                  <Link to="/" className="category-btn">
                    {item.cat}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionBox;
