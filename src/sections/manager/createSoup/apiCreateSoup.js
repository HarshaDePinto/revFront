import { API } from "../../../config";

export const readSoup = (soupId,abortCont) => {
  return fetch(`${API}/soup/${soupId}`, { signal: abortCont.signal },{
    method: "GET",
  })
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

export const getAddonByRole = (addonRole) => {
  return fetch(`${API}/addons`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addonRole),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

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

export const getAllSoups = (abortCont) => {
    return fetch(`${API}/soups`, {
      method: "GET",
      signal: abortCont.signal,
    })
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
