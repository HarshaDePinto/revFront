import { API } from "../../config";

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

export const clearCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("myCart");
    next();
  }
};

export const createInvoice = (userId, token, invoice) => {
  return fetch(`${API}/invoice/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPromotion = (promoCode) => {
   
  return fetch(`${API}/client/promo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promoCode),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const sendSms = (data) => {
  let mobileNum = parseInt(data.mobile, 10);
  let text = "You Have A New Order";
  let clientName = data.clientName;
  let clientMobile = data.clientMobile;
  let orderId = data.orderId;
  let msg = [text, 'Client Name:', clientName, 'Mobile:', clientMobile, 'Order Id:',orderId].join(' ');
  
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

export const getUsersByRole = (role, token,abortCont) => {
  return fetch(`${API}/user/by/role`, {
    method: "POST",
    signal: abortCont.signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(role),
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

export const updateStatus = (invoice) => {
  return fetch(`${API}/invoice/status/client`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

