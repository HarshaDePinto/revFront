import { API } from "../../../config";

export const createFoodCategory = (userId, token, foodCategory) => {
  return fetch(`${API}/foodCategory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: foodCategory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFoodCategory = (abortCont) => {
  return fetch(`${API}/admin/foodCategories`, {
    method: "GET",
    signal: abortCont.signal,
  })
    .then((response) => response.json())
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};

export const readFoodCategory = (foodCategoryId, abortCont) => {
  return fetch(`${API}/foodCategory/${foodCategoryId}`, {
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

export const updateFoodCategory = (
  token,
  foodCategoryId,
  userId,
  foodCategory
) => {
  return fetch(`${API}/foodCategory/${foodCategoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: foodCategory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteFoodCategory = (
  token,
  foodCategoryId,
  userId,
  foodCategory
) => {
  return fetch(`${API}/foodCategory/${foodCategoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: foodCategory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
