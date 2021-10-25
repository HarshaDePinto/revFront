import React, { Fragment, useState, useEffect } from "react";
import { getAllSalads,changeAvailability } from "./apiResSalad";
import { Roller } from "react-awesome-spinners";
import { isAuthenticated } from "../../../auth";

function ShowAll({
  setShowAllSalads,
  setAdding,
  setRemoving,
  restaurantId,
}) {
  const { user, token } = isAuthenticated();
  const [allSalads, setAllSalads] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const abortCont = new AbortController();
    getAllSalads(abortCont).then((data) => {
     if(data){
      if (data.error) {
        setError(data.error);
      } else {
        setAllSalads(data);
        setLoading(false);
      }
     }
    });
    return () => abortCont.abort();
  }, [loading, error]);

  const clickRemove = (id) => {
    let work = false;
    let saladId = id;
    changeAvailability(user._id, token, { saladId, restaurantId, work }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAdding(false);
          setRemoving(false);
          setShowAllSalads(true);
          setLoading(true);
        }
      }
    );
  };
  const clickAdd = (id) => {
    let work = true;
    let saladId = id;
    changeAvailability(user._id, token, { saladId, restaurantId, work }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAdding(false);
          setRemoving(false);
          setShowAllSalads(true);
          setLoading(true);
        }
      }
    );

  };
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
      {showError()}
      {showLoading()}
      {!loading && (
        <table className="table-responsive table-striped">
          <thead>
            <tr>
              <th scope="col">Salad</th>
              <th scope="col">Availability</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {allSalads &&
              allSalads.map((s, i) => (
                <tr key={i}>
                  <td>{s.title} </td>
                  <td>
                    {JSON.stringify(s.restaurants).includes(restaurantId) && (
                      <span className="text-custom-white rectangle-tag bg-green">
                        Available
                      </span>
                    )}
                    {!JSON.stringify(s.restaurants).includes(restaurantId) && (
                      <span className="text-custom-white rectangle-tag bg-red">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td>
                    {JSON.stringify(s.restaurants).includes(restaurantId) && (
                      <span
                        onClick={() => clickRemove(s._id)}
                        className="text-custom-white rectangle-tag bg-red"
                      >
                        Make Unavailable
                      </span>
                    )}
                    {!JSON.stringify(s.restaurants).includes(restaurantId) && (
                      <span
                        onClick={() => clickAdd(s._id)}
                        className="text-custom-white rectangle-tag bg-green"
                      >
                        Make Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
}

export default ShowAll;
