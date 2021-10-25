import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
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

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/createCustomSalad"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Custom Salad</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/createSalad"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Salad</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/createSoup"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Soup</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/createFood"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Other Food</StyledButton>
                                </Link>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <Link
                                  to="/manager/checkout"
                                  className="add-res-tab"
                                >
                                  <StyledButtonThree>Checkout</StyledButtonThree>
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
