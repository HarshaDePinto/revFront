import React, { useState, useEffect } from "react";
import { signUp, sendSms } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import banner from "../../assets/images/dum/banner-1.jpg";
import logo from "../../assets/images/logo/green.png";
import burger from "../../assets/images/dum/burger.png";
function Content() {
  const [otp, setOtp] = useState(0);
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    error: "",
    success: false,
    redirectUser: false,
    showPassword: false,
  });

  const createOtp = () => {
    let val = Math.floor(1000 + Math.random() * 9000);
    setOtp(val);
  };
  useEffect(() => {
    createOtp();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { name, mobile, email, password, success, error, showPassword,redirectUser } =
    values;
    

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, mobile, password, email, otp }).then((data) => {
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
        <h4 className="text-light-black fw-600 mt-5">Create your account</h4>
        {showError()}
        {showLoading()}
        
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-6">
            <div className="form-group">
              <label className="text-light-white fs-14">Full Name</label>
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
              <label className="text-light-white fs-14">Mobile Number</label>
              <input
                type="number"
                className="form-control form-control-submit"
                id="mobile"
                value={mobile}
                onChange={handleChange("mobile")}
              />
            </div>
            <div className="form-group">
              <label className="text-light-white fs-14">Email</label>
              <input
                type="email"
                className="form-control form-control-submit"
                id="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light-white fs-14">
                Password (6 character minimum with a number)
              </label>
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
                Create your account
              </button>
            </div>
            <div className="form-group text-center">
              {" "}
              <span>or</span>
            </div>
            <div className="form-group text-center">
              <p className="text-light-black mb-0">
                Have an account? <Link to="/login">Sign in</Link> |{" "}
                <Link to="/">Back To Home</Link>
              </p>
            </div>{" "}
            <span className="text-light-black fs-12 terms">
              By creating your Salad Factory account, you agree to the{" "}
              <Link to="#"> Terms of Use </Link> and{" "}
              <Link to="#"> Privacy Policy.</Link>
            </span>
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
  const sendOtp = () => {
    if (success) {
      sendSms({mobile,otp }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            success: false,
            redirectUser:true
          });
        }
      });
    }
  };

  const showLoading = () => (
    <div
      className="alert alert-danger"
      style={{ display: success ? "" : "none" }}
    >
     Sending SMS....
    </div>
  );

  const redirectUserMobile = () => {
    if (redirectUser) {
      let mobileNum = parseInt(mobile, 10);
        return <Redirect to={`/mobile/${mobileNum}`} />;
     
      
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
                <div className="login-box">{signUpForm()}
                {sendOtp()}
                {redirectUserMobile()}
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
