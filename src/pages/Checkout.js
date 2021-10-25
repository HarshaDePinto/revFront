import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import FrontHeader from "../layoutes/FrontHeader";
import Footer from "../layoutes/Footer";
import Content from "../sections/checkout/Content";
import {
  getAllRestaurants,
  setSelectedRestaurant,
  getSelectedRestaurant,
} from "../auth";

function Checkout() {
  const selectedRestaurant = getSelectedRestaurant();
  const [cartRefresh, setCartRefresh] = useState(false);
  const [error, setError] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState();

  //set initial value for selected restaurant
  useEffect(() => {
    const abortCont = new AbortController();
    getAllRestaurants(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          if (selectedRestaurant) {
            setSelectedRestaurant(selectedRestaurant, () => {
              setSelectedRestaurantId(selectedRestaurant._id);
            });
          } else {
            setSelectedRestaurant(data[0], () => {
              setSelectedRestaurantId(data[0]._id);
            });
          }
        }
      }
    });
    return () => abortCont.abort();
  }, [selectedRestaurant]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <Fragment>
      <MetaTags>
        <title>Salad Factory | Checkout</title>
        <meta name="description" content="#" />
      </MetaTags>
      {showError()}
      <FrontHeader
        setSelectedRestaurantId={setSelectedRestaurantId}
        cartRefresh={cartRefresh}
        setCartRefresh={setCartRefresh}
      />
      <Content
        selectedRestaurant={selectedRestaurant}
        cartRefresh={cartRefresh}
        setCartRefresh={setCartRefresh}
        selectedRestaurantId={selectedRestaurantId}
      />
      <Footer />
    </Fragment>
  );
}

export default Checkout;
