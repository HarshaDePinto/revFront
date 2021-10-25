import React, { Fragment, useState,useEffect } from "react";
import { signUp, getAllRestaurants } from "./apiUsers";

function CreateManager({
  setShowCreateManagers,
  setShowManagers,
  setShowCreateDesigners,
  setShowDesigners,
}) {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    restaurant: "",
    error: "",
    mobile_verified: true,
    role: 3,
    success: false,
    showPassword: true,
  });
  const [allRestaurant, setAllRestaurant] = useState([]);

  useEffect(() => {
    const loadRestaurants = () => {
      getAllRestaurants().then((data) => {
        if (data.error) {
            setValues(v=>({ ...v, error: data.error, success: false }));
        } else {
          setAllRestaurant(data);
          
        }
      });
    };
    loadRestaurants();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const {
    name,
    mobile,
    email,
    password,
    restaurant,
    success,
    error,
    showPassword,
    mobile_verified,
    role,
  } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({
      name,
      mobile,
      password,
      restaurant,
      email,
      role,
      mobile_verified,
    }).then((data) => {
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
          <div className="col-lg-6 col-md-6 col-sm-6">
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

          <div className="col-6">
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
          </div>
          <div className="col-6">
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
          </div>
          <div className="col-6">
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
          </div>
          <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Select Restaurant <sup className="fs-16">*</sup>
                </label>

                <select
                  className="form-control form-control-submit"
                  onChange={handleChange("restaurant")}
                  defaultValue={restaurant}
                >
                  {allRestaurant && <option>Please Select</option>}
                  {allRestaurant.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
         
          <div className="col-12">
        
           
            
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Create Manager
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

  const showManagers = () => {
    if (success) {
      setShowDesigners(false);
      setShowCreateDesigners(false);
      setShowManagers(true);
      setShowCreateManagers(false);
    }
  };

  return (
    <Fragment>
      {signUpForm()}
      {showManagers()}
    </Fragment>
  );
}

export default CreateManager;
