import { API } from "../../../config";

export const getInvoiceByDate = (userId, token, abortCont, invoice) => {
  return fetch(
    `${API}/invoices/byDate/${userId}`,
    {
      method: "POST",
      signal: abortCont.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
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
