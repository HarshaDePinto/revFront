import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import { myOrders } from "./apiOrders";
import { Roller } from "react-awesome-spinners";
import SingleOrder from "./SingleOrder";

function Content() {
  const { user } = isAuthenticated();
  const [myOD, setMyOD] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [showSingle, setShowSingle] = useState(false);
  const [singleOD, setSingleOD] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAll]);

  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    myOrders(user._id, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setMyOD(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [user._id]);

  const clickSingle = (a) => {
    setSingleOD(a);
    setShowSingle(true);
    setShowAll(false);
  };

  const clickShowAll = () => {
    setShowAll(true);
    setShowSingle(false);
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  return (
    <Fragment>
      {showError()}

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
                          <Link to="/user/dashboard" className="add-res-tab">
                            Dashboard
                          </Link>
                        </li>
                        {!showAll && (
                          <li className="add-res-tab">
                            <Link
                              to="#"
                              onClick={clickShowAll}
                              className="add-res-tab"
                            >
                              Show All
                            </Link>
                          </li>
                        )}
                        <li className="add-res-tab">
                          <Link to="/user/myProfile" className="add-res-tab">
                            My Profile
                          </Link>
                        </li>
                      </ul>
                      <div></div>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <div className="row">
                              <div className="col-12">
                                {showLoading()}
                                {!loading && showAll && !showSingle && (
                                  <div className="table-responsive mt-4">
                                    <table className="table table-sm">
                                      <thead>
                                        <tr>
                                          <th scope="col">#</th>
                                          <th scope="col">Date</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {myOD &&
                                          myOD.map((o, i) => (
                                            <Fragment key={i}>
                                              <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>
                                                  <button
                                                    type="button"
                                                    className="btn-first white-btn full-width text-light-green fw-600"
                                                    onClick={() => {
                                                      clickSingle(o);
                                                    }}
                                                  >
                                                    {new Date(
                                                      o.createdAt
                                                    ).toLocaleDateString(
                                                      undefined,
                                                      {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                      }
                                                    )}
                                                  </button>
                                                </td>
                                              </tr>
                                            </Fragment>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}

                                {!loading && !showAll && showSingle && (
                                  <Fragment>
                                    <SingleOrder
                                      singleOD={singleOD}
                                      setShowSingle={setShowSingle}
                                      setShowAll={setShowAll}
                                    />
                                  </Fragment>
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
        </div>
      </section>
    </Fragment>
  );
}

export default Content;
