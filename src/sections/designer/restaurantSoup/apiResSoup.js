import { API } from "../../../config";

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

  export const changeAvailability = (userId, token, data) => {
    return fetch(`${API}/soup/changeAvailable/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };