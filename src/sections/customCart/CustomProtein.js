import React, { Fragment, useState, useEffect } from "react";
import { getAddonByRole } from "./apiCustomCart";

function GetCustomProtein(props) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAddon, setCheckedAddon] = useState([]);
  const [error, setError] = useState(false);
  const {
    setCartCustomProteinSet,
    totalCustomProteinPrice,
    cartCustomProteinSet,
    cartItem,
    setCartItem,
    run,
    setRun,
    itemQuantity,
    itemFinalPrice,
    totalGeneralAddonPrice,
    totalPremiumAddonPrice,
    totalCustomLettucePrice,
    totalCustomThrowPrice,
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
    const currentSelectedCustomProteinId = checkedId.indexOf(a._id);
    const NewSelectedCustomProteinId = [...checkedId];
    const NewSelectedCustomProtein = [...checkedAddon];

    if (currentSelectedCustomProteinId === -1) {
      NewSelectedCustomProteinId.push(a._id);
      NewSelectedCustomProtein.push(a);
      setCartCustomProteinSet({
        ...cartCustomProteinSet,
        selectedCustomProteinId: NewSelectedCustomProteinId,
        selectedCustomProtein: NewSelectedCustomProtein,
        totalCustomProteinPrice: totalCustomProteinPrice + a.price,
      });
      
      let q = totalCustomProteinPrice + a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalPremiumAddonPrice + totalCustomLettucePrice + totalCustomThrowPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
        cPI: NewSelectedCustomProteinId,
        cPd: NewSelectedCustomProtein,
        cPP:q,
        tp:z,
      });
    } else {
      NewSelectedCustomProteinId.splice(currentSelectedCustomProteinId, 1);
      NewSelectedCustomProtein.splice(currentSelectedCustomProteinId, 1);
      setCartCustomProteinSet({
        ...cartCustomProteinSet,
        selectedCustomProteinId: NewSelectedCustomProteinId,
        selectedCustomProtein: NewSelectedCustomProtein,
        totalCustomProteinPrice: totalCustomProteinPrice - a.price,
      });

      let q = totalCustomProteinPrice - a.price;
      let x = itemQuantity;
      let y = itemFinalPrice + q + totalGeneralAddonPrice + totalPremiumAddonPrice + totalCustomLettucePrice + totalCustomThrowPrice + totalCustomDressingPrice;
      let z =y*x;
      setItemTotal(z);
      setCartItem({
        ...cartItem,
       cPI: NewSelectedCustomProteinId,
       cPd: NewSelectedCustomProtein,
       cPP:q,
        tp:z,
      });

    }

    setCheckedId(NewSelectedCustomProteinId);
    setCheckedAddon(NewSelectedCustomProtein);
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
                <div className="col-md-4">
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
export default GetCustomProtein;
