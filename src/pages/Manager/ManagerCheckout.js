import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/manager/checkout/Content";


function ManagerCheckout() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Manager Checkout</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default ManagerCheckout;