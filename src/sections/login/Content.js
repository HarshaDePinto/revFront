import React, { useState } from "react";
import { signIn, authenticate } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import banner from "../../assets/images/dum/banner-1.jpg";
import logo from "../../assets/images/logo/green.png";
import burger from "../../assets/images/dum/burger.png";
import { isAuthenticated } from "../../auth";

function Content() {
  const { user } = isAuthenticated();
  const [values, setValues] = useState({
    mobile: "",
    password: "",
    error: "",
    loading: false,
    showPassword: false,
    redirectToReferrer: false,
  });

  const { mobile, password, loading, error, showPassword, redirectToReferrer } =
    values;

  const handleChange = (name) => (event) => {

    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ mobile, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const setShowPassword = () => {
    if (!showPassword) {
      setValues({ ...values, showPassword: true });
    } else {
      setValues({ ...values, showPassword: false });
    }
  };

  const signUpForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600 mt-5">Please Login</h4>
        {showError()}

        {showLoading()}
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label className="text-light-white fs-14">Mobile Number</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="mobile"
                value={mobile}
                onChange={handleChange("mobile")}
              />
            </div>
            <div className="form-group">
              <label className="text-light-white fs-14">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-submit"
                id="password"
                value={password}
                onChange={handleChange("password")}
              />
              <div
                 className={
                  showPassword
                    ? "fa fa-fw fa-eye field-icon"
                    : "fa fa-fw fa-eye-slash field-icon"
                }

                onClick={setShowPassword}
              />
            </div>
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Click To Login
              </button>
            </div>
            <div className="form-group text-center">
              {" "}
              <span>or</span>
            </div>
            <div className="form-group text-center">
              
              <p className="text-light-black mb-0">
                Not Register Yet? <Link to="/register">Register Now</Link> |{" "}
                <Link to="/">Back To Home</Link>
              </p>
              <p className="text-light-black mb-0">
                <Link to="/forgotPassword">Forgot Password?</Link>
              </p>
            </div>{" "}
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
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading....</h2>
      </div>
    );

  

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      }

      if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      }

      if (user && user.role === 2) {
        return <Redirect to="/designer/dashboard" />;
      }
      if (user && user.role === 3) {
        return <Redirect to="/manager/dashboard" />;
      }

      if (isAuthenticated()) {
        return <Redirect to="/" />;
      }
    }
  };
  return (
    <div className="inner-wrapper">
      <div className="container-fluid no-padding">
        <div className="row no-gutters overflow-auto">
          <div className="col-md-6">
            <div className="main-banner">
              <img
                src={banner}
                className="img-fluid full-width main-img"
                alt="banner"
              />
              <div className="overlay-2 main-padding">
                <img src={logo} className="img-fluid" alt="logo" />
              </div>
              <img src={burger} className="footer-img" alt="footer-img" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="section-2 user-page main-padding">
              <div className="login-sec">
                <div className="login-box">
                  {signUpForm()}
                  {redirectUser()}
                  {mobile && <Link to={`/mobile/${parseInt(mobile, 10)}`}
                    className="btn-second btn-facebook full-width"
                  >
                    Verify My Mobile
                  </Link>}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
