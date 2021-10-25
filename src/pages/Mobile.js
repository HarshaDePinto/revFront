import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/mobile/Content';
function Mobile() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Mobile Verification</title>
          <meta name="description" content="#" />
        </MetaTags>
        
        <Content/>
      </Fragment>
    );
  }
  
  export default Mobile;