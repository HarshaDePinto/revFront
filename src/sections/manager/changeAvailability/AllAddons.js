import React, { Fragment, useState, useEffect } from "react";
import { getAllAddons, changeAvailability } from "./apiChangeAvailability";
import { Roller } from "react-awesome-spinners";
import { isAuthenticated } from "../../../auth";

function AllAddons() {
  const { user, token } = isAuthenticated();
  const [allAddons, setAllAddons] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(true);

  useEffect(() => {
    setLoading(true);
    const abortCont = new AbortController();
    getAllAddons(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllAddons(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [run]);

  const clickRemove = (id) => {
    let work = false;
    let addonId = id;
    let restaurantId = user.restaurant;
    changeAvailability(user._id, token, { addonId, restaurantId, work }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRun(!run);
        }
      }
    );
  };
  const clickAdd = (id) => {
    let work = true;
    let addonId = id;
    let restaurantId = user.restaurant;
    changeAvailability(user._id, token, { addonId, restaurantId, work }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRun(!run);
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
              <th scope="col">Addon</th>
              <th scope="col">Availability</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {allAddons &&
              allAddons.map((s, i) => (
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

export default AllAddons;
