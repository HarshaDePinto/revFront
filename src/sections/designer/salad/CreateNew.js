import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { createSalad } from "./apiSalad";
import CheckBox from "./Checkbox";
import { Roller } from "react-awesome-spinners";

function CreateNew({ setMainValues, values }) {
  const { user, token } = isAuthenticated();
  const [saladValues, setSaladValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    price_junior: "",
    price_jumbo: "",
    photo: "",
    saladCategory: "",
    discount: "",
    calorie: "",
    rating: "",
    totalRating: "",
    ratingNumber: "",
    meat: false,
    vegetable: false,
    cheese: false,
    nut: false,
    egg: false,
    spicy: false,
    chef: false,
    restaurants: [],
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
    saladCategory,
    discount,
    calorie,
    meat,
    vegetable,
    cheese,
    nut,
    egg,
    spicy,
    chef,
    rating,
    totalRating,
    ratingNumber,
    loading,
    error,
    formData,
  } = saladValues;

  useEffect(() => {
    setSaladValues((v) => ({ ...v, formData: new FormData() }));
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    formData.set("createdBy", user.name);
    formData.set("updatedBy", user.name);
    setSaladValues({ ...saladValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setSaladValues({ ...saladValues, error: "", loading: true });
    createSalad(user._id, token, formData).then((data) => {
      if (data.error) {
        setSaladValues({ ...saladValues, error: data.error, loading: false });
      } else {
        setMainValues({
          ...values,
          showCreateSalad: false,
          showAllCategory: false,
          showSingleSalad: false,
          showSingleCategory: true,
          saladCategoryId: data.saladCategory,
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
  const discountChecker = () => {
    if (parseInt(discount, 10) < 0) {
      if (parseInt(discount, 10) > 100) {
        return (
          <sup className="fs-16">
            *Discount Should Positive and Less than 100!
          </sup>
        );
      } else {
        return <sup className="fs-16">*Discount Should Positive!</sup>;
      }
    } else {
      if (parseInt(discount, 10) > 100) {
        return <sup className="fs-16">*Discount Should Less than 100!</sup>;
      } else {
        return <sup className="fs-16"></sup>;
      }
    }
  };
  const calorieChecker = () => {
    if (parseInt(calorie, 10) < 0) {
      return <sup className="fs-16">*Calorie Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const totalRatingChecker = () => {
    if (parseInt(totalRating, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const ratingNumberChecker = () => {
    if (parseInt(ratingNumber, 10) < 0) {
      return <sup className="fs-16">*Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };
  const ratingChecker = () => {
    if (parseInt(rating, 10) < 0) {
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
                    Select Category <sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("saladCategory")}
                    defaultValue={saladCategory}
                  >
                    <CheckBox saladCategory={saladCategory} />
                  </select>
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
                    value={calorie}
                    onChange={handleChange("calorie")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Discount
                    {discountChecker()}
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={handleChange("discount")}
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
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Meat<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("meat")}
                    value={meat}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Vegetable<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("vegetable")}
                    value={vegetable}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Cheese<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("cheese")}
                    value={cheese}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Nut<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("nut")}
                    value={nut}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Egg<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("egg")}
                    value={egg}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Spicy<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("spicy")}
                    value={spicy}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Chef<sup className="fs-16">*</sup>
                  </label>

                  <select
                    className="form-control form-control-submit"
                    onChange={handleChange("chef")}
                    value={chef}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Total Rating
                    {totalRatingChecker()}
                  </label>

                  <input
                    type="number"
                    value={totalRating}
                    onChange={handleChange("totalRating")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Number of Rating
                    {ratingNumberChecker()}
                  </label>

                  <input
                    type="number"
                    value={ratingNumber}
                    onChange={handleChange("ratingNumber")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light-black fw-700">
                    Rating {ratingChecker()}
                  </label>
                  <input
                    type="number"
                    value={rating}
                    onChange={handleChange("rating")}
                    className="form-control form-control-submit"
                  />
                </div>
              </div>
            </div>

            <button onClick={clickSubmit} className="btn-second btn-submit">
              Add The Soup
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
      <h5 className="text-light-black fw-700">Create New Salad</h5>
      {showLoading()}
      {showError()}
      {newSlideForm()}
    </Fragment>
  );
}

export default CreateNew;
