import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Footer from "../../layoutes/Footer";
import Content from "../../sections/manager/createSalad/Content";


function CreateSalad() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Create Salad</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
     
      </Fragment>
    );
  }
  
  export default CreateSalad;