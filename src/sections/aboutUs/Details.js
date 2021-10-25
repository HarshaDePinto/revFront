import React from "react";
import logo from "../../assets/images/logo/green.png";
function Details() {
  return (
    <section className="restaurent-details  u-line">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading padding-tb-10">
              <h3 className="text-light-black title fw-700 no-margin">
                Refund / Return Policy of Salad Factory
              </h3>
              <p className="text-light-black sub-title no-margin">
                To provide the best customer satisfaction, we provide the
                following solutions. If you have any questions regarding the
                Return & Refund Policy, please call our restaurant or email us
                via<span className="text-info">info@saladfactory.lk</span>.<br/> 
                Preparation of your order can begin
                immediately after your order has been confirmed. We cannot
                accept cancellations once your order has been confirmed with the
                restaurant.
              </p>
            </div>
            <div className="restaurent-logo">
              <img src={logo} className="img-fluid" alt="#" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
