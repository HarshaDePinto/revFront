import { API } from "../../../config";

export const createCustom = (userId, token, custom) => {
  return fetch(`${API}/custom/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: custom,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const readCustom = (customId, abortCont) => {
  return fetch(`${API}/custom/${customId}`, {
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

export const updateCustom = (token, customId, userId, custom) => {
  return fetch(`${API}/custom/${customId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: custom,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCustom = (token, customId, userId, custom) => {
  return fetch(`${API}/custom/${customId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: custom,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};




  export const getAllCustoms = (abortCont) => {
    return fetch(`${API}/customs`, {
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
