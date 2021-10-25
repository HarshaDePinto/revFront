import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/manager/salesByProducts/Content";


function SalesByProducts() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Sales By Products</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default SalesByProducts;