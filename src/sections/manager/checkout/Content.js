import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { getCartAll, createInvoice, clearCart } from "./apiCheckout";
import { isAuthenticated } from "../../../auth";
import styled from "styled-components";
import Products from "./Products";
import { Roller } from "react-awesome-spinners";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "./PrintInvoice";
import PrintKitchen from "./PrintKitchen";


const StyledButton = styled.button`
  background-color: #f79550;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const StyledButtonIn = styled.button`
  background-color: #228b22;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const StyledButtonCk = styled.button`
  background-color: #000000;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, token } = isAuthenticated();
  const restaurantId = user.restaurant;
  const componentRef = useRef();
  const componentRef2 = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
   
  });
  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });

  const [invoiceValues, setInvoiceValues] = useState({
    deliveryMethod: false,
    paymentStatus: true,
    paymentMethod: 0,
    clientId: "",
    restaurantId: restaurantId,
    pickupRestaurant: "",
    clientName: "",
    clientMobile: 0,
    totalAmount: 0,
    discount: 0,
    discountPromotion: 0,
    finalAmount: 0,
    cashierId: user._id,
    cashierName: user.name,
    status: 2,
    orderId: Date.now(),
    products: [],
    loading: false,
    success: false,
  });
  const {
    paymentMethod,
    clientName,
    clientMobile,
    totalAmount,
    discount,
    finalAmount,
    orderId,
    products,
    loading,
    success,
    status,
    cashierId,
    cashierName,
    paymentStatus,
  } = invoiceValues;
  const myCart = getCartAll();

  useEffect(() => {
    const myCart = getCartAll();
    const resetCart = () => {
      if (myCart) {
        const subFP = myCart.cartProducts.reduce((a, v) => (a = a + v.tp), 0);
        const subF = subFP;
        const subD = myCart.cartProducts.reduce(
          (a, v) => (a = a + v.discountAmount),
          0
        );
        const subT = subF + subD;
        setInvoiceValues((v) => ({
          ...v,
          totalAmount: subT,
          discount: subD,
          finalAmount: subF,
          products: myCart.cartProducts,
          loading: false,
        }));
      }
    };
    resetCart();
  }, []);
  const showLoading = () => loading && <Roller color="#F79550" />;
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

  const selectPayMethod = (e) => {
    const value = e.target.value;
    if (value === "0") {
      setInvoiceValues({ ...invoiceValues, paymentMethod: 0 });
    }
    if (value === "1") {
      setInvoiceValues({ ...invoiceValues, paymentMethod: 1 });
    }
    if (value === "2") {
      setInvoiceValues({ ...invoiceValues, paymentMethod: 2 });
    }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setInvoiceValues({ ...invoiceValues, [name]: value });
  };

  const mobileChecker = () => {
    if (clientMobile.toString().length < 10) {
      return (
        <span className="fs-16 text-danger">*Please Enter Client Mobile!</span>
      );
    }
    if (clientMobile.toString().length > 10) {
      return (
        <span className="fs-16 text-danger">
          *Mobile Number Should Less Than 10 Digits!
        </span>
      );
    }
  };

  const nameChecker = () => {
    if (!clientName) {
      return (
        <span className="fs-16 text-danger">*Please Enter Client Name!</span>
      );
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setInvoiceValues({ ...invoiceValues, error: "", loading: true });

    createInvoice(user._id, token, {
      paymentMethod,
      restaurantId,
      clientName,
      clientMobile,
      totalAmount,
      discount,
      finalAmount,
      orderId,
      products,
      status,
      cashierId,
      cashierName,
      paymentStatus,
    }).then((data) => {
      if (data.error) {
        setInvoiceValues({
          ...invoiceValues,
          error: data.error,
          loading: false,
        });
      } else {
        clearCart(() => {
          setInvoiceValues({ ...invoiceValues, success: true, loading: false });
        });
      }
    });
  };

  const redirectUser = () => {
    if (success) {
      return <Redirect to="/manager/dashboard" />;
    }
  };

  const showPlaceOrder = () => {
    if (clientMobile.toString().length === 10 && clientName) {
      return (
        <div className="col-12 d-flex">
          {" "}
          <StyledButton onClick={clickSubmit}>Place Order</StyledButton>
        </div>
      );
    }
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
                          <Link to="/manager/dashboard" className="add-res-tab">
                            Dashboard
                          </Link>
                        </li>

                        <li className="add-res-tab">
                          <Link
                            to="/manager/createOrder"
                            className="add-res-tab"
                          >
                            New Order
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/deliveredOrders"
                            className="add-res-tab"
                          >
                            Delivered Orders
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/salesByProducts"
                            className="add-res-tab"
                          >
                            Sales By Products
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/changeAvailability"
                            className="add-res-tab"
                          >
                            Change Availability
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link to="/manager/inventory" className="add-res-tab">
                            Inventory
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      {showLoading()}
                      {redirectUser()}
                      {!loading && (
                        <Fragment>
                          {" "}
                          <div className="recipt-sec padding-20">
                            <div className="recipt-name title u-line full-width mb-xl-20">
                              <div className="recipt-name-box">
                                <h5 className="text-light-black fw-600 mb-2">
                                  Client Details
                                </h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label className="text-light-black fw-700">
                                        Client Name {nameChecker()}
                                      </label>
                                      <input
                                        type="text"
                                        value={clientName}
                                        onChange={handleChange("clientName")}
                                        className="form-control form-control-submit"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label className="text-light-black fw-700">
                                        Client Mobile {mobileChecker()}
                                      </label>
                                      <input
                                        type="number"
                                        value={clientMobile}
                                        onChange={handleChange("clientMobile")}
                                        className="form-control form-control-submit"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <h6 className="text-light-black fw-700 mt-4">
                                  Select Payment Method
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
                                          Cash{" "}
                                          <i className="far fa-money-bill-alt"></i>
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
                                          <i className="far fa-credit-card " />{" "}
                                          Card
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <h2 className="text-light-white ">
                                  Please check following information are correct
                                  before place the order!
                                </h2>
                              </div>
                            </div>

                            <div className="u-line mb-xl-20">
                              <div className="row">
                                <div className="col-lg-12">
                                  <h5 className="text-light-black fw-600 title">
                                    Your Order{" "}
                                    <span>
                                      <Link to="#" className="fs-12">
                                        {new Date().toLocaleDateString(
                                          undefined,
                                          {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          }
                                        )}
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
                                  <Products products={products} />
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
                                    {paymentStatus && (
                                      <>
                                        <p className="text-success fw-600">
                                          Paid
                                        </p>
                                      </>
                                    )}
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
                                        <span className="text-light-white">
                                          Discount:
                                        </span>
                                        <span className="text-light-white fw-700">
                                          -{discount.toFixed(2)} LKR
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="total-price padding-tb-10">
                                    <h5 className="title text-light-black fw-700">
                                      Total:{" "}
                                      <span>{finalAmount.toFixed(2)} LKR</span>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-lg-4 col-sm-12">
                              <StyledButtonIn
                                onClick={handlePrint}
                               
                              >
                                {" "}
                                Print Client Invoice
                              </StyledButtonIn>
                            </div>
                            <div className="col-lg-4 col-sm-12">{showPlaceOrder()}</div>
                            <div className="col-lg-4 col-sm-12"> <StyledButtonCk
                                onClick={handlePrint2}
                                
                              >
                                {" "}
                                Kitchen Order{" "}
                              </StyledButtonCk></div>
                          </div>
                        </Fragment>
                      )}
                    </div>
                    <div style={{ display: "none" }}>
                      <div ref={componentRef}>
                        <PrintInvoice clientName={clientName} orderId={orderId} products={products} paymentMethod={paymentMethod} paymentStatus={paymentStatus} totalAmount={totalAmount} discount={discount} finalAmount={finalAmount} />
                      </div>
                    </div>
                    <div style={{ display: "none" }}>
                      <div ref={componentRef2}>
                      <PrintKitchen clientName={clientName} orderId={orderId} products={products} />
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
