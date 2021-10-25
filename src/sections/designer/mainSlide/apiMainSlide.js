import { API } from "../../../config";

export const createMainSlide = (userId, token, mainSlide) => {
  return fetch(`${API}/mainSlider/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: mainSlide,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMainSlides = (sortBy,abortCont) => {
  return fetch(`${API}/mainSlides?sortBy=${sortBy}&order=desc`, {
    method: "GET",
    signal: abortCont.signal,
  })
    .then((response) => response.json())
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};

export const readMainSlide = (mainSlideId,abortCont) => {
  return fetch(`${API}/mainSlide/${mainSlideId}`, {
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

export const updateMainSlide = (token, mainSlideId, userId, mainSlide) => {
  return fetch(`${API}/mainSlide/${mainSlideId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: mainSlide,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteMainSlide = (token, mainSlideId, userId, mainSlide) => {
  return fetch(`${API}/mainSlide/${mainSlideId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: mainSlide,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
