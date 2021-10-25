import React, { Fragment } from "react";
import { setCartAll, clearCart } from "./apiCreateSoup";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";

function Cart({
  title,
  itemPrice,
  selectedSoupAddon,
  size,
  discount,
  discountAmount,
  itemFinalPrice,
  totalSoupAddonPrice,
  itemTotal,
  itemQuantity,
  products,
  setRun,
  run,
}) {

  const deleteProduct = (p) => {
    const position = products.indexOf(p);
    products.splice(position, 1);
    const cartProducts = products;
    setCartAll({ cartProducts }, () => {
      setRun(!run);
      
    });
  };

  const clearMyCart = () => {
    clearCart(() => {
      if (run) {
        setRun(false);
      } else {
        setRun(true);
      }
    });

    setRun(!run);
    
  };

  const addTotal = () => {
    const subT = products.reduce((a, v) => (a = a + v.tp), 0);
    return <span className="text-info  fw-700">{subT.toFixed(2)} LKR </span>;
  };

  return (
    <Fragment>
      <div className="cart-detail-box">
        <div className="card">
          <div className="card-header padding-15 fw-700">Ongoing Order</div>

          <div className="card-body no-padding ">
            <div className="row ml-2">
              <div className="col-8">
                <p className="text-light-green fw-700">
                  {title} ({size} )
                </p>
              </div>
              <div className="col-4">
                <p className="text-dark-white fw-700">{itemPrice.toFixed(2)} LKR</p>
              </div>
            </div>
            <div className="row ml-2">
              <div className="col-12">
                {selectedSoupAddon && selectedSoupAddon.length > 0 && (
                  <p className="text-black fw-700">Soup Addons</p>
                )}
              </div>
            </div>
            <div className="row ml-2">
              <div className="col-8">
                {selectedSoupAddon &&
                  selectedSoupAddon.map((a, i) => (
                    <div key={i} className="row">
                      <div className="col-7">{a.title}</div>
                      <div className="col-5">{a.price} LKR</div>
                    </div>
                  ))}
              </div>
            </div>
            <hr />
            <div className="row ml-2">
              <div className="col-12">
                {discount > 0 && (
                  <div className="row">
                    <div className="col-7">
                      <b>Soup ({size} ) Price</b>
                    </div>
                    <div className="col-5">
                      <b>{itemPrice.toFixed(2)} LKR</b>
                    </div>
                  </div>
                )}

                {discount > 0 && (
                  <div className="row">
                    <div className="col-7">
                      <b>Discount ({discount}%)</b>
                    </div>
                    <div className="col-5">
                      <b>- {discountAmount.toFixed(2)} LKR</b>
                      <hr />
                    </div>
                  </div>
                )}
                {discount > 0 && (
                  <div className="row">
                    <div className="col-7">
                      <b>Discounted Price</b>
                    </div>
                    <div className="col-5">
                      <b> {itemFinalPrice.toFixed(2)} LKR</b>
                      <hr />
                    </div>
                  </div>
                )}

                {!discount > 0 && (
                  <div className="row">
                    <div className="col-7">
                      <b>Soup ({size} ) Price</b>
                    </div>
                    <div className="col-5">
                      <b>{itemFinalPrice.toFixed(2)} LKR</b>
                      <hr />
                    </div>
                  </div>
                )}
                {totalSoupAddonPrice > 0 && (
                  <div className="row">
                    <div className="col-7">
                      <b>Soup Addons Price</b>
                    </div>
                    <div className="col-5">
                      <b>{totalSoupAddonPrice} LKR</b>
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
                      {itemQuantity} x{" "}
                      {(totalSoupAddonPrice +
                        itemFinalPrice).toFixed(2)}{" "}
                      LKR
                    </b>
                    <hr />
                  </div>
                </div>
                <div className="row text-info ">
                  <div className="col-7">
                    <b>Subtotal </b>
                  </div>
                  <div className="col-5">
                    <b>
                      {itemTotal.toFixed(2)} LKR
                    </b>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {products && products.length > 0 && (
        <div className="cart-detail-box mt-5">
          <div className="card">
            <div className="card-header padding-15 fw-700">Your Order</div>
            <div className="card-body no-padding" id="scrollstyle-4">
              <div className="cat-product-box">
                {products.map((p, i) => (
                  <div key={i} className="cat-product">
                    {p.type === 1 && (
                      <Fragment>
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
                            <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>{" "}
                          </Link>
                        </div>

                        <div className="price">
                          <Link
                            to="#"
                            onClick={() => {
                              deleteProduct(p);
                            }}
                            className="text-dark-white"
                          >
                            {" "}
                            <i className="far fa-trash-alt" />
                          </Link>
                        </div>
                      </Fragment>
                    )}

                    {p.type === 2 && (
                      <Fragment>
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
                            <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>{" "}
                          </Link>
                        </div>

                        <div className="price">
                          <Link
                            to="#"
                            onClick={() => {
                              deleteProduct(p);
                            }}
                            className="text-dark-white"
                          >
                            {" "}
                            <i className="far fa-trash-alt" />
                          </Link>
                        </div>
                      </Fragment>
                    )}
                    {p.type === 3 && (
                      <Fragment>
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
                            <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>{" "}
                          </Link>
                        </div>

                        <div className="price">
                          <Link
                            to="#"
                            onClick={() => {
                              deleteProduct(p);
                            }}
                            className="text-dark-white"
                          >
                            {" "}
                            <i className="far fa-trash-alt" />
                          </Link>
                        </div>
                      </Fragment>
                    )}
                    {p.type === 4 && (
                      <Fragment>
                        <div className="cat-name">
                          <Link to="#">
                            <p className="text-light-green fw-700">
                              <span className="text-dark-white">{p.qte}</span>{" "}
                              My Custom Salad ({p.size})
                            </p>{" "}
                            
                            <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>{" "}
                          </Link>
                        </div>

                        <div className="price">
                          <Link
                            to="#"
                            onClick={() => {
                              deleteProduct(p);
                            }}
                            className="text-dark-white"
                          >
                            {" "}
                            <i className="far fa-trash-alt" />
                          </Link>
                        </div>
                      </Fragment>
                    )}
                  </div>
                ))}
              </div>

              <div className="item-total">
                <div className="total-price border-0">
                  {" "}
                  <span className="text-info  fw-700">Items subtotal:</span>
                  {addTotal()}
                </div>
                <div className="empty-bag padding-15 fw-700">
                  {" "}
                  <Link to="#" onClick={clearMyCart}>
                    Empty bag
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-footer padding-15">
              {" "}
              {isAuthenticated() && (
                <Link
                  to="/manager/checkout"
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
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Cart;
