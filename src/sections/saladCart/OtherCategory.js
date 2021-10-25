import React, { Fragment, useState, useEffect } from "react";
import { getSaladCategory,getFoodCategory } from "./apiSaladCart";
import { Link } from "react-router-dom";
import { API } from "../../config";
import { Roller } from "react-awesome-spinners";
import banner from "../../assets/images/soup/banner.jpg";
import thumb from "../../assets/images/soup/thumb.jpg";

function OtherCategory() {
  const [allCategory, setAllCategory] = useState([]);
  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getSaladCategory(abortCont).then((data) => {
      if (data){
        if (data.error) {
          setError(data.error);
          setLading(false);
        } else {
          setAllCategory(data);
          setLading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const abortCont = new AbortController();
    getFoodCategory(abortCont).then((data) => {
      if (data){
        if (data.error) {
          setError(data.error);
          setLading(false);
        } else {
          setAllFoodCategory(data);
          setLading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, []);


  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  return (
    <Fragment>
      <h5 className="text-light-black fw-700">Check A Soup!</h5>
      <div className="testimonial-wrapper my-2">
        <div className="testimonial-box">
          <div className="testimonial-img p-relative">
            <img
              src={banner}
              className="img-fluid full-width"
              alt="testimonial-img"
            />

            <div className="overlay">
              <div className="brand-logo">
                <img src={thumb} className="img-fluid" alt="logo" />
              </div>
            </div>
          </div>
          <div className="testimonial-caption padding-15">
            <h5 className="fw-600">
              <span className="text-light-black">Soups</span>
            </h5>

            <p className="text-light-black">Soups that goes with your salads</p>

            <Link to={`/soupCategory`} className="btn-second btn-submit">
              Check More
            </Link>
          </div>
        </div>
      </div>
      <h5 className="text-light-black fw-700">
        Other Salad Categories ({allCategory.length}){" "}
      </h5>
      {showError()}
      {showLoading()}
      {allCategory.map((c, i) => (
        <Fragment key={i}>
          {!loading  && (
            <div className="testimonial-wrapper my-2">
              <div className="testimonial-box">
                <div className="testimonial-img p-relative">
                  <img
                    src={`${API}/saladCategory/photo2/${c._id}`}
                    className="img-fluid full-width"
                    alt="testimonial-img"
                  />

                  <div className="overlay">
                    <div className="brand-logo">
                      <img
                        src={`${API}/saladCategory/photo1/${c._id}`}
                        className="img-fluid"
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
                <div className="testimonial-caption padding-15">
                  <h5 className="fw-600">
                    <span className="text-light-black">{c.title}</span>
                  </h5>

                  <p className="text-light-black">{c.description}</p>

                  <Link
                    to={`/saladCategory/${c._id}`}
                    className="btn-second btn-submit"
                  >
                    Check More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      ))}

<h5 className="text-light-black fw-700">
        Other Food Categories ({allFoodCategory.length}){" "}
      </h5>
      {showError()}
      {showLoading()}
      {allFoodCategory.map((c, i) => (
        <Fragment key={i}>
          {!loading && (
            <div className="testimonial-wrapper my-2">
              <div className="testimonial-box">
                <div className="testimonial-img p-relative">
                  <img
                    src={`${API}/foodCategory/photo2/${c._id}`}
                    className="img-fluid full-width"
                    alt="testimonial-img"
                  />

                  <div className="overlay">
                    <div className="brand-logo">
                      <img
                        src={`${API}/foodCategory/photo1/${c._id}`}
                        className="img-fluid"
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
                <div className="testimonial-caption padding-15">
                  <h5 className="fw-600">
                    <span className="text-light-black">{c.title}</span>
                  </h5>

                  <p className="text-light-black">{c.description}</p>

                  <Link
                    to={`/foodCategory/${c._id}`}
                    className="btn-second btn-submit"
                  >
                    Check More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
}

export default OtherCategory;