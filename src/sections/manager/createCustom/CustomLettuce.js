import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiCreateCustom";

function GetCustomLettuce(props) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAddon, setCheckedAddon] = useState([]);
  const [error, setError] = useState(false);
  const {
    setCartCustomLettuceSet,
    totalCustomLettucePrice,
    cartCustomLettuceSet,
    cartItem,
    setCartItem,
    run,
    setRun,
    itemQuantity,
    itemFinalPrice,
    totalGeneralAddonPrice,
    totalPremiumAddonPrice,
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
    const currentSelectedCustomLettuceId = checkedId.indexOf(a._id);
    const NewSelectedCustomLettuceId = [...checkedId];
    const NewSelectedCustomLettuce = [...checkedAddon];

    if (currentSelectedCustomLettuceId === -1) {
      NewSelectedCustomLettuceId.push(a._id);
      NewSelectedCustomLettuce.push(a);
      setCartCustomLettuceSet({
        ...cartCustomLettuceSet,
        selectedCustomLettuceId: NewSelectedCustomLettuceId,
        selectedCustomLettuce: NewSelectedCustomLettuce,
        totalCustomLettucePrice: totalCustomLettucePrice + a.price,
      });
      
      let q = totalCustomLettucePrice + a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalPremiumAddonPrice + totalCustomThrowPrice + totalCustomProteinPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        cLI: NewSelectedCustomLettuceId,
        cLd: NewSelectedCustomLettuce,
        cLP:q,
        tp:z,
      });
    } else {
      NewSelectedCustomLettuceId.splice(currentSelectedCustomLettuceId, 1);
      NewSelectedCustomLettuce.splice(currentSelectedCustomLettuceId, 1);
      setCartCustomLettuceSet({
        ...cartCustomLettuceSet,
        selectedCustomLettuceId: NewSelectedCustomLettuceId,
        selectedCustomLettuce: NewSelectedCustomLettuce,
        totalCustomLettucePrice: totalCustomLettucePrice - a.price,
      });

      let q = totalCustomLettucePrice - a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalPremiumAddonPrice + totalCustomThrowPrice + totalCustomProteinPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        cLI: NewSelectedCustomLettuceId,
        cLd: NewSelectedCustomLettuce,
        cLP:q,
        tp:z,
      });

    }

    setCheckedId(NewSelectedCustomLettuceId);
    setCheckedAddon(NewSelectedCustomLettuce);
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
                <div className="col-md-3">
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
export default GetCustomLettuce;
