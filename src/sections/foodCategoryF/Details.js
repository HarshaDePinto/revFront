import React from "react";
import { API } from "../../config";

function Details({ foodCategory }) {
  return (
    <section className="restaurent-details  u-line">
       
      {foodCategory && (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading padding-tb-10">
                <h3 className="text-light-black title fw-700 no-margin">
                  {foodCategory.title}
                </h3>
                <p className="text-light-black sub-title no-margin">
                  {foodCategory.description}
                </p>
              </div>
              <div className="restaurent-logo">
                <img
                  src={`${API}/foodCategory/photo1/${foodCategory._id}`}
                  className="img-fluid"
                  alt="#"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Details;
