import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import {
  getCartAll,
  createInvoice,
  clearCart,
  getPromotion,
  sendSms,
  getUsersByRole,
  updateStatus,
} from "./apiCheckout";
import banner from "../../assets/images/checkout/banner.jpg";
import Products from "./Products";

function Content({ selectedRestaurant, cartRefresh, setCartRefresh }) {
  const [promo, setPromo] = useState(false);
  const [promoSubmit, setPromoSubmit] = useState(false);
  const [promotion, setPromotion] = useState();
  const [promotionAmount, setPromotionAmount] = useState(0);
  const [promotionPercentage, setPromotionPercentage] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [errorPromo, setPromoError] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    let role = 3;
    const abortCont = new AbortController();
    getUsersByRole({ role }, token, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          console.log(data.error);
        } else {
          setManagers(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [token]);

  const [invoiceValues, setInvoiceValues] = useState({
    deliveryMethod: false,
    paymentMethod: 0,
    clientId: user._id,
    restaurantId: selectedRestaurant._id,
    pickupRestaurant: selectedRestaurant.title,
    clientName: user.name,
    clientMobile: user.mobile,
    clientDeliveryAddress: "",
    deliveryInstructions: "",
    pickupInstructions: "",
    promotionCode: "",
    totalAmount: 0,
    discount: 0,
    discountPromotion: 0,
    finalAmount: 0,
    orderId: Date.now(),
    products: [],
    formData: "",
    loading: true,
    success: false,
  });
  const {
    deliveryMethod,
    paymentMethod,
    clientId,
    restaurantId,
    pickupRestaurant,
    clientName,
    clientMobile,
    clientDeliveryAddress,
    deliveryInstructions,
    pickupInstructions,
    promotionCode,
    totalAmount,
    discount,
    discountPromotion,
    finalAmount,
    orderId,
    products,
    formData,
    loading,
    success,
  } = invoiceValues;
  const myCart = getCartAll();

  useEffect(() => {
    const myCart = getCartAll();
    const resetCart = () => {
      if (myCart) {
        const subFP = myCart.cartProducts.reduce((a, v) => (a = a + v.tp), 0);
        const subP = (subFP * promotionPercentage) / 100;
        setPromotionAmount(subP);
        const subF = subFP - subP;
        const subD = myCart.cartProducts.reduce(
          (a, v) => (a = a + v.discountAmount),
          0
        );
        const subT = subF + subD + subP;
        setInvoiceValues((v) => ({
          ...v,
          formData: new FormData(),
          totalAmount: subT,
          discount: subD,
          discountPromotion: subP,
          finalAmount: subF,
          products: myCart.cartProducts,
          loading: false,
        }));
      }
    };
    resetCart();
  }, [selectedRestaurant, cartRefresh, promotionPercentage]);

  const showPaymentMethod = () => {
    if (paymentMethod === 0) {
      return (
        <div className="method-type">
          {" "}
          <i className="far fa-money-bill-alt text-dark-white"></i>
          <span className="text-light-white">Cash Payment</span>
        </div>
      );
    }
    if (paymentMethod === 1) {
      return (
        <div className="method-type">
          {" "}
          <i className="far fa-credit-card text-dark-white" />
          <span className="text-light-white">Card Payment</span>
        </div>
      );
    }
    if (paymentMethod === 2) {
      return (
        <div className="method-type">
          {" "}
          <i className="fas fa-money-check-alt text-dark-white"></i>
          <span className="text-light-white">Online Payment</span>
        </div>
      );
    }
  };

  const showPlaceOrder = () => {
    if (paymentMethod === 0) {
      return (
        <div className="col-12 d-flex">
          {" "}
          <Link
            to="#"
            onClick={clickSubmit}
            className="btn-first white-btn fw-600 help-btn"
          >
            Place Your Order Now!
          </Link>
        </div>
      );
    }
    if (paymentMethod === 1) {
      return (
        <div className="col-12 d-flex">
          {" "}
          <Link
            to="#"
            onClick={clickSubmit}
            className="btn-first white-btn fw-600 help-btn"
          >
            Place Your Order Now!
          </Link>
        </div>
      );
    }
    if (paymentMethod === 2) {
      return (
        <PaymentModal
          // Use a unique value for the orderId
          orderId={orderId}
          name={clientName}
          amount={finalAmount}
          email={user.email}
          mobile={clientMobile}
        />
      );
    }
  };

  const showDeliverDetails = () => {
    if (!deliveryMethod) {
      return (
        <div className="row">
          <div className="col-lg-4">
            <div className="recipt-name full-width padding-tb-10 pt-0">
              <h5 className="text-light-black fw-600">Pickup From</h5>
              <p className="text-light-white ">{selectedRestaurant.title}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="recipt-name full-width padding-tb-10 pt-0">
              <h5 className="text-light-black fw-600">Pickup instructions</h5>
              <p className="text-light-white ">{pickupInstructions}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ad-banner padding-tb-10 h-100">
              <img
                src={banner}
                className="img-fluid full-width"
                alt="banner-adv"
              />
            </div>
          </div>
        </div>
      );
    }
    if (deliveryMethod) {
      return (
        <div className="row">
          <div className="col-lg-4">
            <div className="recipt-name full-width padding-tb-10 pt-0">
              <h5 className="text-light-black fw-600">Deliver To</h5>
              <p className="text-light-white ">{clientDeliveryAddress}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="recipt-name full-width padding-tb-10 pt-0">
              <h5 className="text-light-black fw-600">Delivery instructions</h5>
              <p className="text-light-white ">{deliveryInstructions}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ad-banner padding-tb-10 h-100">
              <img
                src={banner}
                className="img-fluid full-width"
                alt="banner-adv"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setInvoiceValues({ ...invoiceValues, [name]: value });
  };

  const selectDelivery = (e) => {
    const value = e.target.value;
    if (value === "true") {
      formData.set("deliveryMethod", true);
      setInvoiceValues({ ...invoiceValues, deliveryMethod: true });
    }
    if (value === "false") {
      formData.set("deliveryMethod", false);
      setInvoiceValues({ ...invoiceValues, deliveryMethod: false });
    }
  };

  const selectPayMethod = (e) => {
    const value = e.target.value;
    if (value === "0") {
      formData.set("paymentMethod", 0);
      setInvoiceValues({ ...invoiceValues, paymentMethod: 0 });
    }
    if (value === "1") {
      formData.set("paymentMethod", 1);
      setInvoiceValues({ ...invoiceValues, paymentMethod: 1 });
    }
    if (value === "2") {
      formData.set("paymentMethod", 2);
      setInvoiceValues({ ...invoiceValues, paymentMethod: 2 });
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setInvoiceValues({ ...invoiceValues, error: "", loading: true });

    createInvoice(user._id, token, {
      deliveryMethod,
      paymentMethod,
      clientId,
      restaurantId,
      pickupRestaurant,
      clientName,
      clientMobile,
      clientDeliveryAddress,
      deliveryInstructions,
      pickupInstructions,
      promotionCode,
      totalAmount,
      discount,
      discountPromotion,
      finalAmount,
      orderId,
      products,
    }).then((data) => {
      if (data.error) {
        setInvoiceValues({ ...invoiceValues, error: data.error });
      } else {
        clearCart(() => {
          setInvoiceValues({ ...invoiceValues, success: true });
          setCartRefresh(!cartRefresh);
          let RestMan = managers.filter(
            ({ restaurant }) => restaurant === restaurantId
          );
          const sendNotify = (m) => {
            let mobile = m.mobile;
            sendSms({ mobile, clientName, clientMobile, orderId }).then(
              (data) => {
                if (data.error) {
                  console.log(data.error);
                }
              }
            );
          };
          RestMan.forEach(sendNotify);
        });
      }
    });
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const showSuccess = () =>
    success && (
      <div className="alert alert-success">
        <h2>Success...</h2>
      </div>
    );

  const redirectUser = () => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const selectPromotion = (e) => {
    const value = e.target.value;
    if (value === "true") {
      setPromo(true);
    }
    if (value === "false") {
      setPromo(false);
    }
  };

  const handlePromotion = (e) => {
    setPromoCode(e.target.value);
  };
  const clickPromotion = (e) => {
    e.preventDefault();
    getPromotion({ promoCode }).then((data) => {
      if (!data) {
        setPromoError("Sorry The Code Not Exist!");
        setPromoSubmit(true);
      } else {
        setPromotion(data);
        if (data.active) {
          let proAmount = (totalAmount * data.amount) / 100;
          setPromotionAmount(proAmount);
          setPromotionPercentage(data.amount);
          setInvoiceValues((v) => ({
            ...v,
            promotionCode: data.code,
          }));
        } else {
          setPromoError("Sorry The Code Expired!");
        }

        setPromoSubmit(true);
      }
    });
  };

  const PaymentModal = ({ orderId, name, amount, email, mobile }) => {
    // Put the payment variables here
    var payment = {
      sandbox: true, // if the account is sandbox or real
      merchant_id: "1217612", // Replace your Merchant ID
      return_url: "http://localhost:3000/user/dashboard",
      cancel_url: "http://localhost:3000/checkout",
      notify_url: "http://10.122.0.2/api/notify",
      order_id: orderId,
      items: "Salad Factory",
      amount: amount,
      currency: "LKR",
      first_name: name,
      last_name: "",
      email: email,
      phone: mobile,
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    // Called when user completed the payment. It can be a successful payment or failure
    window.payhere.onCompleted = function onCompleted() {
      let status = 0;
      updateStatus({
        orderId,
        status,
      }
      ).then((data) => {
        if (data) {
          if (data.error) {
            console.log(data.error);
          } else {
            setInvoiceValues({ ...invoiceValues, success: true });
            let RestMan = managers.filter(
              ({ restaurant }) => restaurant === restaurantId
            );
            const sendNotify = (m) => {
              let mobile = m.mobile;
              sendSms({ mobile, clientName, clientMobile, orderId }).then(
                (data) => {
                  if (data.error) {
                    console.log(data.error);
                  }
                }
              );
            };
            RestMan.forEach(sendNotify);
          }
        }
      });
    };

    // Called when user closes the payment without completing
    window.payhere.onDismissed = function onDismissed() {
      //Note: Prompt user to pay again or show an error page
      let status = 3;

      updateStatus({
        orderId,
        status,
      }).then((data) => {
        if (data) {
          if (data.error) {
            console.log(data.error);
          }
        }
      });
    };

    // Called when error happens when initializing payment such as invalid parameters
    window.payhere.onError = function onError(error) {
      // Note: show an error page
      console.log("Error:" + error);
    };

    function pay() {
      let status = 4;
      createInvoice(user._id, token, {
        status,
        deliveryMethod,
        paymentMethod,
        clientId,
        restaurantId,
        pickupRestaurant,
        clientName,
        clientMobile,
        clientDeliveryAddress,
        deliveryInstructions,
        pickupInstructions,
        promotionCode,
        totalAmount,
        discount,
        discountPromotion,
        finalAmount,
        orderId,
        products,
      }).then((data) => {
        if (data) {
          if (data.error) {
            setInvoiceValues({ ...invoiceValues, error: data.error });
          } else {
            clearCart(() => {
              setCartRefresh(!cartRefresh);
            });
          }
        }
      });
      window.payhere.startPayment(payment);
    }
    return (
      <div className="col-12 d-flex">
        {" "}
        <Link
          to="#"
          onClick={pay}
          className="btn-first white-btn fw-600 help-btn"
        >
          Pay with Payhere
        </Link>
      </div>
    );
  };

  return (
    <Fragment>
      <section className="checkout-page section-padding bg-light-theme">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tracking-sec">
                <div className="tracking-details padding-20 p-relative">
                  <h2 className="text-light-black fw-700 no-margin">
                    {selectedRestaurant.title}
                  </h2>
                  {showLoading()}
                  {showSuccess()}
                  {redirectUser()}
                  <div id="add-listing-tab" className="step-app">
                    <ul className="step-steps">
                      <li className="done">
                        <Link to="#">
                          {" "}
                          <span className="number" />
                          <span className="step-name">
                            Cart Created
                            <br />
                            {new Date().toLocaleTimeString()}
                          </span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link to="#">
                          {" "}
                          <span className="number" />
                          <span className="step-name">Place The Order</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          {" "}
                          <span className="number" />
                          <span className="step-name">
                            Accept By Restaurant
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          {" "}
                          <span className="number" />
                          <span className="step-name">Delivered</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {!promoSubmit && (
                    <Fragment>
                      <h6 className="text-light-black fw-700 mt-4">
                        Do you have a promotional code? {}
                      </h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="form-check">
                              <input
                                className="form-check-input "
                                type="radio"
                                name="promo"
                                value={true}
                                onChange={selectPromotion}
                              />
                              <label className="form-check-label text-light-black fw-700">
                                Yes
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="form-check">
                              <input
                                className="form-check-input "
                                type="radio"
                                name="promo"
                                value={false}
                                onChange={selectPromotion}
                                defaultChecked
                              />
                              <label className="form-check-label text-light-black fw-700">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}

                  {promo && !promoSubmit && (
                    <Fragment>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group">
                            <label className="text-light-black fw-700">
                              Promotion Code
                            </label>
                            <input
                              type="text"
                              value={promoCode}
                              onChange={handlePromotion}
                              className="form-control form-control-submit"
                            />
                          </div>
                          <div className="form-group">
                            <button
                              onClick={clickPromotion}
                              className="btn-second btn-submit full-width"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}

                  {promoSubmit && errorPromo && (
                    <Fragment>
                      <h6 className="text-danger fw-700 mt-4">{errorPromo}</h6>
                    </Fragment>
                  )}
                  {promoSubmit && !errorPromo && (
                    <Fragment>
                      <h6 className="text-success mt-4">
                        For Promotion {promotion.code}, you get{" "}
                        {promotionAmount.toFixed(2)} LKR discount as the{" "}
                        {promotionPercentage}% of your subtotal{" "}
                        {(totalAmount - discount).toFixed(2)}LKR !
                      </h6>
                    </Fragment>
                  )}

                  <h6 className="text-light-black fw-700 mt-4">
                    Home Deliver or Pickup? {}
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="deliveryMethod"
                            value={true}
                            onChange={selectDelivery}
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="deliveryMethod"
                            value={false}
                            onChange={selectDelivery}
                            defaultChecked
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Pickup
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {deliveryMethod && (
                    <Fragment>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="text-light-black fw-700">
                              Delivery Address
                            </label>
                            <textarea
                              value={clientDeliveryAddress}
                              onChange={handleChange("clientDeliveryAddress")}
                              className="form-control form-control-submit"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="text-light-black fw-700">
                              Delivery Instructions
                            </label>
                            <textarea
                              value={deliveryInstructions}
                              onChange={handleChange("deliveryInstructions")}
                              className="form-control form-control-submit"
                            />
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {!deliveryMethod && (
                    <Fragment>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="text-light-black fw-700">
                              Pickup Instructions
                            </label>
                            <textarea
                              value={pickupInstructions}
                              onChange={handleChange("pickupInstructions")}
                              className="form-control form-control-submit"
                            />
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                  <h6 className="text-light-black fw-700 mt-4">
                    Select Your Payment Method
                  </h6>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="paymentMethod"
                            value="0"
                            onChange={selectPayMethod}
                            defaultChecked
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Cash <i className="far fa-money-bill-alt"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="paymentMethod"
                            value="1"
                            onChange={selectPayMethod}
                          />
                          <label className="form-check-label text-light-black fw-700">
                            <i className="far fa-credit-card " /> Card
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="paymentMethod"
                            value="2"
                            onChange={selectPayMethod}
                          />
                          <label className="form-check-label text-light-black fw-700">
                            <i className="fas fa-money-check-alt text-dark-white"></i>{" "}
                            Online
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tracking-map">
                  <iframe
                    id="pickupmap"
                    title="map"
                    src={selectedRestaurant.location}
                  />
                </div>
              </div>
              {/* recipt */}
              <div className="recipt-sec padding-20">
                <div className="recipt-name title u-line full-width mb-xl-20">
                  <div className="recipt-name-box">
                    <h5 className="text-light-black fw-600 mb-2">
                      {clientName}
                    </h5>
                    <p className="text-light-white ">
                      Please check following information are correct before
                      place the order!
                    </p>
                  </div>
                  <div className="countdown-box"></div>
                </div>
                <div className="u-line mb-xl-20">{showDeliverDetails()}</div>
                <div className="u-line mb-xl-20">
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 className="text-light-black fw-600 title">
                        Your Order{" "}
                        <span>
                          <Link to="#" className="fs-12">
                            {new Date().toLocaleDateString(undefined, {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </Link>
                        </span>
                      </h5>
                      <p className="title text-light-white">
                        <span className="text-light-black">
                          OrderId: {orderId}
                        </span>
                      </p>
                    </div>
                    <div className="col-lg-12">
                      {myCart && (
                        <Products
                          products={products}
                          cartRefresh={cartRefresh}
                          setCartRefresh={setCartRefresh}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {myCart && (
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="payment-method mb-md-40">
                        <h5 className="text-light-black fw-600">
                          Payment Method
                        </h5>
                        {showPaymentMethod()}
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="price-table u-line">
                        <div className="item">
                          {" "}
                          <span className="text-light-white">
                            Item subtotal:
                          </span>
                          <span className="text-light-white fw-700">
                            {totalAmount.toFixed(2)} LKR
                          </span>
                        </div>
                        {discount > 0 && (
                          <div className="item">
                            {" "}
                            <span className="text-light-white">Discount:</span>
                            <span className="text-light-white fw-700">
                              -{discount.toFixed(2)} LKR
                            </span>
                          </div>
                        )}
                        {discountPromotion > 0 && (
                          <div className="item">
                            {" "}
                            <span className="text-light-white">
                              {promotion.code}:
                            </span>
                            <span className="text-light-white fw-700">
                              -{discountPromotion.toFixed(2)} LKR
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="total-price padding-tb-10">
                        <h5 className="title text-light-black fw-700">
                          Total: <span>{finalAmount.toFixed(2)} LKR</span>
                        </h5>
                      </div>
                    </div>
                    {showPlaceOrder()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Content;
