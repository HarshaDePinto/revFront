import React, { Fragment, useState, useEffect } from "react";
import { getFoodCategory } from "./apiFoodCategory";
import { API } from "../../../config";
import { Roller } from "react-awesome-spinners";
function AllFoodCategory({
  showUpdateFoodCategory,
  showAllFoodCategory,
  setShowAllFoodCategory,
  setShowCreateFoodCategory,
  setShowSingleFoodCategory,
  setSingleId,
}) {

  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [error, setError] = useState(false);
  const [imageHash] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const abortCont = new AbortController();
    getFoodCategory(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllFoodCategory(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showUpdateFoodCategory, showAllFoodCategory]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const editFoodCategory = (id) => {
    setSingleId(id);
    setShowSingleFoodCategory(true);
    setShowCreateFoodCategory(false);
    setShowAllFoodCategory(false);
  };
  return (
    <Fragment>
      <h5 className="text-light-black fw-700">All Food Categories</h5>
      {showError()}
      {showLoading()}
      {!loading && allFoodCategory.map((c, i) => (
        <Fragment key={i}>
          <div className="testimonial-wrapper my-2">
            <div className="testimonial-box">
              <div className="testimonial-img p-relative">
                <img
                  src={`${API}/foodCategory/photo2/${c._id}?${imageHash}`}
                  className="img-fluid full-width"
                  alt="testimonial-img"
                />

                <div className="overlay">
                  <div className="brand-logo">
                    <img
                      src={`${API}/foodCategory/photo1/${c._id}?${imageHash}`}
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

                <button onClick={()=>(editFoodCategory(c._id))} className="btn-first green-btn text-custom-white fw-600 mx-2">
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

export default AllFoodCategory;
