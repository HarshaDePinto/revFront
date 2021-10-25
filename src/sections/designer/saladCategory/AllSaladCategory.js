import React, { Fragment, useState, useEffect } from "react";
import { getSaladCategory } from "./apiSaladCategory";
import { API } from "../../../config";
import { Roller } from "react-awesome-spinners";
function AllSaladCategory({
  showUpdateSaladCategory,
  showAllSaladCategory,
  setShowAllSaladCategory,
  setShowCreateSaladCategory,
  setShowSingleSaladCategory,
  setSingleId,
}) {

  const [allSaladCategory, setAllSaladCategory] = useState([]);
  const [error, setError] = useState(false);
  const [imageHash] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const abortCont = new AbortController();
    getSaladCategory(abortCont).then((data) => {
      if (data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllSaladCategory(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showUpdateSaladCategory, showAllSaladCategory]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const editSaladCategory = (id) => {
    setSingleId(id);
    setShowSingleSaladCategory(true);
    setShowCreateSaladCategory(false);
    setShowAllSaladCategory(false);
  };
  return (
    <Fragment>
      <h5 className="text-light-black fw-700">All Salad Categories</h5>
      {showError()}
      {showLoading()}
      {!loading && allSaladCategory.map((c, i) => (
        <Fragment key={i}>
          <div className="testimonial-wrapper my-2">
            <div className="testimonial-box">
              <div className="testimonial-img p-relative">
                <img
                  src={`${API}/saladCategory/photo2/${c._id}?${imageHash}`}
                  className="img-fluid full-width"
                  alt="testimonial-img"
                />

                <div className="overlay">
                  <div className="brand-logo">
                    <img
                      src={`${API}/saladCategory/photo1/${c._id}?${imageHash}`}
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
                <p className="text-info fw-500">
                Created By: {c.createdBy} on{" "}
                {new Date(c.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-light-black fw-500">
                Updated By: {c.updatedBy} on{" "}
                {new Date(c.updatedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

                <button onClick={()=>(editSaladCategory(c._id))} className="btn-first green-btn text-custom-white fw-600 mx-2">
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

export default AllSaladCategory;
