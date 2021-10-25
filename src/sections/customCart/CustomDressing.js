import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiCustomCart";

function GetCustomDressing(props) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAddon, setCheckedAddon] = useState([]);
  const [error, setError] = useState(false);
  const {
    setCartCustomDressingSet,
    totalCustomDressingPrice,
    cartCustomDressingSet,
    cartItem,
    setCartItem,
    run,
    setRun,
    itemQuantity,
    itemFinalPrice,
    totalGeneralAddonPrice,
    totalPremiumAddonPrice,
    totalCustomLettucePrice,
    totalCustomProteinPrice,
    totalCustomThrowPrice,
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
    const currentSelectedCustomDressingId = checkedId.indexOf(a._id);
    const NewSelectedCustomDressingId = [...checkedId];
    const NewSelectedCustomDressing = [...checkedAddon];

    if (currentSelectedCustomDressingId === -1) {
      NewSelectedCustomDressingId.push(a._id);
      NewSelectedCustomDressing.push(a);
      setCartCustomDressingSet({
        ...cartCustomDressingSet,
        selectedCustomDressingId: NewSelectedCustomDressingId,
        selectedCustomDressing: NewSelectedCustomDressing,
        totalCustomDressingPrice: totalCustomDressingPrice + a.price,
      });
      
      let q = totalCustomDressingPrice + a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalPremiumAddonPrice + totalCustomLettucePrice + totalCustomProteinPrice + totalCustomThrowPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        cDI: NewSelectedCustomDressingId,
        cDd: NewSelectedCustomDressing,
        cDP:q,
        tp:z,
      });
    } else {
      NewSelectedCustomDressingId.splice(currentSelectedCustomDressingId, 1);
      NewSelectedCustomDressing.splice(currentSelectedCustomDressingId, 1);
      setCartCustomDressingSet({
        ...cartCustomDressingSet,
        selectedCustomDressingId: NewSelectedCustomDressingId,
        selectedCustomDressing: NewSelectedCustomDressing,
        totalCustomDressingPrice: totalCustomDressingPrice - a.price,
      });

      let q = totalCustomDressingPrice - a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalPremiumAddonPrice + totalCustomLettucePrice + totalCustomProteinPrice + totalCustomThrowPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        cDI: NewSelectedCustomDressingId,
        cDd: NewSelectedCustomDressing,
        cDP:q,
        tp:z,
      });

    }

    setCheckedId(NewSelectedCustomDressingId);
    setCheckedAddon(NewSelectedCustomDressing);
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
export default GetCustomDressing;
