import { API } from "../config";

export const sendSms = (data) => {
  let mobileNum = parseInt(data.mobile, 10);
  let text = "Well come to Salad Factory. Your OTP: ";
  let otp = data.otp;
  let msg = text.concat(otp);
  return fetch(
    `http://send.ozonedesk.com/api/v2/send.php?api_key=ozone48002409sms&user_id=100125&sender_id=DnD-BKTeam&to=${mobileNum}&message=${msg}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signUp = (user) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signIn = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/logout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("sign out", response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const readUser = (userMobile, abortCont) => {
  return fetch(
    `${API}/user/mobile/${userMobile}`,
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

export const mobileVerify = (data) => {
  return fetch(`${API}/mobile/verify/${data.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const smsResend = (data) => {
  return fetch(`${API}/mobile/resend/${data.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllRestaurants = (abortCont) => {
  return fetch(
    `${API}/restaurants`,
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

export const setSelectedRestaurant = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedRestaurant", JSON.stringify(data));
    next();
  }
};

export const getSelectedRestaurant = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("selectedRestaurant")) {
    return JSON.parse(localStorage.getItem("selectedRestaurant"));
  } else {
    return false;
  }
};

export const clearCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("myCart");
    next();
  }
};

export const setCartAll = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("myCart", JSON.stringify(data));
    next();
  }
};

export const getCartAll = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("myCart")) {
    return JSON.parse(localStorage.getItem("myCart"));
  } else {
    return false;
  }
};

export const signInForgotPassword = (user) => {
  return fetch(`${API}/forgotPasswordLogin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
