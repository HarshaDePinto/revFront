import React, { Fragment,useEffect } from "react";
import Banner from "./Banner";
import Category from "./Category";
import CollectionBox from "./CollectionBox";

function Content({selectedRestaurantId}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Fragment>
      <Banner />
      <Category/>
      <CollectionBox selectedRestaurantId={selectedRestaurantId} />
    </Fragment>
  );
}
export default Content;
