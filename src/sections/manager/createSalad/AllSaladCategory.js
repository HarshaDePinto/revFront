import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import { getSaladCategory } from "./apiCreateSalad";
const StyledButton = styled.button`
  background-color: #f79550;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;
const StyledButtonTwo = styled.button`
  background-color: #000000;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
`;
function AllSaladCategory({
  setShowAllSaladCategory,
  setShowSingleSaladCategory,
  setShowSingleSalad,
  setSaladCategoryId,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [allCategory, setAllCategory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    getSaladCategory(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setAllCategory(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const selectCategory = (c) => {
    setShowAllSaladCategory(false);
    setShowSingleSaladCategory(true);
    setShowSingleSalad(false);
    setSaladCategoryId(c);
  };
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
      <div className="row">
        {!loading &&
          allCategory &&
          allCategory.map((c, i) => (
            <div key={i} className="col-lg-6 col-md-6 col-sm-12">
              <StyledButton
              onClick={()=>{selectCategory(c._id)}}
              >{c.title}</StyledButton>
            </div>
          ))}

        {!loading && (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Link to="/manager/createOrder" className="add-res-tab">
              <StyledButtonTwo>Back To New</StyledButtonTwo>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default AllSaladCategory;
