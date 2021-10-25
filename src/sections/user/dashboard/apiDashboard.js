import { API } from "../../../config";

export const numberOfD = (userId, abortCont) => {
    return fetch(`${API}/ongoing/number/client/${userId}`, {
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

  export const ongoingOrdersD = (userId, abortCont) => {
    return fetch(`${API}/ongoing/client/${userId}`, {
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

  export const isSubmit = (userId, abortCont) => {
    return fetch(`${API}/ongoing/submit/${userId}`, {
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