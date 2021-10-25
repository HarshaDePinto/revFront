import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import { getFoodByCategory } from "./apiCreateFood";
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
  setShowAllFoodCategory,
  setShowSingleFoodCategory,
  setShowSingleFood,
  foodCategoryId,
  setFood,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = isAuthenticated();
  const restaurantId = user.restaurant;
  const [allFood, setAllFood] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    getFoodByCategory(foodCategoryId, abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setAllFood(data);
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, [foodCategoryId]);

  const selectFood = (c) => {
    setShowAllFoodCategory(false);
    setShowSingleFoodCategory(false);
    setShowSingleFood(true);
    setFood(c);
  };

  const backToAll = () => {
    setShowAllFoodCategory(true);
    setShowSingleFoodCategory(false);
    setShowSingleFood(false);
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
              selectFood(c);
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
          allFood &&
          allFood.map((c, i) => <Fragment key={i}>
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
