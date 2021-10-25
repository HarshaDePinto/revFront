import React, { Fragment, useState, useEffect } from "react";
import { getCartAll, setCartAll } from "./apiCreateSalad";
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
import GetGeneralAddon from "./GeneralAddon";
import GetPremiumAddon from "./PremiumAddon";
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

function SingleSalad({ salad }) {
  const [run, setRun] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = isAuthenticated();
  const restaurantId = user.restaurant;
  const rating = parseInt(salad.rating, 10);
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
          {salad.rating}
        </span>
      );
    }
    if (rating <= 5 && rating > 2) {
      return (
        <span className="text-custom-white rectangle-tag bg-yellow">
          {salad.rating}
        </span>
      );
    }
    if (rating > 5) {
      return (
        <span className="text-custom-white rectangle-tag bg-green">
          {salad.rating}
        </span>
      );
    }
  };

  const [cartItem, setCartItem] = useState({
    type: 1,
    iId: "",
    pathName: "saladCartEdit",
    title: "",
    size: "Junior",
    discount: 0,
    discountAmount: 0,
    itemPrice: 0,
    itemFinalPrice: 0,
    pAI: [],
    pAd: [],
    pAP: 0,
    gAI: [],
    gAd: [],
    gAP: 0,
    qte: 1,
    tp: 0,
  });

  const { title, discount, itemPrice, itemFinalPrice, size } = cartItem;

  useEffect(() => {
    setDiscountAmount((salad.price_junior * salad.discount) / 100);
    setItemTotal(
      salad.price_junior - (salad.price_junior * salad.discount) / 100
    );
    setCartItem((v) => ({
      ...v,
      iId: salad._id,
      title: salad.title,
      discount: salad.discount,
      itemPrice: salad.price_junior,
      itemFinalPrice:
        salad.price_junior - (salad.price_junior * salad.discount) / 100,
      tp: salad.price_junior - (salad.price_junior * salad.discount) / 100,
    }));
  }, [salad]);

  const [cartPremiumAddonSet, setCartPremiumAddonSet] = useState({
    selectedPremiumAddonId: [],
    selectedPremiumAddon: [],
    totalPremiumAddonPrice: 0,
  });
  const { selectedPremiumAddon, totalPremiumAddonPrice } = cartPremiumAddonSet;

  const [cartGeneralAddonSet, setCartGeneralAddonSet] = useState({
    selectedGeneralAddonId: [],
    selectedGeneralAddon: [],
    totalGeneralAddonPrice: 0,
  });
  const { selectedGeneralAddon, totalGeneralAddonPrice } = cartGeneralAddonSet;

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
    const y = q + totalPremiumAddonPrice + totalGeneralAddonPrice;
    const x = itemQuantity;
    const z = y * x;
    setItemTotal(z);

    if (p === salad.price_junior) {
      setCartItem({
        ...cartItem,
        itemPrice: p,
        itemFinalPrice: p - (p * discount) / 100,
        discountAmount: (p * discount) / 100,
        size: "Junior",
        tp: z,
      });
    }
    if (p === salad.price_jumbo) {
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
    const y = itemFinalPrice + totalPremiumAddonPrice + totalGeneralAddonPrice;
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
                                        {salad.title}
                                      </Link>
                                    </h6>
                                    <p className="text-light-white">
                                      {salad.calorie} Cal
                                    </p>
                                  </div>
                                  <div className="restaurent-product-label">
                                    {salad.discount > 0 ? (
                                      <div className="custom-tag mx-2">
                                        {" "}
                                        <span className="text-custom-white rectangle-tag bg-gradient-red">
                                          {" "}
                                          {salad.discount}% off
                                        </span>{" "}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {salad.discount > 0 ||
                                    salad.discount !== "" ? (
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
                                  {salad.description}
                                </span>
                              </div>

                              <div className="restaurent-tags-price">
                                <div className="restaurent-tags">
                                  {salad.vegetable && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="vegetable"
                                        src={vegetable}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {salad.cheese && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="cheese"
                                        src={cheese}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {salad.nut && (
                                    <span className="text-custom-white square-tag">
                                      <img data-tip="nut" src={nut} alt="tag" />
                                    </span>
                                  )}
                                  {salad.egg && (
                                    <span className="text-custom-white square-tag">
                                      <img data-tip="egg" src={egg} alt="tag" />
                                    </span>
                                  )}
                                  {salad.spicy && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="spicy"
                                        src={spicy}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {salad.meat && (
                                    <span className="text-custom-white square-tag">
                                      <img
                                        data-tip="meat"
                                        src={meat}
                                        alt="tag"
                                      />
                                    </span>
                                  )}
                                  {salad.chef && (
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
                                    {salad.price_junior} LKR /{" "}
                                    {salad.price_jumbo} LKR
                                  </h6>
                                </div>
                              </div>
                            </div>

                            <div className="restaurent-product-img">
                              <img
                                src={`${API}/salad/photo/${salad._id}`}
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
                            value={salad.price_junior}
                            onChange={selectPrice}
                            defaultChecked
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Junior
                            <span className="text-info mx-2">
                              {salad.price_junior} LKR
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
                            value={salad.price_jumbo}
                            onChange={selectPrice}
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Jumbo :
                            <span className="text-info mx-2">
                              {salad.price_jumbo} LKR
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <GetPremiumAddon
                    addonRole="0"
                    cartPremiumAddonSet={cartPremiumAddonSet}
                    setCartPremiumAddonSet={setCartPremiumAddonSet}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    itemFinalPrice={itemFinalPrice}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    setItemTotal={setItemTotal}
                    selectedRestaurantId={restaurantId}
                  />

                  <GetGeneralAddon
                    addonRole="1"
                    cartGeneralAddonSet={cartGeneralAddonSet}
                    setCartGeneralAddonSet={setCartGeneralAddonSet}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    setItemTotal={setItemTotal}
                    itemFinalPrice={itemFinalPrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
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
                selectedPremiumAddon={selectedPremiumAddon}
                size={size}
                totalPremiumAddonPrice={totalPremiumAddonPrice}
                selectedGeneralAddon={selectedGeneralAddon}
                totalGeneralAddonPrice={totalGeneralAddonPrice}
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

export default SingleSalad;
