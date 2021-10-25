import { API } from "../../../config";

export const acceptedOrders = (restaurantId, abortCont) => {
  return fetch(
    `${API}/restaurant/acceptedOrders/${restaurantId}`,
    { signal: abortCont.signal },
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};

export const updateStatus = (invoiceId, invoice) => {
  return fetch(`${API}/invoice/status/${invoiceId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateDelivery = (invoiceId, invoice) => {
  return fetch(`${API}/invoice/delivered/${invoiceId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readRestaurant = (restaurantId, abortCont) => {
  return fetch(
    `${API}/restaurant/${restaurantId}`,
    { signal: abortCont.signal },
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};

export const getCartAll = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("myCart")) {
    return JSON.parse(localStorage.getItem("myCart"));
  } else {
    return false;
  }
};
