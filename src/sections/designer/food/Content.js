import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllFoodCategory from "./AllFoodCategory";
import CreateNew from "./CreateNew";
import SingleCategory from "./SingleCategory";
import SingleFood from "./SingleFood";


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
    showAllCategory: true,
    showSingleCategory: false,
    showCreateFood: false,
    showSingleFood: false,
    foodCategoryId: "",
    foodCategoryName: "",
    foodId: "",
  });

  const {
    showAllCategory,
    showSingleCategory,
    showCreateFood,
    foodCategoryId,
    foodCategoryName,
    showSingleFood,
    foodId,
  } = values;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAllCategory,showSingleCategory,showCreateFood]);

  const createNew = () => {
    setMainValues({
      ...values,
      showCreateFood: true,
      showAllCategory: false,
      showSingleCategory: false,
      showSingleFood: false,
    });
  };

  const viewAllCategory = () => {
    setMainValues({
      ...values,
      showCreateFood: false,
      showAllCategory: true,
      showSingleCategory: false,
      showSingleFood: false,
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
                        {!showCreateFood && (
                          <li className="add-res-tab">
                            <Link
                              onClick={createNew}
                              to="#"
                              className="add-res-tab"
                            >
                              Create New food
                            </Link>
                          </li>
                        )}
                        {!showAllCategory && (
                          <li className="add-res-tab">
                            <Link
                              onClick={viewAllCategory}
                              to="#"
                              className="add-res-tab"
                            >
                              All food Categories
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
                              {showAllCategory && (
                                <AllFoodCategory
                                  setMainValues={setMainValues}
                                  values={values}
                                />
                              )}
                              {showSingleCategory && (
                                <SingleCategory
                                  setMainValues={setMainValues}
                                  values={values}
                                  foodCategoryId={foodCategoryId}
                                  foodCategoryName={foodCategoryName}
                                />
                              )}

                              {showSingleFood && (
                                <SingleFood
                                  setMainValues={setMainValues}
                                  values={values}
                                  foodId={foodId}
                                  categoryId={foodCategoryId}
                                />
                              )}

                              {showCreateFood && (
                                <CreateNew
                                  setMainValues={setMainValues}
                                  values={values}
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
