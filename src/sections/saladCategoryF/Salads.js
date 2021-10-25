import React from "react";
import SaladCategory from "./OtherSaladCategories";
import SaladList from "./SaladList";

function Salads({ selectedRestaurantId, saladCategoryId }) {
  return (
    <section className="section-padding restaurent-meals bg-light-theme">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <SaladList selectedRestaurantId={selectedRestaurantId} />
          </div>
          <div className="col-xl-4 col-lg-4">
            <SaladCategory saladCategoryId={saladCategoryId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Salads;
