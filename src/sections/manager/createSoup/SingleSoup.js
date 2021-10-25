import React, { Fragment, useState, useEffect } from "react";
import { getCartAll, setCartAll } from "./apiCreateSoup";
import { Link } from "react-router-dom";
import { API } from "../../../config";
import smile from "../../../assets/images/icon/smile.svg";
import smile1 from "../../../assets/images/icon/smile1.svg";
import cheese from "../../../assets/images/icon/cheese.svg";
import chef from "../../../assets/images/icon/chef.svg";
import egg from "../../../assets/images/icon/egg.svg";
import meat from "../../../assets/images/icon/meat.svg";
import nut from "../../../assets/images/icon/nut.svg";
import spicy from "../../../assets/images/icon/spicy.svg";
import vegetable from "../../../assets/images/icon/vegetable.svg";
import straight from "../../../assets/images/icon/straight.svg";
import ReactTooltip from "react-tooltip";
import Cart from "./Cart";
import { isAuthenticated } from "../../../auth";
import GetSoupAddon from "./SoupAddon";
import styled from "styled-components";

const StyledButtonThree = styled.button`
  background-color: #228b22;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;

function SingleSoup({ soup }) {
  const [run, setRun] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = isAuthenticated();
  const restaurantId = user.restaurant;
  const rating = parseInt(soup.rating, 10);
  const showRatingImage = (rating) => {
    if (rating <= 2) {
      return <img data-tip="Good" src={straight} alt="tag" />;
    }
    if (rating <= 5 && rating > 2) {
      return <img data-tip="Very Good" src={smile} alt="tag" />;
    }
    if (rating > 5) {
      return <img data-tip="Amazing" src={smile1} alt="tag" />;
    }
  };

  const showRating = (rating) => {
    if (rating <= 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-red">
          {soup.rating}
        </span>
      );
    }
    if (rating <= 5 && rating > 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-yellow">
          {soup.rating}
        </span>
      );
    }
    if (rating > 5) {
      return (
        <span className="text-custom-white rectangle-tag bg-green">
          {soup.rating}
        </span>
      );
    }
  };

  const [cartItem, setCartItem] = useState({
    type: 2,
    iId: "",
    pathName: "soupCartEdit",
    title: "",
    size: "Junior",
    discount: "",
    discountAmount: 0,
    itemPrice: 0,
    itemFinalPrice: 0,
    sAI: [],
    sAd: [],
    sAP: 0,
    qte: 1,
    tp: 0,
  });

  const { title, discount, itemPrice, itemFinalPrice, size } = cartItem;

  const [cartSoupAddonSet, setCartSoupAddonSet] = useState({
    selectedSoupAddonId: [],
    selectedSoupAddon: [],
    totalSoupAddonPrice: 0,
  });
  const { selectedSoupAddon, totalSoupAddonPrice } = cartSoupAddonSet;

  useEffect(() => {
    setDiscountAmount((soup.price_junior * soup.discount) / 100);
    setItemTotal(soup.price_junior - (soup.price_junior * soup.discount) / 100);
    setCartItem((v) => ({
      ...v,
      iId: soup._id,
      title: soup.title,
      discount: soup.discount,
      itemPrice: soup.price_junior,
      itemFinalPrice:
        soup.price_junior - (soup.price_junior * soup.discount) / 100,
      tp: soup.price_junior - (soup.price_junior * soup.discount) / 100,
    }));
  }, [soup]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setProduct(cartItem);
  }, [run, cartItem]);

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
  }, [run]);

  const selectPrice = (e) => {
    const p = parseFloat(e.target.value);
    const q = p - (p * discount) / 100;
    const y = q + totalSoupAddonPrice;
    const x = itemQuantity;
    const z = y * x;
    setItemTotal(z);

    if (p === soup.price_junior) {
      setCartItem({
        ...cartItem,
        itemPrice: p,
        itemFinalPrice: p - (p * discount) / 100,
        discountAmount: (p * discount) / 100,
        size: "Junior",
        tp: z,
      });
    }
    if (p === soup.price_jumbo) {
      setCartItem({
        ...cartItem,
        itemPrice: p,
        itemFinalPrice: p - (p * discount) / 100,
        discountAmount: (p * discount) / 100,
        size: "Jumbo",
        tp: z,
      });
    }
    setDiscountAmount((p * discount) / 100);
    if (run) {
      setRun(false);
    } else {
      setRun(true);
    }
  };

  const selectQuantity = (e) => {
    const x = e.target.value;
    const y = itemFinalPrice + totalSoupAddonPrice;
    const z = y * x;
    const d = discountAmount * x;
    setItemQuantity(x);
    setItemTotal(z);
    setCartItem({
      ...cartItem,
      discountAmount: d,
      qte: x,
      tp: z,
    });
    if (run) {
      setRun(false);
    } else {
      setRun(true);
    }
  };
  const quantityChecker = () => {
    if (parseInt(itemQuantity, 10) < 0) {
      return <sup className="fs-16">*Quantity Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };

  const addProductToCart = () => {
    const newP = [...products];
    newP.push(product);
    const cartProducts = newP;
    setCartAll({ cartProducts }, () => {
      setRun(!run);
    });
  };

  const showAvailable = () => {
    return (
      <Fragment>
        {itemTotal > 0 && (
          <StyledButtonThree
         
            onClick={addProductToCart}
            
          >
            Add Item To The Cart
          </StyledButtonThree>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div id="add-restaurent-tab" className="step-app">
        <div className="row">
          <div className="col-xl-8 col-lg-7 ">
            <div className="step-content">
              <div className="step-tab-panel active" id="steppanel1">
                <div className="general-sec">
                  <div className="row">
                    <div className="col-12">
                      <Fragment>
                        <ReactTooltip type="warning" />
                        <div className="restaurent-product-list">
                          <div className="restaurent-product-detail">
                            <div className="restaurent-product-left">
                              <div className="restaurent-product-title-box">
                                <div className="restaurent-product-box">
                                  <div className="restaurent-product-title">
                                    <h6 className="mb-2">
                                      <Link
                                        to="#"
                                        className="text-light-black fw-600"
                                      >
                                        {soup.title}
                                      </Link>
                                    </h6>
                                    <p className="text-light-white">
                                      {soup.calorie} Cal
                                    </p>
                                  </div>
                                  <div className="restaurent-product-label">
                                    {soup.discount > 0 ? (
                                      <div className="custom-tag mx-2">
                                        {" "}
                                        <span className="text-custom-white rectangle-tag bg-gradient-red">
                                          {" "}
                                          {soup.discount}% off
                                        </span>{" "}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {soup.discount > 0 ||
                                    soup.discount !== "" ? (
                                      <Fragment />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="restaurent-product-rating">
                                  <div className="ratings">
                                    {showRating(rating)}
                                  </div>
                                  <div className="rating-text"></div>
                                </div>
                              </div>
                              <div className="restaurent-product-caption-box">
                                <span className="text-light-white">
                                  {soup.description}
                                </span>
                              </div>

                              <div className="restaurent-tags-price">
                                <div className="restaurent-tags">
                                  {soup.vegetable && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="vegetable"
                                        src={vegetable}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {soup.cheese && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="cheese"
                                        src={cheese}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {soup.nut && (
                                    <span className="text-custom-white square-tag">
                                      <img data-tip="nut" src={nut} alt="tag" />
                                    </span>
                                  )}
                                  {soup.egg && (
                                    <span className="text-custom-white square-tag">
                                      <img data-tip="egg" src={egg} alt="tag" />
                                    </span>
                                  )}
                                  {soup.spicy && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="spicy"
                                        src={spicy}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {soup.meat && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="meat"
                                        src={meat}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {soup.chef && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="Chef Recommended"
                                        src={chef}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                </div>{" "}
                                <span className="circle-tag">
                                  {showRatingImage(rating)}
                                </span>
                                <div className="restaurent-product-price">
                                  <h6 className="text-success fw-600 no-margin">
                                    {soup.price_junior} LKR / {soup.price_jumbo}{" "}
                                    LKR
                                  </h6>
                                </div>
                              </div>
                            </div>

                            <div className="restaurent-product-img">
                              <img
                                src={`${API}/soup/photo/${soup._id}`}
                                className="img-fluid"
                                alt="#"
                              />
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    </div>
                  </div>
                  <h4>Please Let Us Know Your Preferences...</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="itemPrice"
                            value={soup.price_junior}
                            onChange={selectPrice}
                            defaultChecked
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Junior
                            <span className="text-info mx-2">
                              {soup.price_junior} LKR
                            </span>
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
                            name="itemPrice"
                            value={soup.price_jumbo}
                            onChange={selectPrice}
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Jumbo :
                            <span className="text-info mx-2">
                              {soup.price_jumbo} LKR
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <GetSoupAddon
                      addonRole="2"
                      cartSoupAddonSet={cartSoupAddonSet}
                      setCartSoupAddonSet={setCartSoupAddonSet}
                      totalSoupAddonPrice={totalSoupAddonPrice}
                      setRun={setRun}
                      run={run}
                      setCartItem={setCartItem}
                      cartItem={cartItem}
                      itemQuantity={itemQuantity}
                      itemFinalPrice={itemFinalPrice}
                      setItemTotal={setItemTotal}
                      selectedRestaurantId={restaurantId}
                    />

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="text-light-black fw-700">
                        How many items do you need ?{quantityChecker()}
                      </label>
                      <input
                        type="number"
                        value={itemQuantity}
                        onChange={selectQuantity}
                        className="form-control form-control-submit"
                      />
                    </div>
                  </div>
                  {showAvailable()}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 mb-md-40">
            <div className="sidebar">
              {" "}
              <Cart
                title={title}
                itemPrice={itemPrice}
                discount={discount}
                discountAmount={discountAmount}
                itemFinalPrice={itemFinalPrice}
                selectedSoupAddon={selectedSoupAddon}
                size={size}
                totalSoupAddonPrice={totalSoupAddonPrice}
                itemQuantity={itemQuantity}
                itemTotal={itemTotal}
                products={products}
                setRun={setRun}
                run={run}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SingleSoup;
