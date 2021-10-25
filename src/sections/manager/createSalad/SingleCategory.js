import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import { getSaladByCategory } from "./apiCreateSalad";
import { isAuthenticated } from "../../../auth";

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

function SingleCategory({
  setShowAllSaladCategory,
  setShowSingleSaladCategory,
  setShowSingleSalad,
  saladCategoryId,
  setSalad,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = isAuthenticated();
  const restaurantId = user.restaurant;
  const [allSalad, setAllSalad] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    getSaladByCategory(saladCategoryId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setAllSalad(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [saladCategoryId]);

  const selectSalad = (c) => {
    setShowAllSaladCategory(false);
    setShowSingleSaladCategory(false);
    setShowSingleSalad(true);
    setSalad(c);
  };

  const backToAll = () => {
    setShowAllSaladCategory(true);
    setShowSingleSaladCategory(false);
    setShowSingleSalad(false);
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

  const checkAvailable = (c) => {
    if (JSON.stringify(c.restaurants).includes(restaurantId)) {
      return (
        <div className="col-6">
          <StyledButton
            onClick={() => {
              selectSalad(c);
            }}
          >
            {c.title}
          </StyledButton>
        </div>
      );
    }
  };

  return (
    <Fragment>
      {showError()}
      {showLoading()}
      <div className="row">
        {!loading &&
          allSalad &&
          allSalad.map((c, i) => <Fragment key={i}>
              {checkAvailable(c)}
          </Fragment>)}
      </div>
      <div className="row">
        {!loading && (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Link to="/manager/createOrder" className="add-res-tab">
              <StyledButtonTwo>Back To New</StyledButtonTwo>
            </Link>
          </div>
        )}
        {!loading && (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <StyledButtonTwo onClick={backToAll}>All Category</StyledButtonTwo>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default SingleCategory;
