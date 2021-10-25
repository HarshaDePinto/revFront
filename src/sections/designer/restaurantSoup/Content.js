import React, { Fragment, useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ShowAll from "./ShowAll";


function Content() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { restaurantId, restaurantName } = useParams();
  const [showAllSoup, setShowAllSoup] = useState(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
 

 

  const showAdding = () => (
    <div
      className="alert alert-success"
      style={{ display: adding ? "" : "none" }}
    >
      <h4>Submit Soup to adding {restaurantName} ....</h4>
    </div>
  );

  const showRemoving = () => (
    <div
      className="alert alert-danger"
      style={{ display: removing ? "" : "none" }}
    >
      <h4>Soup remove from {restaurantName} ....</h4>
    </div>
  );



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
                               
                               {showAdding()}
                               {showRemoving()}
                               {showAllSoup && !adding && !removing && (<ShowAll setShowAllSoup={setShowAllSoup} setAdding={setAdding} setRemoving={setRemoving} restaurantId={restaurantId} />)}

                               

                               
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