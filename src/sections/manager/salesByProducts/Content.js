import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInvoiceByDate } from "./apiSalesByProducts";
import { isAuthenticated } from "../../../auth";
import { Roller } from "react-awesome-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Content() {
  const [deliveredOD, setDeliveredOD] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startDateS, setStartDateS] = useState(new Date());
  const [endDateS, setEndDateS] = useState(new Date());
  const [salad, setSalad] = useState([]);
  const [saladQte, setSaladQte] = useState(0);
  const [saladMny, setSaladMny] = useState(0);
  const [soup, setSoup] = useState([]);
  const [soupQte, setSoupQte] = useState(0);
  const [soupMny, setSoupMny] = useState(0);
  const [food, setFood] = useState([]);
  const [foodQte, setFoodQte] = useState(0);
  const [foodMny, setFoodMny] = useState(0);
  const [custom, setCustom] = useState([]);
  const [customQte, setCustomQte] = useState(0);
  const [customMny, setCustomMny] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { user, token } = isAuthenticated();
    const restId = user.restaurant;
    const startDate = new Date(startDateS).toISOString().slice(0, 10);
    const endDate = new Date(endDateS).toISOString().slice(0, 10);
    const abortCont = new AbortController();
    setLoading(true);
      getInvoiceByDate(user._id, token,abortCont, {
        startDate,
        endDate,
      }).then((data) => {
        if(data){
          if (data.error) {
            setError(data.error);
          } else {
            const invoiceOfThisRestaurant = data.filter(
              ({ restaurantId }) => restaurantId === restId
            );
            setDeliveredOD(invoiceOfThisRestaurant);
            setLoading(false);
          }
        }
      });
      return () => abortCont.abort();
  }, [startDateS, endDateS]);

  useEffect(() => {
    const getAllProducts = (deliveredOD) => {
      var flat = [];
      for (var i = 0; i < deliveredOD.length; i++) {
        let products = deliveredOD[i].products;
        for (var j = 0; j < products.length; j++) {
          flat = flat.concat(products[j]);
        }
      }
      //salad
      const saladOfThisRestaurant = flat.filter(({ type }) => type === 1);
      setSalad(saladOfThisRestaurant);
      const saladMnyOfThisRestaurant = saladOfThisRestaurant.reduce(
        (a, v) => (a = a + v.itemFinalPrice * parseInt(v.qte, 10)),
        0
      );
      setSaladMny(saladMnyOfThisRestaurant);

      const saladQteOfThisRestaurant = saladOfThisRestaurant.reduce(
        (a, v) => (a = a + parseInt(v.qte, 10)),
        0
      );
      setSaladQte(saladQteOfThisRestaurant);

      //soup
      const soupOfThisRestaurant = flat.filter(({ type }) => type === 2);
      setSoup(soupOfThisRestaurant);
      const soupMnyOfThisRestaurant = soupOfThisRestaurant.reduce(
        (a, v) => (a = a + v.itemFinalPrice * parseInt(v.qte, 10)),
        0
      );
      setSoupMny(soupMnyOfThisRestaurant);

      const soupQteOfThisRestaurant = soupOfThisRestaurant.reduce(
        (a, v) => (a = a + parseInt(v.qte, 10)),
        0
      );
      setSoupQte(soupQteOfThisRestaurant);

      //food
      const foodOfThisRestaurant = flat.filter(({ type }) => type === 3);
      setFood(foodOfThisRestaurant);
      const foodMnyOfThisRestaurant = foodOfThisRestaurant.reduce(
        (a, v) => (a = a + v.itemFinalPrice * parseInt(v.qte, 10)),
        0
      );
      setFoodMny(foodMnyOfThisRestaurant);

      const foodQteOfThisRestaurant = foodOfThisRestaurant.reduce(
        (a, v) => (a = a + parseInt(v.qte, 10)),
        0
      );
      setFoodQte(foodQteOfThisRestaurant);

      //custom
      const customOfThisRestaurant = flat.filter(({ type }) => type === 4);
      setCustom(customOfThisRestaurant);
      const customMnyOfThisRestaurant = customOfThisRestaurant.reduce(
        (a, v) => (a = a + v.itemPrice * parseInt(v.qte, 10)),
        0
      );
      setCustomMny(customMnyOfThisRestaurant);

      const customQteOfThisRestaurant = customOfThisRestaurant.reduce(
        (a, v) => (a = a + parseInt(v.qte, 10)),
        0
      );
      setCustomQte(customQteOfThisRestaurant);
    };
    getAllProducts(deliveredOD);
  }, [deliveredOD]);

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
      {showError()}
      <section className="register-restaurent-sec section-padding bg-light-theme">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="sidebar-tabs main-box padding-20 mb-md-40">
                <div id="add-restaurent-tab" className="step-app">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5 mb-md-40">
                      <ul className="step-steps steps-2">
                        <li className="add-res-tab">
                          <Link to="/manager/dashboard" className="add-res-tab">
                            Dashboard
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/createOrder"
                            className="add-res-tab"
                          >
                            New Order
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/acceptedOrders"
                            className="add-res-tab"
                          >
                            Accepted Orders
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/deliveredOrders"
                            className="add-res-tab"
                          >
                            Delivered Orders
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/inventory"
                            className="add-res-tab"
                          >
                            Inventory
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            {!loading && (
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <span className="text-light-green fw-700">
                                    From :{" "}
                                    <DatePicker
                                      selected={startDateS}
                                      onChange={(date) => setStartDateS(date)}
                                    />
                                  </span>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <span className="text-light-green fw-700">
                                    To :{" "}
                                    <DatePicker
                                      selected={endDateS}
                                      onChange={(date) => setEndDateS(date)}
                                    />
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {showLoading()}

                      {!loading && (
                        <Fragment>
                          <div className="table-responsive mt-4">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">Product</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="col">Salad</th>
                                  <th scope="col">{saladQte}</th>
                                  <th scope="col">{saladMny.toFixed(2)} LKR</th>
                                </tr>
                                <tr>
                                  <th scope="col">Soup</th>
                                  <th scope="col">{soupQte}</th>
                                  <th scope="col">{soupMny.toFixed(2)} LKR</th>
                                </tr>
                                <tr>
                                  <th scope="col">Other Food</th>
                                  <th scope="col">{foodQte}</th>
                                  <th scope="col">{foodMny.toFixed(2)} LKR</th>
                                </tr>
                                <tr>
                                  <th scope="col">Custom Salad</th>
                                  <th scope="col">{customQte}</th>
                                  <th scope="col">
                                    {customMny.toFixed(2)} LKR
                                  </th>
                                </tr>
                                <tr>
                                  <th
                                    scope="col"
                                    colSpan="2"
                                    className="text-primary"
                                  >
                                    Subtotal
                                  </th>
                                  <th scope="col" className="text-primary">
                                    {(
                                      customMny +
                                      foodMny +
                                      soupMny +
                                      saladMny
                                    ).toFixed(2)}{" "}
                                    LKR
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <h6 className="text-light-black fw-700 mt-4">
                            All The Salads{" "}
                            <span className="text-danger">
                              *Item can be repeated!
                            </span>
                          </h6>

                          <div className="table-responsive mt-4">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">Qte</th>
                                  <th scope="col">Title</th>
                                  <th scope="col">Size</th>
                                  <th scope="col">Discount</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Dis. Price</th>
                                  <th scope="col">Addon</th>
                                  <th scope="col">Final</th>
                                </tr>
                              </thead>
                              <tbody>
                                {salad &&
                                  salad.map((s, i) => (
                                    <tr key={i}>
                                      <th scope="col">{s.qte}</th>
                                      <th scope="col">
                                        {s.title}
                                        <br />
                                        {s.pAd &&
                                          s.pAd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                        {s.gAd &&
                                          s.gAd.map((g, i) => (
                                            <p key={i}>{g.title}</p>
                                          ))}
                                      </th>
                                      <th scope="col">{s.size}</th>
                                      <th scope="col">
                                        {s.discountAmount.toFixed(2)} LKR (
                                        {s.discount}%)
                                      </th>
                                      <th scope="col">
                                        {s.itemPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {s.itemFinalPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {(s.pAP + s.gAP).toFixed(2)} LKR
                                      </th>
                                      <th scope="col">{s.tp.toFixed(2)} LKR</th>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>

                          <h6 className="text-light-black fw-700 mt-4">
                            All The Soups{" "}
                            <span className="text-danger">
                              *Item can be repeated!
                            </span>
                          </h6>

                          <div className="table-responsive mt-4">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">Qte</th>
                                  <th scope="col">Title</th>
                                  <th scope="col">Size</th>
                                  <th scope="col">Discount</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Dis. Price</th>
                                  <th scope="col">Addon</th>
                                  <th scope="col">Final</th>
                                </tr>
                              </thead>
                              <tbody>
                                {soup &&
                                  soup.map((s, i) => (
                                    <tr key={i}>
                                      <th scope="col">{s.qte}</th>
                                      <th scope="col">
                                        {s.title}
                                        <br />
                                        {s.sAd &&
                                          s.sAd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                      </th>
                                      <th scope="col">{s.size}</th>
                                      <th scope="col">
                                        {s.discountAmount.toFixed(2)} LKR (
                                        {s.discount}%)
                                      </th>
                                      <th scope="col">
                                        {s.itemPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {s.itemFinalPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {s.sAP.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">{s.tp.toFixed(2)} LKR</th>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>

                          <h6 className="text-light-black fw-700 mt-4">
                            All Other Foods{" "}
                            <span className="text-danger">
                              *Item can be repeated!
                            </span>
                          </h6>

                          <div className="table-responsive mt-4">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">Qte</th>
                                  <th scope="col">Title</th>
                                  <th scope="col">Size</th>
                                  <th scope="col">Discount</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Dis. Price</th>
                                  <th scope="col">Addon</th>
                                  <th scope="col">Final</th>
                                </tr>
                              </thead>
                              <tbody>
                                {food &&
                                  food.map((s, i) => (
                                    <tr key={i}>
                                      <th scope="col">{s.qte}</th>
                                      <th scope="col">
                                        {s.title}
                                        <br />
                                        {s.fAd &&
                                          s.fAd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                      </th>
                                      <th scope="col">{s.size}</th>
                                      <th scope="col">
                                        {s.discountAmount.toFixed(2)} LKR (
                                        {s.discount}%)
                                      </th>
                                      <th scope="col">
                                        {s.itemPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {s.itemFinalPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {s.fAP.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">{s.tp.toFixed(2)} LKR</th>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>

                          <h6 className="text-light-black fw-700 mt-4">
                            All Custom Salads{" "}
                            <span className="text-danger">
                              *Item can be repeated!
                            </span>
                          </h6>

                          <div className="table-responsive mt-4">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">Qte</th>
                                  <th scope="col">Title</th>
                                  <th scope="col">Size</th>
                                  <th scope="col">Discount</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Dis. Price</th>
                                  <th scope="col">Addon</th>
                                  <th scope="col">Final</th>
                                </tr>
                              </thead>
                              <tbody>
                                {custom &&
                                  custom.map((s, i) => (
                                    <tr key={i}>
                                      <th scope="col">{s.qte}</th>
                                      <th scope="col">
                                        {s.title}
                                        <br />
                                        {s.cLd &&
                                          s.cLd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                        {s.cTd &&
                                          s.cTd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                        {s.cPd &&
                                          s.cPd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                        {s.cDd &&
                                          s.cDd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                        {s.pAd &&
                                          s.pAd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                        {s.gAd &&
                                          s.gAd.map((p, i) => (
                                            <p key={i}>{p.title}</p>
                                          ))}
                                      </th>
                                      <th scope="col">{s.size}</th>
                                      <th scope="col">
                                        {s.discountAmount.toFixed(2)} LKR (
                                        {s.discount}%)
                                      </th>
                                      <th scope="col">
                                        {s.itemPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {s.itemPrice.toFixed(2)} LKR
                                      </th>
                                      <th scope="col">
                                        {(s.pAP + s.gAP + s.cPP).toFixed(2)} LKR
                                      </th>
                                      <th scope="col">{s.tp.toFixed(2)} LKR</th>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Content;
