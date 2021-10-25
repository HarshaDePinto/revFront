import { API } from "../../../config";

export const createFood = (userId, token, food) => {
  return fetch(`${API}/food/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: food,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFoodByCategory = (foodCategoryId, abortCont) => {
  return fetch(`${API}/foodByCategory/${foodCategoryId}`, {
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

export const readFood = (foodId, abortCont) => {
  return fetch(`${API}/food/${foodId}`, {
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

export const updateFood = (token, foodId, userId, food) => {
  return fetch(`${API}/food/${foodId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: food,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteFood = (token, foodId, userId, food) => {
  return fetch(`${API}/food/${foodId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: food,
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

export const getAllRestaurants = () => {
  return fetch(`${API}/restaurants`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
