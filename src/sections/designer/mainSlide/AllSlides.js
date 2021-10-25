import React, { Fragment, useState, useEffect } from "react";
import { getMainSlides } from "./apiMainSlide";
import { API } from "../../../config";
import { Roller } from "react-awesome-spinners";

function AllSlides({
  showUpdateSlides,
  showAllSlides,
  setShowAllSlides,
  setShowCreateSlides,
  setShowSingleSlides,
  setSingleId,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAllSlides]);
  const [allSlides, setAllSlides] = useState([]);
  const [error, setError] = useState(false);
  const [imageHash] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  //Loading Main Slides
  useEffect(() => {
    const abortCont = new AbortController();
    getMainSlides("createdAt",abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllSlides(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showUpdateSlides, showAllSlides]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const editSlide = (id) => {
    setSingleId(id);
    setShowSingleSlides(true);
    setShowCreateSlides(false);
    setShowAllSlides(false);
  };
  return (
    <Fragment>
      <h5 className="text-light-black fw-700">All Slides</h5>
      {showError()}
      {showLoading()}
      {allSlides.map((s, i) => (
        <Fragment key={i}>
          <div className="product-box mb-md-20">
            <div className="product-img">
              {!s.active && (
                <span className="text-custom-white type-tag bg-gradient-orange">
                  Deactivated
                </span>
              )}
              {s.active && (
                <span className="type-tag bg-gradient-green text-custom-white">
                  Active
                </span>
              )}
              <img
                src={`${API}/mainSlide/photo/${s._id}?${imageHash}`}
                className="img-fluid full-width"
                alt="product-img"
              />
            </div>

            <div className="product-caption">
              <h6 className="product-title">
                <span className="text-light-black ">{s.title}</span>
              </h6>
              <p className="text-light-white">{s.subtitle}</p>
              <p className="text-info fw-500">
                Created By: {s.createdBy} on{" "}
                {new Date(s.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-light-black fw-500">
                Updated By: {s.updatedBy} on{" "}
                {new Date(s.updatedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="product-btn">
                <button
                  onClick={() => editSlide(s._id)}
                  className="btn-first green-btn text-custom-white fw-600 mx-2"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default AllSlides;
