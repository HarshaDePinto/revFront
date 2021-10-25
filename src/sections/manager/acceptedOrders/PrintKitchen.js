import React, { Fragment  } from "react";

function PrintKitchen({ clientName, orderId, products }) {
  return (
    <Fragment>
      <section className="checkout-page section-padding bg-light-theme">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tracking-sec">
                <div className="tracking-details padding-20 p-relative">
                  <h2 className="text-light-black fw-700 no-margin">
                    {orderId}
                  </h2>
                  <p>{clientName}</p>
                </div>
              </div>
              {/* recipt */}
              <div className="recipt-sec padding-20">
                <div className="u-line mb-xl-20">
                  <div className="row">
                    <div className="col-lg-12">
                      {products &&
                        products.map((p, i) => (
                          <div key={i} className="checkout-product">
                            {p.type === 1 && (
                              <Fragment>
                                <div className="img-name-value">
                                  <div className="product-name">
                                    <div className="cat-name">
                                      <>
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
                                      </>
                                    </div>
                                  </div>
                                  
                                </div>
                               
                              </Fragment>
                            )}

                            {p.type === 2 && (
                              <Fragment>
                                <div className="img-name-value">
                                  <div className="product-name">
                                    <div className="cat-name">
                                      <>
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
                                      </>
                                    </div>
                                  </div>
                                  
                                </div>
                                
                              </Fragment>
                            )}

                            {p.type === 3 && (
                              <Fragment>
                                <div className="img-name-value">
                                  <div className="product-name">
                                    <div className="cat-name">
                                      <>
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
                                      </>
                                    </div>
                                  </div>
                                 
                                </div>
                               
                              </Fragment>
                            )}

                            {p.type === 4 && (
                              <Fragment>
                                <div className="img-name-value">
                                  <div className="product-name">
                                    <div className="cat-name">
                                      <>
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
                                      </>
                                    </div>
                                  </div>
                                  
                                </div>
                                
                              </Fragment>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="tracking-sec">
                <div className="tracking-details padding-20 p-relative">
                  <p>{Date()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default PrintKitchen;
