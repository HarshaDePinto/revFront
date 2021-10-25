import { API } from "../../../config";

export const setCartAll = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("myCart", JSON.stringify(data));
    next();
  }
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

export const clearCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("myCart");
    next();
  }
};

export const createInvoice = (userId, token, invoice) => {
  return fetch(`${API}/invoice/createByManager/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
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
