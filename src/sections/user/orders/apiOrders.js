import { API } from "../../../config";

export const myOrders = (userId, abortCont) => {
    return fetch(`${API}/ordersBy/client/${userId}`, {
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