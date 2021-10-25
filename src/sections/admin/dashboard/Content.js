import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import { getAllRestaurants } from "./apiDashboard";

const StyledButtonOne = styled.button`
  background-color: #f79550;
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

  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getAllRestaurants(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setRestaurants(data);
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
                                {!loading &&
                                  restaurants &&
                                  restaurants.map((r, i) => (
                                    <Fragment key={i}>
                                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <Link
                                          to={`/admin/restaurant/${r._id}`}
                                          className="add-res-tab"
                                        >
                                          <StyledButtonOne>
                                          {r.title}
                                        </StyledButtonOne>
                                        </Link>
                                        
                                      </div>
                                    </Fragment>
                                  ))}
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
