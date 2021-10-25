import React, { Fragment, useState, useEffect } from "react";
import { getAllPromotions } from "./apiPromotion";
import { Roller } from "react-awesome-spinners";
function AllPromotion({
  showUpdatePromotion,
  showAllPromotion,
  setShowAllPromotion,
  setShowCreatePromotion,
  setShowSinglePromotion,
  setSingleId,
}) {
  const [allPromotion, setAllPromotion] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getAllPromotions(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllPromotion(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showUpdatePromotion, showAllPromotion]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const editPromotion = (id) => {
    setSingleId(id);
    setShowSinglePromotion(true);
    setShowCreatePromotion(false);
    setShowAllPromotion(false);
  };
  return (
    <Fragment>
      <h5 className="text-light-black fw-700">All Promotion</h5>
      {showError()}
      {showLoading()}
      {!loading && (
        <table className="table-responsive table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Code</th>
              <th scope="col">Discount</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {allPromotion &&
              allPromotion.map((r, i) => (
                <tr key={i}>
                  <td>
                    {r.title}
                    <br />
                    <p className="text-info fw-500">
                      Created By: {r.createdBy} on{" "}
                      {new Date(r.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <br />
                    <p className="text-light-black fw-500">
                      Updated By: {r.updatedBy} on{" "}
                      {new Date(r.updatedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </td>
                  <td>{r.code}</td>
                  <td>{r.amount} %</td>
                  <td>
                    {!r.active && (
                      <Fragment>
                        <span className="text-custom-white rectangle-tag bg-red">
                          Deactivated
                        </span>
                      </Fragment>
                    )}
                    {r.active && (
                      <Fragment>
                        <span className="text-custom-white rectangle-tag bg-green">
                          Activated
                        </span>
                      </Fragment>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => editPromotion(r._id)}
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

export default AllPromotion;
