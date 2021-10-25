import { API } from "../../../config";

export const getAllPromotions = (abortCont) => {
  return fetch(`${API}/promotions`, {
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

export const createPromotion = (userId, token, promotion) => {
  return fetch(`${API}/promotion/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotion),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readPromotion = (promotionId, abortCont) => {
  return fetch(`${API}/promotion/${promotionId}`, {
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

export const updatePromotion = (token, promotionId, userId, promotion) => {
  return fetch(`${API}/promotion/${promotionId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotion),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deletePromotion = (token, promotionId, userId, promotion) => {
  return fetch(`${API}/promotion/${promotionId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: promotion,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
