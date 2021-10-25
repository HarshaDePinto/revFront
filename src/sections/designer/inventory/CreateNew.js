import React, { Fragment, useState } from "react";
import { createInventory } from "./apiInventory";
import { isAuthenticated } from "../../../auth";
import { Roller } from "react-awesome-spinners";

function CreateNew({
  setShowAllInventory,
  setShowCreateInventory,
  setShowSingleInventory,
}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    code: "",
    createdBy: user.name,
    updatedBy: user.name,
    error: "",
    loading: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { title, code,createdBy, updatedBy, error, loading } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createInventory(user._id, token, {
      title,
      code,
      createdBy,
      updatedBy,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setShowAllInventory(true);
        setShowCreateInventory(false);
        setShowSingleInventory(false);
      }
    });
  };

  const showLoading = () => loading && <Roller color="#F79550" />;


  const newInventoryForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600">Create New Inventory</h4>
        {showError()}
        {showLoading()}

        {!loading && (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-black fw-700">Name</label>
                <input
                  type="text"
                  className="form-control form-control-submit"
                  id="title"
                  value={title}
                  required
                  onChange={handleChange("title")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-black fw-700">Inventory Code</label>
                <input
                  type="text"
                  className="form-control form-control-submit"
                  id="code"
                  value={code}
                  required
                  onChange={handleChange("code")}
                />
              </div>
            </div>
           
              

            <div className="col-12">
              <div className="form-group">
                {title && code && (
                  <button
                  type="button"
                    onClick={clickSubmit}
                    className="btn-second btn-submit full-width"
                  >
                    Create Inventory
                  </button>
                )}

                {(!title || !code) && (
                  <button
                    
                    className="btn-second btn-submit full-width"
                  >
                    All fields should fill!
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
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

  return <Fragment>{newInventoryForm()}</Fragment>;
}

export default CreateNew;
