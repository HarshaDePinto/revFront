import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { createCustom } from "./apiCustom";
import { Roller } from "react-awesome-spinners";

function CreateNew({ setMainValues, values }) {
  const { user, token } = isAuthenticated();
  const [customValues, setCustomValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    price_junior: "",
    price_jumbo: "",
    photo: "",
    lettuceMax: "",
    lettuceMin: "",
    throwMax: "",
    throwMin: "",
    proteinMax: "",
    proteinMin: "",
    sold: "",
    createdBy: "",
    updatedBy: "",
    loading: false,
    error: "",
    formData: "",
  });
  const {
    title,
    subtitle,
    description,
    price_junior,
    price_jumbo,
    lettuceMax,
    lettuceMin,
    throwMax,
    throwMin,
    proteinMax,
    proteinMin,
    loading,
    error,
    formData,
  } = customValues;

  useEffect(() => {
    setCustomValues((v) => ({ ...v, formData: new FormData() }));
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    formData.set("createdBy", user.name);
    formData.set("updatedBy", user.name);
    setCustomValues({ ...customValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setCustomValues({ ...customValues, error: "", loading: true });
    createCustom(user._id, token, formData).then((data) => {
      if (data.error) {
        setCustomValues({ ...customValues, error: data.error, loading: false });
      } else {
        setMainValues({
          ...values,
          showCreateCustom: false,
          showAllCustom: true,
          showSingleCustom: false,
        });
      }
    });
  };
  const priceCheckerJ = () => {
    if (parseInt(price_junior, 10) < 0) {
      return <sup className="fs-16">*Price Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const priceCheckerC = () => {
    if (parseInt(price_jumbo, 10) < 0) {
      return <sup className="fs-16">*Price Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };

  const lettuceMaxChecker = () => {
    if (parseInt(lettuceMax, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const lettuceMinChecker = () => {
    if (parseInt(lettuceMin, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };

  const throwMaxChecker = () => {
    if (parseInt(throwMax, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const throwMinChecker = () => {
    if (parseInt(throwMin, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };

  const proteinMaxChecker = () => {
    if (parseInt(proteinMax, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const proteinMinChecker = () => {
    if (parseInt(proteinMin, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };


  const newSlideForm = () => {
    return (
      <div className="col-12">
        {!loading && (
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
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Description <sup className="fs-16">*max 2000</sup>
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
                    Price Junior
                    {priceCheckerJ()}
                  </label>
                  <input
                    type="number"
                    value={price_junior}
                    onChange={handleChange("price_junior")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Price Jumbo
                    {priceCheckerC()}
                  </label>
                  <input
                    type="number"
                    value={price_jumbo}
                    onChange={handleChange("price_jumbo")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                  Lettuce Max Number
                    {lettuceMaxChecker()}
                  </label>
                  <input
                    type="number"
                    value={lettuceMax}
                    onChange={handleChange("lettuceMax")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                  Lettuce Min Number
                    {lettuceMinChecker()}
                  </label>
                  <input
                    type="number"
                    value={lettuceMin}
                    onChange={handleChange("lettuceMin")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                  Throw Max Number
                    {throwMaxChecker()}
                  </label>
                  <input
                    type="number"
                    value={throwMax}
                    onChange={handleChange("throwMax")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                  Throw Min Number
                    {throwMinChecker()}
                  </label>
                  <input
                    type="number"
                    value={throwMin}
                    onChange={handleChange("throwMin")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                  Protein Max Number
                    {proteinMaxChecker()}
                  </label>
                  <input
                    type="number"
                    value={proteinMax}
                    onChange={handleChange("proteinMax")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                  Protein Min Number
                    {proteinMinChecker()}
                  </label>
                  <input
                    type="number"
                    value={proteinMin}
                    onChange={handleChange("proteinMin")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Image <sup className="fs-16">*max 1mb</sup>
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
            
            
            </div>

            <button onClick={clickSubmit} className="btn-second btn-submit">
              Add The Custom Salad
            </button>
          </form>
        )}
      </div>
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

  const showLoading = () => loading && <Roller color="#F79550" />;

  return (
    <Fragment>
      <h5 className="text-light-black fw-700">Create New Custom Salad</h5>
      {showLoading()}
      {showError()}
      {newSlideForm()}
    </Fragment>
  );
}

export default CreateNew;
