import React, { Fragment, useEffect, useState } from "react";
import { Roller } from "react-awesome-spinners";
import { getInventories, getRecodeByDate } from "./apiInventory";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isAuthenticated } from "../../../auth";

function PurchasingHistory({restaurantId}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [inventory, setInventory] = useState({});
  const [inventoryId, setInventoryId] = useState(false);
  const [allInventory, setAllInventory] = useState([]);
  const [allRecodes, setAllRecodes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startDateS, setStartDateS] = useState(new Date());
  const [endDateS, setEndDateS] = useState(new Date());
  const [subTotal, setSubtotal] = useState(0);
  const [subQte, setSubQte] = useState(0);
  const [subQteC, setSubQteC] = useState(0);
  const [managerRestaurant, setManagerRestaurant] = useState([]);
  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    getInventories(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setAllInventory(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  const handleInventory = (event) => {
    setInventory({});
    const inventoryCode = event.target.value;
    let inventory = allInventory.find((o) => o.code === inventoryCode);
    if (inventory) {
      setInventoryId(inventory._id);
      setInventory(inventory);
    }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "inventoryId") {
      let inventory = allInventory.find((o) => o._id === value);
      if (inventory) {
        setInventory(inventory);
        setInventoryId(inventory._id);
      }
    }
  };

  useEffect(() => {
    const { user, token } = isAuthenticated();
    const restId = restaurantId;
    setManagerRestaurant(restId);
    const startDate = new Date(startDateS).toISOString().slice(0, 10);
    const endDate = new Date(endDateS).toISOString().slice(0, 10);
    setLoading(true);
    const abortCont = new AbortController();

    getRecodeByDate(user._id, token, abortCont, {
      startDate,
      endDate,
      inventoryId,
    }).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          if (!inventoryId) {
            setAllRecodes(data);
            const subT = data
              .filter(({ restaurantId }) => restaurantId === restId)
              .filter(({ type }) => type === 0)
              .reduce((a, v) => (a = a + v.amount), 0);
            setSubtotal(subT);
            const subQ = data
              .filter(({ restaurantId }) => restaurantId === restId)
              .filter(({ type }) => type === 0)
              .reduce((a, v) => (a = a + v.qte), 0);
            setSubQte(subQ);
            const subQC = data
              .filter(({ restaurantId }) => restaurantId === restId)
              .filter(({ type }) => type === 1)
              .reduce((a, v) => (a = a + v.qte), 0);
            setSubQteC(subQC);
            setLoading(false);
          }

          if (inventoryId) {
            const singleR = data.filter(
              ({ inventoryId }) => inventoryId === inventoryId
            );
            setAllRecodes(singleR);
            const subT = singleR
              .filter(({ restaurantId }) => restaurantId === restId)
              .filter(({ type }) => type === 0)
              .reduce((a, v) => (a = a + v.amount), 0);
            setSubtotal(subT);
            const subQ = singleR
              .filter(({ restaurantId }) => restaurantId === restId)
              .filter(({ type }) => type === 0)
              .reduce((a, v) => (a = a + v.qte), 0);
            setSubQte(subQ);
            const subQC = singleR
              .filter(({ restaurantId }) => restaurantId === restId)
              .filter(({ type }) => type === 1)
              .reduce((a, v) => (a = a + v.qte), 0);
            setSubQteC(subQC);
            setLoading(false);
          }
        }
      }
    });
    return () => abortCont.abort();
  }, [startDateS, endDateS, inventoryId,restaurantId]);

  return (
    <Fragment>
      {showError()}
      {showLoading()}

      {!loading && (
        <div className="general-sec">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
              <span className="text-light-green fw-700">
                From :{" "}
                <DatePicker
                  selected={startDateS}
                  onChange={(date) => setStartDateS(date)}
                />
              </span>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
              <span className="text-light-green fw-700">
                To :{" "}
                <DatePicker
                  selected={endDateS}
                  onChange={(date) => setEndDateS(date)}
                />
              </span>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
              <div className="text-light-green fw-700">
                Code:
                <br />
                <input
                  type="text"
                  id="code"
                  value={inventoryId ? inventory.code : ""}
                  onChange={handleInventory}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
              <div className="text-light-green fw-700">
                Inventory:
                <br />
                <select
                  className="form-control-submit"
                  onChange={handleChange("inventoryId")}
                  value={inventoryId}
                >
                  <option value="">Please Select</option>
                  {allInventory &&
                    allInventory.map((o, i) => (
                      <option key={i} value={o._id}>
                        {o.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      <br/>
      {!loading && (
        
          <div className="row">
            <div className="col-12">
              <h2 className="title text-light-black fw-500">
                Purchasing History
              </h2>
            </div>
          </div>
       
      )}
      {!loading && (
        <div className="table-responsive mt-4">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Title</th>
                <th scope="col">Note</th>
                <th scope="col">Qte</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allRecodes &&
                allRecodes.map((o, i) => (
                  <Fragment key={i}>
                    {o.restaurantId === managerRestaurant && o.type === 0 && (
                      <tr>
                        <td>{o.inventoryId.code}</td>
                        <td>{o.inventoryId.title}</td>
                        <td>{o.note}</td>
                        <td>{o.qte} kg</td>
                        <td>{o.amount.toFixed(2)} LKR</td>
                      </tr>
                    )}
                  </Fragment>
                ))}

              <tr>
                <th scope="row" colSpan="3">
                  Subtotal
                </th>
                <th>{subQte.toFixed(2)} kg</th>
                <th>{subTotal.toFixed(2)} LKR</th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!loading && (
        <div className="general-sec">
          <div className="row">
            <div className="col-12">
              <h2 className="title text-light-black fw-500">
                Consuming History
              </h2>
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div className="table-responsive mt-4">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Title</th>
                <th scope="col">Note</th>
                <th scope="col">Qte</th>
              </tr>
            </thead>
            <tbody>
              {allRecodes &&
                allRecodes.map((o, i) => (
                  <Fragment key={i}>
                    {o.restaurantId === managerRestaurant && o.type === 1 && (
                      <tr>
                        <td>{o.inventoryId.code}</td>
                        <td>{o.inventoryId.title}</td>
                        <td>{o.note}</td>
                        <td>{o.qte} kg</td>
                      </tr>
                    )}
                  </Fragment>
                ))}

              <tr>
                <th scope="row" colSpan="3">
                  Subtotal
                </th>
                <th>{subQteC.toFixed(2)} kg</th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
}

export default PurchasingHistory;
