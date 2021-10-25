import React, { Fragment, useEffect } from "react";
import Top from "./Top";
import Details from "./Details";
import Soups from "./Soups";


function Content({ selectedRestaurantId }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Top/>
      <Details/>
      <Soups
        selectedRestaurantId={selectedRestaurantId}
      />
    </Fragment>
  );
}

export default Content;
