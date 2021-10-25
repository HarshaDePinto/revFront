import React, { Fragment } from "react";

function ShowAll({
  setShowAddons,
  setShowSalads,
  setShowSoups,
  setShowFoods,
  setShowAll,
}) {
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
      <div className="step-content">
        <div className="step-tab-panel active" id="steppanel1">
          <div className="general-sec">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Addons</h5>
                    <p className="card-text">Change The Availability.</p>
                    <button
                      onClick={backToAddons}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Change Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Salads</h5>
                    <p className="card-text">Change The Availability.</p>
                    <button
                      onClick={backToSalads}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Change Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Soups</h5>
                    <p className="card-text">Change The Availability.</p>
                    <button
                      onClick={backToSoups}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Change Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Other Foods</h5>
                    <p className="card-text">Change The Availability.</p>
                    <button
                      onClick={backToFoods}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Change Now
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

export default ShowAll;
