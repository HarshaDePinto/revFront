import React, { Fragment, useState, useEffect } from "react";
import { getSaladByCategory } from "./apiSalad";
import { API } from "../../../config";
import smile from "../../../assets/images/icon/smile.svg";
import smile1 from "../../../assets/images/icon/smile1.svg";
import cheese from "../../../assets/images/icon/cheese.svg";
import chef from "../../../assets/images/icon/chef.svg";
import egg from "../../../assets/images/icon/egg.svg";
import meat from "../../../assets/images/icon/meat.svg";
import nut from "../../../assets/images/icon/nut.svg";
import spicy from "../../../assets/images/icon/spicy.svg";
import vegetable from "../../../assets/images/icon/vegetable.svg";
import straight from "../../../assets/images/icon/straight.svg";
import { Roller } from "react-awesome-spinners";

function SingleCategory({
  setMainValues,
  values,
  saladCategoryId,
  saladCategoryName,
}) {
  const [allSalads, setAllSalads] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saladCount, setSaladCount] = useState(false);
  const [imageHash] = useState(Date.now());

  useEffect(() => {
    const abortCont = new AbortController();
    getSaladByCategory(saladCategoryId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllSalads(data);
          if (data.length === 0) {
            setSaladCount(true);
          }
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [saladCategoryId]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;
  const showCount = () => (
    <div
      className="alert alert-warning"
      style={{ display: saladCount ? "" : "none" }}
    >
      <h2>No Salads Under This Category!</h2>
    </div>
  );

  const viewSingleSalad = (id) => {
    setMainValues({
      ...values,
      showCreateSalad: false,
      showAllCategory: false,
      showSingleSalad: true,
      showSingleCategory: false,
      saladId: id,
    });
  };

  const showRatingImage = (rat) => {
    const rating = parseInt(rat, 10);
    if (rating <= 2) {
      return <img src={straight} alt="tag" />;
    }
    if (rating <= 5 && rating > 2) {
      return <img src={smile} alt="tag" />;
    }
    if (rating > 5) {
      return <img src={smile1} alt="tag" />;
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

  const getImage = (s) => {
    return (
      <img
        src={`${API}/salad/photo/${s}?${imageHash}`}
        className="img-fluid full-width"
        alt="product-img"
      />
    );
  };
  return (
    <Fragment>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <h5 className="text-light-black fw-700">{saladCategoryName}</h5>
      </div>
      {showLoading()}
      {showCount()}
      {showError()}

      {allSalads.map((c, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
          <div className="product-box mb-xl-20">
            <div className="product-img">
              {getImage(c._id)}

              <div className="overlay">
                <div className="product-tags padding-10">
                  <span className="circle-tag">
                    {showRatingImage(c.rating)}
                  </span>

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
                  {c.discount > 0 || c.discount !== "" ? <Fragment /> : ""}
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
                  <span className="text-custom-white square-tag">
                    <img src={vegetable} alt="tag" />
                  </span>
                )}
                {c.cheese && (
                  <span className="text-custom-white square-tag">
                    <img src={cheese} alt="tag" />
                  </span>
                )}
                {c.nut && (
                  <span className="text-custom-white square-tag">
                    <img src={nut} alt="tag" />
                  </span>
                )}
                {c.egg && (
                  <span className="text-custom-white square-tag">
                    <img src={egg} alt="tag" />
                  </span>
                )}
                {c.spicy && (
                  <span className="text-custom-white square-tag">
                    <img src={spicy} alt="tag" />
                  </span>
                )}
                {c.meat && (
                  <span className="text-custom-white square-tag">
                    <img src={meat} alt="tag" />
                  </span>
                )}
                {c.chef && (
                  <span className="text-custom-white square-tag">
                    <img src={chef} alt="tag" />
                  </span>
                )}
              </div>
              <div className="product-footer">
                <p className="text-info fw-500">
                  Created By: {c.createdBy} <br /> on{" "}
                  {new Date(c.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="product-footer">
                <p className="text-light-black fw-500">
                  Updated By: {c.updatedBy} <br /> on{" "}
                  {new Date(c.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="product-btn">
                <button
                  onClick={() => viewSingleSalad(c._id)}
                  className="btn-first white-btn full-width text-light-green fw-600"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default SingleCategory;
