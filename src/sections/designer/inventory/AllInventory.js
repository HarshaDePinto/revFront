import React, { Fragment, useState, useEffect } from "react";
import { getAllInventories } from "./apiInventory";
import { Roller } from "react-awesome-spinners";
function AllInventory({
  showUpdateInventory,
  showAllInventory,
  setShowAllInventory,
  setShowCreateInventory,
  setShowSingleInventory,
  setSingleId,
}) {
  const [allInventory, setAllInventory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getAllInventories(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllInventory(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showUpdateInventory, showAllInventory]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const editInventory = (id) => {
    setSingleId(id);
    setShowSingleInventory(true);
    setShowCreateInventory(false);
    setShowAllInventory(false);
  };
  return (
    <Fragment>
      <h5 className="text-light-black fw-700">All Inventory</h5>
      {showError()}
      {showLoading()}
      {!loading && (
        <table className="table-responsive table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Code</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {allInventory &&
              allInventory.sort((a, b) => a.code > b.code ? 1:-1).map((r, i) => (
                <tr key={i}>
                  <td>
                    {r.title}
                 
                    
                  </td>
                  <td>{r.code}</td>
                  <td>
                    <button
                      onClick={() => editInventory(r._id)}
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
    </Fragment>
  );
}

export default AllInventory;
