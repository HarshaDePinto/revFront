import { API } from "../../../config";

export const getInventories = (abortCont) => {
    return fetch(
      `${API}/inventories`,
      { signal: abortCont.signal },
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          console.log(err);
        }
      });
  };

  export const createRecode = (userId, token, recode) => {
    return fetch(`${API}/recode/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recode),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getRecodeByDate = (userId, token, abortCont, recode) => {
    return fetch(
      `${API}/recode/byDate/${userId}`,
      {
        method: "POST",
        signal: abortCont.signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recode),
      }
    )
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