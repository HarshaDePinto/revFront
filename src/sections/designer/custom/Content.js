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
    showAllCustom: true,
    showSingleCustom: false,
    showCreateCustom: false,
    customId: "",
  });

  const { showAllCustom, showSingleCustom, showCreateCustom, customId } = values;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAllCustom, showSingleCustom, showCreateCustom, customId]);
  
  const createNew = () => {
    setMainValues({
      ...values,
      showCreateCustom: true,
      showAllCustom: false,
      showSingleCustom: false,
    });
  };

  const viewAllCustom = () => {
    setMainValues({
      ...values,
      showCreateCustom: false,
      showAllCustom: true,
      showSingleCustom: false,
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
                        {!showCreateCustom && (
                          <li className="add-res-tab">
                            <Link
                              onClick={createNew}
                              to="#"
                              className="add-res-tab"
                            >
                              Create New Custom
                            </Link>
                          </li>
                        )}
                        {!showAllCustom && (
                          <li className="add-res-tab">
                            <Link
                              onClick={viewAllCustom}
                              to="#"
                              className="add-res-tab"
                            >
                              All Customs
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
                              {showCreateCustom && (
                                <CreateNew
                                  values={values}
                                  setMainValues={setMainValues}
                                />
                              )}

                              {showAllCustom && (
                                <ShowAll
                                  values={values}
                                  setMainValues={setMainValues}
                                />
                              )}

                              {showSingleCustom && (
                                <Single
                                  values={values}
                                  setMainValues={setMainValues}
                                  customId={customId}
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
