import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllClients from "./AllClients";
import AllDesigners from "./AllDesigners";
import AllManagers from "./AllManagers";
import AllUsers from "./AllUsers";
import CreateDesigner from "./CreateDesigner";
import CreateManager from "./CreateManager";

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showDesigners, setShowDesigners] = useState(false);
  const [showCreateDesigners, setShowCreateDesigners] = useState(false);
  const [showManagers, setShowManagers] = useState(false);
  const [showCreateManagers, setShowCreateManagers] = useState(false);
  const [showClients, setShowClients] = useState(false);

  const backToAll = () => {
    setShowDesigners(false);
    setShowCreateDesigners(false);
    setShowManagers(false);
    setShowCreateManagers(false);
    setShowClients(false);
  };
  const backToDesigners = () => {
    setShowDesigners(true);
    setShowCreateDesigners(false);
    setShowManagers(false);
    setShowCreateManagers(false);
    setShowClients(false);
  };

  const backToCreateDesigners = () => {
    setShowDesigners(false);
    setShowCreateDesigners(true);
    setShowManagers(false);
    setShowCreateManagers(false);
    setShowClients(false);
  };

  const backToCreateManagers = () => {
    setShowDesigners(false);
    setShowCreateDesigners(false);
    setShowManagers(false);
    setShowCreateManagers(true);
    setShowClients(false);
  };

  const backToManagers = () => {
    setShowDesigners(false);
    setShowCreateDesigners(false);
    setShowManagers(true);
    setShowCreateManagers(false);
    setShowClients(false);
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
                          <Link to="/admin/dashboard" className="add-res-tab">
                            Dashboard
                          </Link>
                        </li>
                        {showDesigners && (
                          <Fragment>
                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToCreateDesigners}
                                className="add-res-tab"
                              >
                                Create New Designer
                              </Link>
                            </li>
                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToAll}
                                className="add-res-tab"
                              >
                                Back To All Users
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {showClients && (
                          <Fragment>
                            <li className="add-res-tab">
                              <Link
                                to="#"
                                onClick={backToAll}
                                className="add-res-tab"
                              >
                                Back To All Users
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {showCreateDesigners && (
                          <Fragment>
                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToDesigners}
                                className="add-res-tab"
                              >
                                All Designers
                              </Link>
                            </li>

                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToAll}
                                className="add-res-tab"
                              >
                                Back To All Users
                              </Link>
                            </li>
                          </Fragment>
                        )}

                        {showManagers && (
                          <Fragment>
                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToCreateManagers}
                                className="add-res-tab"
                              >
                                Create New Manager
                              </Link>
                            </li>
                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToAll}
                                className="add-res-tab"
                              >
                                Back To All Users
                              </Link>
                            </li>
                          </Fragment>
                        )}

                        {showCreateManagers && (
                          <Fragment>
                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToManagers}
                                className="add-res-tab"
                              >
                                All Managers
                              </Link>
                            </li>

                            <li className="add-res-tab" id="stepbtn2">
                              <Link
                                to="#"
                                onClick={backToAll}
                                className="add-res-tab"
                              >
                                Back To All Users
                              </Link>
                            </li>
                          </Fragment>
                        )}
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      {!showDesigners &&
                        !showManagers &&
                        !showCreateDesigners &&
                        !showCreateManagers &&
                        !showClients && (
                          <AllUsers
                            setShowDesigners={setShowDesigners}
                            setShowManagers={setShowManagers}
                            setShowClients={setShowClients}
                          />
                        )}

                      {showDesigners && (
                        <AllDesigners showDesigners={showDesigners} />
                      )}
                      {showCreateDesigners && (
                        <CreateDesigner
                          setShowDesigners={setShowDesigners}
                          setShowCreateDesigners={setShowCreateDesigners}
                          setShowManagers={setShowManagers}
                          setShowCreateManagers={setShowCreateManagers}
                        />
                      )}
                      {showClients && <AllClients showClients={showClients} />}

                      {showManagers && (
                        <AllManagers showManagers={showManagers} />
                      )}
                      {showCreateManagers && (
                        <CreateManager
                          setShowDesigners={setShowDesigners}
                          setShowCreateDesigners={setShowCreateDesigners}
                          setShowManagers={setShowManagers}
                          setShowCreateManagers={setShowCreateManagers}
                        />
                      )}
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
