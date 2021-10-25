import { API } from "../../../config";

export const readRestaurant = (restaurantId,abortCont) => {
    return fetch(`${API}/restaurant/${restaurantId}`, {
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