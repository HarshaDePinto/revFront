import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { readAddon, updateAddon, deleteAddon } from "./apiAddon";
import { Roller } from "react-awesome-spinners";

function Single({ setMainValues, values, addonRole, addonRoleName, addonId }) {
  const { user, token } = isAuthenticated();
  const [addonValues, setAddonValues] = useState({
    title: "",
    price: "",
    cal: "",
    available: true,
    role: 0,
    updatedBy: user.name,
    loading: true,
    error: "",
    redirectToReferrer: false,
    showDelete: false,
  });

  const {
    title,
    price,
    cal,
    available,
    updatedBy,
    role,
    loading,
    error,
    redirectToReferrer,
    showDelete,
  } = addonValues;

  useEffect(() => {
    const abortCont = new AbortController();
    readAddon(addonId,abortCont).then((data) => {
      if(data){
        if (data.error) {
          setAddonValues(v=>({ ...v, error: true }));
        } else {
          setAddonValues(v=>({
            ...v,
            title: data.title,
            price: data.price,
            cal: data.cal,
            available: data.available,
            role: data.role,
            loading: false,
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [addonId]);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setAddonValues({ ...addonValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setAddonValues({ ...addonValues, error: "", loading: true });
    updateAddon(token, addonId, user._id, {
      title,
      price,
      cal,
      available,
      updatedBy,
      role,
    }).then((data) => {
      if (data.error) {
        setAddonValues({ ...addonValues, error: data.error });
      } else {
        setMainValues({
          ...values,
          showAllRole: false,
          showSingleRole: true,
          showCreateAddon: false,
          showSingleAddon: false,
          addonRole: addonRole,
          addonRoleName: addonRoleName,
          addonId: "",
        });
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
  const editAddOnForm = () => {
    return (
      <form>
        <h5 className="text-light-black fw-700">Update</h5>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {!loading && (
          <Fragment>
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
            </div>
            <button
              type="button"
              onClick={clickDelete}
              className="btn btn-danger m-2"
            >
              Delete
            </button>
            <button
              type="button"
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
          </Fragment>
        )}
      </form>
    );
  };

  const clickDelete = () => {
    setAddonValues({ ...addonValues, showDelete: true });
  };

  const clickCancel = () => {
    setMainValues({
      ...values,
      showAllRole: false,
      showSingleRole: true,
      showCreateAddon: false,
      showSingleAddon: false,
      addonRole: addonRole,
      addonRoleName: addonRoleName,
      addonId: "",
    });
  };

  const cancelDelete = () => {
    setAddonValues({ ...addonValues, showDelete: false });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setAddonValues({ ...addonValues, error: "", loading: true });

    deleteAddon(token, addonId, user._id).then((data) => {
      if (data.error) {
        setAddonValues({ ...addonValues, error: data.error });
      } else {
        setMainValues({
          ...values,
          showAllRole: false,
          showSingleRole: true,
          showCreateAddon: false,
          showSingleAddon: false,
          addonRole: addonRole,
          addonRoleName: addonRoleName,
          addonId: "",
        });
      }
    });
  };

  const deleteConfirm = () => {
    return (
      <Fragment>
        {showLoading()}
        {!loading &&(<div className="product-box mb-xl-20">
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
                <button type="button" onClick={deleteAddOnClick} className="btn btn-danger">
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
        </div>)}
        
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
