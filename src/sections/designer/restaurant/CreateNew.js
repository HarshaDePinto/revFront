import React, { Fragment, useState } from "react";
import { createRestaurant } from "./apiRestaurant";
import { isAuthenticated } from "../../../auth";
import { Roller } from "react-awesome-spinners";

function CreateNew({
  setShowAllRestaurant,
  setShowCreateRestaurant,
  setShowSingleRestaurant,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    location: "",
    createdBy: user.name,
    updatedBy: user.name,
    error: "",
    loading: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { title, location, createdBy, updatedBy, error, loading } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createRestaurant(user._id, token, {
      title,
      location,
      createdBy,
      updatedBy,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setShowAllRestaurant(true);
        setShowCreateRestaurant(false);
        setShowSingleRestaurant(false);
      }
    });
  };

  const showLoading = () => loading && <Roller color="#F79550" />;

  const newRestaurantForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600">Create New Restaurant</h4>
        {showError()}
        {showLoading()}

        {!loading && (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-black fw-700">Name</label>
                <input
                  type="text"
                  className="form-control form-control-submit"
                  id="title"
                  value={title}
                  required
                  onChange={handleChange("title")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-black fw-700">Location</label>
                <input
                  type="text"
                  className="form-control form-control-submit"
                  id="location"
                  value={location}
                  required
                  onChange={handleChange("location")}
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                {title && location && (
                  <button
                  type="button"
                    onClick={clickSubmit}
                    className="btn-second btn-submit full-width"
                  >
                    Create Restaurant
                  </button>
                )}

                {(!title || !location) && (
                  <button
                    
                    className="btn-second btn-submit full-width"
                  >
                    Both Title and Location should fill!
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return <Fragment>{newRestaurantForm()}</Fragment>;
}

export default CreateNew;
