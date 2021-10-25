import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { readUser, updateUser, deleteUser } from "./apiUsers";
import { Roller } from "react-awesome-spinners";

function Single({
  singleId,
  setShowSingle,
  setUpdateDesigner,
  updateDesigner,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    id: "",
    mobile: "",
    password: "",
    loading: true,
    error: "",
    redirectToReferrer: false,
    showDelete: false,
  });

  const {
    name,
    id,
    mobile,
    password,
    loading,
    error,
    redirectToReferrer,
    showDelete,
  } = values;

  useEffect(() => {
    const loadUser = (singleId) => {
      readUser(singleId).then((data) => {
        if (data.error) {
          setValues((v) => ({ ...v, error: true }));
        } else {
          setValues((v) => ({
            ...v,
            name: data.name,
            id: data._id,
            mobile: data.mobile,
            loading: false,
          }));
        }
      });
    };
    loadUser(singleId);
  }, [singleId]);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateUser(token, singleId, user._id, {id,name,mobile,password}).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (updateDesigner) {
          setUpdateDesigner(false);
        } else {
          setUpdateDesigner(true);
        }
        setShowSingle(false);
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
        <h5 className="text-light-black fw-700">Update {name}</h5>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {!loading && (
          <Fragment>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Name<sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleChange("name")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Mobile <sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="number"
                    value={mobile}
                    onChange={handleChange("mobile")}
                    className="form-control form-control-submit"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Password <sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="password"
                    onChange={handleChange("password")}
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
    setValues({ ...values, showDelete: true });
  };

  const clickCancel = () => {
    setShowSingle(false);
  };

  const cancelDelete = () => {
    setValues({ ...values, showDelete: false });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteUser(token, singleId, user._id, {id}).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (updateDesigner) {
          setUpdateDesigner(false);
        } else {
          setUpdateDesigner(true);
        }
        setShowSingle(false);
      }
    });
  };

  const deleteConfirm = () => {
    return (
      <Fragment>
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
