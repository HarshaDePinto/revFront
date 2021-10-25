import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateNew from "./CreateNew";
import ShowAll from "./ShowAll";
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
  const [values, setMainValues] = useState({
    showAllSoup: true,
    showSingleSoup: false,
    showCreateSoup: false,
    soupId: "",
  });

  const { showAllSoup, showSingleSoup, showCreateSoup, soupId } = values;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAllSoup, showSingleSoup, showCreateSoup, soupId]);

  const createNew = () => {
    setMainValues({
      ...values,
      showCreateSoup: true,
      showAllSoup: false,
      showSingleSoup: false,
    });
  };

  const viewAllSoup = () => {
    setMainValues({
      ...values,
      showCreateSoup: false,
      showAllSoup: true,
      showSingleSoup: false,
    });
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
                          <Link
                            to="/designer/dashboard"
                            className="add-res-tab"
                          >
                            Dashboard
                          </Link>
                        </li>
                        {!showCreateSoup && (
                          <li className="add-res-tab">
                            <Link
                              onClick={createNew}
                              to="#"
                              className="add-res-tab"
                            >
                              Create New Soup
                            </Link>
                          </li>
                        )}
                        {!showAllSoup && (
                          <li className="add-res-tab">
                            <Link
                              onClick={viewAllSoup}
                              to="#"
                              className="add-res-tab"
                            >
                              All Soups
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
                              {showCreateSoup && (
                                <CreateNew
                                  values={values}
                                  setMainValues={setMainValues}
                                />
                              )}

                              {showAllSoup && (
                                <ShowAll
                                  values={values}
                                  setMainValues={setMainValues}
                                />
                              )}

                              {showSingleSoup && (
                                <Single
                                  values={values}
                                  setMainValues={setMainValues}
                                  soupId={soupId}
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
      </section>
    </Fragment>
  );
}

export default Content;
