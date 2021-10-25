import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/register/Content';
function RegisterPage() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Register Page</title>
          <meta name="description" content="#" />
        </MetaTags>
        
        <Content/>
      </Fragment>
    );
  }
  
  export default RegisterPage;