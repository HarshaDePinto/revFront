import React, { Fragment, useState, useEffect } from "react";
import { getFoodCategory } from "./apiFood";

const CheckBox = ({ foodCategory }) => {
  const [allFoodCategory, setFoodCategory] = useState([]);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const abortCont = new AbortController();
    getFoodCategory(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setFoodCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [error]);

  return (
    <Fragment>
      {!foodCategory && <option>Please Select</option>}
      {allFoodCategory.map((c, i) => (
        <option
          key={i}
          value={c._id}
          
        >
          {c.title}
        </option>
      ))}
    </Fragment>
  );
};
export default CheckBox;
