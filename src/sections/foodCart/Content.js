import React, { Fragment, useState, useEffect } from "react";
import { readFood, getCartAll, setCartAll } from "./apiFoodCart";
import { Link, useParams } from "react-router-dom";
import SingleFood from "./SingleFood";
import GetFoodAddon from "./FoodAddon";
import Cart from "./Cart";
import { Roller } from "react-awesome-spinners";
import OtherCategory from "./OtherCategory";

function Content({ selectedRestaurantId, cartRefresh, setCartRefresh }) {
  const { foodId } = useParams();
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [food, setFood] = useState();

  const [cartItem, setCartItem] = useState({
    type: 3,
    iId: "",
    pathName: "foodCartEdit",
    title: "",
    size: "Junior",
    discount: "",
    discountAmount: 0,
    itemPrice: 0,
    itemFinalPrice: 0,
    fAI: [],
    fAd: [],
    fAP: 0,
    qte: 1,
    tp: 0,
  });

  const { title, discount, itemPrice, itemFinalPrice, size } = cartItem;
  const [cartFoodAddonSet, setCartFoodAddonSet] = useState({
    selectedFoodAddonId: [],
    selectedFoodAddon: [],
    totalFoodAddonPrice: 0,
  });
  const { selectedFoodAddon, totalFoodAddonPrice } = cartFoodAddonSet;

  useEffect(() => {
    const abortCont = new AbortController();
    readFood(foodId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(true);
        } else {
          setFood(data);
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
  }, [foodId, selectedRestaurantId, cartRefresh]);

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
    const y = q + totalFoodAddonPrice;
    const x = itemQuantity;
    const z = y * x;
    setItemTotal(z);

    if (p === food.price_junior) {
      setCartItem({
        ...cartItem,
        itemPrice: p,
        itemFinalPrice: p - (p * discount) / 100,
        discountAmount: (p * discount) / 100,
        size: "Junior",
        tp: z,
      });
    }
    if (p === food.price_jumbo) {
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
    const y = itemFinalPrice + totalFoodAddonPrice;
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
                                  <SingleFood
                                    food={food}
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
                                        value={food.price_junior}
                                        onChange={selectPrice}
                                        defaultChecked
                                      />
                                      <label className="form-check-label text-light-black fw-700">
                                        Junior
                                        <span className="text-info mx-2">
                                          {food.price_junior} LKR
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
                                        value={food.price_jumbo}
                                        onChange={selectPrice}
                                      />
                                      <label className="form-check-label text-light-black fw-700">
                                        Jumbo :
                                        <span className="text-info mx-2">
                                          {food.price_jumbo} LKR
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {!loading && (
                              <GetFoodAddon
                                addonRole="2"
                                cartFoodAddonSet={cartFoodAddonSet}
                                setCartFoodAddonSet={setCartFoodAddonSet}
                                totalFoodAddonPrice={totalFoodAddonPrice}
                                setRun={setRun}
                                run={run}
                                setCartItem={setCartItem}
                                cartItem={cartItem}
                                itemQuantity={itemQuantity}
                                itemFinalPrice={itemFinalPrice}
                                setItemTotal={setItemTotal}
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
                            {!loading && showAvailable(food.restaurants)}
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
                          selectedFoodAddon={selectedFoodAddon}
                          size={size}
                          totalFoodAddonPrice={totalFoodAddonPrice}
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
