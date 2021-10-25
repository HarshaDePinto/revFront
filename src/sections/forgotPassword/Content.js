import React, { useState } from "react";
import {
  signInForgotPassword,
  readUser,
  sendSms,
  smsResend,
  authenticate,
} from "../../auth";
import { Link, Redirect } from "react-router-dom";
import banner from "../../assets/images/dum/banner-1.jpg";
import logo from "../../assets/images/logo/green.png";
import burger from "../../assets/images/dum/burger.png";
import { isAuthenticated } from "../../auth";
import { Roller } from "react-awesome-spinners";

function Content() {
  const { user } = isAuthenticated();
  const [submitMobile, setSubmitMobile] = useState("");
  const [submitOtp, setSubmitOtp] = useState("");
  const [submitUser, setSubmitUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const handleMobile = (event) => {
    setSubmitMobile(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const abortCont = new AbortController();
    let userMobile = submitMobile;
    readUser(userMobile, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setSubmitUser(data);
          setStepOne(false);
          setLoading(false);
          setStepTwo(true);
          setStepThree(false);
        }
      }
    });
    return () => abortCont.abort();
  };
  const enterMobile = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600 mt-5">
          Please Enter Your Mobile Number
        </h4>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label className="text-light-white fs-14">Mobile Number</label>
              <input
                type="number"
                className="form-control form-control-submit"
                id="mobile"
                value={submitMobile}
                onChange={handleMobile}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Click To Submit
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
            </div>{" "}
          </div>
        </div>
      </form>
    );
  };

  const checkPerson = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600 mt-5">
          Are You {submitUser.name} ?
        </h4>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <button
                type="button"
                onClick={clickSendOtp}
                className="btn-second btn-submit full-width"
              >
                Yes
              </button>
            </div>
            <div className="form-group text-center">
              {" "}
              <span>or</span>
            </div>
            <div className="form-group text-center">
              <p className="text-light-black mb-0">
                Back To <Link to="/register">Home</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/login">Forgot Password</Link>
              </p>
            </div>{" "}
          </div>
        </div>
      </form>
    );
  };

  const clickSendOtp = (event) => {
    event.preventDefault();
    setLoading(true);
    let otp = Math.floor(1000 + Math.random() * 9000);
    let id = submitUser._id;
    let mobile = submitUser.mobile;
    smsResend({ id, otp }).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setStepOne(false);
          setStepTwo(false);
          setStepThree(true);
        }
      }
    });

    sendSms({ mobile, otp }).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setStepOne(false);
          setStepTwo(false);
          setStepThree(true);
          setLoading(false);
        }
      }
    });
  };

  const handleOtp = (event) => {
    setSubmitOtp(event.target.value);
  };

  const enterOtp = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600 mt-5">
          Please Enter OTP That Send To 0{submitUser.mobile}
        </h4>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label className="text-light-white fs-14">OTP</label>
              <input
                type="number"
                className="form-control form-control-submit"
                id="submitOtp"
                value={submitOtp}
                onChange={handleOtp}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn-second btn-submit full-width"
                onClick={clickSubmitOtp}
              >
                Click To Submit
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
            </div>{" "}
          </div>
        </div>
      </form>
    );
  };

  const clickSubmitOtp = (event) => {
    event.preventDefault();
    setLoading(true);
    let mobile = submitUser.mobile;
    let newOtp = submitOtp;

    signInForgotPassword({ mobile, newOtp }).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          authenticate(data, () => {
            setRedirectToReferrer(true);
          });
        }
      }
    });
  };

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
                  {showError()}
                  {showLoading()}
                  {redirectUser()}
                  {!loading && stepOne && enterMobile()}
                  {!loading && stepTwo && checkPerson()}
                  {!loading && stepThree && enterOtp()}
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
