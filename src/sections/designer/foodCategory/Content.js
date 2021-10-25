import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllFoodCategory from "./AllFoodCategory";
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
  const [showAllFoodCategory, setShowAllFoodCategory] = useState(true);
  const [showCreateFoodCategory, setShowCreateFoodCategory] = useState(false);
  const [showSingleFoodCategory, setShowSingleFoodCategory] = useState(false);
  const [showUpdateFoodCategory, setShowUpdateFoodCategory] = useState(false);
  const [singleId, setSingleId] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    showAllFoodCategory,
    showCreateFoodCategory,
    showSingleFoodCategory,
    showUpdateFoodCategory,
  ]);
  const createNew = () => {
    setShowAllFoodCategory(false);
    setShowCreateFoodCategory(true);
    setShowSingleFoodCategory(false);
  };

  const viewAll = () => {
    setShowAllFoodCategory(true);
    setShowCreateFoodCategory(false);
    setShowSingleFoodCategory(false);
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
                        {!showCreateFoodCategory && (
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
                        {!showAllFoodCategory && (
                          <li className="add-res-tab" id="stepbtn2">
                            <Link
                              to="#"
                              onClick={viewAll}
                              className="add-res-tab"
                            >
                              All Food Categories
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
                              <div className="col-12">
                                {showAllFoodCategory && (
                                  <AllFoodCategory
                                    showAllFoodCategory={showAllFoodCategory}
                                    showUpdateFoodCategory={
                                      showUpdateFoodCategory
                                    }
                                    setShowAllFoodCategory={
                                      setShowAllFoodCategory
                                    }
                                    setShowCreateFoodCategory={
                                      setShowCreateFoodCategory
                                    }
                                    setShowSingleFoodCategory={
                                      setShowSingleFoodCategory
                                    }
                                    setSingleId={setSingleId}
                                  />
                                )}

                                {showCreateFoodCategory && (
                                  <CreateNew
                                    setShowAllFoodCategory={
                                      setShowAllFoodCategory
                                    }
                                    setShowCreateFoodCategory={
                                      setShowCreateFoodCategory
                                    }
                                    setShowSingleFoodCategory={
                                      setShowSingleFoodCategory
                                    }
                                  />
                                )}

                                {showSingleFoodCategory && (
                                  <Single
                                    singleId={singleId}
                                    setShowSingleFoodCategory={
                                      setShowSingleFoodCategory
                                    }
                                    setShowUpdateFoodCategory={
                                      setShowUpdateFoodCategory
                                    }
                                    showUpdateFoodCategory={
                                      showUpdateFoodCategory
                                    }
                                    setShowAllFoodCategory={
                                      setShowAllFoodCategory
                                    }
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
