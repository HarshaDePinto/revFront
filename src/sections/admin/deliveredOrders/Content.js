import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getInvoiceByDate } from "./apiDeliveredOrders";
import { isAuthenticated } from "../../../auth";
import { Roller } from "react-awesome-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SingleOrder from "./SingleOrder";

function Content() {
  const [deliveredOD, setDeliveredOD] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startDateS, setStartDateS] = useState(new Date());
  const [endDateS, setEndDateS] = useState(new Date());
  const [subTotal, setSubtotal] = useState(0);
  const [subTotalCash, setSubtotalCash] = useState(0);
  const [subTotalCard, setSubtotalCard] = useState(0);
  const [subTotalOnline, setSubtotalOnline] = useState(0);
  const [managerRestaurant, setManagerRestaurant] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showSingle, setShowSingle] = useState(false);
  const [singleOD, setSingleOD] = useState();
  const { restaurantId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAll, showSingle]);

  useEffect(() => {
    const { user, token } = isAuthenticated();
    const restId = restaurantId;
    setManagerRestaurant(restId);
    const startDate = new Date(startDateS).toISOString().slice(0, 10);
    const endDate = new Date(endDateS).toISOString().slice(0, 10);
    setLoading(true);
    const abortCont = new AbortController();
    getInvoiceByDate(user._id, token, abortCont, {
      startDate,
      endDate,
    }).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setDeliveredOD(data);
          const subT = data
            .filter(({ restaurantId }) => restaurantId === restId)
            .reduce((a, v) => (a = a + v.finalAmount), 0);
          setSubtotal(subT);
          const subTC = data
            .filter(({ paymentMethod }) => paymentMethod === 0)
            .filter(({ restaurantId }) => restaurantId === restId)
            .reduce((a, v) => (a = a + v.finalAmount), 0);
          setSubtotalCash(subTC);
          const subTCA = data
            .filter(({ paymentMethod }) => paymentMethod === 1)
            .filter(({ restaurantId }) => restaurantId === restId)
            .reduce((a, v) => (a = a + v.finalAmount), 0);
          setSubtotalCard(subTCA);
          const subTO = data
            .filter(({ paymentMethod }) => paymentMethod === 2)
            .filter(({ restaurantId }) => restaurantId === restId)
            .reduce((a, v) => (a = a + v.finalAmount), 0);
          setSubtotalOnline(subTO);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [startDateS, endDateS, restaurantId]);

  const clickSingle = (a) => {
    setSingleOD(a);
    setShowSingle(true);
    setShowAll(false);
  };
  const clickShowAll = () => {
    setShowAll(true);
    setShowSingle(false);
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
                        <li className="add-res-tab" id="stepbtn2">
                          <Link to="/admin/dashboard" className="add-res-tab">
                            Dashboard
                          </Link>
                        </li>
                        {!showAll && (
                          <li className="add-res-tab">
                            <Link
                              to="#"
                              onClick={clickShowAll}
                              className="add-res-tab"
                            >
                              Show All
                            </Link>
                          </li>
                        )}
                        <li className="add-res-tab" id="stepbtn2">
                          <Link to={`/admin/restaurant/${restaurantId}`} className="add-res-tab">
                          Restaurant
                          </Link>
                        </li>

                        <li className="add-res-tab" id="stepbtn2">
                          <Link to="/admin/users" className="add-res-tab">
                            Users
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            {!loading && showAll && !showSingle && (
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
                      {!loading && showAll && !showSingle && (
                        <div className="table-responsive mt-4">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {deliveredOD &&
                                deliveredOD.map((o, i) => (
                                  <Fragment key={i}>
                                    {o.restaurantId === managerRestaurant && (
                                      <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>
                                          <button
                                            type="button"
                                            className="btn-first white-btn full-width text-light-green fw-600"
                                            onClick={() => {
                                              clickSingle(o);
                                            }}
                                          >
                                            {o.orderId}
                                          </button>
                                        </td>
                                        {o.paymentMethod === 0 && (
                                          <td className="text-info">Cash</td>
                                        )}
                                        {o.paymentMethod === 1 && (
                                          <td className="text-success">Card</td>
                                        )}
                                        {o.paymentMethod === 2 && (
                                          <td className="text-primary">
                                            Online
                                          </td>
                                        )}
                                        <td>{o.finalAmount.toFixed(2)} LKR</td>
                                      </tr>
                                    )}
                                  </Fragment>
                                ))}
                              <tr>
                                <th
                                  scope="row"
                                  colSpan="3"
                                  className="text-info"
                                >
                                  Cash
                                </th>
                                <th className="text-info">
                                  {subTotalCash.toFixed(2)} LKR
                                </th>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  colSpan="3"
                                  className="text-success"
                                >
                                  Card
                                </th>
                                <th className="text-success">
                                  {subTotalCard.toFixed(2)} LKR
                                </th>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  colSpan="3"
                                  className="text-primary"
                                >
                                  Online
                                </th>
                                <th className="text-primary">
                                  {subTotalOnline.toFixed(2)} LKR
                                </th>
                              </tr>
                              <tr>
                                <th scope="row" colSpan="3">
                                  Subtotal
                                </th>
                                <th>{subTotal.toFixed(2)} LKR</th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      {!loading && !showAll && showSingle && (
                        <Fragment>
                          <SingleOrder
                            singleOD={singleOD}
                            setShowSingle={setShowSingle}
                            setShowAll={setShowAll}
                          />
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
