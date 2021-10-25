import { API } from "../../../config";

export const createSaladCategory = (userId, token, saladCategory) => {
  return fetch(`${API}/saladCategory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: saladCategory,
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

export const readSaladCategory = (saladCategoryId, abortCont) => {
  return fetch(`${API}/saladCategory/${saladCategoryId}`, {
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

export const updateSaladCategory = (
  token,
  saladCategoryId,
  userId,
  saladCategory
) => {
  return fetch(`${API}/saladCategory/${saladCategoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: saladCategory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteSaladCategory = (
  token,
  saladCategoryId,
  userId,
  saladCategory
) => {
  return fetch(`${API}/saladCategory/${saladCategoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: saladCategory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
