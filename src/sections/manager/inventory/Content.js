import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Consuming from "./Consuming";
import Purchasing from "./Purchasing";
import PurchasingHistory from "./PurchasingHistory";

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

const StyledButtonTwo = styled.button`
  background-color: #000000;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
    }}
  />
);

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [front, setFront] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [purchasingHistory, setPurchasingHistory] = useState(false);
  const [consuming, setConsuming] = useState(false);

  const showFront = () => {
    setFront(true);
    setPurchasing(false);
    setPurchasingHistory(false);
    setConsuming(false);
  };

  const showPurchasing = () => {
    setFront(false);
    setPurchasing(true);
    setPurchasingHistory(false);
    setConsuming(false);
  };

  const showPurchasingHistory = () => {
    setFront(false);
    setPurchasing(false);
    setPurchasingHistory(true);
    setConsuming(false);
  };

  const showConsuming = () => {
    setFront(false);
    setPurchasing(false);
    setPurchasingHistory(false);
    setConsuming(true);
  };

  return (
    <Fragment>
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
                        {!front && (
                          <li className="add-res-tab">
                            <Link
                              to="#"
                              onClick={showFront}
                              className="add-res-tab"
                            >
                              Inventory
                            </Link>
                          </li>
                        )}
                        {!purchasing && (
                          <li className="add-res-tab">
                            <Link
                              to="#"
                              onClick={showPurchasing}
                              className="add-res-tab"
                            >
                              Purchasing
                            </Link>
                          </li>
                        )}
                        {!purchasingHistory && (
                          <li className="add-res-tab">
                            <Link
                              to="#"
                              onClick={showPurchasingHistory}
                              className="add-res-tab"
                            >
                              Recode History
                            </Link>
                          </li>
                        )}
                        {!consuming && (
                          <li className="add-res-tab">
                            <Link
                              to="#"
                              onClick={showConsuming}
                              className="add-res-tab"
                            >
                              Consuming
                            </Link>
                          </li>
                        )}

                        <ColoredLine color="#F79550" />
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
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          {front && (
                            <div className="general-sec">
                              <div className="row">
                                <div className="col-12">
                                  <h2 className="title text-light-black fw-500">
                                    Manager Inventory
                                  </h2>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="#"
                                    onClick={showPurchasing}
                                    className="add-res-tab"
                                  >
                                    <StyledButton>Purchasing</StyledButton>
                                  </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="#"
                                    onClick={showConsuming}
                                    className="add-res-tab"
                                  >
                                    <StyledButton>Consuming</StyledButton>
                                  </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="#"
                                    onClick={showPurchasingHistory}
                                    className="add-res-tab"
                                  >
                                    <StyledButton>Recode History</StyledButton>
                                  </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="/manager/dashboard"
                                    className="add-res-tab"
                                  >
                                    <StyledButtonTwo>
                                      Dashboard
                                    </StyledButtonTwo>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {purchasing && <Purchasing />}
                          {purchasingHistory && <PurchasingHistory />}
                          {consuming && <Consuming />}
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
