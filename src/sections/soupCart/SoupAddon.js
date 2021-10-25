import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiSoupCart";

function GetSoupAddon(props) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAddon, setCheckedAddon] = useState([]);
  const [error, setError] = useState(false);
  const {
    setCartSoupAddonSet,
    totalSoupAddonPrice,
    cartSoupAddonSet,
    cartItem,
    setCartItem,
    run,
    setRun,
    itemQuantity,
    itemFinalPrice,
    setItemTotal,
    selectedRestaurantId
  } = props;
  const getAllAddOn = (props) => {
    getAddonByRole(props).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllAddOns(data);
      }
    });
  };
  useEffect(() => {
    getAllAddOn(props);
  }, [props]);

  const handleAddon = (a) => () => {
    const currentSelectedSoupAddonId = checkedId.indexOf(a._id);
    const NewSelectedSoupAddonId = [...checkedId];
    const NewSelectedSoupAddon = [...checkedAddon];

    if (currentSelectedSoupAddonId === -1) {
      NewSelectedSoupAddonId.push(a._id);
      NewSelectedSoupAddon.push(a);
      setCartSoupAddonSet({
        ...cartSoupAddonSet,
        selectedSoupAddonId: NewSelectedSoupAddonId,
        selectedSoupAddon: NewSelectedSoupAddon,
        totalSoupAddonPrice: totalSoupAddonPrice + a.price,
      });
      
      let q = totalSoupAddonPrice + a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        sAI: NewSelectedSoupAddonId,
        sAd: NewSelectedSoupAddon,
        sAP:q,
        tp:z,
      });
    } else {
      NewSelectedSoupAddonId.splice(currentSelectedSoupAddonId, 1);
      NewSelectedSoupAddon.splice(currentSelectedSoupAddonId, 1);
      setCartSoupAddonSet({
        ...cartSoupAddonSet,
        selectedSoupAddonId: NewSelectedSoupAddonId,
        selectedSoupAddon: NewSelectedSoupAddon,
        totalSoupAddonPrice: totalSoupAddonPrice - a.price,
      });

      let q = totalSoupAddonPrice - a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        sAI: NewSelectedSoupAddonId,
        sAd: NewSelectedSoupAddon,
        sAP:q,
        tp:z,
      });

    }

    setCheckedId(NewSelectedSoupAddonId);
    setCheckedAddon(NewSelectedSoupAddon);
    if (run) {
      setRun(false);
    } else {
      setRun(true);
    }
  };
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  return (
    <Fragment>
      <h6>Please Select Soup Addons: </h6>
      {showError()}
      <div className="row">
        {allAddOns &&
          allAddOns.map((a, i) => (
            <Fragment key={i}>
              {JSON.stringify(a.restaurants).includes(selectedRestaurantId) && (
                <div className="col-md-6">
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        onChange={handleAddon(a)}
                        className="form-check-input "
                        type="checkbox"
       
                        checked={checkedId.indexOf(a._id) !== -1}
                      />
                      <label className="form-check-label text-light-black fw-700">
                        {a.title}
                        <span className="text-info mx-2">{a.price} LKR</span>
                        <span className="text-success mx-2">{a.cal} Cal</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
}
export default GetSoupAddon;
