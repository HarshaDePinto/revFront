import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiCustomCart";

function GetGeneralAddon(props) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAddon, setCheckedAddon] = useState([]);
  const [error, setError] = useState(false);
  const {
    setCartGeneralAddonSet,
    totalGeneralAddonPrice,
    cartGeneralAddonSet,
    cartItem,
    setCartItem,
    run,
    setRun,
    itemQuantity,
    itemFinalPrice,
    totalPremiumAddonPrice,
    totalCustomLettucePrice,
    totalCustomThrowPrice,
    totalCustomProteinPrice,
    totalCustomDressingPrice,
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
    const currentSelectedGeneralAddonId = checkedId.indexOf(a._id);
    const NewSelectedGeneralAddonId = [...checkedId];
    const NewSelectedGeneralAddon = [...checkedAddon];

    if (currentSelectedGeneralAddonId === -1) {
      NewSelectedGeneralAddonId.push(a._id);
      NewSelectedGeneralAddon.push(a);
      setCartGeneralAddonSet({
        ...cartGeneralAddonSet,
        selectedGeneralAddonId: NewSelectedGeneralAddonId,
        selectedGeneralAddon: NewSelectedGeneralAddon,
        totalGeneralAddonPrice: totalGeneralAddonPrice + a.price,
      });
      let q = totalGeneralAddonPrice + a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalPremiumAddonPrice + totalCustomLettucePrice + totalCustomThrowPrice + totalCustomProteinPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        gAI: NewSelectedGeneralAddonId,
        gAd: NewSelectedGeneralAddon,
        gAP:q,
        tp:z,
      });
    } else {
      NewSelectedGeneralAddonId.splice(currentSelectedGeneralAddonId, 1);
      NewSelectedGeneralAddon.splice(currentSelectedGeneralAddonId, 1);
      setCartGeneralAddonSet({
        ...cartGeneralAddonSet,
        selectedGeneralAddonId:NewSelectedGeneralAddonId ,
        selectedGeneralAddon:NewSelectedGeneralAddon ,
        totalGeneralAddonPrice: totalGeneralAddonPrice - a.price,
      });
      let q = totalGeneralAddonPrice - a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalPremiumAddonPrice + totalCustomLettucePrice + totalCustomThrowPrice + totalCustomProteinPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        gAI: NewSelectedGeneralAddonId,
        gAd: NewSelectedGeneralAddon,
        gAP:q,
        tp:z,
      });
    }

    setCheckedId(NewSelectedGeneralAddonId);
    setCheckedAddon(NewSelectedGeneralAddon);
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
     
      <h6>Please Select General Addons: </h6>
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
                        <span className="text-info mx-2">
                          {a.price} LKR
                        </span>
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
export default GetGeneralAddon;
