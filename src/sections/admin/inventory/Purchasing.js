import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../../../auth";
import { Roller } from "react-awesome-spinners";
import { getInventories, createRecode } from "./apiInventory";

function Purchasing({restaurantId}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user, token } = isAuthenticated();
  const [inventory, setInventory] = useState({});
  const [allInventory, setAllInventory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [recordValues, setRecordValues] = useState({
    note: "",
    restaurantId: restaurantId,
    description: "",
    inventoryId: "",
    type: 0,
    qte: 0,
    amount: 0,
    createdBy: user.name,
  });
  const {
    note,
    inventoryId,
    description,
    type,
    qte,
    amount,
    createdBy,
  } = recordValues;

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
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Record Added Successfully!
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "inventoryId") {
      let inventory = allInventory.find((o) => o._id === value);
      if (inventory) {
        setInventory(inventory);
      }
    }

    setRecordValues({ ...recordValues, [name]: value });
  };
  const handleInventory = (event) => {
    setInventory({});
    const inventoryCode = event.target.value;
    let inventory = allInventory.find((o) => o.code === inventoryCode);

    if (inventory) {
      setRecordValues({ ...recordValues, inventoryId: inventory._id });
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    setSuccess(false);
    createRecode(user._id, token, {
      note,
      inventoryId,
      restaurantId,
      description,
      type,
      qte,
      amount,
      createdBy,
    }).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
        setSuccess(false);
      } else {
        setSuccess(true);
        setLoading(false);
        setInventory({});
        setRecordValues({
          ...recordValues,
          note: "",
          restaurantId: "",
          inventoryId: "",
          description: "",
          type: 0,
          qte: 0,
          amount: 0,
          createdBy: user.name,
        });
      }
    });
  };

  const priceChecker = () => {
    if (parseInt(amount, 10) < 0) {
      return <sup className="fs-16">*Price Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };

  const qteChecker = () => {
    if (parseInt(qte, 10) < 0) {
      return <sup className="fs-16">*Qte Can not be Negative!</sup>;
    } else {
      return <sup className="fs-16"></sup>;
    }
  };

  const newRecordForm = () => {
    return (
      <form>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-group">
              <label className="text-light-black fw-700">Code</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="code"
                value={inventory.code}
                onChange={handleInventory}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Inventory <sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
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
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-group">
              <label className="text-light-black fw-700">Note</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="note"
                value={note}
                onChange={handleChange("note")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Quantity (kg)
                {qteChecker()}
              </label>
              <input
                type="number"
                value={qte}
                onChange={handleChange("qte")}
                className="form-control form-control-submit"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Price (LKR)
                {priceChecker()}
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleChange("amount")}
                className="form-control form-control-submit"
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Create Recode
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {showSuccess()}
      {!loading && (
        <div className="general-sec">
          <div className="row">
            <div className="col-12">
              <h2 className="title text-light-black fw-500">
                Add A Purchased Record
              </h2>
            </div>
          </div>
          {newRecordForm()}
        </div>
      )}
    </Fragment>
  );
}

export default Purchasing;
