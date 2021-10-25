import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";

function SingleSalad({ salad }) {

  return (
    <Fragment>
       
      <div className="restaurent-product-list">
        <div className="restaurent-product-detail">
          <div className="restaurent-product-left">
            <div className="restaurent-product-title-box">
              <div className="restaurent-product-box">
                <div className="restaurent-product-title">
                  <h6 className="mb-2">
                    <Link to="#" className="text-light-black fw-600">
                      {salad.title}
                    </Link>
                  </h6>
                 
                </div>
                <div className="restaurent-product-label">
                
                </div>
              </div>
              <div className="restaurent-product-rating">
                <div className="ratings"></div>
                <div className="rating-text"></div>
              </div>
            </div>
            <div className="restaurent-product-caption-box">
              <span className="text-light-white">{salad.description}</span>
            </div>

            <div className="restaurent-tags-price">
              <div className="restaurent-tags">
              
              </div>{" "}
              
              <div className="restaurent-product-price">
                <h6 className="text-success fw-600 no-margin">
                  {salad.price_junior} LKR / {salad.price_jumbo} LKR
                </h6>
              </div>
            </div>
          </div>

          <div className="restaurent-product-img">
            <img
              src={`${API}/custom/photo/${salad._id}`}
              className="img-fluid"
              alt="#"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default SingleSalad;
