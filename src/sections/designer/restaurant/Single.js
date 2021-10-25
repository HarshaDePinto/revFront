import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import {
  readRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "./apiRestaurant";
import { Roller } from "react-awesome-spinners";

function Single({
  singleId,
  setShowSingleRestaurant,
  setShowUpdateRestaurant,
  showUpdateRestaurant,
  setShowAllRestaurant,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    location: "",
    updatedBy: user.name,
    loading: true,
    error: "",
    redirectToReferrer: false,
    showDelete: false,
  });

  const {
    title,
    location,
    updatedBy,
    loading,
    error,
    redirectToReferrer,
    showDelete,
  } = values;

  useEffect(() => {
    const abortCont = new AbortController();
    readRestaurant(singleId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setValues((v) => ({ ...v, error: true }));
        } else {
          setValues((v) => ({
            ...v,
            title: data.title,
            location: data.location,
            createdBy: data.createdBy,
            loading: false,
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [singleId]);
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateRestaurant(token, singleId, user._id, {
      title,
      location,
      updatedBy,
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (showUpdateRestaurant) {
          setShowUpdateRestaurant(false);
        } else {
          setShowUpdateRestaurant(true);
        }
        setShowSingleRestaurant(false);
        setShowAllRestaurant(true);
      }
    });
  };
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  const showSuccess = () =>
    redirectToReferrer && (
      <div className="alert alert-success">
        <p>Updated Successfully!</p>
      </div>
    );
  const editAddOnForm = () => {
    return (
      <form>
        <h5 className="text-light-black fw-700">Update</h5>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {!loading && (
          <Fragment>
            <div className="tracking-map">
              <iframe id="pickupmap" title="map" src={location} />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Title<sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleChange("title")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Location <sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={handleChange("location")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={clickDelete}
              className="btn btn-danger m-2"
            >
              Delete
            </button>
            <button onClick={clickSubmit} className="btn-second btn-submit m-2">
              Update
            </button>
            <button
              type="button"
              onClick={clickCancel}
              className="btn-first green-btn text-custom-white m-2"
            >
              Cancel
            </button>
          </Fragment>
        )}
      </form>
    );
  };

  const clickDelete = () => {
    setValues({ ...values, showDelete: true });
  };

  const clickCancel = () => {
    setShowSingleRestaurant(false);
    setShowAllRestaurant(true);
  };

  const cancelDelete = () => {
    setValues({ ...values, showDelete: false });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteRestaurant(token, singleId, user._id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (showUpdateRestaurant) {
          setShowUpdateRestaurant(false);
        } else {
          setShowUpdateRestaurant(true);
        }
        setShowSingleRestaurant(false);
        setShowAllRestaurant(true);
      }
    });
  };

  const deleteConfirm = () => {
    return (
      <Fragment>
        {!loading && (
          <div className="product-box mb-xl-20">
            <div className="product-box-2">
              <div className="product-caption">
                <div className="title-box">
                  <h6 className="product-title text-danger">
                    Are You Sure? All the data will be delete permanently <br />
                    and will not be able to recover again!
                  </h6>
                </div>
              </div>
            </div>
            <div className="product-footer-2">
              <div className="discount">
                <span className="text-success fs-12">
                  <button onClick={deleteAddOnClick} className="btn btn-danger">
                    Yes, Delete
                  </button>
                </span>
              </div>
              <div className="discount-coupon">
                <span className="text-light-white fs-12">
                  <button
                    type="button"
                    onClick={cancelDelete}
                    className="btn-second btn-submit"
                  >
                    No, Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {!showDelete && editAddOnForm()}
      {showDelete && deleteConfirm()}
    </Fragment>
  );
}

export default Single;
