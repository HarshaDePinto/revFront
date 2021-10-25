import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/designer/saladCategory/Content";


function SaladCategory() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Designer Salad Categories</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default SaladCategory;