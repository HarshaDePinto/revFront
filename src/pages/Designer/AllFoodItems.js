import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/designer/allFoodItems/Content";


function AllFoodItems() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Designer All Food Items</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default AllFoodItems;