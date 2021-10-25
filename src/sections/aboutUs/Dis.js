import React from "react";
import { Link } from "react-router-dom";
function Dis() {
  return (
    <section
      className="section-padding restaurent-about smoothscroll"
      id="about"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-light-black fw-700 title">Get to Know Us</h3>
            <p className="text-light-white no-margin">
              We at Salad Factory are committed to provide fresh, healthy and
              delicious meal as an alternative to typical fast foods or
              traditional rice-based meals. We understand our consumers’
              lifestyle and taste and therefore, creates dynamic menus that
              offer, freshly prepared salads from finest ingredients available
              in the market, home-made sauce and dressings and soups.
            </p>{" "}
            <p className="text-light-green no-margin">
              New lifestyle always begins with healthy foods, go for it !
            </p>
         
            <ul className="about-restaurent">
              <li>
                {" "}
                <i className="fas fa-map-marker-alt" />
                <span>
                  <Link to="#" className="text-light-white">
                  Colombo City Centre Mall
                    <br />
                    137, Sir James Peiris Mawatha, Colombo 2, Sri Lanka
                  </Link>
                </span>
              </li>
              <li>
                {" "}
                <i className="fas fa-phone-alt" />
                <span>
                  <Link to="#" className="text-light-white">
                  +94 707 055 707
                  </Link>
                </span>
              </li>
              <li>
                {" "}
                <i className="far fa-envelope" />
                <span>
                  <Link to="#" className="text-light-white">
                  info@wisechoice.lk 
                  </Link>
                </span>
              </li>
            </ul>
            <ul className="social-media pt-2">
              <li>
                {" "}
                <Link to="#">
                  <i className="fab fa-facebook-f" />
                </Link>
              </li>
              <li>
                {" "}
                <Link to="#">
                  <i className="fab fa-twitter" />
                </Link>
              </li>
              <li>
                {" "}
                <Link to="#">
                  <i className="fab fa-instagram" />
                </Link>
              </li>
              <li>
                {" "}
                <Link to="#">
                  <i className="fab fa-pinterest-p" />
                </Link>
              </li>
              <li>
                {" "}
                <Link to="#">
                  <i className="fab fa-youtube" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="restaurent-schdule">
              <div className="card">
                <div className="card-header text-light-white fw-700 fs-16">
                  Opening Hours
                </div>
                <div className="card-body">
                  <div className="schedule-box">
                    <div className="day text-light-black">Monday</div>
                    <div className="time text-light-black">
                      7:00am - 10:59pm
                    </div>
                  </div>
                  <div>
                    <div className="schedule-box">
                      <div className="day text-light-black">Tuesday</div>
                      <div className="time text-light-black">
                        7:00am - 10:00pm
                      </div>
                    </div>
                    <div className="schedule-box">
                      <div className="day text-light-black">Wednesday</div>
                      <div className="time text-light-black">
                        7:00am - 10:00pm
                      </div>
                    </div>
                    <div className="schedule-box">
                      <div className="day text-light-black">Thursday</div>
                      <div className="time text-light-black">
                        7:00am - 10:00pm
                      </div>
                    </div>
                    <div className="schedule-box">
                      <div className="day text-light-black">Friday</div>
                      <div className="time text-light-black">
                        7:00am - 10:00pm
                      </div>
                    </div>
                    <div className="schedule-box">
                      <div className="day text-light-black">Saturday</div>
                      <div className="time text-light-black">
                        7:00am - 10:00pm
                      </div>
                    </div>
                    <div className="schedule-box">
                      <div className="day text-light-black">Sunday</div>
                      <div className="time text-light-black">
                        7:00am - 10:00pm
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dis;
