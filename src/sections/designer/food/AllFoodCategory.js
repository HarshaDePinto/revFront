import React, { Fragment, useState, useEffect } from "react";
import { getFoodCategory } from "./apiFood";
import { Roller } from "react-awesome-spinners";

function AllFoodCategory({ setMainValues, values }) {
  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getFoodCategory(abortCont).then((data) => {
      if (data){
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setAllFoodCategory(data);
          setLoading(false);
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

  const viewSingleCategory = (id, title) => {
    setMainValues({
      ...values,
      showCreateFood: false,
      showAllCategory: false,
      showSingleFood: false,
      showSingleCategory: true,
      foodCategoryId: id,
      foodCategoryName: title,
    });
  };
  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {allFoodCategory.map((c, i) => (
        <div key={i} className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{c.title}</h5>
              <p className="card-text">{c.description}</p>
              <button
                onClick={() => viewSingleCategory(c._id, c.title)}
                className="btn-first green-btn text-custom-white full-width fw-500"
              >
                Check Foods
              </button>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default AllFoodCategory;
