import React, { Fragment, useState, useEffect } from "react";
import { getAllSalads, changeSaladAvailability } from "./apiChangeAvailability";
import { Roller } from "react-awesome-spinners";
import { isAuthenticated } from "../../../auth";

function AllSalads() {
  const { user, token } = isAuthenticated();
  const [allSalads, setAllSalads] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(true);

  useEffect(() => {
    setLoading(true);
    const abortCont = new AbortController();
    getAllSalads(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllSalads(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [run]);

  const clickRemove = (id) => {
    let work = false;
    let saladId = id;
    let restaurantId = user.restaurant;
    changeSaladAvailability(user._id, token, {
      saladId,
      restaurantId,
      work,
    }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRun(!run);
      }
    });
  };
  const clickAdd = (id) => {
    let work = true;
    let saladId = id;
    let restaurantId = user.restaurant;
    changeSaladAvailability(user._id, token, {
      saladId,
      restaurantId,
      work,
    }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRun(!run);
      }
    });
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
              <th scope="col">Salads</th>
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
                    {JSON.stringify(s.restaurants).includes(
                      user.restaurant
                    ) && (
                      <span className="text-custom-white rectangle-tag bg-green">
                        Available
                      </span>
                    )}
                    {!JSON.stringify(s.restaurants).includes(
                      user.restaurant
                    ) && (
                      <span className="text-custom-white rectangle-tag bg-red">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td>
                    {JSON.stringify(s.restaurants).includes(
                      user.restaurant
                    ) && (
                      <span
                        onClick={() => clickRemove(s._id)}
                        className="text-custom-white rectangle-tag bg-red"
                      >
                        Make Unavailable
                      </span>
                    )}
                    {!JSON.stringify(s.restaurants).includes(
                      user.restaurant
                    ) && (
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

export default AllSalads;
