import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames";
import { Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import {
  signOut,
  isAuthenticated,
  setSelectedRestaurant,
  getSelectedRestaurant,
  clearCart,
  getCartAll,
  setCartAll,
} from "../auth";
import { getAllRestaurants, readRestaurant } from "./apiLayouts";
import Menu from "./Menu";

function Header({
  history,
  setSelectedRestaurantId,
  cartRefresh,
  setCartRefresh,
}) {
  const { user } = isAuthenticated();
  const selectedRestaurant = getSelectedRestaurant();
  //Component Controlling variables
  const [values, setValues] = useState({
    error: false,
    cartMethod: false,
    userMethod: false,
    locationShow: false,
    newFr: [],
    allRestaurants: [],
  });
  const { cartMethod, userMethod, allRestaurants, locationShow } = values;
  // Cart Variables

  const [products, setProducts] = useState([]);

  //Restaurant Loading
  useEffect(() => {
    const abortCont = new AbortController();
    getAllRestaurants(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setValues((v) => ({ ...v, error: data.error }));
        } else {
          setValues((v) => ({ ...v, allRestaurants: data }));
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  //Restaurant Selecting Button Toggle
  const restaurantSelectorToggle = () => {
    if (!locationShow) {
      setValues({ ...values, locationShow: true });
    } else {
      setValues({ ...values, locationShow: false });
    }
  };

  //Showing Selected Restaurant on Header
  const restaurantSelector = () => {
    return (
      <div className="row">
        <div className="col-lg-6 col-md-5">
          <Link
            to="#"
            className={classNames(
              locationShow
                ? "delivery-add p-relative open"
                : "delivery-add p-relative"
            )}
            onClick={restaurantSelectorToggle}
          >
            <span className="icon">
              <i className="fas fa-map-marker-alt" />
            </span>
            <span className="address">{selectedRestaurant.title}</span>
          </Link>
        </div>
      </div>
    );
  };
  //Open and close restaurant selected Model
  const setLocationShow = () => {
    setValues({ ...values, locationShow: true });
  };
  const locationClose = () => {
    setValues({ ...values, locationShow: false });
  };

  //Changing Restaurant
  const handleChange = () => (event) => {
    readRestaurant(event.target.value).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setSelectedRestaurant(data, () => {
          setSelectedRestaurantId(data._id);
          clearCart(() => {
            if (!locationShow) {
              setValues({ ...values, locationShow: true });
            } else {
              setValues({ ...values, locationShow: false });
            }
            setCartRefresh(!cartRefresh);
          });
        });
      }
    });
  };
  //Changing Restaurant Model
  const selectingRestaurantModel = () => (
    <Fragment>
      <Modal
        show={locationShow}
        id="offer"
        onHide={locationClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <button type="button" className="close" onClick={locationClose}>
            ×
          </button>
          <h4 className="modal-title fw-700">Change Restaurant</h4>
        </Modal.Header>
        <Modal.Body>
          <select
            onChange={handleChange("selectedRestaurant")}
            value={selectedRestaurant._id}
            className="form-control form-control-submit"
          >
            {allRestaurants.map((c, i) => (
              <option key={i} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </Modal.Body>
      </Modal>
    </Fragment>
  );

  //Mobile Restaurant

  const showMobileRestaurant = () => {
    return (
      <div className="col-sm-12 mobile-search">
        <div className="mobile-address">
          <Link to="#" className="delivery-add" onClick={setLocationShow}>
            {" "}
            <span className="address">{selectedRestaurant.title}</span>
          </Link>
        </div>
        <div className="sorting-addressbox">
          {" "}
          <span className="full-address text-light-green">
            {selectedRestaurant.title}
          </span>
        </div>
      </div>
    );
  };

  //Reset Cart Values
  useEffect(() => {
    const myCart = getCartAll();
    const resetCart = (myCart) => {
      if (myCart) {
        setProducts(myCart.cartProducts);
      } else {
        setProducts([]);
      }
    };

    resetCart(myCart);
  }, [cartRefresh]);

  //Cart Button Toggle
  const toggleCart = () => {
    if (!cartMethod) {
      setValues({ ...values, cartMethod: true });
    } else {
      setValues({ ...values, cartMethod: false });
    }
  };

  //Delete Cart Items
  const deleteProduct = (p) => {
    const position = products.indexOf(p);
    products.splice(position, 1);
    const cartProducts = products;
    setCartAll({ cartProducts }, () => {
      setCartRefresh(!cartRefresh);
    });
  };
  //Clear Cart Items
  const clearMyCart = () => {
    clearCart(() => {
      setCartRefresh(!cartRefresh);
    });
  };
  //Calculate Cart Total
  const addTotal = () => {
    const subT = products.reduce((a, v) => (a = a + v.tp), 0);
    return <span className="text-info  fw-700">{subT.toFixed(2)} LKR </span>;
  };

  // Cart Component

  const showMyCart = () => {
    return (
      <Fragment>
        {products.length > 0 && (
          <div className="cart-btn cart-dropdown">
            <Link
              to="#"
              className={classNames(
                cartMethod
                  ? "text-light-green fw-700 active"
                  : "text-light-green fw-700"
              )}
              onClick={toggleCart}
            >
              <i className="fas fa-shopping-bag" />
              <span className="user-alert-cart">{products.length}</span>
            </Link>
            <div
              className={classNames(
                cartMethod ? "cart-detail-box show" : "cart-detail-box"
              )}
              onClick={toggleCart}
            >
              <div className="card">
                <div className="card-header padding-15">
                  {" "}
                  {isAuthenticated() && (
                    <Link
                      to="/checkout"
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Proceed to Checkout
                    </Link>
                  )}
                  {!isAuthenticated() && (
                    <Link
                      to="/login"
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Login To Checkout
                    </Link>
                  )}
                </div>
                <div className="card-body no-padding">
                  <div
                    className="cat-product-box"
                    style={{ height: "500px", overflow: "scroll" }}
                  >
                    {products.map((p, i) => (
                      <div key={i} className="cat-product">
                        {p.type === 1 && (
                          <div className="cat-name">
                            <Link to="#">
                              <p className="text-light-green fw-700">
                                <span className="text-dark-white">{p.qte}</span>{" "}
                                {p.title} ({p.size})
                              </p>{" "}
                              {p.pAd &&
                                p.pAd.length > 0 &&
                                p.pAd.map((a, i) => (
                                  <span
                                    key={i}
                                    className="text-light-white fw-700 px-2"
                                  >
                                    {a.title}
                                  </span>
                                ))}
                              {p.gAd &&
                                p.gAd.length > 0 &&
                                p.gAd.map((a, i) => (
                                  <span
                                    key={i}
                                    className="text-light-white fw-700 px-2"
                                  >
                                    {a.title}
                                  </span>
                                ))}
                              <p className="text-info m-2 fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>{" "}
                            </Link>

                            <div className="delete-btn">
                              <Link
                                to="#"
                                onClick={() => {
                                  deleteProduct(p);
                                }}
                                className="text-dark-white fw-700"
                              >
                                {" "}
                                <p>
                                  {" "}
                                  <i className="far fa-trash-alt" />
                                </p>
                              </Link>
                            </div>
                          </div>
                        )}
                        {p.type === 2 && (
                          <div className="cat-name">
                            <Link to="#">
                              <p className="text-light-green fw-700">
                                <span className="text-dark-white">{p.qte}</span>{" "}
                                {p.title} ({p.size})
                              </p>{" "}
                              {p.sAd &&
                                p.sAd.length > 0 &&
                                p.sAd.map((a, i) => (
                                  <span
                                    key={i}
                                    className="text-light-white fw-700 px-2"
                                  >
                                    {a.title}
                                  </span>
                                ))}
                              <p className="text-info m-2 fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>{" "}
                            </Link>

                            <div className="delete-btn">
                              <Link
                                to="#"
                                onClick={() => {
                                  deleteProduct(p);
                                }}
                                className="text-dark-white fw-700"
                              >
                                {" "}
                                <p>
                                  {" "}
                                  <i className="far fa-trash-alt" />
                                </p>
                              </Link>
                            </div>
                          </div>
                        )}
                        {p.type === 3 && (
                          <div className="cat-name">
                            <Link to="#">
                              <p className="text-light-green fw-700">
                                <span className="text-dark-white">{p.qte}</span>{" "}
                                {p.title} ({p.size})
                              </p>{" "}
                              {p.fAd &&
                                p.fAd.length > 0 &&
                                p.fAd.map((a, i) => (
                                  <span
                                    key={i}
                                    className="text-light-white fw-700 px-2"
                                  >
                                    {a.title}
                                  </span>
                                ))}
                              <p className="text-info m-2 fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>{" "}
                            </Link>

                            <div className="delete-btn">
                              <Link
                                to="#"
                                onClick={() => {
                                  deleteProduct(p);
                                }}
                                className="text-dark-white fw-700"
                              >
                                {" "}
                                <p>
                                  {" "}
                                  <i className="far fa-trash-alt" />
                                </p>
                              </Link>
                            </div>
                          </div>
                        )}
                        {p.type === 4 && (
                          <div className="cat-name">
                            <Link to="#">
                              <p className="text-light-green fw-700">
                                <span className="text-dark-white">{p.qte}</span>{" "}
                                My Custom Salad ({p.size})
                              </p>{" "}
                              <p className="text-info m-2 fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>{" "}
                            </Link>

                            <div className="delete-btn">
                              <Link
                                to="#"
                                onClick={() => {
                                  deleteProduct(p);
                                }}
                                className="text-dark-white fw-700"
                              >
                                {" "}
                                <p>
                                  {" "}
                                  <i className="far fa-trash-alt" />
                                </p>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="empty-bag padding-15">
                      {" "}
                      <Link onClick={clearMyCart} to="#">
                        Empty bag
                      </Link>
                    </div>
                    <div className="total-price border-0">
                      {" "}
                      <span className="text-info mx-3  fw-700">
                        Items subtotal:
                      </span>
                      {addTotal()}
                    </div>
                  </div>
                </div>
                <div className="card-footer padding-15"></div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

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
                <div className="logo mainNavCol">
                  <Link to="/">
                    <img src={logo} className="img-fluid" alt="" />
                  </Link>
                </div>

                <div className="main-search mainNavCol">
                  <form className="main-search search-form full-width">
                    {restaurantSelector()}
                  </form>
                </div>
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

                  {showMyCart()}
                </div>
              </div>
              {showMobileRestaurant()}
            </div>
          </div>
        </header>
      </div>
      <div className="main-sec" />
      {selectingRestaurantModel()}
    </Fragment>
  );
}

export default withRouter(Header);
