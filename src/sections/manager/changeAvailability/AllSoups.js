import React, { Fragment, useState, useEffect } from "react";
import { getAllSoups, changeSoupsAvailability } from "./apiChangeAvailability";
import { Roller } from "react-awesome-spinners";
import { isAuthenticated } from "../../../auth";

function AllSoups() {
  const { user, token } = isAuthenticated();
  const [allSoups, setAllSoups] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(true);

  useEffect(() => {
    setLoading(true);
    const abortCont = new AbortController();
    getAllSoups(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllSoups(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [run]);

  const clickRemove = (id) => {
    let work = false;
    let soupId = id;
    let restaurantId = user.restaurant;
    changeSoupsAvailability(user._id, token, {
      soupId,
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
    let soupId = id;
    let restaurantId = user.restaurant;
    changeSoupsAvailability(user._id, token, {
      soupId,
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
              <th scope="col">Soups</th>
              <th scope="col">Availability</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {allSoups &&
              allSoups.map((s, i) => (
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

export default AllSoups;
