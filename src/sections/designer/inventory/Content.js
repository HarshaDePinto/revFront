import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllInventory from "./AllInventory";
import CreateNew from "./CreateNew";
import Single from "./Single";

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
  const [showAllInventory, setShowAllInventory] = useState(true);
  const [showCreateInventory, setShowCreateInventory] = useState(false);
  const [showSingleInventory, setShowSingleInventory] = useState(false);
  const [showUpdateInventory, setShowUpdateInventory] = useState(false);
  const [singleId, setSingleId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    showAllInventory,
    showCreateInventory,
    showSingleInventory,
    showUpdateInventory,
  ]);

  const createNew = () => {
    setShowAllInventory(false);
    setShowCreateInventory(true);
    setShowSingleInventory(false);
  };

  const viewAll = () => {
    setShowAllInventory(true);
    setShowCreateInventory(false);
    setShowSingleInventory(false);
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
                        <li className="add-res-tab" id="stepbtn2">
                          <Link
                            to="/designer/dashboard"
                            className="add-res-tab"
                          >
                            Dashboard
                          </Link>
                        </li>
                        {showAllInventory && (
                          <li className="add-res-tab" id="stepbtn2">
                            <Link
                              to="#"
                              onClick={createNew}
                              className="add-res-tab"
                            >
                              Create New
                            </Link>
                          </li>
                        )}
                        {(showCreateInventory || showSingleInventory) && (
                          <li className="add-res-tab" id="stepbtn2">
                            <Link
                              to="#"
                              onClick={viewAll}
                              className="add-res-tab"
                            >
                              All Inventory
                            </Link>
                          </li>
                        )}

<ColoredLine color="#F79550" />
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
                            to="/designer/allFoodItems"
                            className="add-res-tab"
                          >
                            All Food Items
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
                              <div className="col-12">
                                {showAllInventory && (
                                  <AllInventory
                                    showAllInventory={showAllInventory}
                                    showUpdateInventory={showUpdateInventory}
                                    setShowAllInventory={setShowAllInventory}
                                    setShowCreateInventory={
                                      setShowCreateInventory
                                    }
                                    setShowSingleInventory={
                                      setShowSingleInventory
                                    }
                                    setSingleId={setSingleId}
                                  />
                                )}

                                {showCreateInventory && (
                                  <CreateNew
                                    setShowAllInventory={setShowAllInventory}
                                    setShowCreateInventory={
                                      setShowCreateInventory
                                    }
                                    setShowSingleInventory={
                                      setShowSingleInventory
                                    }
                                  />
                                )}

                                {showSingleInventory && (
                                  <Single
                                    singleId={singleId}
                                    setShowSingleInventory={
                                      setShowSingleInventory
                                    }
                                    setShowUpdateInventory={
                                      setShowUpdateInventory
                                    }
                                    showUpdateInventory={showUpdateInventory}
                                    setShowAllInventory={setShowAllInventory}
                                  />
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
