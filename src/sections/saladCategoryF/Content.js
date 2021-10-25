import React, { Fragment, useState, useEffect } from "react";
import { readSaladCategory } from "./apiSaladCategoryF";
import { useParams } from "react-router-dom";
import Top from "./Top";
import Details from "./Details";
import Salads from "./Salads";
import { Roller } from "react-awesome-spinners";


function Content({ selectedRestaurantId }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [saladCategory, setSaladCategory] = useState();
  const [error, setError] = useState(false);
  const [loading, setLading] = useState(true);
  const { saladCategoryId } = useParams();



  
  useEffect(() => {
    const abortCont = new AbortController();
    readSaladCategory(saladCategoryId,abortCont).then((data) => {
      if(data){
        if (data.error) {
          setLading(false);
          setError(data.error);
        } else {
          setLading(false);
          setSaladCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [saladCategoryId]);

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
         
          <Top saladCategoryId={saladCategoryId} />
          <Details saladCategory={saladCategory} />
          <Salads saladCategoryId={saladCategoryId} selectedRestaurantId={selectedRestaurantId} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Content;
