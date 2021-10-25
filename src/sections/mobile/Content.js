import React, { useState, useEffect } from "react";
import { readUser, sendSms, mobileVerify,smsResend } from "../../auth";
import { Link, useParams } from "react-router-dom";
import banner from "../../assets/images/dum/banner-1.jpg";
import logo from "../../assets/images/logo/green.png";
import burger from "../../assets/images/dum/burger.png";

function Content() {
  const [values, setValues] = useState({
    name: "",
    id: "",
    mobile: "",
    mobile_verified:false,
    newOtp: "",
    success: false,
    resend: false,
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { name, mobile, success, error, newOtp, id,mobile_verified,resend } = values;

  
  const { userMobile } = useParams();


  useEffect(() => {
    const abortCont = new AbortController();
    readUser(userMobile,abortCont).then((data) => {
      if(data){
        if (data.error) {
          setValues(v=>({ ...v, error: true }));
        } else {
          setValues(v=>({
            ...v,
            name: data.name,
            mobile: data.mobile,
            mobile_verified:data.mobile_verified,
            id: data._id,
          }));
        }
      }
    });
    return () => abortCont.abort();
  }, [success,userMobile]);
  const verifyOtpForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600 mt-5">Hi,{name} </h4>
        {showError()}
        {showSuccess()}

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-6">
            {!mobile_verified && <div className="form-group">
              <label className="text-light-white fs-14">
                Please Enter OTP that send to: 0{mobile}
              </label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="newOtp"
                value={newOtp}
                onChange={handleChange("newOtp")}
              />
            </div>}

            {mobile_verified && <div className="form-group">
              <label className="text-light-white fs-14">
                Your Mobile Number: 0{mobile} Already Verified!
              </label>
            
            </div>}
            
          </div>

          <div className="col-12">
            <div className="form-group">
              {!mobile_verified && <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Verify
              </button>}
              
            </div>

            <div className="form-group text-center">
            {!mobile_verified && !resend && <p className="text-light-black mb-0">
                Did not received the SMS?{" "}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={clickReSend}
                >
                  Re-Send
                </button>{" "}
                | <Link to="/">Back To Home</Link>
              </p>}
              {!mobile_verified && resend && <p className="text-light-black mb-0">
                We send the OTP To {mobile}
               
                | <Link to="/">Back To Home</Link>
              </p>}
              {mobile_verified && <p className="text-light-black mb-0">
               <Link to="/">Back To Home</Link>
              </p>}
              
            </div>
          </div>
        </div>
      </form>
    );
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    mobileVerify({ id, mobile, newOtp }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          newOtp: "",
          success: true,
        });
      }
    });
  };

  const clickReSend = (event) => {
    event.preventDefault();
    let otp = Math.floor(1000 + Math.random() * 9000);

    smsResend({ id,otp }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: false,
        });
      }
    });

    sendSms({ mobile, otp }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: false,
          resend: true,
        });
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
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account Verified, <Link to="/login">Please Sign In</Link>
    </div>
  );
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
                <div className="login-box">{verifyOtpForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
