import React from "react";
import SaladCategory from "./SaladCategories";

function Dis() {
  return (
    <section className="section-padding restaurent-meals bg-light-theme">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <h3 className="text-light-black title fw-700">Food Order Errors</h3>
            <p className="text-light-black sub-title">
              If you receive food that is different from your order, we
              sincerely apologize. Please call us as soon as you notice that
              there was an error in your order.
            </p>
            <p className="text-light-black sub-title">
              However, if you still wish to consume the food, we will
              refund/charge as below:
            </p>
            <ul>
              <li>
                • For credit card payments, you will be refunded the sales price
                amount associated with the error and recharged for the new
                item's price.
              </li>
              <li>
                • For cash payments, you will be asked to pay the difference of
                the balance if the new food has a greater value than the food
                received in error. In the same way, you will receive the
                difference of the balance back as credit for the new item if
                less than the food received in error. In some cases, we may
                offer you store credit*.
              </li>
            </ul>
            <p className="text-light-black sub-title">
              If you wish to get a full refund, you can return the food
              delivered in error in the original container and ask for a refund.
            </p>
            <p className="text-light-black sub-title">
              Your order will be a priority if you come to pick it up. In all
              cases, please return the food order in the original container(s)
              to our host.
            </p>

            <h3 className="text-light-black title fw-700">
              Food Order Incomplete
            </h3>
            <p className="text-light-black sub-title">
              On the rare occasion that you do not receive food that is on your
              order, we will make it up to you. Please call us as soon as you
              notice that any food items were not received in your order. You
              may cancel the missed food before we prepare it without any
              question, and we will refund the amount to a credit card, cash
              refund or we will refund you with a store credit*.
            </p>
            <h3 className="text-light-black title fw-700">
              Food Dissatisfaction
            </h3>
            <p className="text-light-black sub-title">
              We cook our food fresh to order with only the finest and freshest
              ingredients. We take great care and pride in all of the dishes we
              make. Please call us immediately if you receive unsatisfactory
              food caused by a dislike or objects in the food. We will need the
              food returned in the original container(s) so we may investigate
              and deal with the issue. We will prepare you a new food order. If
              you do not wish to receive a new dish, we may refund the amount to
              a credit card, cash refund or we will refund you with a store
              credit* only after we receive the food in the original
              container(s) and have confirmed the error to the discretion of the
              manager on duty.
            </p>
            <p className="text-light-black sub-title">
              {" "}
              <i>
                *Store Credit: A store credit is a document offered by a store
                to a customer who returns an item not eligible for a refund. It
                can be used to buy other goods at the store. You may exchange
                merchandise or receive store credit in the amount of the item's
                last sale price.
              </i>
            </p>
          </div>
          <div className="col-xl-4 col-lg-4">
            <SaladCategory />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dis;
