import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";
import collection from "../assets/images/dum/nav-1.jpg";
import { signOut, isAuthenticated } from "../auth";
import { Fragment } from "react";
import {
  getSaladCategory,
  getAllCustom,
  getHomeFoodCategory,
} from "./apiLayouts";

function Menu({ history }) {
  const [allSaladCategory, setAllSaladCategory] = useState([]);
  const [allCustomCategory, setAllCustomCategory] = useState([]);
  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();
    getSaladCategory(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllSaladCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const abortCont = new AbortController();
    getAllCustom(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllCustomCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const abortCont = new AbortController();
    getHomeFoodCategory(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllFoodCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const { user } = isAuthenticated();
  const [navMethod, setNavMethod] = useState(false);

  const toggleNav = () => {
    if (!navMethod) {
      setNavMethod(true);
    } else {
      setNavMethod(false);
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  return (
    <div className="catring parent-megamenu">
      {showError()}
      <Link
        to="#"
        className={classNames(navMethod ? "active" : "")}
        onClick={toggleNav}
      >
        <span>
          Explore <i className="fas fa-caret-down" />
        </span>
        <i className="fas fa-bars" />
      </Link>
      <div
        className={classNames(navMethod ? "megamenu show" : "megamenu")}
        onClick={toggleNav}
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-lg-4 col-md-5">
                <div className="ex-collection-box h-100">
                  <Link to="#">
                    <img
                      src={collection}
                      className="img-fluid full-width h-100"
                      alt=""
                    />
                  </Link>
                  <div className="category-type overlay padding-15"></div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="row">
                <div className="col-lg-4 col-sm-6">
                    <div className="menu-style">
                      {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <Fragment>
                          <div className="menu-title">
                            <h6 className="cat-name">
                              <Link to="#" className="text-light-black">
                                Hi, {user.name}
                              </Link>
                            </h6>
                          </div>
                          <ul>
                            <li>
                              <Link
                                to="/user/dashboard"
                                className="text-light-white fw-500"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/user/orders"
                                className="text-light-white fw-500"
                              >
                                My Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/user/myProfile"
                                className="text-light-white fw-500"
                              >
                                My Profile
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="#"
                                onClick={() =>
                                  signOut(() => {
                                    history.push("/");
                                  })
                                }
                              >
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </Fragment>
                      )}
                      {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                          <div className="menu-title">
                            <h6 className="cat-name">
                              <Link to="#" className="text-light-black">
                                Hi, {user.name}
                              </Link>
                            </h6>
                          </div>
                          <ul>
                            <li>
                              <Link
                                to="/admin/dashboard"
                                className="text-light-white fw-500"
                              >
                                Dashboard
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="/admin/users"
                                className="text-light-white fw-500"
                              >
                                Users
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/profile"
                                className="text-light-white fw-500"
                              >
                                My Profile
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="#"
                                onClick={() =>
                                  signOut(() => {
                                    history.push("/");
                                  })
                                }
                              >
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </Fragment>
                      )}
                      {isAuthenticated() && isAuthenticated().user.role === 2 && (
                        <Fragment>
                          <div className="menu-title">
                            <h6 className="cat-name">
                              <Link to="#" className="text-light-black">
                                Hi, {user.name}
                              </Link>
                            </h6>
                          </div>
                          <ul>
                            <li>
                              <Link
                                to="/designer/dashboard"
                                className="text-light-white fw-500"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/designer/allCategories"
                                className="text-light-white fw-500"
                              >
                                All Categories
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/designer/allFoodItems"
                                className="text-light-white fw-500"
                              >
                                All Food Items
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/designer/mainSlides"
                                className="text-light-white fw-500"
                              >
                                Main Slides
                              </Link>
                            </li>
                            
                            <li>
                              <Link
                                to="/designer/restaurant"
                                className="text-light-white fw-500"
                              >
                                Restaurants
                              </Link>
                            </li>
                            
                            <li>
                              <Link
                                to="/designer/promotions"
                                className="text-light-white fw-500"
                              >
                                Promotions
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/designer/inventory"
                                className="text-light-white fw-500"
                              >
                                Inventory
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/designer/profile"
                                className="text-light-white fw-500"
                              >
                                My Profile
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="#"
                                onClick={() =>
                                  signOut(() => {
                                    history.push("/");
                                  })
                                }
                              >
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </Fragment>
                      )}
                      {isAuthenticated() && isAuthenticated().user.role === 3 && (
                        <Fragment>
                          <div className="menu-title">
                            <h6 className="cat-name">
                              <Link to="#" className="text-light-black">
                                Hi, {user.name}
                              </Link>
                            </h6>
                          </div>
                          <ul>
                            <li>
                              <Link
                                to="/manager/dashboard"
                                className="text-light-white fw-500"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/manager/acceptedOrders"
                                className="text-light-white fw-500"
                              >
                                Accepted Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/manager/deliveredOrders"
                                className="text-light-white fw-500"
                              >
                                Delivered Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/manager/salesByProducts"
                                className="text-light-white fw-500"
                              >
                                Sales By Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/manager/changeAvailability"
                                className="text-light-white fw-500"
                              >
                                Change Availability
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/manager/myProfile"
                                className="text-light-white fw-500"
                              >
                                My Profile
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="#"
                                onClick={() =>
                                  signOut(() => {
                                    history.push("/");
                                  })
                                }
                              >
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </Fragment>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-sm-6">
                    <div className="menu-style">
                      <div className="menu-title">
                        <h6 className="cat-name">
                          <Link to="#" className="text-light-black">
                            Join With Us
                          </Link>
                        </h6>
                      </div>
                      <ul>
                        <li>
                          <Link
                            to="/register"
                            className="text-light-white fw-500"
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link to="/login" className="text-light-white fw-500">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/aboutUs" className="text-light-white fw-500">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link to="/refund" className="text-light-white fw-500">
                            Refund Policy
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="menu-style">
                      <div className="menu-title">
                        <h6 className="cat-name">
                          <Link to="#" className="text-light-black">
                            Our Menu
                          </Link>
                        </h6>
                      </div>
                      <ul>
                        {allCustomCategory.map((c, i) => (
                          <Fragment key={i}>
                            <li>
                              <Link
                                to={`/customCart/${c._id}`}
                                className="text-light-white fw-500"
                              >
                                {c.title}
                              </Link>
                            </li>
                          </Fragment>
                        ))}
                        {allSaladCategory.map((c, i) => (
                          <Fragment key={i}>
                            <li>
                              <Link
                                to={`/saladCategory/${c._id}`}
                                className="text-light-white fw-500"
                              >
                                {c.title}
                              </Link>
                            </li>
                          </Fragment>
                        ))}
                        <li>
                          <Link
                            to="/soupCategory"
                            className="text-light-white fw-500"
                          >
                            Soups
                          </Link>
                        </li>
                        {allFoodCategory.map((c, i) => (
                          <Fragment key={i}>
                            <li>
                              <Link
                                to={`/foodCategory/${c._id}`}
                                className="text-light-white fw-500"
                              >
                                {c.title}
                              </Link>
                            </li>
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Menu);
