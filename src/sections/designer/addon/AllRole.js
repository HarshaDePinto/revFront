import React, { Fragment } from "react";

function AllRole({setMainValues,values}) {

  const showSaladPremium=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:0,
        addonRoleName:"Salad Premium Addons",
      });
  }

  const showSaladGeneral=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:1,
        addonRoleName:"Salad General Addon",
      });
  }

  const showSaladSoup=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:2,
        addonRoleName:"Soup Addon",
      });
  }

  const showSaladFood=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:3,
        addonRoleName:"Other Addon",
      });
  }

  const showCustomLettuce=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:4,
        addonRoleName:"Custom Lettuce",
      });
  }

  const showCustomThrow=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:5,
        addonRoleName:"Custom Throw",
      });
  }

  const showCustomProtein=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:6,
        addonRoleName:"Custom Protein",
      });
  }

  const showCustomDressing=()=>{
    setMainValues({
        ...values,
        showAllRole: false,
        showSingleRole: true,
        showCreateAddon: false,
        showSingleAddon: false,
        addonRole:7,
        addonRoleName:"Custom Dressing",
      });
  }

 
  return (
    <Fragment>
      <div className="step-content">
        <div className="step-tab-panel active" id="steppanel1">
          <div className="general-sec">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Salad General Addon</h5>
                    <p className="card-text">View in all salad categories</p>
                    <button
                      onClick={showSaladGeneral}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Salad Premium Addons</h5>
                    <p className="card-text">View in all salad categories</p>
                    <button
                      onClick={showSaladPremium}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Soup Addon</h5>
                    <p className="card-text">View in all soups</p>
                    <button
                      onClick={showSaladSoup}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Other Addon</h5>
                    <p className="card-text">View in all other foods</p>
                    <button
                      onClick={showSaladFood}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Custom Lettuce</h5>
                    <p className="card-text">View in all custom salads</p>
                    <button
                      onClick={showCustomLettuce}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Custom Throw</h5>
                    <p className="card-text">View in all custom salads</p>
                    <button
                      onClick={showCustomThrow}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Custom Protein</h5>
                    <p className="card-text">View in all custom salads</p>
                    <button
                      onClick={showCustomProtein}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-2">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Custom Dressing</h5>
                    <p className="card-text">View in all custom salads</p>
                    <button
                      onClick={showCustomDressing}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                       Manage Addons
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AllRole;