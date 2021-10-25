import React from "react";
import SaladCategory from "./OtherSaladCategories";
import SoupList from "./SoupList";

function Salads({ selectedRestaurantId }) {
  return (
    <section className="section-padding restaurent-meals bg-light-theme">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <SoupList selectedRestaurantId={selectedRestaurantId} />
          </div>
          <div className="col-xl-4 col-lg-4">
            <SaladCategory />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Salads;