import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Products({ products }) {
  return (
    <Fragment>
      {products &&
        products.map((p, i) => (
          <div key={i} className="checkout-product">
            {p.type === 1 && (
              <Fragment>
                <div className="img-name-value">
                  <div className="product-name">
                    <div className="cat-name">
                      <Link to="#">
                        <p className="text-light-green fw-700 px-2">
                          {p.title} ({p.size})
                        </p>{" "}
                        Premium Addons:
                        {p.pAd &&
                          p.pAd.length > 0 &&
                          p.pAd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}
                        <br />
                        General Addons:
                        {p.gAd &&
                          p.gAd.length > 0 &&
                          p.gAd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="product-value">
                    {" "}
                    <p className="text-info m-2 fw-700">
                      {p.qte} x {(p.gAP + p.pAP + p.itemFinalPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="price">
                  {" "}
                  <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>
                </div>
              </Fragment>
            )}

            {p.type === 2 && (
              <Fragment>
                <div className="img-name-value">
                  <div className="product-name">
                    <div className="cat-name">
                      <Link to="#">
                        <p className="text-light-green fw-700 px-2">
                          {p.title} ({p.size})
                        </p>{" "}
                        Addons:
                        {p.sAd &&
                          p.sAd.length > 0 &&
                          p.sAd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="product-value">
                    {" "}
                    <p className="text-info m-2 fw-700">
                      {p.qte} x {(p.sAP + p.itemFinalPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="price">
                  {" "}
                  <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>
                </div>
              </Fragment>
            )}

            {p.type === 3 && (
              <Fragment>
                <div className="img-name-value">
                  <div className="product-name">
                    <div className="cat-name">
                      <Link to="#">
                        <p className="text-light-green fw-700 px-2">
                          {p.title} ({p.size})
                        </p>{" "}
                        Addons:
                        {p.fAd &&
                          p.fAd.length > 0 &&
                          p.fAd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="product-value">
                    {" "}
                    <p className="text-info m-2 fw-700">
                      {p.qte} x {(p.fAP + p.itemFinalPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="price">
                  {" "}
                  <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>
                </div>
              </Fragment>
            )}

            {p.type === 4 && (
              <Fragment>
                <div className="img-name-value">
                  <div className="product-name">
                    <div className="cat-name">
                      <Link to="#">
                        <p className="text-light-green fw-700 px-2">
                          My Custom salad ({p.size})
                        </p>{" "}
                        Lettuce:
                        {p.cLd &&
                          p.cLd.length > 0 &&
                          p.cLd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}
                        <br />
                        Throw:
                        {p.cTd &&
                          p.cTd.length > 0 &&
                          p.cTd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}
                        <br />
                        Protein:
                        {p.cPd &&
                          p.cPd.length > 0 &&
                          p.cPd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}
                        <br />
                        Dressing:
                        {p.cDd &&
                          p.cDd.length > 0 &&
                          p.cDd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}
                        <br />
                        Premium Addons:
                        {p.pAd &&
                          p.pAd.length > 0 &&
                          p.pAd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}
                        <br />
                        General Addons:
                        {p.gAd &&
                          p.gAd.length > 0 &&
                          p.gAd.map((a, i) => (
                            <span
                              key={i}
                              className="text-light-white fw-700 px-2"
                            >
                              {a.title}
                            </span>
                          ))}{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="product-value">
                    {" "}
                    <p className="text-info m-2 fw-700">
                      {p.qte} x{" "}
                      {(
                        p.gAP +
                        p.pAP +
                        p.cLP +
                        p.cPP +
                        p.cTP +
                        p.cDP +
                        p.itemPrice
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="price">
                  {" "}
                  <p className="text-info m-2 fw-700">{p.tp.toFixed(2)} LKR</p>
                </div>
              </Fragment>
            )}
          </div>
        ))}
    </Fragment>
  );
}

export default Products;
