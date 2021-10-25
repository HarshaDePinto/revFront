import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { readFood, updateFood, deleteFood } from "./apiFood";
import CheckBox from "./Checkbox";
import { Roller } from "react-awesome-spinners";

function SingleFood({ setMainValues, values, foodId, categoryId }) {
  const { user, token } = isAuthenticated();

  const [createValues, setCreateValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    price_junior: "",
    price_jumbo: "",
    photo: "",
    foodCategory: "",
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
    foodCategory,
    discount,
    calorie,
    rating,
    totalRating,
    ratingNumber,
    meat,
    vegetable,
    cheese,
    nut,
    egg,
    spicy,
    chef,
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
    readFood(foodId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setCreateValues((v) => ({ ...v, error: true, loading: false }));
        } else {
          setCreateValues((v) => ({
            ...v,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            price_junior: data.price_junior,
            price_jumbo: data.price_jumbo,
            discount: data.discount,
            foodCategory: data.foodCategory,
            calorie: data.calorie,
            rating: data.rating,
            totalRating: data.totalRating,
            ratingNumber: data.ratingNumber,
            meat: data.meat,
            vegetable: data.vegetable,
            cheese: data.cheese,
            nut: data.nut,
            egg: data.egg,
            spicy: data.spicy,
            chef: data.chef,
            createdBy: data.createdBy,
            loading: false,
            formData: new FormData(),
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [foodId]);
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    formData.set("updatedBy", user.name);
    setCreateValues({ ...createValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setCreateValues({ ...createValues, error: "", loading: true });
    updateFood(token, foodId, user._id, formData).then((data) => {
      if (data.error) {
        setCreateValues({ ...createValues, error: data.error });
      } else {
        setMainValues({
          ...values,
          showCreateFood: false,
          showAllCategory: false,
          showSingleFood: false,
          showSingleCategory: true,
          foodCategoryId: categoryId,
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
  const editAddOnForm = () => {
    return (
      <div className="col-12">
        <form>
          <h5 className="text-light-black fw-700">Update Food </h5>
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
                      Select Category <sup className="fs-16">*</sup>
                    </label>

                    <select
                      className="form-control form-control-submit"
                      value={categoryId}
                      onChange={handleChange("foodCategory")}
                    >
                      <CheckBox foodCategory={foodCategory} />
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
                      Rating {ratingChecker()}{" "}
                    </label>
                    <input
                      type="number"
                      value={rating}
                      onChange={handleChange("rating")}
                      className="form-control form-control-submit"
                    />
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
      showCreateFood: false,
      showAllCategory: false,
      showSingleFood: false,
      showSingleCategory: true,
      foodCategoryId: categoryId,
    });
  };

  const cancelDelete = () => {
    setMainValues({
      ...values,
      showCreateFood: false,
      showAllCategory: false,
      showSingleFood: false,
      showSingleCategory: true,
      foodCategoryId: categoryId,
    });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setCreateValues({ ...values, error: "", loading: true });
    deleteFood(token, foodId, user._id, formData).then((data) => {
      if (data.error) {
        setCreateValues({ ...values, error: data.error });
      } else {
        setMainValues({
          ...values,
          showCreateFood: false,
          showAllCategory: false,
          showSingleFood: false,
          showSingleCategory: true,
          foodCategoryId: categoryId,
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

export default SingleFood;
