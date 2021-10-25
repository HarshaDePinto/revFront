import React, { Fragment, useState, useEffect } from "react";
import { readSalad, getCartAll, setCartAll } from "./apiSaladCart";
import { Link, useParams } from "react-router-dom";
import SingleSalad from "./SingleSalad";
import GetPremiumAddon from "./PremiumAddon";
import Cart from "./Cart";
import GetGeneralAddon from "./GeneralAddon";
import { Roller } from "react-awesome-spinners";
import OtherCategory from "./OtherCategory";
import banner from "../../assets/images/soup/banner.jpg";
import thumb from "../../assets/images/soup/thumb.jpg";
function Content({ selectedRestaurantId, cartRefresh, setCartRefresh }) {
  const { saladId } = useParams();
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [salad, setSalad] = useState();

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
    const abortCont = new AbortController();
    readSalad(saladId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(true);
        } else {
          setSalad(data);
          setDiscountAmount((data.price_junior * data.discount) / 100);
          setItemTotal(
            data.price_junior - (data.price_junior * data.discount) / 100
          );
          setCartItem((v) => ({
            ...v,
            iId: data._id,
            title: data.title,
            discount: data.discount,
            itemPrice: data.price_junior,
            itemFinalPrice:
              data.price_junior - (data.price_junior * data.discount) / 100,
            tp: data.price_junior - (data.price_junior * data.discount) / 100,
          }));
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [saladId, selectedRestaurantId, cartRefresh]);

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
      setCartRefresh(!cartRefresh);
    });
  };

  const showAvailable = (r) => {
    if (JSON.stringify(r).includes(selectedRestaurantId)) {
      return (
        <Fragment>
          {itemTotal > 0 && (
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
    } else {
      return (
        <Link
          to="#"
          className="btn-first white-btn full-width text-light-green fw-600 my-2"
        >
          Sorry Not Available!
        </Link>
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
                                {!loading && (
                                  <SingleSalad
                                    salad={salad}
                                    selectedRestaurantId={selectedRestaurantId}
                                  />
                                )}
                              </div>
                            </div>
                            <h4>Please Let Us Know Your Preferences...</h4>
                            {!loading && (
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
                                itemFinalPrice={itemFinalPrice}
                                totalGeneralAddonPrice={totalGeneralAddonPrice}
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
                                itemFinalPrice={itemFinalPrice}
                                setRun={setRun}
                                run={run}
                                setCartItem={setCartItem}
                                cartItem={cartItem}
                                itemQuantity={itemQuantity}
                                totalPremiumAddonPrice={totalPremiumAddonPrice}
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
                            {!loading && showAvailable(salad.restaurants)}
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
