import { API } from "../../config";

export const getFrontSlide = (abortCont) => {
  return fetch(
    `${API}/frontSlides`,
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

export const getHomeSaladCategory = (abortCont) => {
  return fetch(
    `${API}/home/saladCategories`,
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

export const getHomeSalad = (abortCont) => {
  return fetch(
    `${API}/salads`,
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

export const getAllSoups = (abortCont) => {
  return fetch(
    `${API}/soups`,
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

export const getHomeFoodCategory = (abortCont) => {
  return fetch(
    `${API}/home/foodCategories`,
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

export const getHomeFood = (abortCont) => {
  return fetch(
    `${API}/foods`,
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

export const getAllCustom = (abortCont) => {
  return fetch(
    `${API}/customs`,
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
