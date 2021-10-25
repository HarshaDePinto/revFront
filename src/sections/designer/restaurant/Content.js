import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllRestaurant from "./AllRestaurant";
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
  const [showAllRestaurant, setShowAllRestaurant] = useState(true);
  const [showCreateRestaurant, setShowCreateRestaurant] = useState(false);
  const [showSingleRestaurant, setShowSingleRestaurant] = useState(false);
  const [showUpdateRestaurant, setShowUpdateRestaurant] = useState(false);
  const [singleId, setSingleId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    showAllRestaurant,
    showCreateRestaurant,
    showSingleRestaurant,
    showUpdateRestaurant,
  ]);

  const createNew = () => {
    setShowAllRestaurant(false);
    setShowCreateRestaurant(true);
    setShowSingleRestaurant(false);
  };

  const viewAll = () => {
    setShowAllRestaurant(true);
    setShowCreateRestaurant(false);
    setShowSingleRestaurant(false);
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
                        {showAllRestaurant && (
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
                        {(showCreateRestaurant || showSingleRestaurant) && (
                          <li className="add-res-tab" id="stepbtn2">
                            <Link
                              to="#"
                              onClick={viewAll}
                              className="add-res-tab"
                            >
                              All Restaurant
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
                                {showAllRestaurant && (
                                  <AllRestaurant
                                    showAllRestaurant={showAllRestaurant}
                                    showUpdateRestaurant={showUpdateRestaurant}
                                    setShowAllRestaurant={setShowAllRestaurant}
                                    setShowCreateRestaurant={
                                      setShowCreateRestaurant
                                    }
                                    setShowSingleRestaurant={
                                      setShowSingleRestaurant
                                    }
                                    setSingleId={setSingleId}
                                  />
                                )}

                                {showCreateRestaurant && (
                                  <CreateNew
                                    setShowAllRestaurant={setShowAllRestaurant}
                                    setShowCreateRestaurant={
                                      setShowCreateRestaurant
                                    }
                                    setShowSingleRestaurant={
                                      setShowSingleRestaurant
                                    }
                                  />
                                )}

                                {showSingleRestaurant && (
                                  <Single
                                    singleId={singleId}
                                    setShowSingleRestaurant={
                                      setShowSingleRestaurant
                                    }
                                    setShowUpdateRestaurant={
                                      setShowUpdateRestaurant
                                    }
                                    showUpdateRestaurant={showUpdateRestaurant}
                                    setShowAllRestaurant={setShowAllRestaurant}
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
