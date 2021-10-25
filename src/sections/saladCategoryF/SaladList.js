import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { getSaladByCategory } from "./apiSaladCategoryF";
import { Collapse } from "react-bootstrap";
import SingleSalad from "./SingleSalad";
import promoBanner from "../../assets/images/home/ads2.jpg";
import { Roller } from "react-awesome-spinners";

function SaladList({selectedRestaurantId}) {
  const [open, setOpen] = useState(true);
  const [allSalads, setAllSalads] = useState([]);
  const { saladCategoryId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLading] = useState(true);

  const colHandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  

  useEffect(() => {
    const abortCont = new AbortController();
    getSaladByCategory(saladCategoryId,abortCont).then((data) => {
     if(data){
      if (data.error) {
        setError(data.error);
        setLading(false);
      } else {
        setAllSalads(data);
        setLading(false);
      }
     }
    });
    return () => abortCont.abort();
  }, [saladCategoryId]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;
  
  return (
    <div className="row">
      {showError()}
      <div className="col-lg-12">
        <div className="promocodeimg mb-xl-20 p-relative">
          <img
            src={promoBanner}
            className="img-fluid full-width"
            alt="promocode"
          />
          <div className="promocode-text">
            <div className="promocode-text-content">
              <h5 className="text-custom-white mb-2 fw-600">
                Get $10 off your first order!
              </h5>
              <p className="text-custom-white no-margin">
                Spend $15 or more and get $10 off your first delivery order.
              </p>
            </div>
            <div className="promocode-btn">
              {" "}
              <Link to="#">Get Deal</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 restaurent-meal-head mb-md-40">
        <div className="card">
          <div className="card-header">
            <div className="section-header-left">
              <h3 className="text-light-black header-title">
                <Link
                to="#"
                  className="card-link text-light-black no-margin"
                  onClick={colHandler}
                  aria-controls="user-profile"
                  aria-expanded={open}
                >
                  Most Popular
                </Link>
              </h3>
            </div>
          </div>
          <Collapse in={open}>
            <div>
              <div className="card-body no-padding">
                <div className="row">
                {showLoading()}
                  {allSalads.map((item, i) => (
                    <div key={i} className="col-lg-12">
                      <SingleSalad salad={item} selectedRestaurantId={selectedRestaurantId}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default SaladList;
