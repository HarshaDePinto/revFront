import { API } from "../../../config";

export const getAllInventories = (abortCont) => {
  return fetch(`${API}/inventories`, {
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

export const createInventory = (userId, token, inventory) => {
  return fetch(`${API}/inventory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readInventory = (inventoryId, abortCont) => {
  return fetch(`${API}/inventory/${inventoryId}`, {
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

export const updateInventory = (token, inventoryId, userId, inventory) => {
  return fetch(`${API}/inventory/${inventoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteInventory = (token, inventoryId, userId, inventory) => {
  return fetch(`${API}/inventory/${inventoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: inventory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
