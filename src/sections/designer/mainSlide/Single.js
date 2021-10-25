import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import {
  readMainSlide,
  updateMainSlide,
  deleteMainSlide,
} from "./apiMainSlide";
import { Roller } from "react-awesome-spinners";

function Single({
  singleId,
  setShowSingleSlides,
  setShowUpdateSlides,
  showUpdateSlides,
  setShowAllSlides,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    position: "",
    colPosition: "",
    photo: "",
    active: "",
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
    subtitle,
    position,
    colPosition,
    active,
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
    readMainSlide(singleId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setValues((v) => ({ ...v, error: true }));
        } else {
          setValues((v) => ({
            ...v,
            title: data.title,
            subtitle: data.subtitle,
            position: data.position,
            colPosition: data.colPosition,
            active: data.active,
            createdBy: data.createdBy,
            updatedBy: user.name,
            loading: false,
            formData: new FormData(),
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [singleId, user.name]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    formData.set("updatedBy", updatedBy);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateMainSlide(token, singleId, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (showUpdateSlides) {
          setShowUpdateSlides(false);
        } else {
          setShowUpdateSlides(true);
        }
        setShowSingleSlides(false);
        setShowAllSlides(true);
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
      <Fragment>
        <h5 className="text-light-black fw-700">Update Slide </h5>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {!loading && (
          <Fragment>
            <form>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="text-light-black fw-700">
                      Title <sup className="fs-16">*max 32</sup>
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
                      Subtitle <sup className="fs-16">*max 60</sup>
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={handleChange("subtitle")}
                      className="form-control form-control-submit"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-light-black fw-700">
                      Slider Image <sup className="fs-16">*max 1mb</sup>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleChange("photo")}
                      className="form-control form-control-submit"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-light-black fw-700">
                      Make Active<sup className="fs-16">*</sup>
                    </label>

                    <select
                      className="form-control form-control-submit"
                      onChange={handleChange("active")}
                      value={active}
                    >
                      <option value="true">Active</option>
                      <option value="false">Deactivated</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-light-black fw-700">
                      Title Position<sup className="fs-16">*</sup>
                    </label>

                    <select
                      className="form-control form-control-submit"
                      onChange={handleChange("position")}
                      value={position}
                    >
                      <option value="justify-content-start">Start</option>
                      <option value="justify-content-center">Center</option>
                      <option value="justify-content-end">End</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-light-black fw-700">
                      Subtitle Position<sup className="fs-16">*</sup>
                    </label>

                    <select
                      className="form-control form-control-submit"
                      onChange={handleChange("colPosition")}
                      value={colPosition}
                    >
                      <option value="">Start</option>
                      <option value="text-center">Center</option>
                      <option value="text-right">End</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-light-black fw-700">
                      Created By
                    </label>

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
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit m-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={clickCancel}
                className="btn-first green-btn text-custom-white m-2"
              >
                Cancel
              </button>
            </form>
          </Fragment>
        )}
      </Fragment>
    );
  };

  const clickDelete = () => {
    setValues({ ...values, showDelete: true });
  };

  const clickCancel = () => {
    setShowSingleSlides(false);
    setShowAllSlides(true);
  };

  const cancelDelete = () => {
    setValues({ ...values, showDelete: false });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteMainSlide(token, singleId, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (showUpdateSlides) {
          setShowUpdateSlides(false);
        } else {
          setShowUpdateSlides(true);
        }
        setShowSingleSlides(false);
        setShowAllSlides(true);
      }
    });
  };

  const deleteConfirm = () => {
    return (
      <Fragment>
        {showLoading()}
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
