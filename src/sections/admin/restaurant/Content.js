import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import { readRestaurant } from "./apiRestaurant";

const StyledButtonOne = styled.button`
  background-color: #f79550;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  width: 100%;
`;

const StyledButtonTwo = styled.button`
  background-color: #000000;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  width: 100%;
`;

function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [restaurant, setRestaurant] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams();

  useEffect(() => {
    const abortCont = new AbortController();
    readRestaurant(restaurantId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setLoading(false);
          setError(data.error);
        } else {
          setRestaurant(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [restaurantId]);

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
                        <li className="add-res-tab" id="stepbtn2">
                          <Link to="/admin/users" className="add-res-tab">
                            Users
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <form>
                              <div className="row">
                                {showError()}
                                {showLoading()}
                                {!loading && restaurant &&(
                                  <>
                                    <h2 className="title text-light-black fw-500">
                                      {restaurant.title}
                                    </h2>
                                  </>
                                )}
                              </div>
                              {!loading && restaurant && (
                                <div className="row">
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <Link
                                      to={`/admin/deliveredOrders/${restaurant._id}`}
                                      className="add-res-tab"
                                    >
                                      <StyledButtonOne>
                                        Delivered Orders
                                      </StyledButtonOne>
                                    </Link>
                                  </div>
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <Link
                                      to={`/admin/salesByProduct/${restaurant._id}`}
                                      className="add-res-tab"
                                    >
                                      <StyledButtonOne>
                                        Sales By Products
                                      </StyledButtonOne>
                                    </Link>
                                  </div>
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <Link
                                      to={`/admin/inventory/${restaurant._id}`}
                                      className="add-res-tab"
                                    >
                                      <StyledButtonOne>
                                        Inventory
                                      </StyledButtonOne>
                                    </Link>
                                  </div>
                                </div>
                              )}
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="/admin/dashboard"
                                    className="add-res-tab"
                                  >
                                    <StyledButtonTwo>Dashboard</StyledButtonTwo>
                                  </Link>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <Link
                                    to="/admin/users"
                                    className="add-res-tab"
                                  >
                                    <StyledButtonTwo>Users</StyledButtonTwo>
                                  </Link>
                                </div>
                              </div>
                            </form>
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
