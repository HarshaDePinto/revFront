import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllFoodCategory from "./AllFoodCategory";
import SingleCategory from "./SingleCategory";
import SingleFood from "./SingleFood";
import styled from "styled-components";

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

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showAllFoodCategory, setShowAllFoodCategory] = useState(true);
  const [showSingleFoodCategory, setShowSingleFoodCategory] = useState(false);
  const [showSingleFood, setShowSingleFood] = useState(false);
  const [foodCategoryId, setFoodCategoryId] = useState("");
  const [food, setFood] = useState([]);

  const backToAll = () => {
    setShowAllFoodCategory(true);
    setShowSingleFoodCategory(false);
    setShowSingleFood(false);
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
                          <Link to="/manager/inventory" className="add-res-tab">
                            Inventory
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            {showAllFoodCategory && (
                              <AllFoodCategory
                                setShowAllFoodCategory={
                                  setShowAllFoodCategory
                                }
                                setShowSingleFoodCategory={
                                  setShowSingleFoodCategory
                                }
                                setShowSingleFood={setShowSingleFood}
                                setFoodCategoryId={setFoodCategoryId}
                              />
                            )}

                            {showSingleFoodCategory && (
                              <SingleCategory
                                setShowAllFoodCategory={
                                  setShowAllFoodCategory
                                }
                                setShowSingleFoodCategory={
                                  setShowSingleFoodCategory
                                }
                                setShowSingleFood={setShowSingleFood}
                                foodCategoryId={foodCategoryId}
                                setFood={setFood}
                              />
                            )}
                            {showSingleFood && <SingleFood food={food} />}
                            {showSingleFood && (
                              <div className="row">
                                <div
                                  
                                  className="col-lg-6 col-md-6 col-sm-12"
                                >
                                  <StyledButtonTwo onClick={backToAll}>
                                    Back To All Categories
                                  </StyledButtonTwo>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="/manager/createOrder"
                                    className="add-res-tab"
                                  >
                                    <StyledButtonTwo>
                                      Back To New
                                    </StyledButtonTwo>
                                  </Link>
                                </div>
                              </div>
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
      </section>
    </Fragment>
  );
}

export default Content;
