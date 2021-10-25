import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiCreateCustom";

function GetPremiumAddon(props) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAddon, setCheckedAddon] = useState([]);
  const [error, setError] = useState(false);
  const {
    setCartPremiumAddonSet,
    totalPremiumAddonPrice,
    cartPremiumAddonSet,
    cartItem,
    setCartItem,
    run,
    setRun,
    itemQuantity,
    itemFinalPrice,
    totalGeneralAddonPrice,
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
    const currentSelectedPremiumAddonId = checkedId.indexOf(a._id);
    const NewSelectedPremiumAddonId = [...checkedId];
    const NewSelectedPremiumAddon = [...checkedAddon];

    if (currentSelectedPremiumAddonId === -1) {
      NewSelectedPremiumAddonId.push(a._id);
      NewSelectedPremiumAddon.push(a);
      setCartPremiumAddonSet({
        ...cartPremiumAddonSet,
        selectedPremiumAddonId: NewSelectedPremiumAddonId,
        selectedPremiumAddon: NewSelectedPremiumAddon,
        totalPremiumAddonPrice: totalPremiumAddonPrice + a.price,
      });
      
      let q = totalPremiumAddonPrice + a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalCustomLettucePrice + totalCustomThrowPrice + totalCustomProteinPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        pAI: NewSelectedPremiumAddonId,
        pAd: NewSelectedPremiumAddon,
        pAP:q,
        tp:z,
      });
    } else {
      NewSelectedPremiumAddonId.splice(currentSelectedPremiumAddonId, 1);
      NewSelectedPremiumAddon.splice(currentSelectedPremiumAddonId, 1);
      setCartPremiumAddonSet({
        ...cartPremiumAddonSet,
        selectedPremiumAddonId: NewSelectedPremiumAddonId,
        selectedPremiumAddon: NewSelectedPremiumAddon,
        totalPremiumAddonPrice: totalPremiumAddonPrice - a.price,
      });

      let q = totalPremiumAddonPrice - a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalCustomLettucePrice + totalCustomThrowPrice + totalCustomProteinPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        pAI: NewSelectedPremiumAddonId,
        pAd: NewSelectedPremiumAddon,
        pAP:q,
        tp:z,
      });

    }

    setCheckedId(NewSelectedPremiumAddonId);
    setCheckedAddon(NewSelectedPremiumAddon);
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
      <h6>Please Select Premium Addons: </h6>
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
export default GetPremiumAddon;
