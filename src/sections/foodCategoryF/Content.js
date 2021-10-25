import React, { Fragment, useState, useEffect } from "react";
import { readFoodCategory } from "./apiFoodCategoryF";
import { useParams } from "react-router-dom";
import Top from "./Top";
import Details from "./Details";
import Foods from "./Foods";
import { Roller } from "react-awesome-spinners";


function Content({ selectedRestaurantId }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [foodCategory, setFoodCategory] = useState();
  const [error, setError] = useState(false);
  const [loading, setLading] = useState(true);
  const { foodCategoryId } = useParams();



  
  useEffect(() => {
    const abortCont = new AbortController();
    readFoodCategory(foodCategoryId,abortCont).then((data) => {
      if(data){
        if (data.error) {
          setLading(false);
          setError(data.error);
        } else {
          setLading(false);
          setFoodCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [foodCategoryId]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => loading && <Roller color="#F79550" />;
  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {!loading && (
        <Fragment>
         
          <Top foodCategoryId={foodCategoryId} />
          <Details foodCategory={foodCategory} />
          <Foods foodCategoryId={foodCategoryId} selectedRestaurantId={selectedRestaurantId} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Content;
