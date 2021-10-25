import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllPromotion from "./AllPromotion";
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
  const [showAllPromotion, setShowAllPromotion] = useState(true);
  const [showCreatePromotion, setShowCreatePromotion] = useState(false);
  const [showSinglePromotion, setShowSinglePromotion] = useState(false);
  const [showUpdatePromotion, setShowUpdatePromotion] = useState(false);
  const [singleId, setSingleId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    showAllPromotion,
    showCreatePromotion,
    showSinglePromotion,
    showUpdatePromotion,
  ]);

  const createNew = () => {
    setShowAllPromotion(false);
    setShowCreatePromotion(true);
    setShowSinglePromotion(false);
  };

  const viewAll = () => {
    setShowAllPromotion(true);
    setShowCreatePromotion(false);
    setShowSinglePromotion(false);
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
                        {showAllPromotion && (
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
                        {(showCreatePromotion || showSinglePromotion) && (
                          <li className="add-res-tab" id="stepbtn2">
                            <Link
                              to="#"
                              onClick={viewAll}
                              className="add-res-tab"
                            >
                              All Promotion
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
                                {showAllPromotion && (
                                  <AllPromotion
                                    showAllPromotion={showAllPromotion}
                                    showUpdatePromotion={showUpdatePromotion}
                                    setShowAllPromotion={setShowAllPromotion}
                                    setShowCreatePromotion={
                                      setShowCreatePromotion
                                    }
                                    setShowSinglePromotion={
                                      setShowSinglePromotion
                                    }
                                    setSingleId={setSingleId}
                                  />
                                )}

                                {showCreatePromotion && (
                                  <CreateNew
                                    setShowAllPromotion={setShowAllPromotion}
                                    setShowCreatePromotion={
                                      setShowCreatePromotion
                                    }
                                    setShowSinglePromotion={
                                      setShowSinglePromotion
                                    }
                                  />
                                )}

                                {showSinglePromotion && (
                                  <Single
                                    singleId={singleId}
                                    setShowSinglePromotion={
                                      setShowSinglePromotion
                                    }
                                    setShowUpdatePromotion={
                                      setShowUpdatePromotion
                                    }
                                    showUpdatePromotion={showUpdatePromotion}
                                    setShowAllPromotion={setShowAllPromotion}
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
