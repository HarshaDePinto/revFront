import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  numberOfOngoingOrders,
  ongoingOrders,
  readRestaurant,
} from "./apiDashboard";
import OngoingOrder from "./OngoingOrder";
import { isAuthenticated } from "../../../auth";
import styled from "styled-components";


const StyledButton = styled.button`
  background-color: #f79550;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;

function Content() {
  const [seconds, setSeconds] = useState(0);
  const [numberOD, setNumberOD] = useState(0);
  const [ongoingOD, setOngoingOD] = useState([]);
  const [error, setError] = useState(false);
  const [run, setRun] = useState(false);
  const [managerRestaurant, setManagerRestaurant] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const { user } = isAuthenticated();
    const restaurantId = user.restaurant;
    const abortCont = new AbortController();
    readRestaurant(restaurantId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setManagerRestaurant(data);
        }
      }
    });
    return () => abortCont.abort();
  }, []);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [run]);

  useEffect(() => {
    const { user } = isAuthenticated();
    const restaurantId = user.restaurant;
    const abortCont = new AbortController();
    numberOfOngoingOrders(restaurantId,abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setNumberOD(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [seconds]);

  useEffect(() => {
    const { user } = isAuthenticated();
    const restaurantId = user.restaurant;
    const abortCont = new AbortController();
    ongoingOrders(restaurantId,abortCont).then((data) => {
      if (data){
        if (data.error) {
          setError(data.error);
        } else {
          setOngoingOD(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [numberOD,run]);

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
                            to="/manager/salesByProducts"
                            className="add-res-tab"
                          >
                            Sales By Products
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/manager/changeAvailability"
                            className="add-res-tab"
                          >
                            Change Availability
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
                            <div className="row">
                              <div className="col-12">
                                <h2 className="title text-light-black fw-500">
                                  {managerRestaurant.title} Manager Dashboard
                                </h2>
                                {numberOD > 0 && (
                                  <OngoingOrder ongoingOD={ongoingOD} setRun={setRun} run={run} />
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/createOrder"
                                  className="add-res-tab"
                                >
                                  <StyledButton>New Order</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/acceptedOrders"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Accepted Orders</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/deliveredOrders"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Delivered Orders</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/changeAvailability"
                                  className="add-res-tab"
                                >
                                  <StyledButton>
                                    Change Availability
                                  </StyledButton>
                                </Link>
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
