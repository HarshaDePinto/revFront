import { API } from "../../../config";

export const getAddonByRole = (addonRole, abortCont) => {
  return fetch(`${API}/addons`, {
    method: "POST",
    signal: abortCont.signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addonRole),
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

export const createAddon = (userId, token, addon) => {
  return fetch(`${API}/addon/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addon),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readAddon = (addonId, abortCont) => {
  return fetch(`${API}/addon/${addonId}`, {
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

export const updateAddon = (token, addonId, userId, addon) => {
  return fetch(`${API}/addon/${addonId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addon),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteAddon = (token, addonId, userId, addon) => {
  return fetch(`${API}/addon/${addonId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: addon,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
