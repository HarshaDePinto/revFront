import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { createSaladCategory } from "./apiSaladCategory";
import { Roller } from 'react-awesome-spinners';

function CreateNew({
  setShowAllSaladCategory,
  setShowCreateSaladCategory,
  setShowSingleSaladCategory,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    description: "",
    photo1: "",
    photo2: "",
    createdBy: "",
    updatedBy: "",
    active: false,
    loading: false,
    error: "",
    formData: "",
  });
  const { title, description, loading, error, formData } = values;

  useEffect(() => {
    setValues((v) => ({ ...v, formData: new FormData() }));
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "photo1"
        ? event.target.files[0]
        : event.target.value && name === "photo2"
        ? event.target.files[0]
        : event.target.value;
    formData.set(name, value);
    formData.set("createdBy", user.name);
    formData.set("updatedBy", user.name);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createSaladCategory(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error,loading: false });
      } else {
        setShowAllSaladCategory(true);
        setShowCreateSaladCategory(false);
        setShowSingleSaladCategory(false);
      }
    });
  };

  const newSaladCategoryForm = () => {
    return (
      <form>
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
                Category Thumbnail <sup className="fs-16">*max 1mb 125x125</sup>
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
        </div>
        <button onClick={clickSubmit} className="btn-second btn-submit">
          Add The Category
        </button>
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

  const showLoading = () => (
    loading && <Roller color="#F79550" />
  );

  return (
    <Fragment>
      <h5 className="text-light-black fw-700">Create New Salad Category</h5>
      {showLoading()}
      {showError()}
      {!loading && newSaladCategoryForm()}
    </Fragment>
  );
}

export default CreateNew;
