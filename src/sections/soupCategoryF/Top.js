import React from "react";
import banner from "../../assets/images/soup/banner.jpg";

function Top() {
  return (
    <div className="page-banner p-relative" id="menu">
      <img src={banner} className="img-fluid full-width" alt="" />
      <div className="overlay-2">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="back-btn">
                <button type="button" className="text-light-green">
                  {" "}
                  <i className="fas fa-chevron-left" />
                </button>
              </div>
            </div>
            <div className="col-6">
              <div className="tag-share">
                {" "}
                <span className="text-light-green share-tag">
                  <i className="fas fa-chevron-right" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;