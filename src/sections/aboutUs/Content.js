import React, { Fragment, useEffect } from "react";
import Top from "./Top";
import Details from "./Details";
import Dis from "./Dis";



function Content() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Top/>
      
        <Dis/>
    </Fragment>
  );
}

export default Content;
