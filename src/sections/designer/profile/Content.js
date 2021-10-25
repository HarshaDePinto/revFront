import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import { readUser, update, updateUser } from "./apiProfile";
import { Roller } from "react-awesome-spinners";
function Content() {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    error: false,
    success: false,
    loading: true,
  });

  const { name, mobile, email, password, error, success, loading } = values;

  useEffect(() => {
    const { user, token } = isAuthenticated();
    const userId = user._id;
    const abortCont = new AbortController();
    readUser(userId, token, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setValues((v) => ({ ...v, error: true }));
        } else {
          setValues((v) => ({
            ...v,
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            loading: false,
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true, success: false });
    const { user, token } = isAuthenticated();
    update(token, user._id, { name, mobile, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            success: true,
            error: "",
            loading: false,
          });
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

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Updated Successful!
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  const editForm = () => {
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
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Email <sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange("email")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Password <sup className="fs-16">*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={handleChange("password")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={clickSubmit}
              className="btn-second btn-submit m-2"
            >
              Update
            </button>
          </Fragment>
        )}
      </form>
    );
  };
  return (
    <Fragment>
      <section className="register-restaurent-sec section-padding bg-light-theme">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="sidebar-tabs main-box padding-20 mb-md-40">
                <div id="add-restaurent-tab" className="step-app">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5 mb-md-40">
                      <ul className="step-steps steps-2">
                        <li className="add-res-tab">
                          <Link
                            to="/designer/dashboard"
                            className="add-res-tab"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/allCategories"
                            className="add-res-tab"
                          >
                            All Categories
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/restaurant"
                            className="add-res-tab"
                          >
                            Restaurants
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/allFoodItems"
                            className="add-res-tab"
                          >
                            All Food Items
                          </Link>
                        </li>

                        <li className="add-res-tab">
                          <Link
                            to="/designer/promotions"
                            className="add-res-tab"
                          >
                            Promotions
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/inventory"
                            className="add-res-tab"
                          >
                            Inventory
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/mainSlides"
                            className="add-res-tab"
                          >
                            Main Slides
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <div className="row">
                              <div className="col-12">{editForm()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Content;
