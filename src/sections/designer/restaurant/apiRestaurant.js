import { API } from "../../../config";

export const getAllRestaurants = (abortCont) => {
  return fetch(`${API}/restaurants`, {
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

export const createRestaurant = (userId, token, restaurant) => {
  return fetch(`${API}/restaurant/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurant),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readRestaurant = (restaurantId, abortCont) => {
  return fetch(`${API}/restaurant/${restaurantId}`, {
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

export const updateRestaurant = (token, restaurantId, userId, restaurant) => {
  return fetch(`${API}/restaurant/${restaurantId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurant),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteRestaurant = (token, restaurantId, userId, restaurant) => {
  return fetch(`${API}/restaurant/${restaurantId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: restaurant,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
