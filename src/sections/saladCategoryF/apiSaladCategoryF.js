import { API } from "../../config";

export const getSaladCategory = (abortCont) => {
  return fetch(
    `${API}/admin/saladCategories`,
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

export const getFoodCategory = (abortCont) => {
  return fetch(
    `${API}/admin/foodCategories`,
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

export const readSaladCategory = (saladCategoryId, abortCont) => {
  return fetch(
    `${API}/saladCategory/${saladCategoryId}`,
    { signal: abortCont.signal },
    {
      method: "GET",
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
export const getSaladByCategory = (saladCategoryId, abortCont) => {
  return fetch(
    `${API}/saladByCategory/${saladCategoryId}`,
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
