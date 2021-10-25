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
const StyledButton2 = styled.button`
  background-color: #000000;
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
                          <Link
                            to="/designer/dashboard"
                            className="add-res-tab"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/allCategories"
                            className="add-res-tab"
                          >
                            All Categories
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/restaurant"
                            className="add-res-tab"
                          >
                            Restaurants
                          </Link>
                        </li>

                        <li className="add-res-tab">
                          <Link
                            to="/designer/promotions"
                            className="add-res-tab"
                          >
                            Promotions
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/inventory"
                            className="add-res-tab"
                          >
                            Inventory
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link
                            to="/designer/mainSlides"
                            className="add-res-tab"
                          >
                            Main Slides
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <div className="row">
                              <div className="col-6">
                                <Link
                                  to="/designer/addon"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Addons</StyledButton>
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to="/designer/salad"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Salads</StyledButton>
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to="/designer/soup"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Soups</StyledButton>
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to="/designer/food"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Other Foods</StyledButton>
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to="/designer/custom"
                                  className="add-res-tab"
                                >
                                  <StyledButton>Custom Salads</StyledButton>
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to="/designer/dashboard"
                                  className="add-res-tab"
                                >
                                  <StyledButton2>Dashboard</StyledButton2>
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
