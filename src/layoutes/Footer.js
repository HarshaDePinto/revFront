import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Instagram from "./Instagram";
import card from "../assets/images/home/card/card-front.jpg";
import visa from "../assets/images/home/card/visa.jpg";
import amex from "../assets/images/home/card/amex-card-front.png";
import mastercard from "../assets/images/home/card/mastercard.png";

const iconlist = [
  { icon: "credit-card-1", title: "Uber | PickMe Available" },
  { icon: "wallet-1", title: "Easy Payments" },
  { icon: "help", title: "Smart Service" },
  { icon: "truck", title: "Free Delivery within 5km" },
  { icon: "guarantee", title: "Loyalty Member Offers" },
  { icon: "app-file-symbol", title: "Mobile Apps Ready" },
];

function Footer() {
  let year = new Date().getFullYear();
  return (
    <Fragment>
      <div className="footer-top section-padding bg-black">
        <div className="container-fluid">
          <div className="row">
            {iconlist.map((item, i) => (
              <div key={i} className="col-md-2 col-sm-4 col-6 mb-sm-20">
                <div className="icon-box">
                  {" "}
                  <span className="text-light-green">
                    <i className={"flaticon-" + item.icon + ""} />
                  </span>
                  <span className="text-custom-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="section-padding bg-light-theme pt-0 u-line bg-black">
        <Instagram />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl col-lg-4 col-md-4 col-sm-6">
              <div className="footer-contact">
                <h6 className="text-custom-white">Need Help</h6>
                <ul>
                  <li className="fw-600">
                    <span className="text-light-white">Call Us</span>{" "}
                    <Link to="#" className="text-custom-white">
                      +94 707 055 707
                    </Link>
                  </li>
                  <li className="fw-600">
                    <span className="text-light-white">Email Us</span>{" "}
                    <Link to="#" className="text-custom-white">
                      info@wisechoice.lk
                    </Link>
                  </li>
                  <li className="fw-600">
                    <span className="text-light-white">Join our twitter</span>{" "}
                    <Link to="#" className="text-custom-white">
                      @saladfactorylk
                    </Link>
                  </li>
                  <li className="fw-600">
                    <span className="text-light-white">Join our instagram</span>{" "}
                    <Link to="#" className="text-custom-white">
                      @saladfactorylk
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl col-lg-4 col-md-4 col-sm-6">
              <div className="footer-links">
                <h6 className="text-custom-white">Get to Know Us</h6>
                <ul>
                  <li>
                    <Link to="/aboutUs" className="text-light-white fw-600">
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link to="#" className="text-light-white fw-600">
                      Wisechoice Foods (Pvt) Ltd
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl col-lg-4 col-md-4 col-sm-6">
              <div className="footer-links">
                <h6 className="text-custom-white">Let Us Help You</h6>
                <ul>
               
                  <li>
                    <Link to="/login" className="text-light-white fw-600">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-light-white fw-600">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            

            <div className="col-md-12">
              <div className="ft-social-media">
                <h6 className="text-center text-custom-white">Follow us</h6>
                <ul>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-instagram" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-pinterest-p" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-youtube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright bg-black">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="payment-logo mb-md-20">
                {" "}
                <span className="text-light-white fs-14 mr-3">
                  We are accept
                </span>
                <div className="payemt-icon">
                  <img src={card} alt="" />
                  <img src={visa} alt="" />
                  <img src={amex} alt="" />
                  <img src={mastercard} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center medewithlove align-self-center">
              <Link
                to={{ pathname: "https://www.z-techdigital.com/" }} target="_blank"
                className="text-custom-white"
              >
                Powered By: Z Tech Digital (Pvt) Ltd
              </Link>
            </div>
            <div className="col-lg-4">
              <div className="copyright-text">
                {" "}
                <span className="text-light-white">
                  ©{" "}
                  <Link
                    to={{ pathname: "https://www.z-techdigital.com/" }} target="_blank" 
                    className="text-light-white"
                  >
                    SaladFactory
                  </Link>{" "}
                  - {year} | All Right Reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
