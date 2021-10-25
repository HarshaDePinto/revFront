import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { readCustom, updateCustom, deleteCustom } from "./apiCustom";
import { Roller } from "react-awesome-spinners";

function Single({ setMainValues, values, customId }) {
  const { user, token } = isAuthenticated();

  const [createValues, setCreateValues] = useState({
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
    loading: true,
    error: "",
    formData: "",
    redirectToReferrer: false,
    showDelete: false,
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
    redirectToReferrer,
    showDelete,
  } = createValues;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showDelete]);

  useEffect(() => {
    const abortCont = new AbortController();
    readCustom(customId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setCreateValues((v) => ({ ...v, error: true }));
        } else {
          setCreateValues((v) => ({
            ...v,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            price_junior: data.price_junior,
            price_jumbo: data.price_jumbo,
            lettuceMax: data.lettuceMax,
            lettuceMin: data.lettuceMin,
            throwMax: data.throwMax,
            throwMin: data.throwMin,
            proteinMax: data.proteinMax,
            proteinMin: data.proteinMin,
            loading: false,
            formData: new FormData(),
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [customId]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    formData.set("updatedBy", user.name);
    setCreateValues({ ...createValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setCreateValues({ ...createValues, error: "", loading: true });
    updateCustom(token, customId, user._id, formData).then((data) => {
      if (data.error) {
        setCreateValues({ ...createValues, error: data.error });
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
  const editAddOnForm = () => {
    return (
      <div className="col-12">
        <form>
          <h5 className="text-light-black fw-700">Update Soup </h5>
          {showLoading()}
          {showSuccess()}
          {showError()}

          {!loading && (
            <Fragment>
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
      </div>
    );
  };

  const clickDelete = () => {
    setCreateValues({ ...values, showDelete: true });
  };

  const clickCancel = () => {
    setMainValues({
      ...values,
      showCreateCustom: false,
      showAllCustom: true,
      showSingleCustom: false,
    });
  };

  const cancelDelete = () => {
    setMainValues({
      ...values,
      showCreateCustom: false,
      showAllCustom: true,
      showSingleCustom: false,
    });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setCreateValues({ ...values, error: "", loading: true });
    deleteCustom(token, customId, user._id, formData).then((data) => {
      if (data.error) {
        setCreateValues({ ...values, error: data.error });
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
