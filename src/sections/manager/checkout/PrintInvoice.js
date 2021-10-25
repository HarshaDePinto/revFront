import React, { Fragment, useEffect, useState } from "react";
import { getCartAll, readRestaurant } from "./apiCheckout";
import { isAuthenticated } from "../../../auth";
import Products from "./Products";

function PrintInvoice({
  clientName,
  orderId,
  products,
  paymentMethod,
  paymentStatus,
  totalAmount,
  discount,
  finalAmount,
}) {
  const [managerRestaurant, setManagerRestaurant] = useState([]);
  const [error, setError] = useState(false);
  const { user } = isAuthenticated();
  const myCart = getCartAll();

  useEffect(() => {
    const { user } = isAuthenticated();
    const restaurantId = user.restaurant;
    const abortCont = new AbortController();
    readRestaurant(restaurantId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setManagerRestaurant(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

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

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  return (
    <Fragment>
      {showError()}
      <section className="checkout-page section-padding bg-light-theme">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tracking-sec">
                <div className="tracking-details padding-20 p-relative">
                  <h2 className="text-light-black fw-700 no-margin">
                    {managerRestaurant.title}
                  </h2>
                  <p>Manager: {user.name}</p>
                  <p>Mobile:0{user.mobile}</p>
                </div>
              </div>
              {/* recipt */}
              <div className="recipt-sec padding-20">
                <div className="u-line mb-xl-20">
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 className="text-light-black fw-600 title">
                        Your Order <span></span>
                      </h5>
                      <p className="title text-light-white">
                        <span className="text-light-black">
                          OrderId:{orderId}
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
                            <p className="text-success fw-600">Paid</p>
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
                            <span className="text-light-white">Discount:</span>
                            <span className="text-light-white fw-700">
                              -{discount.toFixed(2)} LKR
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
                  </div>
                )}
              </div>
              <div className="tracking-sec">
                <div className="tracking-details padding-20 p-relative">
                  <h2 className="text-light-black fw-700 no-margin">
                    Thank You! {clientName}
                  </h2>
                  <p>Please Come Again!</p>

                  <p>{Date()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default PrintInvoice;
