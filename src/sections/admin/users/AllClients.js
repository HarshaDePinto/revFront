import React, { Fragment, useState, useEffect } from "react";
import { getUsersByRole } from "./apiUsers";
import { isAuthenticated } from "../../../auth";
import Table from "./Table";
import Single from "./Single";

function AllClients({ showClients }) {
  const [showSingle, setShowSingle] = useState(false);
  const [updateDesigner, setUpdateDesigner] = useState(false);
  const [singleId, setSingleId] = useState(0);
  const { token } = isAuthenticated();
  const [allClients, setAllClients] = useState([]);
  const [error, setError] = useState(false);


  useEffect(() => {
    const getClients = () => {
      let role=0;
      getUsersByRole({ role }, token).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
            setAllClients(data);
        }
      });
    };
    getClients();
  }, [showClients,updateDesigner,token]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  return (
    <Fragment>
      <div className="step-content">
        <div className="step-tab-panel active" id="steppanel1">
          <div className="general-sec">
            <div className="row">
              {showSingle && <Single singleId={singleId} setShowSingle={setShowSingle} setUpdateDesigner={setUpdateDesigner} updateDesigner ={updateDesigner} />}

              {showError()}

              {!showSingle && (
                <Fragment>
                  <h4 className="text-light-black fw-600"> All Clients</h4>
                  <Table
                    users={allClients}
                    setShowSingle={setShowSingle}
                    setSingleId={setSingleId}
                  />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AllClients;
