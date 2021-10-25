import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/manager/acceptedOrders/Content";


function AcceptedOrders() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Accepted Orders</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default AcceptedOrders;