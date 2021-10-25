import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import {
  readSaladCategory,
  updateSaladCategory,
  deleteSaladCategory,
} from "./apiSaladCategory";

import { Roller } from "react-awesome-spinners";

function Single({
  singleId,
  setShowSingleSaladCategory,
  setShowUpdateSaladCategory,
  showUpdateSaladCategory,
  setShowAllSaladCategory,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    description: "",
    photo1: "",
    photo2: "",
    createdBy: "",
    updatedBy: "",
    loading: true,
    error: "",
    formData: "",
    redirectToReferrer: false,
    showDelete: false,
  });

  const {
    title,
    description,
    createdBy,
    updatedBy,
    loading,
    error,
    formData,
    redirectToReferrer,
    showDelete,
  } = values;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showDelete]);

  useEffect(() => {
    const abortCont = new AbortController();
    readSaladCategory(singleId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setValues((v) => ({ ...v, error: true }));
        } else {
          setValues((v) => ({
            ...v,
            title: data.title,
            description: data.description,
            updatedBy: user.name,
            createdBy: data.createdBy,
            loading: false,
            formData: new FormData(),
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [singleId, user.name]);

  const handleChange = (name) => (event) => {
    const value =
      name === "photo1"
        ? event.target.files[0]
        : event.target.value && name === "photo2"
        ? event.target.files[0]
        : event.target.value;
    formData.set(name, value);
    formData.set("updatedBy", updatedBy);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateSaladCategory(token, singleId, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (showUpdateSaladCategory) {
          setShowUpdateSaladCategory(false);
        } else {
          setShowUpdateSaladCategory(true);
        }
        setShowSingleSaladCategory(false);
        setShowAllSaladCategory(true);
      }
    });
  };

  const showLoading = () => loading && <Roller color="#F79550" />;
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () =>
    redirectToReferrer && (
      <div className="alert alert-success">
        <p>Updated Successfully!</p>
      </div>
    );
  const editAddOnForm = () => {
    return (
      <form>
        <h5 className="text-light-black fw-700">Update Salad Category </h5>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {!loading && (
          <Fragment>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Title <sup className="fs-16">*max 40</sup>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleChange("title")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Description <sup className="fs-16">*max 60</sup>
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={handleChange("description")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Category Thumbnail{" "}
                    <sup className="fs-16">*max 1mb 125x125</sup>
                  </label>
                  <input
                    type="file"
                    name="photo1"
                    accept="image/*"
                    onChange={handleChange("photo1")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Category Detail Image{" "}
                    <sup className="fs-16">*max 1mb 1920x270</sup>
                  </label>
                  <input
                    type="file"
                    name="photo2"
                    accept="image/*"
                    onChange={handleChange("photo2")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">Created By</label>

                  <input
                    type="text"
                    name="createdBy"
                    value={createdBy}
                    readOnly
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
    setShowSingleSaladCategory(false);
    setShowAllSaladCategory(true);
  };

  const cancelDelete = () => {
    setValues({ ...values, showDelete: false });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteSaladCategory(token, singleId, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (showUpdateSaladCategory) {
          setShowUpdateSaladCategory(false);
        } else {
          setShowUpdateSaladCategory(true);
        }
        setShowSingleSaladCategory(false);
        setShowAllSaladCategory(true);
      }
    });
  };

  const deleteConfirm = () => {
    return (
      <Fragment>
        {showLoading()}
        {showSuccess()}
        {showError()}
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
                  <button
                    type="button"
                    onClick={deleteAddOnClick}
                    className="btn btn-danger"
                  >
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
