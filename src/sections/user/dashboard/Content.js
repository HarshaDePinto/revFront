import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import { numberOfD, ongoingOrdersD, isSubmit } from "./apiDashboard";
import OngoingOrder from "./OngoingOrder";

function Content() {
  const { user } = isAuthenticated();
  const [seconds, setSeconds] = useState(0);
  const [numberOD, setNumberOD] = useState(0);
  const [ongoingOD, setOngoingOD] = useState([]);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const abortCont = new AbortController();
    isSubmit(user._id, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          if (data > 0) {
            setSubmit(true);
          } else {
            setSubmit(false);
          }
        }
      }
    });
    return () => abortCont.abort();
  }, [numberOD, user._id]);

  useEffect(() => {
    const abortCont = new AbortController();
    numberOfD(user._id, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setNumberOD(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [seconds, user._id]);

  useEffect(() => {
    const abortCont = new AbortController();
    ongoingOrdersD(user._id, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setOngoingOD(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [numberOD, user._id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

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
                          <Link to="/user/myProfile" className="add-res-tab">
                            My Profile
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link to="/user/orders" className="add-res-tab">
                            Orders
                          </Link>
                        </li>
                      </ul>
                      <div></div>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <div className="row">
                              <div className="col-12">
                                {submit && (
                                  <div className="tracking-sec">
                                    <div className="tracking-details padding-20 p-relative">
                                      <h2 className="text-light-black fw-700 no-margin">
                                        Wait order will accepted soon....
                                      </h2>

                                      <div
                                        id="add-listing-tab"
                                        className="step-app"
                                      >
                                        <ul className="step-steps">
                                          <li className="done">
                                            <Link to="#">
                                              {" "}
                                              <span className="number" />
                                              <span className="step-name">
                                                Cart Created
                                                <br />
                                                {new Date().toLocaleTimeString()}
                                              </span>
                                            </Link>
                                          </li>
                                          <li className="done">
                                            <Link to="#">
                                              {" "}
                                              <span className="number" />
                                              <span className="step-name">
                                                Place The Order
                                              </span>
                                            </Link>
                                          </li>
                                          <li>
                                            <Link to="#">
                                              {" "}
                                              <span className="number" />
                                              <span className="step-name">
                                                Accept By Restaurant
                                              </span>
                                            </Link>
                                          </li>
                                          <li>
                                            <Link to="#">
                                              {" "}
                                              <span className="number" />
                                              <span className="step-name">
                                                Delivered
                                              </span>
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>

                                    <div className="tracking-map"></div>
                                  </div>
                                )}

                                {numberOD > 0 && (
                                  <OngoingOrder ongoingOD={ongoingOD} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
