import React, { Fragment, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AllRole from "./AllRole";
import CreateAddon from "./CreateAddon";
import AllAddons from "./ShowSingleRole";
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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [values, setMainValues] = useState({
    showAllRole: true,
    showSingleRole: false,
    showCreateAddon: false,
    showSingleAddon: false,
    addonRole: "",
    addonRoleName: "",
    addonId: "",
  });
  const {
    showAllRole,
    showSingleRole,
    showCreateAddon,
    showSingleAddon,
    addonRole,
    addonRoleName,
    addonId,
  } = values;

  const viewCreateAddon=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: false,
        showCreateAddon: true,
        showSingleAddon: false,
        addonRole:0,
        addonRoleName:"Salad Premium Addons",
      });
  }
  const viewAllAddon=()=>{
    setMainValues({
        ...values,
        showAllRole: true,
        showSingleRole: false,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole: "",
        addonRoleName: "",
        addonId: "",
      });
  }
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
                       
                        {!showCreateAddon && <li className="add-res-tab">
                          <Link to="#"
                          onClick={viewCreateAddon}
                          className="add-res-tab">
                            Create New Addon
                          </Link>
                        </li>}
                        {!showAllRole && <li className="add-res-tab">
                          <Link to="#"
                          onClick={viewAllAddon}
                          className="add-res-tab">
                            All Addons
                          </Link>
                        </li>}
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
                                  
                                {showCreateAddon && <CreateAddon values={values} setMainValues={setMainValues} />}
                                {showAllRole && <AllRole values={values} setMainValues={setMainValues} />}
                                {showSingleRole && <AllAddons values={values} setMainValues={setMainValues} addonRole={addonRole} addonRoleName={addonRoleName} showSingleRole={showSingleRole} />}
                                {showSingleAddon && <Single values={values} setMainValues={setMainValues} addonRole={addonRole} addonRoleName={addonRoleName}  addonId={addonId} />}
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
