import React, { Fragment } from "react";

function AllUsers({setShowManagers,setShowDesigners,setShowClients}) {

  const showManagers=()=>{
    setShowManagers(true);
    setShowDesigners(false);
    setShowClients(false);
  }

  const showDesigners=()=>{
    setShowManagers(false);
    setShowDesigners(true);
    setShowClients(false);
  }
  const showAllClients = () => {
    setShowDesigners(false);
    setShowManagers(false);
    setShowClients(true);
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
                    <h5 className="card-title">Designers</h5>
                    <p className="card-text">Who can add data to the system.</p>
                    <button
                      onClick={showDesigners}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Manage Designers
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Managers</h5>
                    <p className="card-text">Who can control the restaurants</p>
                    <button
                      onClick={showManagers}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Manage Managers
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Clients</h5>
                    <p className="card-text">All Clients Database</p>
                    <button
                      onClick={showAllClients}
                      className="btn-first green-btn text-custom-white full-width fw-500"
                    >
                      Manage Clients
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

export default AllUsers;
