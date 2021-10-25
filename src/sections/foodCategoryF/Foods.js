import React from "react";
import SaladCategory from "./OtherSaladCategories";
import FoodList from "./FoodList";

function Foods({ selectedRestaurantId, foodCategoryId }) {
  return (
    <section className="section-padding restaurent-meals bg-light-theme">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <FoodList selectedRestaurantId={selectedRestaurantId} />
          </div>
          <div className="col-xl-4 col-lg-4">
            <SaladCategory foodCategoryId={foodCategoryId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Foods;
