import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllAddons from "./AllAddons";
import AllFoods from "./AllFoods";
import AllSalads from "./AllSalads";
import AllSoups from "./AllSoups";
import ShowAll from "./ShowAll";

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showAddons, setShowAddons] = useState(false);
  const [showSalads, setShowSalads] = useState(false);
  const [showSoups, setShowSoups] = useState(false);
  const [showFoods, setShowFoods] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const backToAll = () => {
    setShowAddons(false);
    setShowSalads(false);
    setShowSoups(false);
    setShowFoods(false);
    setShowAll(true);
  };
  const backToAddons = () => {
    setShowAddons(true);
    setShowSalads(false);
    setShowSoups(false);
    setShowFoods(false);
    setShowAll(false);
  };

  const backToSalads = () => {
    setShowAddons(false);
    setShowSalads(true);
    setShowSoups(false);
    setShowFoods(false);
    setShowAll(false);
  };

  const backToSoups = () => {
    setShowAddons(false);
    setShowSalads(false);
    setShowSoups(true);
    setShowFoods(false);
    setShowAll(false);
  };

  const backToFoods = () => {
    setShowAddons(false);
    setShowSalads(false);
    setShowSoups(false);
    setShowFoods(true);
    setShowAll(false);
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
                        {!showAll && (
                          <Fragment>
                            <li className="add-res-tab">
                              <Link
                                to="#"
                                onClick={backToAll}
                                className="add-res-tab"
                              >
                                Back To All
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {!showAddons && (
                          <Fragment>
                            <li className="add-res-tab">
                              <Link
                                to="#"
                                onClick={backToAddons}
                                className="add-res-tab"
                              >
                                Change Addons
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {!showSalads && (
                          <Fragment>
                            <li className="add-res-tab">
                              <Link
                                to="#"
                                onClick={backToSalads}
                                className="add-res-tab"
                              >
                                Change Salads
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {!showSoups && (
                          <Fragment>
                            <li className="add-res-tab">
                              <Link
                                to="#"
                                onClick={backToSoups}
                                className="add-res-tab"
                              >
                                Change Soups
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {!showFoods && (
                          <Fragment>
                            <li className="add-res-tab">
                              <Link
                                to="#"
                                onClick={backToFoods}
                                className="add-res-tab"
                              >
                                Change Foods
                              </Link>
                            </li>
                          </Fragment>
                        )}
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
                            to="/manager/inventory"
                            className="add-res-tab"
                          >
                            Inventory
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      {showAll && (
                        <ShowAll
                          setShowAddons={setShowAddons}
                          setShowSalads={setShowSalads}
                          setShowSoups={setShowSoups}
                          setShowFoods={setShowFoods}
                          setShowAll={setShowAll}
                        />
                      )}
                      {showAddons && <AllAddons/>}
                      {showSalads && <AllSalads/>}
                      {showSoups && <AllSoups/>}
                      {showFoods && <AllFoods/>}
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
