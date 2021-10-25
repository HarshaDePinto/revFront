import React, { Fragment, useState, useEffect } from "react";
import { getUsersByRole,getAllRestaurants } from "./apiUsers";
import { isAuthenticated } from "../../../auth";
import Single from "./Single";

function AllManagers({ showManagers }) {
  const [showSingle, setShowSingle] = useState(false);
  const [updateDesigner, setUpdateDesigner] = useState(false);
  const [singleId, setSingleId] = useState(0);
  const { token } = isAuthenticated();
  const [allManagers, setAllManagers] = useState([]);
  const [error, setError] = useState(false);
  const [allRestaurant, setAllRestaurant] = useState([]);

  useEffect(() => {
    const getManagers = () => {
      let role = 3;
      getUsersByRole({ role }, token).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAllManagers(data);
        }
      });
    };
    getManagers();
  }, [showManagers, updateDesigner, token]);

  useEffect(() => {
    const loadRestaurants = () => {
      getAllRestaurants().then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAllRestaurant(data);
          
        }
      });
    };
    loadRestaurants();
  }, []);


  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const editDesigner = (id) => {
    setSingleId(id)
    setShowSingle(true);
  };
  return (
    <Fragment>
      <div className="step-content">
        <div className="step-tab-panel active" id="steppanel1">
          <div className="general-sec">
            <div className="row">
              {showSingle && (
                <Single
                  singleId={singleId}
                  setShowSingle={setShowSingle}
                  setUpdateDesigner={setUpdateDesigner}
                  updateDesigner={updateDesigner}
                />
              )}

              {showError()}

              {!showSingle && (
                <Fragment>
                  <h4 className="text-light-black fw-600"> All Managers</h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allManagers &&
                        allManagers.map((u, i) => (
                          <tr key={i}>
                            <td>{u.name}
                            <br/>
                            {allRestaurant && allRestaurant.map((r,i)=>(<Fragment key={i}>

                              {r._id === u.restaurant &&(<p className="text-info" >{r.title}</p>)}
                            </Fragment>))}
                            </td>
                            <td>{u.mobile}</td>
                            <td>
                              <button
                                onClick={() => editDesigner(u._id)}
                                className="btn-first green-btn text-custom-white"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AllManagers;
