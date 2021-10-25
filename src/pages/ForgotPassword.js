import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/forgotPassword/Content';
function ForgotPassword() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Forgot Password</title>
          <meta name="description" content="#" />
        </MetaTags>
        
        <Content/>
      </Fragment>
    );
  }
  
  export default ForgotPassword;