import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
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
import ReactTooltip from "react-tooltip";

function SingleSalad({ salad, selectedRestaurantId }) {
  const rating = parseInt(salad.rating, 10);
  const showRatingImage = (rating) => {
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
  const showAvailable = (r) => {
    if (JSON.stringify(r).includes(selectedRestaurantId)) {
      return (
        <Fragment></Fragment>
      );
    } else {
      return (
        <span className="rectangle-tag bg-gradient-red text-custom-white">
          Unavailable
        </span>
      );
    }
  };
  const showRating = (rating) => {
    if (rating <= 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-red">
          {salad.rating}
        </span>
      );
    }
    if (rating <= 5 && rating > 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-yellow">
          {salad.rating}
        </span>
      );
    }
    if (rating > 5) {
      return (
        <span className="text-custom-white rectangle-tag bg-green">
          {salad.rating}
        </span>
      );
    }
  };
  return (
    <Fragment>
       <ReactTooltip type="warning" />
      <div className="restaurent-product-list">
        <div className="restaurent-product-detail">
          <div className="restaurent-product-left">
            <div className="restaurent-product-title-box">
              <div className="restaurent-product-box">
                <div className="restaurent-product-title">
                  <h6 className="mb-2">
                    <Link to="#" className="text-light-black fw-600">
                      {salad.title}
                    </Link>
                  </h6>
                  <p className="text-light-white">{salad.calorie} Cal</p>
                </div>
                <div className="restaurent-product-label">
                  {showAvailable(salad.restaurants)}
                  {salad.discount > 0 ? (
                    <div className="custom-tag mx-2">
                      {" "}
                      <span className="text-custom-white rectangle-tag bg-gradient-red">
                        {" "}
                        {salad.discount}% off
                      </span>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {salad.discount > 0 || salad.discount !== "" ? <Fragment /> : ""}
                </div>
              </div>
              <div className="restaurent-product-rating">
                <div className="ratings">{showRating(rating)}</div>
                <div className="rating-text"></div>
              </div>
            </div>
            <div className="restaurent-product-caption-box">
              <span className="text-light-white">{salad.description}</span>
            </div>

            <div className="restaurent-tags-price">
              <div className="restaurent-tags">
              {salad.vegetable && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="vegetable" src={vegetable} alt="tag" />
                  </span>
                )}
                {salad.cheese && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="cheese" src={cheese} alt="tag" />
                  </span>
                )}
                {salad.nut && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="nut" src={nut} alt="tag" />
                  </span>
                )}
                {salad.egg && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="egg" src={egg} alt="tag" />
                  </span>
                )}
                {salad.spicy && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="spicy" src={spicy} alt="tag" />
                  </span>
                )}
                {salad.meat && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="meat" src={meat} alt="tag" />
                  </span>
                )}
                {salad.chef && (
                  <span className="text-custom-white square-tag">
                    <img data-tip="Chef Recommended" src={chef} alt="tag" />
                  </span>
                )}
              </div>{" "}
              <span className="circle-tag">{showRatingImage(rating)}</span>
              <div className="restaurent-product-price">
                <h6 className="text-success fw-600 no-margin">
                  {salad.price_junior} LKR / {salad.price_jumbo} LKR
                </h6>
              </div>
            </div>
          </div>

          <div className="restaurent-product-img">
            <img
              src={`${API}/salad/photo/${salad._id}`}
              className="img-fluid"
              alt="#"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default SingleSalad;
