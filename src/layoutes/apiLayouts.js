import { API } from "../config";

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getAllRestaurants = (abortCont) => {
  return fetch(
    `${API}/restaurants`,
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

export const readRestaurant = (restaurantId) => {
  return fetch(`${API}/restaurant/${restaurantId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSaladCategory = (abortCont) => {
  return fetch(
    `${API}/admin/saladCategories`,
    { signal: abortCont.signal },
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};

export const getAllCustom = (abortCont) => {
  return fetch(
    `${API}/customs`,
    { signal: abortCont.signal },
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};

export const getHomeFoodCategory = (abortCont) => {
  return fetch(
    `${API}/home/foodCategories`,
    { signal: abortCont.signal },
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};
