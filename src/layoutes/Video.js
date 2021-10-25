import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";
import Logo from "../assets/images/logo/logo.png";

function Video() {
  useEffect(() => {
    function popup() {
      $(".videoIframe").magnificPopup({
        type: "iframe",
      });
    }
    popup();
  });

  return (
    <div className="video-box mb-xl-20">
      <div className="video_wrapper video_wrapper_full js-videoWrapper">
        
        <iframe
          title="Web | Graphic | Video | SEO | Z Tech Digital"
          className="videoIframe js-videoIframe"
          src="https://www.youtube.com/embed/u4SNqup7WAw"
          data-src="https://www.youtube.com/embed/u4SNqup7WAw?autoplay=1&amp;rel=0"
          allow="autoplay"
        ></iframe>
      </div>
      <div className="discount-box main-box padding-tb-10">
        <div className="discount-price padding-10">
          <div className="left-side">
            <h6 className="text-light-black fw-600 no-margin">
              Watch Now and get 50% discount
            </h6>
            <p className="text-light-white no-margin">
              The hung-over foody (2019)
            </p>
          </div>
          <div className="right-side justify-content-end">
            <div className="dis-text">
              <span className="badge bg-light-green text-custom-white fw-400">
                Discount
              </span>
              <h4 className="text-light-black no-margin">50%</h4>
            </div>
            <Link to="restaurent.html">
              <img src={Logo} className="img-fluid" alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
