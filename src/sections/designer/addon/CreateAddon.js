import React, { Fragment, useState } from "react";
import { createAddon } from "./apiAddon";
import { isAuthenticated } from "../../../auth";

function CreateAddon({ setMainValues, values }) {
  const { user, token } = isAuthenticated();
  const [addonValues, setAddonValues] = useState({
    title: "",
    price: "",
    cal: "",
    createdBy: user.name,
    updatedBy: user.name,
    available: true,
    role: 0,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setAddonValues({
      ...addonValues,
      error: false,
      roleN: true,
      [name]: event.target.value,
    });
  };
  const { title, price, cal, available, createdBy, updatedBy, role, error } =
    addonValues;

  const clickSubmit = (event) => {
    event.preventDefault();
    setAddonValues({ ...addonValues, error: false });
    createAddon(user._id, token, {
      title,
      price,
      cal,
      available,
      role,
      createdBy,
      updatedBy,
    }).then((data) => {
      if (data.error) {
        setAddonValues({ ...addonValues, error: data.error });
      } else {
        setMainValues({
          ...values,
          showAllRole: true,
          showSingleRole: false,
          showCreateAddon: false,
          showSingleAddon: false,
          addonRole: "",
          addonRoleName: "",
          addonId: "",
        });
      }
    });
  };

  const priceChecker = () => {
    if (parseInt(price, 10) < 0) {
      return <sup className="fs-16">*Price Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const calorieChecker = () => {
    if (parseInt(cal, 10) < 0) {
      return <sup className="fs-16">*Calorie Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const newAddonForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600">Create New Addon</h4>
        {showError()}
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-group">
              <label className="text-light-black fw-700">Title</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="title"
                value={title}
                onChange={handleChange("title")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Addon Type <sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
                onChange={handleChange("role")}
                value={role}
              >
                <option value="0">Salad Premium Addons</option>
                <option value="1">Salad General Addon</option>
                <option value="2">Soup Addon</option>
                <option value="3">Other Addon</option>
                <option value="4">Custom Lettuce</option>
                <option value="5">Custom Throw</option>
                <option value="6">Custom Protein</option>
                <option value="7">Custom Dressing</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Price
                {priceChecker()}
              </label>
              <input
                type="number"
                value={price}
                onChange={handleChange("price")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Calorie Count
                {calorieChecker()}
              </label>
              <input
                type="number"
                value={cal}
                onChange={handleChange("cal")}
                className="form-control form-control-submit"
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Create Addon
              </button>
            </div>
          </div>
        </div>
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

  return <Fragment>{newAddonForm()}</Fragment>;
}

export default CreateAddon;
