import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiAddon";
import { Roller } from "react-awesome-spinners";

function AllAddons({
  setMainValues,
  values,
  addonRole,
  addonRoleName,
  showSingleRole,
}) {
  const [allAddons, setAllAddons] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getAddonByRole({ addonRole },abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllAddons(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showSingleRole, addonRole]);
  

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  const editAddon = (id) => {
    setMainValues({
      ...values,
      showAllRole: false,
      showSingleRole: false,
      showCreateAddon: false,
      showSingleAddon: true,
      addonRole: addonRole,
      addonRoleName: addonRoleName,
      addonId: id,
    });
  };
  return (
    <Fragment>
      <div className="step-content">
        <div className="step-tab-panel active" id="steppanel1">
          <div className="general-sec">
            <div className="row">
              {showError()}
              {showLoading()}

              {!loading && (
                <table className="table-responsive table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Calorie</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAddons &&
                      allAddons.map((a, i) => (
                        <tr key={i}>
                          <td>
                            {a.title}
                            <br />
                            <p className="text-info fw-500">
                              Created By: {a.createdBy} on{" "}
                              {new Date(a.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <br />
                            <p className="text-light-black fw-500">
                              Updated By: {a.updatedBy} on{" "}
                              {new Date(a.updatedAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </td>
                          <td>{a.price}</td>
                          <td>{a.cal}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => editAddon(a._id)}
                              className="btn-first green-btn text-custom-white"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AllAddons;
