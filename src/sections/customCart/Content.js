import React, { Fragment, useState, useEffect } from "react";
import { readCustom, getCartAll, setCartAll } from "./apiCustomCart";
import { Link, useParams } from "react-router-dom";
import SingleSalad from "./SingleSalad";
import GetPremiumAddon from "./PremiumAddon";
import Cart from "./Cart";
import GetGeneralAddon from "./GeneralAddon";
import { Roller } from "react-awesome-spinners";
import OtherCategory from "./OtherCategory";
import banner from "../../assets/images/soup/banner.jpg";
import thumb from "../../assets/images/soup/thumb.jpg";
import GetCustomLettuce from "./CustomLettuce";
import GetCustomThrow from "./CustomThrow";
import GetCustomProtein from "./CustomProtein";
import GetCustomDressing from "./CustomDressing";
function Content({ selectedRestaurantId, cartRefresh, setCartRefresh }) {
  const { customId } = useParams();
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [custom, setCustom] = useState();

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
    const abortCont = new AbortController();
    readCustom(customId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(true);
        } else {
          setCustom(data);
          setItemTotal(data.price_junior);
          setCartItem((v) => ({
            ...v,
            iId: data._id,
            title: data.title,
            itemPrice: data.price_junior,
            tp: data.price_junior,
          }));
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [customId, selectedRestaurantId, cartRefresh]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setProduct(cartItem);
  }, [run, selectedRestaurantId, cartRefresh, cartItem]);

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
  }, [run, selectedRestaurantId, cartRefresh]);

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
      setCartRefresh(!cartRefresh);
    });
  };

  const showAvailable = (r) => {
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
            <Link
              to="#"
              onClick={addProductToCart}
              className="btn-first white-btn full-width text-light-green fw-600 my-2"
            >
              Add Item To The Cart
            </Link>
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

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;
  return (
    <Fragment>
      <section className="register-restaurent-sec section-padding bg-light-theme">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="sidebar-tabs main-box padding-20 mb-md-40">
                <div id="add-restaurent-tab" className="step-app">
                  <div className="row">
                    <div className="col-xl-8 col-lg-7 ">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            {showError()}
                            {showLoading()}
                            <div className="row">
                              <div className="col-12">
                                {!loading && <SingleSalad salad={custom} />}
                              </div>
                            </div>
                            <h4>Please Let Us Know Your Preferences...</h4>
                            <h6>Please Select The Size: </h6>
                            {!loading && (
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
                            )}

                            {!loading && (
                              <h6>
                                Your Choice of Lettuce (Choose min{" "}
                                {custom.lettuceMin} and max {custom.lettuceMax}
                                ):{LettuceChecker()}
                              </h6>
                            )}

                            {!loading && (
                              <GetCustomLettuce
                                addonRole="4"
                                cartCustomLettuceSet={cartCustomLettuceSet}
                                setCartCustomLettuceSet={
                                  setCartCustomLettuceSet
                                }
                                totalCustomLettucePrice={
                                  totalCustomLettucePrice
                                }
                                setRun={setRun}
                                run={run}
                                setCartItem={setCartItem}
                                cartItem={cartItem}
                                itemQuantity={itemQuantity}
                                itemFinalPrice={itemPrice}
                                totalGeneralAddonPrice={totalGeneralAddonPrice}
                                totalPremiumAddonPrice={totalPremiumAddonPrice}
                                totalCustomThrowPrice={totalCustomThrowPrice}
                                totalCustomProteinPrice={
                                  totalCustomProteinPrice
                                }
                                totalCustomDressingPrice={
                                  totalCustomDressingPrice
                                }
                                setItemTotal={setItemTotal}
                                selectedRestaurantId={selectedRestaurantId}
                              />
                            )}

                            {!loading && (
                              <h6>
                                Your Choice of Throw Ins (Choose min{" "}
                                {custom.throwMin} and max {custom.throwMax}
                                ):{ThrowChecker()}
                              </h6>
                            )}

                            {!loading && (
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
                                totalCustomLettucePrice={
                                  totalCustomLettucePrice
                                }
                                totalCustomProteinPrice={
                                  totalCustomProteinPrice
                                }
                                totalCustomDressingPrice={
                                  totalCustomDressingPrice
                                }
                                setItemTotal={setItemTotal}
                                selectedRestaurantId={selectedRestaurantId}
                              />
                            )}

                            {!loading && (
                              <h6>
                                Your Choice of Protein (Choose min{" "}
                                {custom.proteinMin} and max {custom.proteinMax}
                                ):{ProteinChecker()}
                              </h6>
                            )}

                            {!loading && (
                              <GetCustomProtein
                                addonRole="6"
                                cartCustomProteinSet={cartCustomProteinSet}
                                setCartCustomProteinSet={
                                  setCartCustomProteinSet
                                }
                                totalCustomProteinPrice={
                                  totalCustomProteinPrice
                                }
                                setRun={setRun}
                                run={run}
                                setCartItem={setCartItem}
                                cartItem={cartItem}
                                itemQuantity={itemQuantity}
                                itemFinalPrice={itemPrice}
                                totalGeneralAddonPrice={totalGeneralAddonPrice}
                                totalPremiumAddonPrice={totalPremiumAddonPrice}
                                totalCustomLettucePrice={
                                  totalCustomLettucePrice
                                }
                                totalCustomThrowPrice={totalCustomThrowPrice}
                                totalCustomDressingPrice={
                                  totalCustomDressingPrice
                                }
                                setItemTotal={setItemTotal}
                                selectedRestaurantId={selectedRestaurantId}
                              />
                            )}

                            {!loading && (
                              <h6>
                                Your Choice of Dressing :{DressingChecker()}
                              </h6>
                            )}

                            {!loading && (
                              <GetCustomDressing
                                addonRole="7"
                                cartCustomDressingSet={cartCustomDressingSet}
                                setCartCustomDressingSet={
                                  setCartCustomDressingSet
                                }
                                totalCustomDressingPrice={
                                  totalCustomDressingPrice
                                }
                                setRun={setRun}
                                run={run}
                                setCartItem={setCartItem}
                                cartItem={cartItem}
                                itemQuantity={itemQuantity}
                                itemFinalPrice={itemPrice}
                                totalGeneralAddonPrice={totalGeneralAddonPrice}
                                totalPremiumAddonPrice={totalPremiumAddonPrice}
                                totalCustomLettucePrice={
                                  totalCustomLettucePrice
                                }
                                totalCustomThrowPrice={totalCustomThrowPrice}
                                totalCustomProteinPrice={
                                  totalCustomProteinPrice
                                }
                                setItemTotal={setItemTotal}
                                selectedRestaurantId={selectedRestaurantId}
                              />
                            )}

                            {!loading && (
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
                                totalCustomLettucePrice={
                                  totalCustomLettucePrice
                                }
                                totalCustomThrowPrice={totalCustomThrowPrice}
                                totalCustomProteinPrice={
                                  totalCustomProteinPrice
                                }
                                totalCustomDressingPrice={
                                  totalCustomDressingPrice
                                }
                                setItemTotal={setItemTotal}
                                selectedRestaurantId={selectedRestaurantId}
                              />
                            )}

                            {!loading && (
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
                                totalCustomLettucePrice={
                                  totalCustomLettucePrice
                                }
                                totalCustomThrowPrice={totalCustomThrowPrice}
                                totalCustomProteinPrice={
                                  totalCustomProteinPrice
                                }
                                totalCustomDressingPrice={
                                  totalCustomDressingPrice
                                }
                                selectedRestaurantId={selectedRestaurantId}
                              />
                            )}

                            {!loading && (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="text-light-black fw-700">
                                    How many items do you need ?
                                    {quantityChecker()}
                                  </label>
                                  <input
                                    type="number"
                                    value={itemQuantity}
                                    onChange={selectQuantity}
                                    className="form-control form-control-submit"
                                  />
                                </div>
                              </div>
                            )}
                            {!loading && showAvailable(custom.restaurants)}
                          </div>
                          <h5 className="text-light-black fw-700 mt-4">
                            Check A Soup That Goes With This Salad!
                          </h5>
                          <div className="testimonial-wrapper my-2">
                            <div className="testimonial-box">
                              <div className="testimonial-img p-relative">
                                <img
                                  src={banner}
                                  className="img-fluid full-width"
                                  alt="testimonial-img"
                                />

                                <div className="overlay">
                                  <div className="brand-logo">
                                    <img
                                      src={thumb}
                                      className="img-fluid"
                                      alt="logo"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="testimonial-caption padding-15">
                                <h5 className="fw-600">
                                  <span className="text-light-black">
                                    Soups
                                  </span>
                                </h5>

                                <p className="text-light-black">
                                  Soups that goes with your salads
                                </p>

                                <Link
                                  to={`/soupCategory`}
                                  className="btn-second btn-submit"
                                >
                                  Check More
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 mb-md-40">
                      <div className="sidebar">
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
                          cartRefresh={cartRefresh}
                          setCartRefresh={setCartRefresh}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <OtherCategory />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Content;
