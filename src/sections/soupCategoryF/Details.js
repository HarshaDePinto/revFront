import React from "react";
import thumb from "../../assets/images/soup/thumb.jpg";
function Details() {
  return (
    <section className="restaurent-details  u-line">
       
       <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading padding-tb-10">
                <h3 className="text-light-black title fw-700 no-margin">
                  Soups
                </h3>
                <p className="text-light-black sub-title no-margin">
                  The Best Soup Collection
                </p>
              </div>
              <div className="restaurent-logo">
                <img
                  src={thumb}
                  className="img-fluid"
                  alt="#"
                />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

export default Details;
