import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllSoups } from "./apiCreateSoup";
import { Roller } from "react-awesome-spinners";
import { isAuthenticated } from "../../../auth";
import SingleSoup from "./SingleSoup";
const StyledButton = styled.button`
  background-color: #f79550;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;

const StyledButtonTwo = styled.button`
  background-color: #000000;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showAllSoup, setShowAllSoup] = useState(true);
  const [showSingleSoup, setShowSingleSoup] = useState(false);
  const [soup, setSoup] = useState({});
  const [allSoup, setAllSoup] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = isAuthenticated();
  const restaurantId = user.restaurant;


  const backToAll = () => {
    setShowAllSoup(true);
    setShowSingleSoup(false);
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getAllSoups(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllSoup(data);

          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  const setSingleSoup = (c) => {
    setSoup(c);
    setShowAllSoup(false);
    setShowSingleSoup(true);
  };

  const checkAvailable = (c) => {
    if (JSON.stringify(c.restaurants).includes(restaurantId)) {
      return (
        <div className="col-6">
          <StyledButton
            onClick={() => {
              setSingleSoup(c);
            }}
          >
            {c.title}
          </StyledButton>
        </div>
      );
    }
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
                            to="/manager/changeAvailability"
                            className="add-res-tab"
                          >
                            Change Availability
                          </Link>
                        </li>
                        <li className="add-res-tab">
                          <Link to="/manager/inventory" className="add-res-tab">
                            Inventory
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            {showLoading()}
                            {showError()}

                            <div className="row">
                              {!loading &&
                                showAllSoup &&
                                allSoup &&
                                allSoup.map((c, i) => (
                                  <Fragment key={i}>
                                    {checkAvailable(c)}
                                  </Fragment>
                                ))}

                              {!loading &&showAllSoup && (
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="/manager/createOrder"
                                    className="add-res-tab"
                                  >
                                    <StyledButtonTwo>
                                      Back To New
                                    </StyledButtonTwo>
                                  </Link>
                                </div>
                              )}
                            </div>
                            {showSingleSoup &&(<SingleSoup soup={soup} />)}

                            {showSingleSoup && (
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <StyledButtonTwo onClick={backToAll}>
                                    Back To All
                                  </StyledButtonTwo>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="/manager/createOrder"
                                    className="add-res-tab"
                                  >
                                    <StyledButtonTwo>
                                      Back To New
                                    </StyledButtonTwo>
                                  </Link>
                                </div>
                              </div>
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
      </section>
    </Fragment>
  );
}

export default Content;
