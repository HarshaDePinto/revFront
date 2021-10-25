import React, { Fragment, useState, useEffect } from "react";
import { getAllRestaurants } from "./apiRestaurant";
import { Link } from "react-router-dom";
import { Roller } from "react-awesome-spinners";
function AllRestaurant({
  showUpdateRestaurant,
  showAllRestaurant,
  setShowAllRestaurant,
  setShowCreateRestaurant,
  setShowSingleRestaurant,
  setSingleId,
}) {
  const [allRestaurant, setAllRestaurant] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    getAllRestaurants(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
        } else {
          setAllRestaurant(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [showUpdateRestaurant, showAllRestaurant]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const editRestaurant = (id) => {
    setSingleId(id);
    setShowSingleRestaurant(true);
    setShowCreateRestaurant(false);
    setShowAllRestaurant(false);
  };
  return (
    <Fragment>
      <h5 className="text-light-black fw-700">All Restaurant</h5>
      {showError()}
      {showLoading()}
      {!loading && (
        <table className="table-responsive table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Addons</th>
              <th scope="col">Salads</th>
              <th scope="col">Soups</th>
              <th scope="col">Foods</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {allRestaurant &&
              allRestaurant.map((r, i) => (
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
                  <td>
                    <Link
                      to={`/designer/res/addons/${r._id}/${r.title}`}
                      className="btn-first green-btn text-custom-white"
                    >
                      Addons
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/designer/res/salads/${r._id}/${r.title}`}
                      className="btn-first green-btn text-custom-white"
                    >
                      Salads
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/designer/res/soups/${r._id}/${r.title}`}
                      className="btn-first green-btn text-custom-white"
                    >
                      Soups
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/designer/res/foods/${r._id}/${r.title}`}
                      className="btn-first green-btn text-custom-white"
                    >
                      Foods
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => editRestaurant(r._id)}
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

export default AllRestaurant;
