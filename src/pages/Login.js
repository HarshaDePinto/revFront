import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/login/Content';

function LoginPage() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Login Page</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Content/>
        
      </Fragment>
    );
  }
  
  export default LoginPage;