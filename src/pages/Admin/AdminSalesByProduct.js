import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/admin/salesByProduct/Content";


function AdminSalesByProduct() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Admin Sales By Product</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default AdminSalesByProduct;