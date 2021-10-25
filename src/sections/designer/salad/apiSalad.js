import { API } from "../../../config";

export const createSalad = (userId, token, salad) => {
  return fetch(`${API}/salad/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: salad,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSaladByCategory = (saladCategoryId,abortCont) => {
  return fetch(`${API}/saladByCategory/${saladCategoryId}`, {
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

export const readSalad = (saladId,abortCont) => {
  return fetch(`${API}/salad/${saladId}`, {
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

export const updateSalad = (token, saladId, userId, salad) => {
  return fetch(`${API}/salad/${saladId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: salad,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteSalad = (token, saladId, userId, salad) => {
  return fetch(`${API}/salad/${saladId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: salad,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSaladCategory = (abortCont) => {
    return fetch(`${API}/admin/saladCategories`, {
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
