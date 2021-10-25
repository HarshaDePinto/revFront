import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { signOut, isAuthenticated } from "../auth";
import Menu from "./Menu";

function Header({ history }) {
  const { user } = isAuthenticated();
  const [values, setValues] = useState({
    userMethod: false,
  });

  const { userMethod } = values;

  const toggleUser = () => {
    if (!userMethod) {
      setValues({ ...values, userMethod: true });
    } else {
      setValues({ ...values, userMethod: false });
    }
  };

  return (
    <Fragment>
      <div className="header">
        <header className="full-width">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mainNavCol">
                {/* logo */}
                <div className="logo mainNavCol">
                  <Link to="/">
                    <img src={logo} className="img-fluid" alt="" />
                  </Link>
                </div>
                {/* logo */}
                <div className="main-search mainNavCol"></div>
                <div className="right-side fw-700 mainNavCol">
                  <Menu />
                  {!isAuthenticated() && (
                    <Fragment>
                      <div className="gem-points">
                        <Link to="/login">
                          {" "}
                          <span>Login</span>
                        </Link>
                      </div>
                      <div className="gem-points">
                        <Link to="/register">
                          {" "}
                          <span>Register</span>
                        </Link>
                      </div>
                    </Fragment>
                  )}

                  {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <div className="user-details p-relative">
                      <Link
                        to="#"
                        className={classNames(
                          userMethod
                            ? "text-light-white fw-500 active"
                            : "text-light-white fw-500"
                        )}
                        onClick={toggleUser}
                      >
                        <span>Hi, {user.name}</span>
                      </Link>
                      <div
                        className={classNames(
                          userMethod ? "user-dropdown show" : "user-dropdown"
                        )}
                      >
                        <ul>
                          <li>
                            <Link to="/user/dashboard">
                              <div className="icon">
                                <i className="fa fa-cogs"></i>
                              </div>{" "}
                              <span className="details">Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/user/orders">
                              <div className="icon">
                                <i className="fa fa-cart-arrow-down"></i>
                              </div>{" "}
                              <span className="details">My Orders</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/user/myProfile">
                              <div className="icon">
                                <i className="fa fa-user"></i>
                              </div>{" "}
                              <span className="details">My Profile</span>
                            </Link>
                          </li>
                        </ul>
                        <div className="user-footer">
                          {" "}
                          <span className="text-light-black">
                            Not {user.name}?
                          </span>{" "}
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
                        </div>
                      </div>
                    </div>
                  )}

                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <div className="user-details p-relative">
                      <Link
                        to="#"
                        className={classNames(
                          userMethod
                            ? "text-light-white fw-500 active"
                            : "text-light-white fw-500"
                        )}
                        onClick={toggleUser}
                      >
                        <span>Hi, {user.name}</span>
                      </Link>
                      <div
                        className={classNames(
                          userMethod ? "user-dropdown show" : "user-dropdown"
                        )}
                      >
                        <ul>
                          <li>
                            <Link to="/admin/dashboard">
                              <div className="icon">
                                <i className="fa fa-cogs"></i>
                              </div>{" "}
                              <span className="details">Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/users">
                              <div className="icon">
                                <i className="fa fa-users"></i>
                              </div>{" "}
                              <span className="details">Users</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <div className="icon">
                                <i className="fa fa-list-ul"></i>
                              </div>{" "}
                              <span className="details">Food Category</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/profile">
                              <div className="icon">
                                <i className="fa fa-user"></i>
                              </div>{" "}
                              <span className="details">My Profile</span>
                            </Link>
                          </li>
                        </ul>
                        <div className="user-footer">
                          <span className="text-light-black">
                            Not {user.name}?
                          </span>{" "}
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
                        </div>
                      </div>
                    </div>
                  )}

                  {isAuthenticated() && isAuthenticated().user.role === 2 && (
                    <div className="user-details p-relative">
                      <Link
                        to="#"
                        className={classNames(
                          userMethod
                            ? "text-light-white fw-500 active"
                            : "text-light-white fw-500"
                        )}
                        onClick={toggleUser}
                      >
                        <span>Hi, {user.name}</span>
                      </Link>
                      <div
                        className={classNames(
                          userMethod ? "user-dropdown show" : "user-dropdown"
                        )}
                      >
                        <ul>
                          <li>
                            <Link to="/designer/dashboard">
                              <div className="icon">
                                <i className="fa fa-cogs"></i>
                              </div>{" "}
                              <span className="details">Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/designer/allCategories">
                              <div className="icon">
                                <i className="fa fa-list-ul"></i>
                              </div>{" "}
                              <span className="details"> All Categories</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/designer/allFoodItems">
                              <div className="icon">
                                <i className="fas fa-cheese"></i>
                              </div>{" "}
                              <span className="details">All Food Items</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/designer/restaurant">
                              <div className="icon">
                                <i className="fa fa-industry"></i>
                              </div>{" "}
                              <span className="details">Restaurants</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/designer/mainSlides">
                              <div className="icon">
                                <i className="fa fa-backward"></i>
                              </div>{" "}
                              <span className="details">Sliders</span>
                            </Link>
                          </li>

                          <li>
                            <Link to="/designer/promotions">
                              <div className="icon">
                                <i className="fa fa-percent"></i>
                              </div>{" "}
                              <span className="details">Promotions</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/designer/inventory">
                              <div className="icon">
                                <i className="fa fa-database"></i>
                              </div>{" "}
                              <span className="details">Inventory</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/designer/profile">
                              <div className="icon">
                                <i className="fa fa-user"></i>
                              </div>{" "}
                              <span className="details">My Profile</span>
                            </Link>
                          </li>
                        </ul>
                        <div className="user-footer">
                          {" "}
                          <span className="text-light-black">
                            Not {user.name}?
                          </span>{" "}
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
                        </div>
                      </div>
                    </div>
                  )}
                  {isAuthenticated() && isAuthenticated().user.role === 3 && (
                    <div className="user-details p-relative">
                      <Link
                        to="#"
                        className={classNames(
                          userMethod
                            ? "text-light-white fw-500 active"
                            : "text-light-white fw-500"
                        )}
                        onClick={toggleUser}
                      >
                        <span>Hi, {user.name}</span>
                      </Link>
                      <div
                        className={classNames(
                          userMethod ? "user-dropdown show" : "user-dropdown"
                        )}
                      >
                        <ul>
                          <li>
                            <Link to="/manager/dashboard">
                              <div className="icon">
                                <i className="fa fa-cogs"></i>
                              </div>{" "}
                              <span className="details">Dashboard</span>
                            </Link>
                          </li>

                          <li>
                            <Link to="/manager/acceptedOrders">
                              <div className="icon">
                                <i className="fa fa-cart-arrow-down"></i>
                              </div>{" "}
                              <span className="details">Accepted Orders</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/manager/deliveredOrders">
                              <div className="icon">
                                <i className="fa fa-check"></i>
                              </div>{" "}
                              <span className="details">Delivered Orders</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/manager/salesByProducts">
                              <div className="icon">
                                <i className="fa fa-folder"></i>
                              </div>{" "}
                              <span className="details">Sales By Products</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/manager/changeAvailability">
                              <div className="icon">
                                <i className="fa fa-edit"></i>
                              </div>{" "}
                              <span className="details">
                                Change Availability
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/manager/myProfile">
                              <div className="icon">
                                <i className="fa fa-user"></i>
                              </div>{" "}
                              <span className="details">My Profile</span>
                            </Link>
                          </li>
                        </ul>
                        <div className="user-footer">
                          {" "}
                          <span className="text-light-black">
                            Not {user.name}?
                          </span>{" "}
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="main-sec" />
    </Fragment>
  );
}

export default withRouter(Header);
