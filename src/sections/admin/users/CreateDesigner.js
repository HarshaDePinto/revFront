import React, { Fragment, useState } from "react";
import { signUp } from "./apiUsers";

function CreateDesigner({setShowCreateManagers,setShowManagers,setShowCreateDesigners,setShowDesigners}) {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    error: "",
    mobile_verified: true,
    role: 2,
    success: false,
    showPassword: true,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const {
    name,
    mobile,
    email,
    password,
    success,
    error,
    showPassword,
    mobile_verified,
    role,
  } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, mobile, password, email, role,mobile_verified }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: true,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600">Create New Designer</h4>
        {showError()}

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-6">
            <div className="form-group">
              <label className="text-light-black fw-700">Full Name</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label className="text-light-black fw-700">Mobile Number</label>
              <input
                type="number"
                className="form-control form-control-submit"
                id="mobile"
                value={mobile}
                onChange={handleChange("mobile")}
              />
            </div>
            <div className="form-group">
              <label className="text-light-black fw-700">Email</label>
              <input
                type="email"
                className="form-control form-control-submit"
                id="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light-black fw-700">
                Password (6 character minimum with a number)
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-submit"
                id="password"
                value={password}
                onChange={handleChange("password")}
              />
              
            </div>
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Create Designer
              </button>
            </div>
          </div>
        </div>
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

  const showDesigners = () =>{
      if (success) {
        setShowDesigners(true);
        setShowCreateDesigners(false);
        setShowManagers(false);
        setShowCreateManagers(false);


      }
  };

  return <Fragment>{signUpForm()}
  {showDesigners()}</Fragment>;
}

export default CreateDesigner;
