import React, { Fragment, useState } from "react";
import { createPromotion } from "./apiPromotion";
import { isAuthenticated } from "../../../auth";
import { Roller } from "react-awesome-spinners";

function CreateNew({
  setShowAllPromotion,
  setShowCreatePromotion,
  setShowSinglePromotion,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    code: "",
    amount:0,
    active: false,
    createdBy: user.name,
    updatedBy: user.name,
    error: "",
    loading: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { title, code,amount,active, createdBy, updatedBy, error, loading } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createPromotion(user._id, token, {
      title,
      code,
      amount,
      active,
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
        setShowAllPromotion(true);
        setShowCreatePromotion(false);
        setShowSinglePromotion(false);
      }
    });
  };

  const showLoading = () => loading && <Roller color="#F79550" />;

  const amountChecker = () => {
    if (parseInt(amount, 10) < 0) {
      if (parseInt(amount, 10) > 100) {
        return (
          <sup className="fs-16">
            *Discount Should Positive and Less than 100!
          </sup>
        );
      } else {
        return <sup className="fs-16">*Discount Should Positive!</sup>;
      }
    } else {
      if (parseInt(amount, 10) > 100) {
        return <sup className="fs-16">*Discount Should Less than 100!</sup>;
      } else {
        return <sup className="fs-16"></sup>;
      }
    }
  };

  const newPromotionForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600">Create New Promotion</h4>
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
                <label className="text-light-black fw-700">Promotion Code</label>
                <input
                  type="text"
                  className="form-control form-control-submit"
                  id="code"
                  value={code}
                  required
                  onChange={handleChange("code")}
                />
              </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Discount Amount
                    {amountChecker()}
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleChange("amount")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Status<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("active")}
                    value={active}
                  >
                    <option value="true">Active</option>
                    <option value="false">DeActive</option>
                  </select>
                </div>
              </div>

            <div className="col-12">
              <div className="form-group">
                {title && code && amount && (
                  <button
                  type="button"
                    onClick={clickSubmit}
                    className="btn-second btn-submit full-width"
                  >
                    Create Promotion
                  </button>
                )}

                {(!title || !code || !amount ) && (
                  <button
                    
                    className="btn-second btn-submit full-width"
                  >
                    All fields should fill!
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

  return <Fragment>{newPromotionForm()}</Fragment>;
}

export default CreateNew;
