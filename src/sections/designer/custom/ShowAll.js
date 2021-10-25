import React, { Fragment, useState, useEffect } from "react";
import { getAllCustoms } from "./apiCustom";
import { API } from "../../../config";
import { Roller } from "react-awesome-spinners";

function ShowAll({ setMainValues, values }) {
  const [allCustoms, setAllCustoms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customCount, setCustomCount] = useState(false);
  const [imageHash] = useState(Date.now());

  useEffect(() => {
    const abortCont = new AbortController();
    getAllCustoms(abortCont).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setAllCustoms(data);
          if (data.length === 0) {
            setCustomCount(true);
          }
          setLoading(false);
        }
      }
    });
    return () => abortCont.abort();
  }, []);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => loading && <Roller color="#F79550" />;

  const showCount = () => (
    <div
      className="alert alert-warning"
      style={{ display: customCount ? "" : "none" }}
    >
      <h2>No Customs Added Yet!</h2>
    </div>
  );

  const viewSingleCustom = (id) => {
    setMainValues({
      ...values,
      showAllCustom: false,
      showSingleCustom: true,
      showCreateCustom: false,
      customId: id,
    });
  };

  const getImage = (s) => {
    return (
      <img
        src={`${API}/custom/photo/${s}?${imageHash}`}
        className="img-fluid full-width"
        alt="product-img"
      />
    );
  };
  return (
    <Fragment>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <h5 className="text-light-black fw-700">All Custom Salads</h5>
      </div>
      {showLoading()}
      {showCount()}
      {showError()}

      {allCustoms.map((c, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
          <div className="product-box mb-xl-20">
            <div className="product-img">
              {getImage(c._id)}

              <div className="overlay">
                <div className="product-tags padding-10">
                  <span className="circle-tag"></span>
                </div>
              </div>
            </div>
            <div className="product-caption">
              <div className="title-box">
                <h6 className="product-title">
                  <span className="text-light-black "> {c.title}</span>
                </h6>

                <div className="tags"></div>
              </div>

              <p className="text-light-white">{c.subtitle}</p>
              <div className="product-details">
                <div className="price-time">
                  {" "}
                  <span className="text-light-black price fw-500">
                    Junior: {c.price_junior} LKR
                  </span>
                  <span className="text-light-black  fw-500 price">
                    Jumbo: {c.price_jumbo} LKR
                  </span>
                </div>
                <div className="rating"></div>
              </div>
              <div className="product-footer"></div>
              <div className="product-footer">
                <p className="text-info fw-500">
                  Created By: {c.createdBy} <br /> on{" "}
                  {new Date(c.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="product-footer">
                <p className="text-light-black fw-500">
                  Updated By: {c.updatedBy} <br /> on{" "}
                  {new Date(c.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="product-btn">
                <button
                  onClick={() => viewSingleCustom(c._id)}
                  className="btn-first white-btn full-width text-light-green fw-600"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default ShowAll;
