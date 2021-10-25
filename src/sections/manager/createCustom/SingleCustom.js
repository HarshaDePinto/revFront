import React, { Fragment, useState, useEffect } from "react";
import { getCartAll, setCartAll } from "./apiCreateCustom";
import { Link } from "react-router-dom";
import { API } from "../../../config";
import Cart from "./Cart";
import { isAuthenticated } from "../../../auth";
import GetPremiumAddon from "./PremiumAddon";
import GetGeneralAddon from "./GeneralAddon";
import GetCustomLettuce from "./CustomLettuce";
import GetCustomThrow from "./CustomThrow";
import GetCustomProtein from "./CustomProtein";
import GetCustomDressing from "./CustomDressing";
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

function SingleCustom({ custom }) {
  const [run, setRun] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = isAuthenticated();
  const restaurantId = user.restaurant;

  const [cartItem, setCartItem] = useState({
    type: 4,
    iId: "",
    pathName: "customCartEdit",
    title: "",
    size: "Junior",
    itemPrice: 0,
    discount: 0,
    discountAmount: 0,
    pAI: [],
    pAd: [],
    pAP: 0,
    gAI: [],
    gAd: [],
    gAP: 0,
    cLI: [],
    cLd: [],
    cLP: 0,
    cTI: [],
    cTd: [],
    cTP: 0,
    cPI: [],
    cPd: [],
    cPP: 0,
    cDI: [],
    cDd: [],
    cDP: 0,
    qte: 1,
    tp: 0,
  });

  const { title, itemPrice, size } = cartItem;

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

  const [cartCustomLettuceSet, setCartCustomLettuceSet] = useState({
    selectedCustomLettuceId: [],
    selectedCustomLettuce: [],
    totalCustomLettucePrice: 0,
  });
  const { selectedCustomLettuce, totalCustomLettucePrice } =
    cartCustomLettuceSet;

  const [cartCustomThrowSet, setCartCustomThrowSet] = useState({
    selectedCustomThrowId: [],
    selectedCustomThrow: [],
    totalCustomThrowPrice: 0,
  });
  const { selectedCustomThrow, totalCustomThrowPrice } = cartCustomThrowSet;

  const [cartCustomProteinSet, setCartCustomProteinSet] = useState({
    selectedCustomProteinId: [],
    selectedCustomProtein: [],
    totalCustomProteinPrice: 0,
  });
  const { selectedCustomProtein, totalCustomProteinPrice } =
    cartCustomProteinSet;

  const [cartCustomDressingSet, setCartCustomDressingSet] = useState({
    selectedCustomDressingId: [],
    selectedCustomDressing: [],
    totalCustomDressingPrice: 0,
  });
  const { selectedCustomDressing, totalCustomDressingPrice } =
    cartCustomDressingSet;

  useEffect(() => {
    setItemTotal(custom.price_junior);
    setCartItem((v) => ({
      ...v,
      iId: custom._id,
      title: custom.title,
      itemPrice: custom.price_junior,
      tp: custom.price_junior,
    }));
  }, [custom]);

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
    const y = p + totalPremiumAddonPrice + totalGeneralAddonPrice;
    const x = itemQuantity;
    const z = y * x;
    setItemTotal(z);

    if (p === custom.price_junior) {
      setCartItem({
        ...cartItem,
        itemPrice: p,
        size: "Junior",
        tp: z,
      });
    }
    if (p === custom.price_jumbo) {
      setCartItem({
        ...cartItem,
        itemPrice: p,
        size: "Jumbo",
        tp: z,
      });
    }
    if (run) {
      setRun(false);
    } else {
      setRun(true);
    }
  };

  const selectQuantity = (e) => {
    const x = e.target.value;
    const y = itemPrice + totalPremiumAddonPrice + totalGeneralAddonPrice;
    const z = y * x;
    setItemQuantity(x);
    setItemTotal(z);
    setCartItem({
      ...cartItem,
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
        {itemTotal > 0 &&
          selectedCustomLettuce.length >= parseInt(custom.lettuceMin, 10) &&
          selectedCustomLettuce.length <= parseInt(custom.lettuceMax, 10) &&
          selectedCustomThrow.length >= parseInt(custom.throwMin, 10) &&
          selectedCustomThrow.length <= parseInt(custom.throwMax, 10) &&
          selectedCustomProtein.length >= parseInt(custom.proteinMin, 10) &&
          selectedCustomProtein.length <= parseInt(custom.proteinMax, 10) &&
          selectedCustomDressing.length === 1 && (
            <StyledButtonThree
              
              onClick={addProductToCart}
              
            >
              Add Item To The Cart
            </StyledButtonThree>
          )}
      </Fragment>
    );
  };

  const LettuceChecker = () => {
    if (selectedCustomLettuce.length < parseInt(custom.lettuceMin, 10)) {
      return (
        <span className="text-danger">
          {" "}
          Select at least {parseInt(custom.lettuceMin, 10)} Lettuce !
        </span>
      );
    }
    if (selectedCustomLettuce.length > parseInt(custom.lettuceMax, 10)) {
      return (
        <span className="text-danger">
          {" "}
          *Should less than {parseInt(custom.lettuceMax, 10)}!
        </span>
      );
    }
  };

  const ThrowChecker = () => {
    if (selectedCustomThrow.length < parseInt(custom.throwMin, 10)) {
      return (
        <span className="text-danger">
          {" "}
          Select at least {parseInt(custom.throwMin, 10)} Throw !
        </span>
      );
    }
    if (selectedCustomThrow.length > parseInt(custom.throwMax, 10)) {
      return (
        <span className="text-danger">
          {" "}
          *Should less than {parseInt(custom.throwMax, 10)}!
        </span>
      );
    }
  };

  const ProteinChecker = () => {
    if (selectedCustomProtein.length < parseInt(custom.proteinMin, 10)) {
      return (
        <span className="text-danger">
          {" "}
          Select at least {parseInt(custom.proteinMin, 10)} Protein !
        </span>
      );
    }
    if (selectedCustomProtein.length > parseInt(custom.proteinMax, 10)) {
      return (
        <span className="text-danger">
          {" "}
          *Should less than {parseInt(custom.proteinMax, 10)}!
        </span>
      );
    }
  };

  const DressingChecker = () => {
    if (selectedCustomDressing.length < 1) {
      return <span className="text-danger"> Select at least one !</span>;
    }
    if (selectedCustomDressing.length > 1) {
      return <span className="text-danger"> *Only one dressing allowed!</span>;
    }
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
                                        {custom.title}
                                      </Link>
                                    </h6>
                                  </div>
                                  <div className="restaurent-product-label"></div>
                                </div>
                                <div className="restaurent-product-rating">
                                  <div className="ratings"></div>
                                  <div className="rating-text"></div>
                                </div>
                              </div>
                              <div className="restaurent-product-caption-box">
                                <span className="text-light-white">
                                  {custom.description}
                                </span>
                              </div>

                              <div className="restaurent-tags-price">
                                <div className="restaurent-tags"></div>{" "}
                                <div className="restaurent-product-price">
                                  <h6 className="text-success fw-600 no-margin">
                                    {custom.price_junior} LKR /{" "}
                                    {custom.price_jumbo} LKR
                                  </h6>
                                </div>
                              </div>
                            </div>

                            <div className="restaurent-product-img">
                              <img
                                src={`${API}/custom/photo/${custom._id}`}
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
                  <h6>Please Select The Size: </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="itemPrice"
                            value={custom.price_junior}
                            onChange={selectPrice}
                            defaultChecked
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Junior
                            <span className="text-info mx-2">
                              {custom.price_junior} LKR
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
                            value={custom.price_jumbo}
                            onChange={selectPrice}
                          />
                          <label className="form-check-label text-light-black fw-700">
                            Jumbo :
                            <span className="text-info mx-2">
                              {custom.price_jumbo} LKR
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h6>
                    Your Choice of Lettuce (Choose min {custom.lettuceMin} and
                    max {custom.lettuceMax}
                    ):{LettuceChecker()}
                  </h6>

                  <GetCustomLettuce
                    addonRole="4"
                    cartCustomLettuceSet={cartCustomLettuceSet}
                    setCartCustomLettuceSet={setCartCustomLettuceSet}
                    totalCustomLettucePrice={totalCustomLettucePrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    itemFinalPrice={itemPrice}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
                    totalCustomThrowPrice={totalCustomThrowPrice}
                    totalCustomProteinPrice={totalCustomProteinPrice}
                    totalCustomDressingPrice={totalCustomDressingPrice}
                    setItemTotal={setItemTotal}
                    selectedRestaurantId={restaurantId}
                  />

                  <h6>
                    Your Choice of Throw Ins (Choose min {custom.throwMin} and
                    max {custom.throwMax}
                    ):{ThrowChecker()}
                  </h6>

                  <GetCustomThrow
                    addonRole="5"
                    cartCustomThrowSet={cartCustomThrowSet}
                    setCartCustomThrowSet={setCartCustomThrowSet}
                    totalCustomThrowPrice={totalCustomThrowPrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    itemFinalPrice={itemPrice}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
                    totalCustomLettucePrice={totalCustomLettucePrice}
                    totalCustomProteinPrice={totalCustomProteinPrice}
                    totalCustomDressingPrice={totalCustomDressingPrice}
                    setItemTotal={setItemTotal}
                    selectedRestaurantId={restaurantId}
                  />

                  <h6>
                    Your Choice of Protein (Choose min {custom.proteinMin} and
                    max {custom.proteinMax}
                    ):{ProteinChecker()}
                  </h6>

                  <GetCustomProtein
                    addonRole="6"
                    cartCustomProteinSet={cartCustomProteinSet}
                    setCartCustomProteinSet={setCartCustomProteinSet}
                    totalCustomProteinPrice={totalCustomProteinPrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    itemFinalPrice={itemPrice}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
                    totalCustomLettucePrice={totalCustomLettucePrice}
                    totalCustomThrowPrice={totalCustomThrowPrice}
                    totalCustomDressingPrice={totalCustomDressingPrice}
                    setItemTotal={setItemTotal}
                    selectedRestaurantId={restaurantId}
                  />

                  <h6>Your Choice of Dressing :{DressingChecker()}</h6>

                  <GetCustomDressing
                    addonRole="7"
                    cartCustomDressingSet={cartCustomDressingSet}
                    setCartCustomDressingSet={setCartCustomDressingSet}
                    totalCustomDressingPrice={totalCustomDressingPrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    itemFinalPrice={itemPrice}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
                    totalCustomLettucePrice={totalCustomLettucePrice}
                    totalCustomThrowPrice={totalCustomThrowPrice}
                    totalCustomProteinPrice={totalCustomProteinPrice}
                    setItemTotal={setItemTotal}
                    selectedRestaurantId={restaurantId}
                  />

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
                    itemFinalPrice={itemPrice}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    totalCustomLettucePrice={totalCustomLettucePrice}
                    totalCustomThrowPrice={totalCustomThrowPrice}
                    totalCustomProteinPrice={totalCustomProteinPrice}
                    totalCustomDressingPrice={totalCustomDressingPrice}
                    setItemTotal={setItemTotal}
                    selectedRestaurantId={restaurantId}
                  />

                  <GetGeneralAddon
                    addonRole="1"
                    cartGeneralAddonSet={cartGeneralAddonSet}
                    setCartGeneralAddonSet={setCartGeneralAddonSet}
                    totalGeneralAddonPrice={totalGeneralAddonPrice}
                    setItemTotal={setItemTotal}
                    itemFinalPrice={itemPrice}
                    setRun={setRun}
                    run={run}
                    setCartItem={setCartItem}
                    cartItem={cartItem}
                    itemQuantity={itemQuantity}
                    totalPremiumAddonPrice={totalPremiumAddonPrice}
                    totalCustomLettucePrice={totalCustomLettucePrice}
                    totalCustomThrowPrice={totalCustomThrowPrice}
                    totalCustomProteinPrice={totalCustomProteinPrice}
                    totalCustomDressingPrice={totalCustomDressingPrice}
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
                itemFinalPrice={itemPrice}
                selectedPremiumAddon={selectedPremiumAddon}
                size={size}
                totalPremiumAddonPrice={totalPremiumAddonPrice}
                selectedGeneralAddon={selectedGeneralAddon}
                totalGeneralAddonPrice={totalGeneralAddonPrice}
                selectedCustomLettuce={selectedCustomLettuce}
                totalCustomLettucePrice={totalCustomLettucePrice}
                selectedCustomThrow={selectedCustomThrow}
                totalCustomThrowPrice={totalCustomThrowPrice}
                selectedCustomProtein={selectedCustomProtein}
                totalCustomProteinPrice={totalCustomProteinPrice}
                selectedCustomDressing={selectedCustomDressing}
                totalCustomDressingPrice={totalCustomDressingPrice}
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

export default SingleCustom;
