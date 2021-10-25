import React, { Fragment } from "react";
import { Link } from "react-router-dom";


function SingleOrder({ singleOD, setShowAll, setShowSingle }) {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );

  const resetCart = (o) => {
    const subF = o.products.reduce((a, v) => (a = a + v.tp), 0);
    const subD = o.products.reduce((a, v) => (a = a + v.discountAmount), 0);
    const subT = subF + subD;

    return (
      <div className="col-lg-5">
        <div className="price-table u-line">
          <div className="item">
            {" "}
            <span className="text-light-white">Item subtotal:</span>
            <span className="text-light-white">{subT.toFixed(2)} LKR</span>
          </div>
          {subD > 0 && (
            <div className="item">
              {" "}
              <span className="text-light-white">Discount:</span>
              <span className="text-light-white">-{subD.toFixed(2)} LKR</span>
            </div>
          )}
          {o.discountPromotion > 0 && (
            <div className="item">
              {" "}
              <span className="text-light-white">
                Promotion {o.promotionCode}:
              </span>
              <span className="text-light-white">
                -{o.discountPromotion.toFixed(2)} LKR
              </span>
            </div>
          )}
        </div>
        <div className="total-price padding-tb-10">
          <h5 className="title text-light-black fw-700">
            Total: <span>{o.finalAmount.toFixed(2)} LKR</span>
          </h5>
        </div>
      </div>
    );
  };

  const showPaymentMethod = (paymentMethod) => {
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

  const clickShowAll = () => {
    setShowAll(true);
    setShowSingle(false);
  };


  return (
    <Fragment>
      <div className="recipt-sec padding-20">
        <div className="recipt-name title u-line full-width mb-xl-20">
          <div className="recipt-name-box">
            <h5 className="text-light-black fw-600 mb-2">
              {singleOD.clientName}
            </h5>
            <p className="text-light-white ">
              Mobile: 0{singleOD.clientMobile}
            </p>
          </div>
          <div className="countdown-box"></div>
        </div>
        <div className="u-line mb-xl-20">
          {singleOD.deliveryMethod && (
            <div className="row">
              <div className="col-lg-6">
                <div className="recipt-name full-width padding-tb-10 pt-0">
                  <h5 className="text-light-black fw-600">Delivery Address</h5>

                  <p className="text-light-white">
                    {singleOD.clientDeliveryAddress}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="recipt-name full-width padding-tb-10 pt-0">
                  <h5 className="text-light-black fw-600">
                    Delivery instructions
                  </h5>
                  <p className="text-light-white ">
                    {singleOD.deliveryInstructions}
                  </p>
                </div>
              </div>
            </div>
          )}
          {!singleOD.deliveryMethod && (
            <div className="row">
              <div className="col-lg-6">
                <div className="recipt-name full-width padding-tb-10 pt-0">
                  <h5 className="text-light-black fw-600">Pickup Restaurant</h5>
                  <p className="text-light-white">
                    {singleOD.pickupRestaurant}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="recipt-name full-width padding-tb-10 pt-0">
                  <h5 className="text-light-black fw-600">
                    Pickup instructions
                  </h5>
                  <p className="text-light-white ">
                    {singleOD.pickupInstructions}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="u-line mb-xl-20">
          <div className="row">
            <div className="col-lg-12">
              <h5 className="text-light-black fw-600 title">
                Order ID : {singleOD.orderId}
                <span>
                  <Link to="#" className="fs-12">
                    {new Date(singleOD.createdAt).toLocaleDateString(
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
            </div>
            <div className="col-lg-12">
              {singleOD.products.map((p, i) => (
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
                            <p className="text-black fw-700">Premium Addons</p>
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
                            <p className="text-black fw-700">General Addons</p>
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
                                  {(p.itemPrice - p.itemFinalPrice).toFixed(2)}{" "}
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
                                {(p.gAP + p.pAP + p.itemFinalPrice).toFixed(2)}{" "}
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
                                  {(p.itemPrice - p.itemFinalPrice).toFixed(2)}{" "}
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
                                  {(p.itemPrice - p.itemFinalPrice).toFixed(2)}{" "}
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
                            <p className="text-black fw-700">Premium Addons</p>
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
                            <p className="text-black fw-700">General Addons</p>
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
                                  - {(p.itemPrice - p.itemPrice).toFixed(2)} LKR
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
                                {(p.gAP + p.pAP + p.cPP + p.itemPrice).toFixed(
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
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="payment-method mb-md-40">
              <h5 className="text-light-black fw-600">Payment Method</h5>
              {showPaymentMethod(singleOD.paymentMethod)}
            </div>
          </div>
          {resetCart(singleOD)}
        </div>
        <div className="row">
          <div className="col-lg-4">
           
          </div>
          <div className="col-lg-4">
            
          </div>
          <div className="col-lg-4">
            <Link
              to="#"
              onClick={clickShowAll}
              className="btn-first white-btn fw-600 help-btn mr-0"
            >
              Show All Orders
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SingleOrder;
