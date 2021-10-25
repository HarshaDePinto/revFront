import React, { Fragment, useState, useEffect } from "react";
import { getSaladCategory } from "./apiSalad";

const CheckBox = ({ saladCategory }) => {
  const [allSaladCategory, setSaladCategory] = useState([]);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const abortCont = new AbortController();
    getSaladCategory(abortCont).then((data) => {
      if(data){
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setSaladCategory(data);
        }
      }
    });
    return () => abortCont.abort();
  }, [error]);

  return (
    <Fragment>
      {!saladCategory && <option>Please Select</option>}
      {allSaladCategory.map((c, i) => (
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
