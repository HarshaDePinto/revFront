import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { acceptedOrders } from "./apiAcceptedOrders";
import { isAuthenticated } from "../../../auth";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import SingleOrder from "./SingleOrder";

const StyledButton = styled.button`
  background-color: #f79550;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function Content() {
  const [acceptedOD, setAcceptedOD] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [showSingle, setShowSingle] = useState(false);
  const [singleOD, setSingleOD] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAll, showSingle]);

  useEffect(() => {
    const { user } = isAuthenticated();
    const restaurantId = user.restaurant;
    const abortCont = new AbortController();
    acceptedOrders(restaurantId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAcceptedOD(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showAll, showSingle]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const clickSingle = (a) => {
    setSingleOD(a);
    setShowSingle(true);
    setShowAll(false);
  };
  const clickShowAll = () => {
    setShowAll(true);
    setShowSingle(false);
  };

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
                          <Link to="/manager/dashboard" className="add-res-tab">
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
                          <Link
                            to="/manager/createOrder"
                            className="add-res-tab"
                          >
                            New Order
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
                            to="/manager/changeAvailability"
                            className="add-res-tab"
                          >
                            Change Availability
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
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                          
                              <div className="row">
                                {showLoading()}

                                {!loading &&
                                  showAll &&
                                  acceptedOD &&
                                  acceptedOD.map((a, i) => (
                                    <Fragment key={i}>
                                      <div className="col-lg-6 col-md-6 col-sm-12">
                                        <StyledButton
                                          onClick={() => {
                                            clickSingle(a);
                                          }}
                                        >
                                          {" "}
                                          {a.orderId} | {a.clientName}{" "}
                                        </StyledButton>
                                      </div>
                                    </Fragment>
                                  ))}

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
      </section>
    </Fragment>
  );
}

export default Content;
