import React, { Fragment, useEffect, useState } from "react";
import { getCartAll, readRestaurant } from "./apiDeliveredOrders";
import { isAuthenticated } from "../../../auth";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
    }}
  />
);

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
                    {products.map((p, i) => (
                    <Fragment key={i}>
                      {p.type === 1 && (
                        <div className="card-body no-padding ">
                          <div className="row ml-2">
                            <div className="col-8">
                              <p className="text-light-green fw-700">
                                {p.title} ({p.size} )
                              </p>
                            </div>
                            <div className="col-4">
                              <p className="text-dark-white fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.pAd && p.pAd.length > 0 && (
                                <p className="text-black fw-700">
                                  Premium Addons
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.pAd &&
                                p.pAd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="row ml-2">
                            <div className="col-12">
                              {p.gAd && p.gAd.length > 0 && (
                                <p className="text-black fw-700">
                                  General Addons
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.gAd &&
                                p.gAd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <hr />
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Salad ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemPrice.toFixed(2)} LKR</b>
                                  </div>
                                </div>
                              )}

                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discount ({p.discount}%)</b>
                                  </div>
                                  <div className="col-5">
                                    <b>
                                      -{" "}
                                      {(p.itemPrice - p.itemFinalPrice).toFixed(
                                        2
                                      )}{" "}
                                      LKR
                                    </b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discounted Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b> {p.itemFinalPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              {!p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Salad ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemFinalPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.pAP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Premium Addons Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.pAP} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              {p.gAP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>General Addons Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.gAP} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Quantity</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.qte} x{" "}
                                    {(p.gAP + p.pAP + p.itemFinalPrice).toFixed(
                                      2
                                    )}{" "}
                                    LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Subtotal</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.tp.toFixed(2)}
                                    LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ColoredLine color="#F79550" />
                        </div>
                      )}

                      {p.type === 2 && (
                        <div className="card-body no-padding ">
                          <div className="row ml-2">
                            <div className="col-8">
                              <p className="text-light-green fw-700">
                                {p.title} ({p.size} )
                              </p>
                            </div>
                            <div className="col-4">
                              <p className="text-dark-white fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.sAd && p.sAd.length > 0 && (
                                <p className="text-black fw-700">Soup Addons</p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.sAd &&
                                p.sAd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <hr />
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Soup ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemPrice} LKR</b>
                                  </div>
                                </div>
                              )}

                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discount ({p.discount}%)</b>
                                  </div>
                                  <div className="col-5">
                                    <b>
                                      -{" "}
                                      {(p.itemPrice - p.itemFinalPrice).toFixed(
                                        2
                                      )}{" "}
                                      LKR
                                    </b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discounted Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b> {p.itemFinalPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              {!p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Salad ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemFinalPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.sAP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Soup Addons Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.sAP} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Quantity</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.qte} x{" "}
                                    {(p.sAP + p.itemFinalPrice).toFixed(2)} LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Subtotal</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.tp.toFixed(2)}
                                    LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ColoredLine color="#F79550" />
                        </div>
                      )}
                      {p.type === 3 && (
                        <div className="card-body no-padding ">
                          <div className="row ml-2">
                            <div className="col-8">
                              <p className="text-light-green fw-700">
                                {p.title} ({p.size} )
                              </p>
                            </div>
                            <div className="col-4">
                              <p className="text-dark-white fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.fAd && p.fAd.length > 0 && (
                                <p className="text-black fw-700">Food Addons</p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.fAd &&
                                p.fAd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <hr />
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Food ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemPrice.toFixed(2)} LKR</b>
                                  </div>
                                </div>
                              )}

                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discount ({p.discount}%)</b>
                                  </div>
                                  <div className="col-5">
                                    <b>
                                      -{" "}
                                      {(p.itemPrice - p.itemFinalPrice).toFixed(
                                        2
                                      )}{" "}
                                      LKR
                                    </b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discounted Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b> {p.itemFinalPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              {!p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Salad ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemFinalPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.fAP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Food Addons Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.fAP} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Quantity</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.qte} x{" "}
                                    {(p.fAP + p.itemFinalPrice).toFixed(2)} LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Subtotal</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.tp.toFixed(2)}
                                    LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ColoredLine color="#F79550" />
                        </div>
                      )}

                      {p.type === 4 && (
                        <div className="card-body no-padding ">
                          <div className="row ml-2">
                            <div className="col-8">
                              <p className="text-light-green fw-700">
                                Custom Salad ({p.size} )
                              </p>
                            </div>
                            <div className="col-4">
                              <p className="text-dark-white fw-700">
                                {p.tp.toFixed(2)} LKR
                              </p>
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.cLd && p.cLd.length > 0 && (
                                <p className="text-black fw-700">Lettuce</p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.cLd &&
                                p.cLd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.cTd && p.cTd.length > 0 && (
                                <p className="text-black fw-700">Throw</p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.cTd &&
                                p.cTd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.cDd && p.cDd.length > 0 && (
                                <p className="text-black fw-700">Dressing</p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.cDd &&
                                p.cDd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-12">{a.title}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-12">
                              {p.cPd && p.cPd.length > 0 && (
                                <p className="text-black fw-700">Protein</p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.cPd &&
                                p.cPd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="row ml-2">
                            <div className="col-12">
                              {p.pAd && p.pAd.length > 0 && (
                                <p className="text-black fw-700">
                                  Premium Addons
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.pAd &&
                                p.pAd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="row ml-2">
                            <div className="col-12">
                              {p.gAd && p.gAd.length > 0 && (
                                <p className="text-black fw-700">
                                  General Addons
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.gAd &&
                                p.gAd.map((a, i) => (
                                  <div key={i} className="row">
                                    <div className="col-7">{a.title}</div>
                                    <div className="col-5">{a.price} LKR</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <hr />
                          <div className="row ml-2">
                            <div className="col-8">
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Salad ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemPrice.toFixed(2)} LKR</b>
                                  </div>
                                </div>
                              )}

                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discount ({p.discount}%)</b>
                                  </div>
                                  <div className="col-5">
                                    <b>
                                      - {(p.itemPrice - p.itemPrice).toFixed(2)}{" "}
                                      LKR
                                    </b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Discounted Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b> {p.itemPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              {!p.discount > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Salad ({p.size} ) Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.itemPrice.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.cPP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Protein Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.cPP.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              {p.pAP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>Premium Addons Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.pAP.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}

                              {p.gAP > 0 && (
                                <div className="row">
                                  <div className="col-7">
                                    <b>General Addons Price</b>
                                  </div>
                                  <div className="col-5">
                                    <b>{p.gAP.toFixed(2)} LKR</b>
                                    <hr />
                                  </div>
                                </div>
                              )}
                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Quantity</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.qte} x{" "}
                                    {(
                                      p.gAP +
                                      p.pAP +
                                      p.cPP +
                                      p.itemPrice
                                    ).toFixed(2)}{" "}
                                    LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                              <div className="row text-info ">
                                <div className="col-7">
                                  <b>Subtotal</b>
                                </div>
                                <div className="col-5">
                                  <b>
                                    {p.tp.toFixed(2)}
                                    LKR
                                  </b>
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ColoredLine color="#F79550" />
                        </div>
                      )}
                    </Fragment>
                  ))}
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
