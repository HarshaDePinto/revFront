import { API } from "../../../config";

export const createSoup = (userId, token, soup) => {
  return fetch(`${API}/soup/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: soup,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const readSoup = (soupId,abortCont) => {
  return fetch(`${API}/soup/${soupId}`, {
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

export const updateSoup = (token, soupId, userId, soup) => {
  return fetch(`${API}/soup/${soupId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: soup,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteSoup = (token, soupId, userId, soup) => {
  return fetch(`${API}/soup/${soupId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: soup,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
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

  export const getAllSoups = (abortCont) => {
    return fetch(`${API}/soups`, {
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
